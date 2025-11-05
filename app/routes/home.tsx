import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Typewriter from "../components/Typewriter";
import ContactForm from "../components/ContactForm";

import aboutData from "../locales/about.json";
import projectsData from "../locales/projects.json";
import teamData from "../locales/team.json";
import privacyData from "../locales/privacy.json";

type MenuKey = "About" | "Projects" | "Team" | "Contact" | "Privacy Policy";

export default function Home() {
  const [active, setActive] = useState<MenuKey>("About");

  // Helper to safely get English text from various JSON shapes.
  const getText = (obj: any): string => {
    // prefer .en.intro, then .en.text, then .en
    return obj?.en?.intro ?? obj?.en?.text ?? (typeof obj?.en === "string" ? obj.en : "");
  };

  const content = useMemo(() => {
    switch (active) {
      case "About":
        return (
          <p className="text-stone-400 font-dos text-base leading-relaxed text-justify whitespace-pre-line">
            <Typewriter text={getText(aboutData)} speed={10} />
          </p>
        );
      case "Projects":
        return (
          <p className="text-stone-400 font-dos text-base leading-relaxed text-justify whitespace-pre-line">
            <Typewriter text={getText(projectsData)} speed={10} />
          </p>
        );
      case "Team":
        return (
          <p className="text-stone-400 font-dos text-base leading-relaxed text-justify whitespace-pre-line">
            <Typewriter text={getText(teamData)} speed={10} />
          </p>
        );
      case "Privacy Policy":
        return (
          <p className="text-stone-400 font-dos text-base leading-relaxed text-justify whitespace-pre-line">
            <Typewriter text={getText(privacyData)} speed={10} />
          </p>
        );
      case "Contact":
        return <ContactForm />;
      default:
        return null;
    }
  }, [active]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <Navbar
        widthClass="max-w-3xl w-full"
        heightClass="h-[60vh]"
        active={active}
        onSelect={(item) => setActive(item as MenuKey)}
      >
        {content}
      </Navbar>
    </div>
  );
}
