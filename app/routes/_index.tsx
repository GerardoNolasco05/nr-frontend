import backgroundImage from "~/assets/images/dandeleonVirus.png";
import walkerVideo from "~/assets/videos/walker.mp4";
import { useRef, useState } from "react";
import { useDissolve } from "~/lib/useDissolve";

export default function LandingPage() {
  const { dissolve } = useDissolve();
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [showVideo, setShowVideo] = useState(false);
  const [titleVisible, setTitleVisible] = useState(true);
  const dissolveDuration = 1200; // ms

  const handleClick = () => {
    // 1) Run dissolve on the background image layer
    if (bgRef.current) {
      dissolve(bgRef.current, { duration: dissolveDuration });
    }

    // 2) After dissolve ends, reveal the video and enable audio
    setTimeout(() => {
      setShowVideo(true);

      // Unmute & play because we have a user gesture
      requestAnimationFrame(() => {
        if (videoRef.current) {
          // Start muted to allow autoplay, then unmute on click
          videoRef.current.muted = false;
          // Ensure playback starts (some browsers need explicit play())
          videoRef.current.play().catch(() => {
            // If play is blocked for any reason, keep muted = true and try again
            videoRef.current!.muted = true;
            videoRef.current!.play().catch(() => {});
          });
        }
      });
    }, dissolveDuration);

    // 3) Hide the title after 3 seconds from click
    setTimeout(() => {
      setTitleVisible(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image (dissolves) */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden
      />

      {/* Video background (appears after dissolve) */}
      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={walkerVideo}
          // Start muted to allow autoplay; we unmute on click above
          muted
          autoPlay
          playsInline
          aria-hidden
        />
      )}

      {/* Foreground content — same size/position as you had */}
      <button
        onClick={handleClick}
        className={[
          "relative z-10 text-3xl text-black drop-shadow-lg",
          "-mt-10 -ml-[250px]",
          "cursor-pointer select-none focus:outline-none",
          "transition-opacity duration-500",
          titleVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-label="Snap background and reveal video"
      >
        <span className="font-light">no</span>
        <span className="font-bold">reference</span>
      </button>

      {/* Contrast overlay (won’t block clicks) */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" aria-hidden />
    </div>
  );
}
