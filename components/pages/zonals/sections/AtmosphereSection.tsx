"use client";

// ═══════════════════════════════════════════════════════════════════
// ATMOSPHERE SECTION
//
// Full-width editorial collage — "YOU HAD TO BE THERE."
// Visual layers (all CSS/SVG, no raster assets required):
//   1. Abstract stage lighting — conic/linear light beams + haze
//   2. Crowd silhouettes — layered SVG skyline of heads/hands
//   3. Flash photography — scattered blown-out highlight dots
//   4. Oversized typography — the headline + drifting accent words
//
// Motion:
//   • framer-motion useScroll/useTransform → RESTRAINED parallax
//     (small translate ranges so it reads as depth, not motion-sickness)
//   • GSAP ScrollTrigger → staggered reveal of the headline lines
//
// Copy is PLACEHOLDER (see zonals.config.ts → ATMOSPHERE_COPY).
// ═══════════════════════════════════════════════════════════════════

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLORS } from "@/components/pages/zonals/constants/palette";
import { ATMOSPHERE_COPY } from "@/components/pages/zonals/config/zonals.config";
import { CrowdSilhouette } from "./CrowdSilhouette";

gsap.registerPlugin(ScrollTrigger);

// Headline is split into words so each can reveal on its own line.
const HEADLINE_WORDS = ATMOSPHERE_COPY.headline.split(" ");

export function AtmosphereSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // ── Restrained parallax: progress through the section (0 → 1) ──────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Small ranges on purpose. Beams drift up, crowd drifts down a touch.
  const beamY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const hazeY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const crowdY = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const wordsY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // ── GSAP: reveal headline lines on enter ───────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".atmo-line", {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".atmo-flash", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: { each: 0.06, from: "random" },
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="zones"
      className="relative w-full scroll-mt-20 overflow-hidden"
      style={{ background: COLORS.DEEP_INK, minHeight: "90vh" }}
    >
      {/* ── Layer 1: Abstract stage lighting ─────────────────────── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%]"
        style={{ y: prefersReducedMotion ? 0 : beamY }}
      >
        {/* Light beams fanning out from above the stage */}
        <div
          className="absolute top-[-10%] left-1/2 h-[120%] w-[12%] -translate-x-[220%] rotate-[18deg] blur-[2px]"
          style={{
            background: `linear-gradient(180deg, ${COLORS.ELECTRIC_VIOLET}66 0%, transparent 85%)`,
          }}
        />
        <div
          className="absolute top-[-10%] left-1/2 h-[120%] w-[10%] -translate-x-[90%] rotate-[6deg] blur-[2px]"
          style={{
            background: `linear-gradient(180deg, ${COLORS.HOT_PINK}66 0%, transparent 85%)`,
          }}
        />
        <div
          className="absolute top-[-10%] left-1/2 h-[120%] w-[10%] translate-x-[-10%] rotate-[-6deg] blur-[2px]"
          style={{
            background: `linear-gradient(180deg, ${COLORS.ACID_LIME}55 0%, transparent 85%)`,
          }}
        />
        <div
          className="absolute top-[-10%] left-1/2 h-[120%] w-[12%] translate-x-[120%] rotate-[-18deg] blur-[2px]"
          style={{
            background: `linear-gradient(180deg, ${COLORS.ELECTRIC_BLUE}66 0%, transparent 85%)`,
          }}
        />
      </motion.div>

      {/* ── Layer 1b: Ambient haze glow ──────────────────────────── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          y: prefersReducedMotion ? 0 : hazeY,
          background: `radial-gradient(60% 50% at 50% 15%, ${COLORS.ELECTRIC_VIOLET}22, transparent 70%)`,
        }}
      />

      {/* ── Layer 3: Flash photography highlights ────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {FLASHES.map((f, i) => (
          <span
            key={i}
            className="atmo-flash absolute rounded-full"
            style={{
              left: f.left,
              top: f.top,
              width: f.size,
              height: f.size,
              background: "#fff",
              boxShadow: `0 0 ${f.glow} ${f.glow} rgba(255,255,255,0.55)`,
              opacity: 0.9,
            }}
          />
        ))}
      </div>

      {/* ── Content: oversized typography ────────────────────────── */}
      <div className="relative z-20 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-4 py-28 2xl:max-w-[1600px]">
        <h2
          className="font-black uppercase"
          style={{ fontSize: "clamp(3rem, 13vw, 11rem)", lineHeight: 0.85 }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                className="atmo-line inline-block"
                style={{
                  color: i === HEADLINE_WORDS.length - 1 ? COLORS.ACID_LIME : COLORS.PAPER_WHITE,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>

        {/* Drifting accent words (restrained parallax) */}
        <motion.ul
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2"
          style={{ y: prefersReducedMotion ? 0 : wordsY }}
        >
          {ATMOSPHERE_COPY.words.map((w, i) => (
            <li
              key={w}
              className="text-sm font-black tracking-[0.3em] uppercase sm:text-base"
              style={{ color: ACCENT_CYCLE[i % ACCENT_CYCLE.length] }}
            >
              {w}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* ── Layer 2: Crowd silhouettes (foreground) ──────────────── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30"
        style={{ y: prefersReducedMotion ? 0 : crowdY }}
      >
        <CrowdSilhouette />
      </motion.div>
    </section>
  );
}

// Accent colors cycled through the drifting words.
const ACCENT_CYCLE = [
  COLORS.HOT_PINK,
  COLORS.ACID_LIME,
  COLORS.ELECTRIC_BLUE,
  COLORS.SIGNAL_ORANGE,
  COLORS.ELECTRIC_VIOLET,
];

// Static scatter of flash highlights (deterministic → no hydration drift).
const FLASHES: { left: string; top: string; size: string; glow: string }[] = [
  { left: "8%", top: "22%", size: "6px", glow: "10px" },
  { left: "18%", top: "38%", size: "4px", glow: "8px" },
  { left: "27%", top: "15%", size: "5px", glow: "9px" },
  { left: "41%", top: "30%", size: "7px", glow: "12px" },
  { left: "55%", top: "20%", size: "4px", glow: "8px" },
  { left: "63%", top: "40%", size: "6px", glow: "10px" },
  { left: "72%", top: "18%", size: "5px", glow: "9px" },
  { left: "83%", top: "34%", size: "7px", glow: "12px" },
  { left: "91%", top: "24%", size: "4px", glow: "8px" },
  { left: "34%", top: "46%", size: "5px", glow: "9px" },
  { left: "48%", top: "52%", size: "4px", glow: "7px" },
  { left: "77%", top: "50%", size: "5px", glow: "9px" },
];
