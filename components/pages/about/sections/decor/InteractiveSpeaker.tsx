"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimationPolicy } from "@/hooks";

// ═══════════════════════════════════════════════════════════════════
// INTERACTIVE SPEAKER - Concert speaker SVG that pulses
// ═══════════════════════════════════════════════════════════════════

// Neon colors matching CTA section
const NEON = {
  CYAN: "#00FFFF",
  MAGENTA: "#FF00FF",
  LIME: "#39FF14",
};

interface InteractiveSpeakerProps {
  size?: number;
  className?: string;
  side?: "left" | "right";
}

export const InteractiveSpeaker = memo(function InteractiveSpeaker({
  size = 120,
  className = "",
  side = "left",
}: InteractiveSpeakerProps) {
  const { shouldAnimate } = useAnimationPolicy();
  const [isActive, setIsActive] = useState(false);
  const [isPulsing, setIsPulsing] = useState(!shouldAnimate);

  const flip = side === "right" ? -1 : 1;
  // Use different accent colors for left/right speakers
  const accentColor = side === "left" ? NEON.CYAN : NEON.MAGENTA;

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      style={{
        width: size,
        height: size * 1.4,
        transform: `scaleX(${flip})`,
        filter: `drop-shadow(0 0 20px ${accentColor}30)`,
      }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => setIsPulsing(!isPulsing)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Ambient neon glow behind speaker */}
      <div
        className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at center, ${accentColor}20 0%, transparent 70%)`,
          filter: "blur(20px)",
          transform: "scale(1.3)",
          opacity: isActive ? 1 : 0.3,
        }}
      />

      {/* Sound waves when active */}
      <AnimatePresence>
        {isActive && isPulsing && (
          <>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="pointer-events-none absolute rounded-full"
                style={{
                  left: "50%",
                  top: "35%",
                  width: 20 + i * 30,
                  height: 20 + i * 30,
                  marginLeft: -(10 + i * 15),
                  marginTop: -(10 + i * 15),
                  border: `2px solid ${accentColor}`,
                  boxShadow: `0 0 15px ${accentColor}80`,
                }}
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <svg
        viewBox="0 0 80 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-full w-full"
      >
        <defs>
          <linearGradient id={`speakerBody-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="50%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>

          <filter id={`speakerGlow-${side}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`neonGlow-${side}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id={`coneGradient-${side}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#444" />
            <stop offset="70%" stopColor="#222" />
            <stop offset="100%" stopColor="#111" />
          </radialGradient>

          <radialGradient id={`coneGradientActive-${side}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={`${accentColor}40`} />
            <stop offset="70%" stopColor="#222" />
            <stop offset="100%" stopColor="#111" />
          </radialGradient>
        </defs>

        {/* Speaker cabinet */}
        <rect
          x="5"
          y="5"
          width="70"
          height="102"
          rx="6"
          fill={`url(#speakerBody-${side})`}
          stroke={isActive ? accentColor : "#444"}
          strokeWidth="2"
          filter={isActive ? `url(#neonGlow-${side})` : undefined}
        />

        {/* Cabinet inner border */}
        <rect
          x="8"
          y="8"
          width="64"
          height="96"
          rx="4"
          fill="none"
          stroke={isActive ? `${accentColor}50` : "#333"}
          strokeWidth="1"
        />

        {/* Top tweeter */}
        <motion.g
          animate={
            isPulsing
              ? {
                  scale: [1, 1.05, 1],
                }
              : {}
          }
          transition={{ duration: 0.2, repeat: Infinity }}
          style={{ transformOrigin: "40px 28px" }}
        >
          <circle
            cx="40"
            cy="28"
            r="12"
            fill={isActive ? `url(#coneGradientActive-${side})` : `url(#coneGradient-${side})`}
            stroke={isActive ? accentColor : "#555"}
            strokeWidth="2"
            filter={isActive ? `url(#neonGlow-${side})` : undefined}
          />
          <circle
            cx="40"
            cy="28"
            r="6"
            fill="#222"
            stroke={isActive ? `${accentColor}60` : "#444"}
            strokeWidth="1"
          />
          <circle cx="40" cy="28" r="2" fill={isActive ? accentColor : "#555"} />
        </motion.g>

        {/* Main woofer */}
        <motion.g
          animate={
            isPulsing
              ? {
                  scale: [1, 1.08, 1],
                }
              : {}
          }
          transition={{ duration: 0.15, repeat: Infinity }}
          style={{ transformOrigin: "40px 65px" }}
        >
          <circle
            cx="40"
            cy="65"
            r="22"
            fill={isActive ? `url(#coneGradientActive-${side})` : `url(#coneGradient-${side})`}
            stroke={isActive ? accentColor : "#555"}
            strokeWidth="2"
            filter={isActive ? `url(#neonGlow-${side})` : undefined}
          />
          {/* Cone rings */}
          <circle
            cx="40"
            cy="65"
            r="16"
            fill="none"
            stroke={isActive ? `${accentColor}40` : "#333"}
            strokeWidth="1"
          />
          <circle
            cx="40"
            cy="65"
            r="10"
            fill="none"
            stroke={isActive ? `${accentColor}40` : "#333"}
            strokeWidth="1"
          />
          <circle
            cx="40"
            cy="65"
            r="5"
            fill="#222"
            stroke={isActive ? `${accentColor}60` : "#444"}
            strokeWidth="1"
          />
          <circle cx="40" cy="65" r="2" fill={isActive ? accentColor : "#555"} />
        </motion.g>

        {/* Bottom port */}
        <rect
          x="25"
          y="92"
          width="30"
          height="8"
          rx="2"
          fill="#111"
          stroke={isActive ? accentColor : "#333"}
          strokeWidth="1"
          filter={isActive ? `url(#neonGlow-${side})` : undefined}
        />

        {/* LED indicator */}
        <motion.circle
          cx="15"
          cy="100"
          r="3"
          fill={isPulsing ? NEON.LIME : "#333"}
          animate={
            isPulsing
              ? {
                  opacity: [1, 0.5, 1],
                }
              : {}
          }
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{
            filter: isPulsing ? `drop-shadow(0 0 8px ${NEON.LIME})` : undefined,
          }}
        />

        {/* Brand text */}
        <text
          x="40"
          y="12"
          textAnchor="middle"
          fill={isActive ? accentColor : "#666"}
          fontSize="5"
          fontWeight="bold"
          style={{ filter: isActive ? `drop-shadow(0 0 4px ${accentColor})` : undefined }}
        >
          KY
        </text>
      </svg>

      {/* Hover tooltip */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        style={{
          color: accentColor,
          transform: `scaleX(${flip}) translateX(-50%)`,
          textShadow: `0 0 10px ${accentColor}`,
        }}
      >
        {isPulsing ? "◉ LIVE" : "Click to play"}
      </motion.div>
    </motion.div>
  );
});
