"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAnimationPolicy } from "@/hooks";
import { MotionZone, useMotionZone } from "@/lib/motion";
import { FOOTER_COLORS, FOOTER_GRADIENTS } from "./common/constants";
import { BackgroundDecor, AmbientGlow } from "./common/BackgroundDecorNew";
import {
  ConcertBrandHeader,
  GlassmorphismCard,
  NeonSocialButton,
  FloatingStickers,
} from "./common/GenZComponents";
import { socialLinks, quickLinks } from "./common/data";
import { IMAGES } from "@/lib/images";

// Pinkish heading tone (matches the brand header + "PRO NITES" accent).
const PINK_HEADING = "#FF4D8D";

// ═══════════════════════════════════════════════════════════════════
// MAIN FOOTER SECTION
// ═══════════════════════════════════════════════════════════════════
export function FooterSection() {
  const footerRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useAnimationPolicy();

  return (
    <MotionZone threshold={0.05} rootMargin="100px">
      {/* Outer wrapper with solid background to prevent sticky section bleed-through */}
      <div
        className="relative"
        style={{
          backgroundColor: "#030308",
          // Ensure this creates a proper stacking context and covers sticky elements
          isolation: "isolate",
        }}
      >
        <footer
          id="footer"
          ref={footerRef}
          data-section="footer"
          className="relative overflow-hidden pt-20 pb-10 sm:pt-28 sm:pb-12"
          style={{
            background: FOOTER_GRADIENTS.BG_MAIN,
          }}
        >
          {/* ═══ Background Effects ═══ */}
          <BackgroundDecor />

          {/* ═══ Main Content ═══ */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6">
            {/* Brand Header */}
            <ConcertBrandHeader />

            {/* Cards Grid */}
            <div className="relative mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 2xl:max-w-5xl">
              {/* Mobile Dancer - Absolutely positioned beside Explore/Connect */}
              <div className="pointer-events-none absolute top-0 right-0 z-20 h-[400px] w-[180px] sm:hidden">
                {/* Glow behind dancer */}
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background: `radial-gradient(ellipse at center, ${FOOTER_COLORS.NEON_PINK}60 0%, ${FOOTER_COLORS.NEON_PURPLE}40 30%, transparent 60%)`,
                  }}
                />
                {/* Dancer image */}
                <Image
                  src={IMAGES.footer.footerDancer}
                  alt=""
                  fill
                  className="object-contain object-center"
                  style={{
                    filter: `drop-shadow(0 0 20px ${FOOTER_COLORS.NEON_PINK}50)`,
                  }}
                />
              </div>

              {/* Explore Card */}
              <GlassmorphismCard accentColor={FOOTER_COLORS.NEON_CYAN}>
                <h4
                  className="mb-4 text-lg font-bold tracking-wider"
                  style={{ color: PINK_HEADING }}
                >
                  EXPLORE
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        className="flex items-center gap-2 text-sm transition-colors"
                        style={{ color: FOOTER_COLORS.TEXT_SECONDARY }}
                        whileHover={{
                          x: 5,
                          color: FOOTER_COLORS.NEON_CYAN,
                        }}
                      >
                        <span className="text-base">{link.icon}</span>
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </GlassmorphismCard>

              {/* Connect Card */}
              <GlassmorphismCard accentColor={FOOTER_COLORS.NEON_PINK}>
                <h4
                  className="mb-4 text-lg font-bold tracking-wider"
                  style={{ color: PINK_HEADING }}
                >
                  CONNECT
                </h4>
                <ul className="space-y-3 text-sm" style={{ color: FOOTER_COLORS.TEXT_SECONDARY }}>
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <a
                      href="mailto:contact@kashiyatra.in"
                      className="transition-colors hover:underline"
                      style={{ color: FOOTER_COLORS.TEXT_SECONDARY }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = FOOTER_COLORS.NEON_PINK)}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = FOOTER_COLORS.TEXT_SECONDARY)
                      }
                    >
                      contact@kashiyatra.in
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>IIT BHU, Varanasi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>January 14-17, 2027</span>
                  </li>
                </ul>
              </GlassmorphismCard>

              {/* Follow Card */}
              <GlassmorphismCard accentColor={FOOTER_COLORS.NEON_PURPLE}>
                <h4
                  className="mb-4 text-lg font-bold tracking-wider"
                  style={{ color: FOOTER_COLORS.NEON_PURPLE }}
                >
                  FOLLOW
                </h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <NeonSocialButton
                      key={link.name}
                      href={link.href}
                      icon={link.icon}
                      color={link.color}
                      label={link.name}
                    />
                  ))}
                </div>
              </GlassmorphismCard>
            </div>

            {/* Neon Divider */}
            <div
              className="mx-auto h-[2px] max-w-2xl"
              style={{
                background: `linear-gradient(90deg, 
                transparent 0%, 
                ${FOOTER_COLORS.NEON_CYAN}60 25%, 
                ${FOOTER_COLORS.NEON_PINK}80 50%, 
                ${FOOTER_COLORS.NEON_PURPLE}60 75%, 
                transparent 100%
              )`,
              }}
            />
          </div>

          {/* ═══ Ambient Glows ═══ */}
          <AmbientGlow />
        </footer>
      </div>
    </MotionZone>
  );
}
