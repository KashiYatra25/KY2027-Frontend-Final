"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/components/pages/profile/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// PROFILE PAGE LOADER
// Modern concert/festival vibe loader for Kashi Yatra
// ═══════════════════════════════════════════════════════════════════

export function ProfileLoader() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      {/* Loader Container */}
      <div className="relative flex flex-col items-center">
        {/* Main loader - Concentric rings */}
        <div className="relative h-28 w-28">
          {/* Outer spinning ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: `3px solid transparent`,
              borderTopColor: COLORS.GOLD_SHIMMER,
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
              borderBottomColor: COLORS.WARNING,
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

          {/* Center diamond icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg
              width="24"
              height="36"
              viewBox="0 0 30 45"
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
                <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={COLORS.CREAM} />
                  <stop offset="50%" stopColor={COLORS.GOLD_SHIMMER} />
                  <stop offset="100%" stopColor={COLORS.GOLD} />
                </linearGradient>
              </defs>
              <path
                d="M15 0 L30 20 L15 45 L0 20 Z"
                fill="url(#diamondGrad)"
                style={{
                  filter: `drop-shadow(0 0 8px ${COLORS.GOLD}80)`,
                }}
              />
              <path
                d="M15 5 L25 20 L15 40 L5 20 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="0.5"
              />
            </motion.svg>
          </div>

          {/* Orbiting dots */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full"
              style={{
                background: COLORS.GOLD_SHIMMER,
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
            Loading Profile
          </motion.p>

          {/* Animated progress bar */}
          <div
            className="mx-auto mt-4 h-0.5 w-32 overflow-hidden rounded-full"
            style={{ background: `${COLORS.GOLD}20` }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${COLORS.GOLD}, ${COLORS.GOLD_SHIMMER}, ${COLORS.GOLD})`,
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
