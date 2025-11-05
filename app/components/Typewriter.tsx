import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;        // ms per character
  showCursor?: boolean;  // show cursor during typing (solid), then blink after
  cursorSpeed?: number;  // ms per blink after finishing
  onComplete?: () => void; // 🔹 new optional callback
}

export default function Typewriter({
  text,
  speed = 20,
  showCursor = true,
  cursorSpeed = 500,
  onComplete, // 🔹 include prop
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [finished, setFinished] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);
  const startedRef = useRef(false);

  // Reset on text change
  useEffect(() => {
    setDisplayed("");
    setFinished(false);
    setCursorOn(true);
    startedRef.current = false;
  }, [text]);

  // Typing effect (Strict Mode safe)
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(id);
        setFinished(true);
        if (onComplete) onComplete(); // 🔹 trigger callback when finished
      }
    }, speed);

    return () => clearInterval(id);
  }, [text, speed, onComplete]);

  // Blink only after finished
  useEffect(() => {
    if (!showCursor || !finished) return;
    const id = setInterval(() => setCursorOn((v) => !v), cursorSpeed);
    return () => clearInterval(id);
  }, [showCursor, cursorSpeed, finished]);

  return (
    <span className="whitespace-pre-line">
      {displayed}
      {showCursor && (
        <span
          aria-hidden="true"
          className="inline-block"
          // Solid underscore while typing; blink after finished
          style={{ opacity: finished ? (cursorOn ? 1 : 0) : 1 }}
        >
          _
        </span>
      )}
    </span>
  );
}
