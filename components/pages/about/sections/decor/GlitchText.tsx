"use client";

import { memo, useState } from "react";
import { motion } from "framer-motion";
import { useAnimationPolicy } from "@/hooks";

// ═══════════════════════════════════════════════════════════════════
// GLITCH TEXT - GenZ funky animated text
// ═══════════════════════════════════════════════════════════════════

const NEON = {
  CYAN: "#00FFFF",
  MAGENTA: "#FF00FF",
  LIME: "#39FF14",
  PINK: "#FF1493",
};

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  color?: "cyan" | "magenta" | "lime" | "pink" | "gradient";
}

export const GlitchText = memo(function GlitchText({
  text,
  className = "",
  as: Tag = "h1",
  color = "gradient",
}: GlitchTextProps) {
  const { shouldAnimate } = useAnimationPolicy();
  const [isHovered, setIsHovered] = useState(false);

  const colorStyles = {
    cyan: { color: NEON.CYAN, textShadow: `0 0 10px ${NEON.CYAN}, 0 0 20px ${NEON.CYAN}50` },
    magenta: {
      color: NEON.MAGENTA,
      textShadow: `0 0 10px ${NEON.MAGENTA}, 0 0 20px ${NEON.MAGENTA}50`,
    },
    lime: { color: NEON.LIME, textShadow: `0 0 10px ${NEON.LIME}, 0 0 20px ${NEON.LIME}50` },
    pink: { color: NEON.PINK, textShadow: `0 0 10px ${NEON.PINK}, 0 0 20px ${NEON.PINK}50` },
    gradient: {
      background: `linear-gradient(90deg, ${NEON.CYAN}, ${NEON.MAGENTA}, ${NEON.LIME})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
  };

  // Skip glitch effect if animations should be reduced
  const showGlitch = isHovered && !shouldAnimate;

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main text */}
      <Tag className="relative z-10 font-black tracking-wider uppercase" style={colorStyles[color]}>
        {text}
      </Tag>

      {/* Glitch layers - only on hover and if motion allowed */}
      {showGlitch && (
        <>
          {/* Cyan offset layer */}
          <motion.span
            className="pointer-events-none absolute inset-0 font-black tracking-wider uppercase"
            style={{
              color: NEON.CYAN,
              opacity: 0.8,
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
            }}
            animate={{
              x: [-2, 2, -1, 2, 0],
              opacity: [0.8, 0.6, 0.9, 0.7, 0.8],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            aria-hidden
          >
            {text}
          </motion.span>

          {/* Magenta offset layer */}
          <motion.span
            className="pointer-events-none absolute inset-0 font-black tracking-wider uppercase"
            style={{
              color: NEON.MAGENTA,
              opacity: 0.8,
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
            }}
            animate={{
              x: [2, -2, 1, -2, 0],
              opacity: [0.8, 0.7, 0.6, 0.9, 0.8],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            aria-hidden
          >
            {text}
          </motion.span>
        </>
      )}

      {/* Glitch line */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute right-0 left-0 h-[2px]"
          style={{
            background: NEON.CYAN,
            boxShadow: `0 0 10px ${NEON.CYAN}`,
          }}
          animate={{
            top: ["0%", "100%", "50%", "0%"],
            opacity: [1, 0.5, 1, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
        />
      )}
    </motion.div>
  );
});
