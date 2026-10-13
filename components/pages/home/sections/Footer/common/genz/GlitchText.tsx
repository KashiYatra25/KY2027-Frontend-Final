"use client";

import { memo, useState, useEffect } from "react";
import { FOOTER_COLORS } from "@/components/pages/home/sections/Footer/common/constants";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText = memo(function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      // Quick scramble effect
      let iterations = 0;
      const scrambleInterval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (iterations > i) return text[i];
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join("")
        );

        iterations += 1;
        if (iterations > text.length) {
          clearInterval(scrambleInterval);
          setDisplayText(text);
        }
      }, 30);
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, [text]);

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        textShadow: `0 0 30px ${FOOTER_COLORS.NEON_PINK}40`,
      }}
    >
      {displayText}
    </span>
  );
});
