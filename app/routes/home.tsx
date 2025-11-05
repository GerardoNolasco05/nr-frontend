import { useState } from "react";
import aboutData from "../locales/about.json";
import Typewriter from "../components/Typewriter";
import Navbar from "../components/Navbar";

export default function Home() {
  const [active, setActive] = useState("About");
  const text = aboutData.en.intro; // still typing English by default

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <Navbar
        widthClass="max-w-3xl w-full"
        heightClass="h-[60vh]"
        active={active}
        onSelect={(item) => setActive(item)}
      >
        <p className="text-stone-400 font-dos text-base leading-relaxed text-justify whitespace-pre-line">
          <Typewriter text={text} speed={10} />
        </p>
      </Navbar>
    </div>
  );
}
