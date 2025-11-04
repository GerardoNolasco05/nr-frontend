import { useState } from "react";
import Typewriter from "../components/Typewriter";
import walkerVideo from "../assets/videos/walker.mp4"; 

export default function LandingPage() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {showVideo && (
        <video
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={walkerVideo} type="video/mp4" />
        </video>
      )}

      {!showVideo && (
        <div
          className="text-left cursor-pointer transition-opacity duration-700"
          onClick={() => setShowVideo(true)}
        >
          <h1 className="font-dos text-rose-400 text-xl tracking-wider">
            <Typewriter text="C:\\> noreference" speed={100} />
          </h1>
        </div>
      )}
    </div>
  );
}
