// app/components/RetroInstallOverlay.tsx
import React from "react";

type Props = {
  topTitle?: string;
  middleTitle: string;
  version?: string;
  footer?: string;
  onClick?: () => void;          // ✅ NEW: allow click to start loader
};

export default function RetroInstallOverlay({
  topTitle = "NOREFERENCE PROJECT INSTALER",
  middleTitle,
  version = "MS-DOS VERSION v1.0",
  footer = "(c)2026 No Reference Inc.  Distributed by No Reference Regenerative Research Projects",
  onClick,
}: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <button
        type="button"
        onClick={onClick}
        className="bg-[#0b3aa8] text-white cursor-pointer font-dos px-6 py-4 border border-white shadow-[0_0_0_2px_#0b3aa8,0_0_0_3px_#ffffff] text-center pointer-events-auto active:translate-y-px"
        style={{
          width: "360px",          // ← size: change here
          height: "170px",         // ← size: change here
          transform: "translateY(0%)",
        }}
      >
        <div className="uppercase tracking-wider text-[12px] mb-2">
          {topTitle}
        </div>

        <div className="h-px bg-white/80 mb-3" />

        <div className="uppercase tracking-wide text-[12px] mb-1">
          {middleTitle}
        </div>
        <div className="uppercase tracking-wider text-[11px] mb-3">
          {version}
        </div>

        <div className="h-px bg-white/80 mb-2" />

        <div className="text-[11px] leading-snug">{footer}</div>
      </button>
    </div>
  );
}
