"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { FOOTER_COLORS } from "@/components/pages/home/sections/Footer/common/constants";

// ═══════════════════════════════════════════════════════════════════
// Pinkish text palette (matches the "PRO NITES" accent in the hero).
// Scoped to this header so the shared FOOTER_COLORS tokens (and the rest
// of the footer) stay on their warm gold/saffron theme.
// ═══════════════════════════════════════════════════════════════════
const PINK = {
  BRIGHT: "#FF4D8D", // vivid hot pink (primary)
  SOFT: "#FF8FB3", // light rose (secondary)
  DEEP: "#E0558A", // magenta/rose (tertiary)
  GLOW: "#FF6FA5", // halo/glow tone
} as const;

export const ConcertBrandHeader = memo(function ConcertBrandHeader() {
  return (
    <div className="relative z-10 mb-12 text-center sm:mb-16">
      {/* Decorative top line */}
      <div className="mb-6 flex items-center justify-center gap-4">
        <div
          className="h-[2px] w-16 sm:w-24"
          style={{
            background: `linear-gradient(90deg, transparent, ${PINK.BRIGHT})`,
          }}
        />
        <span className="text-2xl">⚡</span>
        <div
          className="h-[2px] w-16 sm:w-24"
          style={{
            background: `linear-gradient(90deg, ${PINK.BRIGHT}, transparent)`,
          }}
        />
      </div>

      {/* Main Title - KASHIYATRA with premium styling */}
      <h3
        className="mb-6 text-5xl font-bold tracking-wider sm:text-6xl md:text-8xl"
        style={{
          fontFamily: "var(--font-ethereal), 'Cinzel Decorative', serif",
          color: "#FFFFFF",
          textShadow: `0 0 10px ${PINK.BRIGHT}70, 0 0 30px ${PINK.BRIGHT}50, 0 0 60px ${PINK.DEEP}35`,
          letterSpacing: "0.15em",
        }}
      >
        KASHIYATRA
      </h3>

      {/* Year with neon styling - bigger and bolder */}
      <div className="mb-8 flex items-center justify-center gap-4">
        <div
          className="h-[1px] w-12 sm:w-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${PINK.BRIGHT})`,
          }}
        />
        <span
          className="text-4xl font-black tracking-[0.4em] sm:text-5xl md:text-6xl"
          style={{
            fontFamily: "var(--font-ethereal), 'Cinzel Decorative', serif",
            color: PINK.BRIGHT,
            textShadow: `0 0 20px ${PINK.BRIGHT}90, 0 0 40px ${PINK.GLOW}50, 0 0 80px ${PINK.DEEP}35`,
          }}
        >
          2027
        </span>
        <div
          className="h-[1px] w-12 sm:w-20"
          style={{
            background: `linear-gradient(90deg, ${PINK.BRIGHT}, transparent)`,
          }}
        />
      </div>

      {/* Tagline badges */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        {["4 DAYS", "50+ EVENTS", "PRO NITES", "IIT BHU"].map((tag, i) => (
          <span
            key={tag}
            className="rounded-full px-4 py-1.5 text-xs font-bold tracking-wider sm:text-sm"
            style={{
              background: `${[FOOTER_COLORS.NEON_CYAN, FOOTER_COLORS.NEON_PINK, FOOTER_COLORS.NEON_PURPLE, FOOTER_COLORS.NEON_LIME][i]}15`,
              border: `1px solid ${[FOOTER_COLORS.NEON_CYAN, FOOTER_COLORS.NEON_PINK, FOOTER_COLORS.NEON_PURPLE, FOOTER_COLORS.NEON_LIME][i]}50`,
              color: [
                FOOTER_COLORS.NEON_CYAN,
                FOOTER_COLORS.NEON_PINK,
                FOOTER_COLORS.NEON_PURPLE,
                FOOTER_COLORS.NEON_LIME,
              ][i],
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Subtext - with soul */}
      <div className="mx-auto max-w-2xl space-y-4 px-4">
        {/* Main tagline */}
        <motion.p
          className="text-lg leading-relaxed font-medium sm:text-xl md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span style={{ color: FOOTER_COLORS.TEXT_SECONDARY }}>The </span>
          <span
            className="font-bold"
            style={{
              color: PINK.BRIGHT,
              textShadow: `0 0 20px ${PINK.BRIGHT}55`,
            }}
          >
            biggest cultural fest
          </span>
          <span style={{ color: FOOTER_COLORS.TEXT_SECONDARY }}> of </span>
          <span
            className="font-bold"
            style={{
              color: PINK.SOFT,
              textShadow: `0 0 20px ${PINK.SOFT}55`,
            }}
          >
            IIT (BHU) Varanasi
          </span>
        </motion.p>

        {/* Divider with gradient */}
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div
            className="h-[1px] w-12 sm:w-20"
            style={{
              background: `linear-gradient(90deg, transparent, ${PINK.DEEP})`,
            }}
          />
          <span
            className="text-lg"
            style={{
              color: PINK.DEEP,
              filter: `drop-shadow(0 0 8px ${PINK.DEEP})`,
            }}
          >
            ✦
          </span>
          <div
            className="h-[1px] w-12 sm:w-20"
            style={{
              background: `linear-gradient(90deg, ${PINK.DEEP}, transparent)`,
            }}
          />
        </motion.div>

        {/* Second line with typewriter feel */}
        <motion.p
          className="text-base italic sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ color: FOOTER_COLORS.TEXT_MUTED }}
        >
          Where{" "}
          <span
            className="font-semibold not-italic"
            style={{
              color: PINK.SOFT,
              textShadow: `0 0 20px ${PINK.SOFT}60`,
            }}
          >
            tradition
          </span>{" "}
          meets the{" "}
          <span
            className="font-semibold not-italic"
            style={{
              color: "#FFFFFF",
              textShadow: `0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.4)`,
            }}
          >
            future
          </span>
        </motion.p>

        {/* CTA line */}
        <motion.div
          className="pt-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.span
            className="inline-block text-lg font-bold tracking-wide sm:text-xl md:text-2xl"
            animate={{
              textShadow: [
                `0 0 20px ${PINK.BRIGHT}60`,
                `0 0 40px ${PINK.BRIGHT}85`,
                `0 0 20px ${PINK.BRIGHT}60`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              color: PINK.BRIGHT,
            }}
          >
            Are you ready? 🔥
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
});
