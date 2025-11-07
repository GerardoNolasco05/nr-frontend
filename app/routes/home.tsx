import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Typewriter from "../components/Typewriter";
import ContactForm from "../components/ContactForm";

import aboutData from "../locales/about.json";
import projectsData from "../locales/projects.json";
import teamData from "../locales/team.json";
import privacyData from "../locales/privacy.json";
import RetroActantCard from "../components/RetroActantCard";
import { personImageMap } from "../components/personImageMap";
import RetroInstallOverlay from "../components/RetroInstallOverlay";
import RetroLoader from "../components/RetroLoader";

// ✅ project images
import pe_ from "../assets/images/pe_h.png";
import jny_h from "../assets/images/jny_h.png";
import best_h from "../assets/images/best_h.png";
import taf_h from "../assets/images/taf_h.png";

// ✅ project PDFs
import pdfPosteden from "../assets/pdf/posteden.pdf";
import pdfJny from "../assets/pdf/jny.pdf";
import pdfBest from "../assets/pdf/bestiarium.pdf";
import pdfTaf from "../assets/pdf/taf.pdf";

type MenuKey = "About" | "Projects" | "Team" | "Contact" | "Privacy Policy";

// Helper to hide PDF UI and show only pages
const pdfOnlyPages = (src: string) =>
  `${src}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=FitH`;

export default function Home() {
  const [active, setActive] = useState<MenuKey>("About");
  const navigate = useNavigate();
  const [showTeam, setShowTeam] = useState(false);

  const [projectView, setProjectView] = useState<number | null>(null); // which image
  const [showOverlay, setShowOverlay] = useState(false);               // blue box visible?
  const [isLoading, setIsLoading] = useState(false);                   // showing loader?
  const [progress, setProgress] = useState(0);                         // 0..100
  const [pdfSrc, setPdfSrc] = useState<string | null>(null);           // show PDF when set

  // show overlay 1s after choosing a project image
  useEffect(() => {
    setShowOverlay(false);
    setIsLoading(false);
    setProgress(0);
    setPdfSrc(null);
    if (projectView !== null) {
      const t = setTimeout(() => setShowOverlay(true), 1000);
      return () => clearTimeout(t);
    }
  }, [projectView]);

  // start loader → animate to 100 → then show PDF
  const startInstall = () => {
    setShowOverlay(false);
    setIsLoading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        const step = 5 + Math.random() * 7; // uneven retro speed
        const next = Math.min(100, p + step);
        if (next >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          // select correct PDF
          const pdfs = [pdfPosteden, pdfJny, pdfBest, pdfTaf];
          if (projectView !== null) setPdfSrc(pdfs[projectView]);
        }
        return next;
      });
    }, 200); // loading time
  };

  const getText = (obj: any): string =>
    obj?.en?.intro ?? obj?.en?.text ?? (typeof obj?.en === "string" ? obj.en : "");

  const content = useMemo(() => {
    switch (active) {
      case "About":
        return (
          <p className="text-stone-400 font-dos text-base leading-relaxed text-justify whitespace-pre-line">
            <Typewriter text={getText(aboutData)} speed={10} />
          </p>
        );

      case "Projects": {
        const imgs = [pe_, jny_h, best_h, taf_h];
        const middleTitles = [
          "POSTEDEN",
          "Jun Nal Ye and his Journey to the Underworld",
          "Bestiarium",
          "That`s all Folks!",
        ];
        const paths = [
          "C:\\ NR\\Posteden",
          "C:\\ NR\\Jun Nal Ye",
          "C:\\ NR\\Bestiarium",
          "C:\\ NR\\That`s all folks!",
        ];

        // If PDF is loaded, show PDF (only pages, no UI) — scrollbar visually hidden
        if (pdfSrc) {
          return (
            <div className="w-full">
              <div
                className="
                  relative w-full
                  h-[56vh]              /* 👈 taller: try 70–80vh */
                  mb-2                  /* leaves room above navbar bottom strip */
                  bg-black
                  overflow-hidden       /* hides visible scrollbar area */
                "
              >
                {/* Push the iframe's vertical scrollbar out of view but keep wheel scroll */}
                <iframe
                  src={pdfOnlyPages(pdfSrc)}
                  title="Document"
                  className="h-full w-[calc(100%+18px)] -mr-[18px]"
                />
              </div>
            </div>
          );
        }

        // Otherwise show image background + optional overlay/loader
        if (projectView !== null) {
          const src = imgs[projectView];
          const middle = middleTitles[projectView];
          const path = paths[projectView];

          return (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={src}
                alt={`Project ${projectView + 1}`}
                className="w-full h-full object-contain select-none"
              />

              {showOverlay && !isLoading && (
                <RetroInstallOverlay middleTitle={middle} onClick={startInstall} />
              )}

              {isLoading && <RetroLoader percent={progress} pathText={path} />}
            </div>
          );
        }

        // default: description text
        return (
          <p className="text-stone-400 font-dos text-base leading-relaxed text-justify whitespace-pre-line">
            <Typewriter text={getText(projectsData)} speed={10} />
          </p>
        );
      }

      case "Team": {
        const intro = (teamData as any)?.en?.panelIntro ?? getText(teamData);
        const actants = (teamData as any)?.en?.actants ?? [];
        return (
          <div className="space-y-4">
            <p className="text-stone-400 font-dos text-base leading-relaxed text-justify whitespace-pre-line">
              <Typewriter text={intro} speed={10} onComplete={() => setShowTeam(true)} />
            </p>
            {showTeam && (
              <>
                <div className="mt-2 mb-1">
                  <span className="font-dos text-stone-200">Actants:</span>
                </div>
                <div className="space-y-3">
                  {actants.map((a: any) => (
                    <RetroActantCard
                      key={a.id}
                      img={personImageMap[a.imageKey]}
                      name={a.name}
                      role={a.role}
                      description={a.description}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        );
      }

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
  }, [active, navigate, showTeam, projectView, showOverlay, isLoading, progress, pdfSrc]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <Navbar
        active={active}
        showTools={active === "Projects"}
        onToolPress={(i) => setProjectView(i)}           // pick project
        onSelect={(item) => {
          setActive(item as MenuKey);
          // reset all project states
          setProjectView(null);
          setShowOverlay(false);
          setIsLoading(false);
          setProgress(0);
          setPdfSrc(null);
          setShowTeam(false);
        }}
      >
        {content}
      </Navbar>
    </div>
  );
}
