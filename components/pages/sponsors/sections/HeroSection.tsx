"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Anton } from "next/font/google";
import { PALETTE, GRADIENTS, SHADOWS } from "@/components/pages/sponsors/constants/palette";
import { Starburst } from "./decor";

// Bold display font
const displayFont = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sponsor-display",
  display: "swap",
});

// ═══════════════════════════════════════════════════════════════════
// HERO SECTION - BOLD POSTER STYLE
// Clean, minimal, impactful typography
// ═══════════════════════════════════════════════════════════════════

export const HeroSection = memo(function HeroSection() {
  return (
    <section
      className={`relative min-h-screen overflow-hidden ${displayFont.variable}`}
      style={{ background: PALETTE.DEEP_INK }}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${PALETTE.ELECTRIC_VIOLET}15 0%, transparent 60%)`,
        }}
      />

      {/* Grid pattern - subtle */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${PALETTE.TEXT_PRIMARY} 1px, transparent 1px),
                            linear-gradient(90deg, ${PALETTE.TEXT_PRIMARY} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative starbursts */}
      <div className="pointer-events-none absolute top-[15%] left-[5%] opacity-20">
        <Starburst size={120} color={PALETTE.ACID_LIME} />
      </div>
      <div className="pointer-events-none absolute top-[20%] right-[8%] opacity-15">
        <Starburst size={80} color={PALETTE.HOT_PINK} />
      </div>
      <div className="pointer-events-none absolute bottom-[20%] left-[10%] opacity-10">
        <Starburst size={60} color={PALETTE.NEON_CYAN} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20">
        {/* Pre-headline badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span
            className="inline-block rounded-full border-2 px-6 py-2 text-xs font-bold tracking-[0.3em] uppercase"
            style={{
              borderColor: PALETTE.ACID_LIME,
              color: PALETTE.ACID_LIME,
              boxShadow: SHADOWS.LIME_GLOW,
            }}
          >
            Partner with Kashiyatra 2027
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-center"
        >
          <span
            className="block text-5xl leading-[0.9] font-black tracking-tight uppercase sm:text-7xl md:text-8xl lg:text-9xl"
            style={{
              fontFamily: "var(--font-sponsor-display), var(--font-cinzel-decorative), sans-serif",
              background: GRADIENTS.TITLE,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientShift 4s linear infinite",
            }}
          >
            YOUR BRAND
          </span>
          <span
            className="mt-2 block text-4xl leading-[0.9] font-black tracking-tight uppercase sm:text-6xl md:text-7xl lg:text-8xl"
            style={{
              fontFamily: "var(--font-sponsor-display), var(--font-cinzel-decorative), sans-serif",
              color: PALETTE.TEXT_PRIMARY,
            }}
          >
            OUR STAGE
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 max-w-xl text-center text-lg sm:text-xl"
          style={{ color: PALETTE.TEXT_SECONDARY }}
        >
          Connect with <span style={{ color: PALETTE.ACID_LIME }}>90,000+ students</span> across 4
          days of music, art, and performance at IIT BHU&apos;s biggest cultural festival.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col gap-4 sm:flex-row sm:gap-6"
        >
          <a
            href="#collaboration-cta"
            className="group relative overflow-hidden rounded-full px-8 py-4 text-center font-bold tracking-wider uppercase transition-transform hover:scale-105"
            style={{
              background: GRADIENTS.CTA_PRIMARY,
              color: PALETTE.TEXT_PRIMARY,
              boxShadow: SHADOWS.PINK_GLOW,
            }}
          >
            Partner With Us
          </a>

          <Link
            href="/contact"
            className="rounded-full border-2 px-8 py-4 text-center font-bold tracking-wider uppercase transition-all hover:scale-105"
            style={{
              borderColor: PALETTE.NEON_CYAN,
              color: PALETTE.NEON_CYAN,
            }}
          >
            Get in Touch
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div
            className="animate-float flex flex-col items-center gap-2"
            style={{ color: PALETTE.TEXT_MUTED }}
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute inset-x-0 bottom-0 h-1"
        style={{
          background: GRADIENTS.TITLE,
          backgroundSize: "200% auto",
          animation: "gradientShift 4s linear infinite",
        }}
      />
    </section>
  );
});
