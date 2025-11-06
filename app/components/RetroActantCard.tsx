import React from "react";

type Props = {
  img: string;
  name: string;
  role?: string;
  description?: string;
};

export default function RetroActantCard({ img, name, role, description }: Props) {
  return (
    <div
      className="
        flex w-full
        border border-[#4b5563]
        bg-[#b9c7d5]
        shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#4b5563]
      "
    >
      {/* LEFT – portrait tile */}
      <div className="w-40 flex-shrink-0 border-r border-[#4b5563]">
        {/* image frame */}
        <div
          className="
            m-3 h-[132px]
            border border-[#4b5563]
            bg-black
            shadow-[inset_1px_1px_0_#9aa9b7,inset_-1px_-1px_0_#ffffff]
            flex items-center justify-center
          "
        >
          <img
            src={img}
            alt={name}
            className="max-h-full max-w-full object-contain"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* name plate — now BELOW the image */}
        <div className="px-3 pb-3">
          <div className="bg-[#0b4fb4] text-white text-[11px] font-dos px-2 py-[2px] text-center border border-[#4b5563]">
            {name}
          </div>
        </div>
      </div>

      {/* RIGHT – black console text */}
      <div className="flex-1 p-3">
        <div
          className="
            h-full w-full
            bg-black
            text-stone-200 font-dos text-sm leading-relaxed
            border border-[#4b5563]
            shadow-[inset_1px_1px_0_#9aa9b7,inset_-1px_-1px_0_#ffffff]
            p-3
          "
        >
          <ul className="space-y-1">
            {role && (
              <li>
                <span className="text-stone-400">Role:</span> {role}
              </li>
            )}
            {description && <li className="text-stone-300">{description}</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
