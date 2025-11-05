import React, { useEffect, useRef, useState } from "react";
import Win95ScrollPane from "./Win95ScrollPane";

const MENU = ["About", "Goal", "Projects", "Team", "Contact", "Privacy Policy"];

interface NavbarProps {
  widthClass?: string;   // e.g. "max-w-3xl w-full"
  heightClass?: string;  // e.g. "h-[60vh]"
  children?: React.ReactNode;
  active?: string;
  onSelect?: (item: string) => void;
}

export default function Navbar({
  widthClass = "max-w-3xl w-full",
  heightClass = "h-[60vh]",
  children,
  active = "About",
  onSelect,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or ESC
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!groupRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const choose = (item: string) => {
    onSelect?.(item);
    setOpen(false);
  };

  return (
    <div className={`select-none ${widthClass}`}>
      {/* === OUTER WINDOW === */}
      <div className="bg-[#b9c7d5] border border-[#4b5563] rounded-[2px] shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#4b5563]">
        {/* === TITLE BAR === */}
        <div className="flex items-center justify-between bg-pink-400 text-white px-2 py-1">
          <span className="font-dos tracking-wide">noreference</span>
        </div>

        {/* === TOOLBAR === */}
        <div className="px-2 py-2 bg-[#b9c7d5] border-t border-[#dfe6ed]">
          <div className="flex items-center gap-2">
            {/* MENU FIELD + BUTTON */}
            <div ref={groupRef} className="relative flex items-center gap-1">
              {/* Inset label field */}
              <div
                className="
                  bg-[#b9c7d5]
                  border-t border-l border-[#4b5563]
                  border-b border-r border-white
                  px-2 py-[3px]
                  text-[12px] leading-none font-dos text-black
                  min-w-[92px]
                "
              >
                {active}
              </div>

              {/* ▼ button with Win95 volume */}
              <button
                aria-label="Open menu"
                onClick={() => setOpen((v) => !v)}
                className="btn95 btn95--square"
              >
                <span className="arrow-down" />
              </button>

              {/* Dropdown */}
              {open && (
                <div
                  className="
                    absolute left-0 top-[calc(100%+6px)]
                    z-50 w-44 max-h-48 overflow-auto
                    bg-[#b9c7d5]
                    border border-[#4b5563]
                    shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#4b5563]
                    p-1
                  "
                >
                  <ul className="font-dos text-[12px] text-black">
                    {MENU.map((item) => (
                      <li key={item}>
                        <button
                          onClick={() => choose(item)}
                          className="
                            w-full text-left px-2 py-1
                            hover:bg-[#9aa9b7]
                            focus:outline-none
                          "
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Blank toolbar buttons (3D style) */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => e.preventDefault()}
                  aria-label={`Toolbar button ${i + 1}`}
                  className="btn95 btn95--square"
                />
              ))}
            </div>
          </div>
        </div>

        {/* === TERMINAL FRAME === */}
        <div className="mx-2 mb-2 bg-[#b9c7d5] border border-[#4b5563] shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#4b5563] p-1">
          <Win95ScrollPane heightClass={heightClass} contentClassName="p-4">
            {children}
          </Win95ScrollPane>

          {/* bottom strip */}
          <div className="h-[14px] bg-[#b9c7d5] mt-1 border-t border-white shadow-[inset_0_1px_0_#4b5563]" />
        </div>
      </div>
    </div>
  );
}
