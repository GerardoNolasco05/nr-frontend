import backgroundImage from "~/assets/images/dandeleonVirus.png";
import { useRef } from "react";
import { useDissolve } from "~/lib/useDissolve";

export default function LandingPage() {
  const { dissolve } = useDissolve();
  const bgRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (bgRef.current) {
      dissolve(bgRef.current, { duration: 1200 });
    }
  };

  return (
    <div
      ref={bgRef}
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <button
        onClick={handleClick}
        className="text-3xl text-black drop-shadow-lg -mt-10 -ml-[250px] cursor-pointer select-none focus:outline-none"
        aria-label="Snap background"
      >
        <span className="font-light">no</span>
        <span className="font-bold">reference</span>
      </button>
    </div>
  );
}
