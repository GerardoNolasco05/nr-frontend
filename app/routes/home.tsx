import { useMemo, useState } from "react";
import { useNavigate } from "react-router"; // 🔹 for navigation
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
  const navigate = useNavigate(); // 🔹 navigation hook
  const [showEnter, setShowEnter] = useState(false); // 🔹 show button after typing

  const getText = (obj: any): string => {
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
          <div className="space-y-6">
            <p className="text-stone-400 font-dos text-base leading-relaxed text-justify whitespace-pre-line">
              <Typewriter
                text={getText(projectsData)}
                speed={10}
                onComplete={() => setShowEnter(true)} // 🔹 show button when done
              />
            </p>

            {/* 🔹 ENTER Button */}
            {showEnter && (
              <div className="flex justify-center -mt-5">
                <button
                  onClick={() => navigate("/projects")}
                  className="
                    btn95 px-4 py-1 text-sm font-dos cursor-pointer bg-pink-400
                    hover:brightness-110 active:translate-y-[1px]
                  "
                >
                  ENTER
                </button>
              </div>
            )}
          </div>
        );

      case "Team":
        return (
          <p className="text-stone-400 font-dos text-base leading-relaxed text-justify whitespace-pre-line">
            <Typewriter text={getText(teamData)} speed={10} />
          </p>
        );

      case "Contact":
        return <ContactForm />;

      case "Privacy Policy":
        return (
          <p className="text-stone-400 font-dos text-base leading-relaxed text-justify whitespace-pre-line">
            <Typewriter text={getText(privacyData)} speed={10} />
          </p>
        );

      default:
        return null;
    }
  }, [active, navigate, showEnter]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <Navbar
        widthClass="max-w-3xl w-full"
        heightClass="h-[60vh]"
        active={active}
        onSelect={(item) => {
          setActive(item as MenuKey);
          setShowEnter(false); // 🔹 reset when switching menu
        }}
      >
        {content}
      </Navbar>
    </div>
  );
}
