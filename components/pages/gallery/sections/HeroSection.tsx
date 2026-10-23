"use client";

import { motion } from "framer-motion";
import { COLORS, SHADOWS } from "../constants/palette";
import { CameraIllustration } from "./CameraIllustration";

// ═══════════════════════════════════════════════════════════════════
// HERO SECTION - Title with camera illustration
// ═══════════════════════════════════════════════════════════════════

export function HeroSection() {
  return (
    <header className="relative z-10 px-4 pt-24 pb-8 sm:px-6 sm:pt-32 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1200px] 2xl:max-w-[1400px]">
        {/* Eyebrow text with fade in */}
        <motion.p
          className="mb-3 font-mono text-xs tracking-[0.18em] uppercase sm:mb-4"
          style={{ color: COLORS.MARIGOLD }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Last edition
        </motion.p>

        {/* Main title with dramatic reveal */}
        <motion.h1
          className="font-serif text-[clamp(72px,17vw,190px)] leading-[0.92] font-normal tracking-tight"
          style={{
            color: COLORS.PAPER,
            textShadow: SHADOWS.TITLE_TEXT,
            fontFamily: "var(--font-cinzel-decorative), var(--font-cinzel), Georgia, serif",
          }}
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Gallery
        </motion.h1>

        {/* Tagline with slide up */}
        <motion.p
          className="mt-5 max-w-[19ch] font-serif text-[clamp(22px,3.4vw,38px)] leading-[1.2] font-medium text-balance italic sm:mt-6"
          style={{
            color: COLORS.TEXT,
            fontFamily: "var(--font-cormorant), Georgia, serif",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          A collection of Moments to tell the story of{" "}
          <em
            className="not-italic"
            style={{
              color: COLORS.MARIGOLD,
              fontFamily: "var(--font-cinzel-decorative), var(--font-cinzel), Georgia, serif",
            }}
          >
            Kashiyatra
          </em>
        </motion.p>

        {/* Animated camera illustration - positioned top right */}
        <CameraIllustration />
      </div>
    </header>
  );
}
