"use client";

import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// COMPLETE PROFILE PAGE LOADER
// Step-based verification loader for Kashi Yatra
// ═══════════════════════════════════════════════════════════════════

const COLORS = {
  BG_DEEP: "#0a0612",
  BG_ROYAL: "#1a0a20",
  GOLD: "#d4a853",
  GOLD_LIGHT: "#FFD700",
  AMBER: "#FFA500",
  CREAM: "#fdf6e3",
};

export function CompleteProfileLoader() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      {/* Loader Container */}
      <div className="relative flex flex-col items-center">
        {/* Main loader - Stepper style rings */}
        <div className="relative h-28 w-28">
          {/* Outer spinning ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: `3px solid transparent`,
              borderTopColor: COLORS.GOLD_LIGHT,
              borderRightColor: COLORS.GOLD,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Middle ring - counter rotate */}
          <motion.div
            className="absolute inset-3 rounded-full"
            style={{
              border: `2px solid transparent`,
              borderBottomColor: COLORS.AMBER,
              borderLeftColor: COLORS.GOLD,
            }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner pulsing circle */}
          <motion.div
            className="absolute inset-6 rounded-full"
            style={{
              background: `radial-gradient(circle, ${COLORS.GOLD}30 0%, transparent 70%)`,
              boxShadow: `0 0 20px ${COLORS.GOLD}40`,
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Center checkmark icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <defs>
                <linearGradient id="checkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={COLORS.CREAM} />
                  <stop offset="50%" stopColor={COLORS.GOLD_LIGHT} />
                  <stop offset="100%" stopColor={COLORS.GOLD} />
                </linearGradient>
              </defs>
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="url(#checkGrad)"
                strokeWidth="2"
                fill="none"
                style={{
                  filter: `drop-shadow(0 0 6px ${COLORS.GOLD}60)`,
                }}
              />
              <motion.path
                d="M8 12l2.5 2.5L16 9"
                stroke="url(#checkGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.svg>
          </div>

          {/* Orbiting dots */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full"
              style={{
                background: COLORS.GOLD_LIGHT,
                boxShadow: `0 0 8px ${COLORS.GOLD}`,
                top: "50%",
                left: "50%",
                marginTop: -4,
                marginLeft: -4,
              }}
              animate={{
                x: [
                  Math.cos((i * Math.PI) / 2) * 48,
                  Math.cos((i * Math.PI) / 2 + Math.PI * 2) * 48,
                ],
                y: [
                  Math.sin((i * Math.PI) / 2) * 48,
                  Math.sin((i * Math.PI) / 2 + Math.PI * 2) * 48,
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.15,
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <div className="mt-10 text-center">
          <motion.p
            className="text-base font-light tracking-[0.2em] uppercase"
            style={{
              color: COLORS.CREAM,
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading Steps
          </motion.p>

          {/* Animated progress bar */}
          <div
            className="mx-auto mt-4 h-0.5 w-32 overflow-hidden rounded-full"
            style={{ background: `${COLORS.GOLD}20` }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${COLORS.GOLD}, ${COLORS.GOLD_LIGHT}, ${COLORS.GOLD})`,
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
