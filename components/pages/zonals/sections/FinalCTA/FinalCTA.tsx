"use client";

// ═══════════════════════════════════════════════════════════════════
// FINAL CTA
//
// Dramatic closing section on a HIGH-CONTRAST acid-lime panel.
//  • Giant headline: "DON'T WATCH THE RECAP. BE THE RECAP."
//  • Supporting line + two chunky CTA buttons
//  • Animated floating stickers + a continuously rotating burst star
//  • GSAP ScrollTrigger reveal for the headline / buttons on enter
//
// Copy + links are PLACEHOLDER (see zonals.config.ts → FINAL_CTA).
// ═══════════════════════════════════════════════════════════════════

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLORS } from "@/components/pages/zonals/constants/palette";
import { FINAL_CTA } from "@/components/pages/zonals/config/zonals.config";
import { FloatingSticker } from "./FloatingSticker";
import { BurstStar } from "./BurstStar";

gsap.registerPlugin(ScrollTrigger);

// Split headline on the period so each sentence stacks on its own line.
const HEADLINE_LINES = FINAL_CTA.headline
  .split(". ")
  .map((l, i, arr) => (i < arr.length - 1 ? `${l}.` : l));

export function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-rise", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-4 py-28 sm:py-36"
      style={{ background: COLORS.ACID_LIME, color: COLORS.DEEP_INK }}
    >
      {/* ── Rotating burst star (decorative) ─────────────────────── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 sm:top-10 sm:right-10"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <BurstStar size={180} fill={COLORS.HOT_PINK} />
      </motion.div>

      {/* ── Floating stickers ────────────────────────────────────── */}
      <FloatingSticker
        className="top-[18%] left-[6%]"
        rotate={-12}
        bg={COLORS.ELECTRIC_VIOLET}
        color={COLORS.PAPER_WHITE}
        delay={0}
        disabled={!!prefersReducedMotion}
      >
        LIVE
      </FloatingSticker>
      <FloatingSticker
        className="right-[10%] bottom-[16%]"
        rotate={9}
        bg={COLORS.ELECTRIC_BLUE}
        color={COLORS.DEEP_INK}
        delay={0.6}
        disabled={!!prefersReducedMotion}
      >
        NO REPLAYS
      </FloatingSticker>
      <FloatingSticker
        className="bottom-[22%] left-[12%]"
        rotate={6}
        bg={COLORS.SIGNAL_ORANGE}
        color={COLORS.DEEP_INK}
        delay={1.1}
        disabled={!!prefersReducedMotion}
      >
        ★
      </FloatingSticker>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative z-20 mx-auto max-w-6xl text-center 2xl:max-w-7xl">
        <h2
          className="cta-rise font-black uppercase"
          style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)", lineHeight: 0.9 }}
        >
          {HEADLINE_LINES.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p
          className="cta-rise mx-auto mt-8 max-w-2xl text-base font-black tracking-[0.2em] uppercase sm:text-xl"
          style={{ color: COLORS.DEEP_INK }}
        >
          {FINAL_CTA.supporting}
        </p>
      </div>
    </section>
  );
}
