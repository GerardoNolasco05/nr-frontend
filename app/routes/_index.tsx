import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router"; // ✅ for navigation
import Typewriter from "../components/Typewriter";
import walkerVideo from "../assets/videos/walker.mp4";

export default function LandingPage() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  // Play + unmute when user clicks
  useEffect(() => {
    if (showVideo && videoRef.current) {
      const video = videoRef.current;
      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay with sound blocked:", err);
        });
      }
      // ✅ When video ends → go to /home
      const handleEnd = () => navigate("/home");
      video.addEventListener("ended", handleEnd);
      return () => video.removeEventListener("ended", handleEnd);
    }
  }, [showVideo, navigate]);

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Background video */}
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={walkerVideo} type="video/mp4" />
        </video>
      )}

      {/* Text */}
      {!showVideo && (
        <div
          className="text-left cursor-pointer transition-opacity duration-700"
          onClick={() => setShowVideo(true)}
        >
          <h1 className="font-dos text-green-400 text-xl tracking-wider">
            <Typewriter text="C:\\> noreference" speed={100} />
          </h1>
        </div>
      )}
    </div>
  );
}
