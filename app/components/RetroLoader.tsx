// app/components/RetroLoader.tsx
import React from "react";

type Props = {
  percent: number;      // 0..100
  pathText: string;     // e.g., "C:\\ NR\\Posteden"
};

export default function RetroLoader({ percent, pathText }: Props) {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="
          bg-[#0b3aa8] text-white font-dos
          px-5 py-4
          border border-white
          shadow-[0_0_0_2px_#0b3aa8,0_0_0_3px_#ffffff]
          w-[460px]
        "
      >
        {/* Title pill */}
        <div className="mx-auto mb-3 inline-block bg-black text-[12px] px-2 py-[2px]">
          Installing Files...
        </div>

        {/* Percent */}
        <div className="text-center text-[12px] mb-2">{clamped}%</div>

        {/* Progress bar */}
        <div className="w-full h-[18px] bg-[#0b3aa8] border border-white relative overflow-hidden">
          {/* left yellow cap */}
          <div className="absolute left-0 top-0 h-full" style={{ width: 24, background: "#f35ce6ff" }} />
        {/* pink fill */}
        <div
            className="absolute left-[24px] top-0 h-full"
            style={{
            width: `calc(${clamped}% - 24px)`,
            background:
                "linear-gradient(90deg,#f35ce6 0%,#f35ce6 50%,#d4259e 50%,#d4259e 100%)",
            backgroundSize: "8px 100%",
            }}
        />
        </div>

        {/* Path box */}
        <div className="mt-3 bg-black text-white text-[12px] px-2 py-[4px] border border-white">
          {pathText}
        </div>
      </div>
    </div>
  );
}
