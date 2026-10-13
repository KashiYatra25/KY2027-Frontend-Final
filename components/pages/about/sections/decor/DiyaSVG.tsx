"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/components/pages/about/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// DIYA SVG - Oil lamp primitive with animated flame
// ═══════════════════════════════════════════════════════════════════

export interface DiyaState {
  id: number;
  x: number;
  y: number;
  isLit: boolean;
  scale: number;
  floatOffset: number;
}

// SVG Diya component
export const DiyaSVG = memo(function DiyaSVG({
  isLit,
  size = 40,
}: {
  isLit: boolean;
  size?: number;
}) {
  return (
    <svg viewBox="0 0 60 50" width={size} height={size * 0.83} className="overflow-visible">
      <defs>
        <filter id="flameGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="diyaBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4A574" />
          <stop offset="50%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>

        <linearGradient id="oilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#B8860B" stopOpacity="0.6" />
        </linearGradient>

        <radialGradient id="flameGradient" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#FFD700" />
          <stop offset="60%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Diya bowl */}
      <ellipse
        cx="30"
        cy="38"
        rx="20"
        ry="8"
        fill="url(#diyaBody)"
        stroke="#8B6914"
        strokeWidth="1"
      />

      {/* Oil surface */}
      <ellipse cx="30" cy="35" rx="16" ry="5" fill="url(#oilGradient)" />

      {/* Wick */}
      <rect x="28" y="28" width="4" height="8" fill="#4A3728" rx="1" />

      {/* Flame (only when lit) */}
      <AnimatePresence>
        {isLit && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Flame glow aura */}
            <ellipse
              cx="30"
              cy="15"
              rx="12"
              ry="15"
              fill={COLORS.BRIGHT_GOLD}
              opacity="0.2"
              filter="url(#flameGlow)"
              className="animate-flameFlicker"
            />

            {/* Main flame */}
            <motion.path
              d="M30,5 Q35,12 33,20 Q31,25 30,28 Q29,25 27,20 Q25,12 30,5"
              fill="url(#flameGradient)"
              filter="url(#flameGlow)"
              animate={{
                d: [
                  "M30,5 Q35,12 33,20 Q31,25 30,28 Q29,25 27,20 Q25,12 30,5",
                  "M30,3 Q36,10 34,18 Q32,24 30,28 Q28,24 26,18 Q24,10 30,3",
                  "M30,6 Q34,13 32,21 Q30,26 30,28 Q30,26 28,21 Q26,13 30,6",
                  "M30,5 Q35,12 33,20 Q31,25 30,28 Q29,25 27,20 Q25,12 30,5",
                ],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Inner flame core */}
            <motion.ellipse
              cx="30"
              cy="18"
              rx="3"
              ry="6"
              fill="#FFFFFF"
              opacity="0.9"
              animate={{
                ry: [6, 5, 7, 6],
                opacity: [0.9, 0.7, 0.9, 0.9],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Decorative base pattern */}
      <path
        d="M15,42 Q20,46 30,46 Q40,46 45,42"
        fill="none"
        stroke="#8B6914"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
});
