import { useEffect, useMemo, useRef, useState } from "react";

interface Win95ScrollPaneProps {
  heightClass?: string;
  contentClassName?: string;
  children: React.ReactNode;
  step?: number;
}

export default function Win95ScrollPane({
  heightClass = "h-[60vh]",
  contentClassName = "",
  children,
  step = 40,
}: Win95ScrollPaneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(30);

  // Update thumb position & size
  const sync = () => {
    const el = wrapRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const trackH = track.clientHeight;
    const minThumb = 20;
    const h = Math.max(minThumb, (clientHeight / scrollHeight) * trackH);
    setThumbHeight(h);
    const maxScroll = scrollHeight - clientHeight;
    const maxTop = trackH - h;
    const ratio = maxScroll > 0 ? scrollTop / maxScroll : 0;
    setThumbTop(ratio * maxTop);
  };

  useEffect(() => {
    sync();
    const el = wrapRef.current;
    if (!el) return;
    const onScroll = () => sync();
    el.addEventListener("scroll", onScroll);
    const ro = new ResizeObserver(() => sync());
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  // Handle dragging
  useEffect(() => {
    const track = trackRef.current;
    const el = wrapRef.current;
    if (!track || !el) return;

    let dragging = false;
    let startY = 0;
    let startTop = 0;

    const onDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.dataset.role !== "thumb") return;
      dragging = true;
      startY = e.clientY;
      startTop = thumbTop;
      target.setPointerCapture(e.pointerId);
      e.preventDefault();
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const trackH = track.clientHeight;
      const maxTop = trackH - thumbHeight;
      const dy = e.clientY - startY;
      const newTop = Math.min(maxTop, Math.max(0, startTop + dy));
      setThumbTop(newTop);
      const { scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      el.scrollTop = (newTop / maxTop) * maxScroll;
    };

    const onUp = (e: PointerEvent) => {
      dragging = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    };

    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      track.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [thumbHeight, thumbTop]);

  // Arrow click behavior
  const makeRepeater = (delta: number) => {
    let id: number | null = null;
    const start = () => {
      const el = wrapRef.current;
      if (!el) return;
      el.scrollBy({ top: delta, behavior: "auto" });
      id = window.setInterval(() => el.scrollBy({ top: delta, behavior: "auto" }), 60);
    };
    const stop = () => {
      if (id) window.clearInterval(id);
      id = null;
    };
    return { start, stop };
  };

  const up = useMemo(() => makeRepeater(-step), [step]);
  const down = useMemo(() => makeRepeater(step), [step]);

  return (
    <div
      className={`
        relative ${heightClass}
        bg-black border border-[#4b5563]
        shadow-[inset_1px_1px_0_#9aa9b7,inset_-1px_-1px_0_#9aa9b7]
      `}
    >
      <div ref={wrapRef} className="h-full overflow-y-scroll pr-5" style={{ scrollbarWidth: "none" }}>
        <div className={contentClassName}>{children}</div>
      </div>

      {/* Custom vertical scrollbar */}
      <div className="absolute inset-y-0 right-0 w-[16px] flex flex-col">
        {/* ▲ Up */}
        <button
          className="
            h-[16px] bg-[#b9c7d5]
            cursor-pointer
            border-t border-l border-[#4b5563]
            border-b border-r border-white
            grid place-items-center
            active:border-t-white active:border-l-white
            active:border-b-[#4b5563] active:border-r-[#4b5563]
          "
          onMouseDown={up.start}
          onMouseUp={up.stop}
          onMouseLeave={up.stop}
        >
          <span
            className="block"
            style={{
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderBottom: "6px solid #000000",
            }}
          />
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex-1 bg-[#b9c7d5] border-l border-[#4b5563] border-r border-white relative cursor-pointer"
        >
          <div
            data-role="thumb"
            className="
              absolute left-0 right-0 bg-[#9aa9b7]
              border border-[#4b5563]
              shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#4b5563]
              cursor-grab active:cursor-grabbing
            "
            style={{ top: thumbTop, height: thumbHeight }}
          />
        </div>

        {/* ▼ Down */}
        <button
          className="
            h-[16px] bg-[#b9c7d5]
            cursor-pointer
            border-b border-l border-[#4b5563]
            border-t border-r border-white
            grid place-items-center
            active:border-b-white active:border-l-white
            active:border-t-[#4b5563] active:border-r-[#4b5563]
          "
          onMouseDown={down.start}
          onMouseUp={down.stop}
          onMouseLeave={down.stop}
        >
          <span
            className="block"
            style={{
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: "6px solid #000000",
            }}
          />
        </button>
      </div>
    </div>
  );
}
