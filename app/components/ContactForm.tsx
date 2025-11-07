import React, { useState } from "react";

const API_BASE =
  (import.meta as any).env?.VITE_BACKEND_URL || "http://127.0.0.1:5000";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      message: String(form.get("message") || ""),
    };

    try {
      const res = await fetch(`${API_BASE}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("sent");
        (e.currentTarget as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="
        w-full
        border border-[#4b5563]
        bg-[#b9c7d5]
        shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#4b5563]
        mt-5
      "
    >
      {/* inner console panel */}
      <div className="p-3">
        <div
          className="
            bg-black text-stone-200 font-dos
            border border-[#4b5563]
            shadow-[inset_1px_1px_0_#9aa9b7,inset_-1px_-1px_0_#ffffff]
            p-3
          "
        >
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div>
              <label className="block text-stone-300 text-[12px] mb-1">
                Name
              </label>
              <input
                name="name"
                required
                className="
                  w-full font-dos text-[13px] text-stone-200
                  bg-[#0a0a0a]
                  border border-[#4b5563]
                  shadow-[inset_1px_1px_0_#1f1f1f,inset_-1px_-1px_0_#2d2d2d]
                  px-2 py-[6px] outline-none
                  focus:shadow-[inset_1px_1px_0_#4b5563,inset_-1px_-1px_0_#9aa9b7]
                "
                placeholder="C:\\> type your name"
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-stone-300 text-[12px] mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="
                  w-full font-dos text-[13px] text-stone-200
                  bg-[#0a0a0a]
                  border border-[#4b5563]
                  shadow-[inset_1px_1px_0_#1f1f1f,inset_-1px_-1px_0_#2d2d2d]
                  px-2 py-[6px] outline-none
                  focus:shadow-[inset_1px_1px_0_#4b5563,inset_-1px_-1px_0_#9aa9b7]
                "
                placeholder="C:\\> name@example.com"
                autoComplete="email"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-stone-300 text-[12px] mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="
                  w-full resize-y font-dos text-[13px] text-stone-200
                  bg-[#0a0a0a]
                  border border-[#4b5563]
                  shadow-[inset_1px_1px_0_#1f1f1f,inset_-1px_-1px_0_#2d2d2d]
                  px-2 py-[6px] outline-none
                  focus:shadow-[inset_1px_1px_0_#4b5563,inset_-1px_-1px_0_#9aa9b7]
                "
                placeholder="C:\\> write your message"
              />
            </div>

            {/* Buttons row (retro) */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                disabled={status === "sending"}
                className="
                  btn95 cursor-pointer px-3 py-1 font-dos text-[12px]
                  bg-pink-400 border border-[#4b5563]
                  active:translate-y-[1px]
                  disabled:opacity-60
                "
              >
                {status === "sending" ? "SENDING..." : "SEND"}
              </button>

              <button
                type="reset"
                className="
                  btn95 cursor-pointer px-3 py-1 font-dos text-[12px]
                  bg-pink-400 border border-[#4b5563]
                  active:translate-y-[1px]
                "
              >
                CLEAR
              </button>
            </div>
          </form>

          {/* Status bar at bottom like old apps */}
          <div className="mt-3 h-[18px] bg-[#b9c7d5] text-black text-[11px] font-dos px-2 flex items-center border border-[#4b5563]">
            {status === "idle" && <span>Ready.</span>}
            {status === "sending" && <span>Transmitting payload…</span>}
            {status === "sent" && <span>Message queued successfully.</span>}
            {status === "error" && <span>Error: connection lost.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
