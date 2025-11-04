import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;      // ms per character
  showCursor?: boolean;
}

export default function Typewriter({
  text,
  speed = 100,
  showCursor = true,
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const startedRef = useRef(false); // prevents double start in Strict Mode

  // Reset when text changes
  useEffect(() => {
    setIndex(0);
    startedRef.current = false;
  }, [text]);

  // Typing loop (Strict Mode safe)
  useEffect(() => {
    if (index >= text.length) return;

    // only start once per mount
    if (!startedRef.current) startedRef.current = true;

    const id = setTimeout(() => setIndex((i) => i + 1), speed);
    return () => clearTimeout(id);
  }, [index, text, speed]);

  return (
    <span className="whitespace-pre">
      {text.slice(0, index)}
      {showCursor && <span className="animate-blink">_</span>}
    </span>
  );
}
