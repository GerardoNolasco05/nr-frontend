import aboutData from "../locales/about.json";
import Typewriter from "../components/Typewriter";

export default function Home() {
  const text = aboutData.en.intro;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <p className="text-white font-dos text-base leading-relaxed max-w-3xl text-justify">
        <Typewriter text={text} speed={10} />
      </p>
    </div>
  );
}
