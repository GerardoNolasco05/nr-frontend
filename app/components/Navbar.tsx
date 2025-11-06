import React, { useEffect, useRef, useState } from "react";
import Win95ScrollPane from "./Win95ScrollPane";

// ✅ Import icons from your local assets
import iconA from "../assets/images/iconA.png";
import iconJ from "../assets/images/iconJ.png";
import iconB from "../assets/images/iconB.png";
import iconW from "../assets/images/iconW.png";

const MENU = ["About", "Projects", "Team", "Contact", "Privacy Policy"];

interface NavbarProps {
  widthClass?: string;
  heightClass?: string;
  children?: React.ReactNode;
  active?: string;
  onSelect?: (item: string) => void;
  showTools?: boolean; // ✅ controls toolbar visibility
  onToolPress?: (index: number) => void; // ✅ NEW: notify parent when a tool button is clicked
}

export default function Navbar({
  widthClass = "w-[850px]",
  heightClass = "h-[550px]",
  children,
  active = "About",
  onSelect,
  showTools = false,
  onToolPress, // ✅ NEW
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

  // ✅ Icon sources (imported above)
  const toolIcons = [iconA, iconJ, iconB, iconW];

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
            {/* === MENU FIELD (recessed integrated style) === */}
            <div
              ref={groupRef}
              className="
                relative flex items-center gap-1
                bg-[#ffffff]
                border border-[#4b5563]
                shadow-[inset_1px_1px_0_#9aa9b7,inset_-1px_-1px_0_#ffffff]
                px-0 py-[0px]
                min-w-[135px]
              "
            >
              {/* Label */}
              <span className="text-[12px] font-dos text-black flex-1 pl-1">
                {active}
              </span>

              {/* ▼ Button (integrated look) */}
              <button
                aria-label="Open menu"
                onClick={() => setOpen((v) => !v)}
                className="
                  w-[20px] h-[20px]
                  bg-[#b9c7d5]
                  cursor-pointer
                  border border-[#4b5563] 
                  flex items-center justify-center
                  active:shadow-[inset_1px_1px_0_#4b5563,inset_-1px_-1px_0_#9aa9b7]
                "
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

              {/* === DROPDOWN MENU === */}
              {open && (
                <div
                  className="
                    absolute left-0 top-[calc(100%+4px)]
                    z-50 w-[135px] max-h-48 overflow-auto
                    bg-[#ffffff]
                    border border-[#4b5563]
                    shadow-[inset_1px_1px_0_#9aa9b7,inset_-1px_-1px_0_#ffffff]
                    p-[2px]
                  "
                >
                  <ul className="font-dos text-[12px] text-black">
                    {MENU.map((item) => (
                      <li key={item}>
                        <button
                          onClick={() => choose(item)}
                          className="
                            w-full text-left px-2 py-1
                            bg-[#ffffff]
                            cursor-pointer
                            hover:bg-[#d4d7db]
                            active:bg-[#9aa9b7]
                            text-black
                            font-dos
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

            {/* === TOOLBAR BUTTONS (with icons) === */}
            <div
              className={`flex items-center gap-1 transition-all duration-200 ${
                showTools ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
              style={{ minHeight: "28px" }} // 👈 keeps height constant so layout doesn’t jump
            >
              {toolIcons.map((src, i) => (
                <button
                  key={i}
                  onClick={() => onToolPress?.(i)}   // ✅ now notifies parent
                  aria-label={`Toolbar button ${i + 1}`}
                  className="btn95 btn95--square cursor-pointer flex items-center justify-center w-[26px] h-[26px]"
                >
                  <img
                    src={src}
                    alt={`icon ${i + 1}`}
                    className="w-[22px] h-[22px] object-contain pointer-events-none"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* === TERMINAL FRAME === */}
        <div className="mx-2 mb-2 bg-[#b9c7d5] border border-[#4b5563] shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#4b5563] p-1">
          <Win95ScrollPane heightClass={heightClass} contentClassName="p-4">
            {children && children}
          </Win95ScrollPane>

          {/* Bottom frame strip */}
          <div className="h-[14px] bg-[#b9c7d5] mt-1 border-t border-white shadow-[inset_0_1px_0_#4b5563]" />
        </div>
      </div>
    </div>
  );
}
