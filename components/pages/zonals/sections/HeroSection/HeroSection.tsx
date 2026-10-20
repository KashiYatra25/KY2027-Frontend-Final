"use client";

// ═══════════════════════════════════════════════════════════════════
// ZONALS — HERO SECTION
//
// Full-screen immersive, poster-style hero. Oversized display type,
// asymmetric layered composition, neon-on-ink palette, framer-motion
// staggered entrance + floating decor + rotating starbursts + a
// pointer-responsive parallax on desktop.
// ═══════════════════════════════════════════════════════════════════

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Anton } from "next/font/google";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

import { COLORS, GRADIENTS, SHADOWS } from "@/components/pages/zonals/constants/palette";

// Motion-enabled Next Link so CTAs can client-navigate with animation.
const MotionLink = motion.create(Link);

// Massive condensed display face (Anton / Bebas-Neue style) scoped to
// this section via a CSS variable.
const displayFont = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-zonals-display",
  display: "swap",
});

// ───────────────────────────────────────────────────────────────────
// Animation variants
// ───────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

const headlineVariants: Variants = {
  hidden: { opacity: 0, y: 80, skewY: 6 },
  show: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { type: "spring", stiffness: 90, damping: 16 },
  },
};

const stickerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: 0 },
  show: (rotate: number) => ({
    opacity: 1,
    scale: 1,
    rotate,
    transition: { type: "spring", stiffness: 160, damping: 14, delay: 0.6 },
  }),
};

// ───────────────────────────────────────────────────────────────────
// Decorative sub-components
// ───────────────────────────────────────────────────────────────────

/** Rotating many-pointed starburst (pure SVG). */
function Starburst({
  size,
  color,
  points = 12,
  duration = 24,
  reverse = false,
}: {
  size: number;
  color: string;
  points?: number;
  duration?: number;
  reverse?: boolean;
}) {
  const outer = size / 2;
  const inner = outer * 0.52;
  const cx = outer;
  const cy = outer;
  const coords: string[] = [];
  const step = Math.PI / points;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = i * step - Math.PI / 2;
    coords.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
      style={{ display: "block" }}
    >
      <polygon points={coords.join(" ")} fill={color} />
    </motion.svg>
  );
}

/** Animated sound-wave visualizer bars (pure SVG). */
function SoundWave({
  bars = 28,
  color,
  width = 320,
  height = 72,
}: {
  bars?: number;
  color: string;
  width?: number;
  height?: number;
}) {
  const reduce = useReducedMotion();
  const barWidth = width / (bars * 1.8);
  const gap = (width - bars * barWidth) / (bars - 1);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {Array.from({ length: bars }).map((_, i) => {
        const x = i * (barWidth + gap);
        const base = 6 + (Math.sin(i * 1.3) * 0.5 + 0.5) * (height - 10);
        return (
          <motion.rect
            key={i}
            x={x}
            width={barWidth}
            rx={barWidth / 2}
            fill={color}
            initial={{ height: base, y: (height - base) / 2 }}
            animate={
              reduce
                ? { height: base, y: (height - base) / 2 }
                : {
                    height: [base * 0.3, base, base * 0.5, base * 0.9, base * 0.3],
                    y: [
                      (height - base * 0.3) / 2,
                      (height - base) / 2,
                      (height - base * 0.5) / 2,
                      (height - base * 0.9) / 2,
                      (height - base * 0.3) / 2,
                    ],
                  }
            }
            transition={{
              duration: 1.1 + (i % 5) * 0.18,
              ease: "easeInOut",
              repeat: Infinity,
              delay: i * 0.04,
            }}
          />
        );
      })}
    </svg>
  );
}

/** Floating sticker chip. */
function Sticker({
  label,
  bg,
  fg,
  rotate,
  className,
  float = 0,
}: {
  label: string;
  bg: string;
  fg: string;
  rotate: number;
  className?: string;
  float?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      custom={rotate}
      variants={stickerVariants}
      className={`pointer-events-none absolute select-none ${className ?? ""}`}
    >
      <motion.span
        className="inline-block rounded-full border-2 px-3 py-1.5 text-[10px] font-black tracking-[0.18em] whitespace-nowrap uppercase sm:text-xs"
        style={{
          background: bg,
          color: fg,
          borderColor: COLORS.DEEP_INK,
          boxShadow: `3px 3px 0 ${COLORS.DEEP_INK}`,
        }}
        animate={reduce ? undefined : { y: [0, float, 0] }}
        transition={{
          duration: 4 + Math.abs(float) * 0.05,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

// ───────────────────────────────────────────────────────────────────
// Main component
// ───────────────────────────────────────────────────────────────────

export function HeroSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Pointer-driven parallax (desktop only).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });

  // Layered parallax offsets at different depths.
  const headlineX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const headlineY = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const decorX = useTransform(sx, [-0.5, 0.5], [40, -40]);
  const decorY = useTransform(sy, [-0.5, 0.5], [28, -28]);
  const midX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const midY = useTransform(sy, [-0.5, 0.5], [-16, 16]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!isDesktop || reduce) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      px.set((e.clientX - rect.left) / rect.width - 0.5);
      py.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [isDesktop, reduce, px, py]
  );

  const resetParallax = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
      className={`${displayFont.variable} relative isolate flex min-h-[100svh] w-full items-center overflow-hidden`}
      style={{ background: GRADIENTS.PAGE_BG, color: COLORS.PAPER_WHITE }}
    >
      {/* ░░ LAYER 0 — flat color blocks (asymmetric) ░░ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30"
        style={{
          background: `radial-gradient(60% 60% at 78% 18%, ${COLORS.ELECTRIC_VIOLET}2e 0%, transparent 60%),
                       radial-gradient(55% 55% at 12% 88%, ${COLORS.HOT_PINK}26 0%, transparent 60%),
                       radial-gradient(45% 45% at 90% 92%, ${COLORS.ELECTRIC_BLUE}22 0%, transparent 60%)`,
        }}
      />

      {/* ░░ LAYER 1 — halftone dot overlay ░░ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-[0.14] mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(${COLORS.PAPER_WHITE} 1.1px, transparent 1.2px)`,
          backgroundSize: "11px 11px",
          maskImage: "radial-gradient(120% 90% at 70% 30%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 70% 30%, black 0%, transparent 75%)",
        }}
      />

      {/* ░░ LAYER 2 — rotating starbursts (parallax decor depth) ░░ */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={isDesktop ? { x: decorX, y: decorY } : undefined}
      >
        <div className="absolute top-[8%] -right-10 opacity-90 sm:right-[6%]">
          <Starburst size={190} color={COLORS.ACID_LIME} points={14} duration={30} />
        </div>
        <div className="absolute top-[55%] left-[-6%] opacity-80 sm:left-[4%]">
          <Starburst size={120} color={COLORS.SIGNAL_ORANGE} points={10} duration={22} reverse />
        </div>
        <div className="absolute right-[14%] bottom-[10%] hidden opacity-80 lg:block">
          <Starburst size={88} color={COLORS.HOT_PINK} points={16} duration={18} />
        </div>
      </motion.div>

      {/* ░░ CONTENT ░░ */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex w-full max-w-7xl flex-col px-5 py-24 sm:px-8 lg:px-12 2xl:max-w-[1600px]"
      >
        {/* Eyebrow */}
        <motion.div variants={riseVariants} className="mb-6 flex items-center gap-3">
          <span className="h-[2px] w-10 shrink-0" style={{ background: COLORS.ACID_LIME }} />
          <span
            className="text-xs font-black tracking-[0.42em] uppercase sm:text-sm"
            style={{ color: COLORS.ACID_LIME }}
          >
            KASHIYATRA PRESENTS
          </span>
        </motion.div>

        {/* Headline cluster (parallax layer) */}
        <motion.div
          style={isDesktop ? { x: headlineX, y: headlineY } : undefined}
          className="relative"
        >
          <motion.h1
            variants={headlineVariants}
            className="font-[family-name:var(--font-zonals-display)] leading-[0.82] tracking-[-0.01em]"
            style={{
              fontSize: "clamp(5.5rem, 26vw, 22rem)",
              background: GRADIENTS.TITLE,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: SHADOWS.TITLE_DROP,
            }}
          >
            ZONALS
            <span style={{ color: COLORS.HOT_PINK, WebkitTextFillColor: COLORS.HOT_PINK }}>.</span>
          </motion.h1>

          {/* Outline echo behind headline for layered depth */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2 left-1 -z-10 font-[family-name:var(--font-zonals-display)] leading-[0.82] tracking-[-0.01em] opacity-[0.08]"
            style={{
              fontSize: "clamp(5.5rem, 26vw, 22rem)",
              WebkitTextStroke: `2px ${COLORS.PAPER_WHITE}`,
              color: "transparent",
            }}
          >
            ZONALS.
          </span>
        </motion.div>

        {/* Statement + supporting + CTAs + wave: asymmetric two-column */}
        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <motion.h2
              variants={riseVariants}
              className="font-[family-name:var(--font-zonals-display)] leading-[0.92] uppercase"
              style={{
                fontSize: "clamp(1.9rem, 5.5vw, 4rem)",
                color: COLORS.PAPER_WHITE,
              }}
            >
              YOUR CAMPUS. <span style={{ color: COLORS.ELECTRIC_BLUE }}>YOUR STAGE.</span>
            </motion.h2>

            <motion.p
              variants={riseVariants}
              className="mt-5 max-w-xl text-sm leading-relaxed font-semibold tracking-[0.08em] uppercase sm:text-base"
              style={{ color: `${COLORS.PAPER_WHITE}cc` }}
            >
              A new wave of culture, competition and chaos.{" "}
              <span style={{ color: COLORS.ACID_LIME }}>Find your scene.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div variants={riseVariants} className="mt-8 flex flex-wrap items-center gap-4">
              <motion.a
                href="#zones"
                whileHover={reduce ? undefined : { y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-black tracking-[0.14em] uppercase"
                style={{
                  background: COLORS.ACID_LIME,
                  color: COLORS.DEEP_INK,
                  boxShadow: `4px 4px 0 ${COLORS.DEEP_INK}`,
                }}
              >
                EXPLORE ZONALS
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </motion.a>

              <MotionLink
                href="/zonals/colleges"
                whileHover={reduce ? undefined : { y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 rounded-full border-2 px-7 py-3.5 text-sm font-black tracking-[0.14em] uppercase"
                style={{
                  background: "transparent",
                  color: COLORS.PAPER_WHITE,
                  borderColor: COLORS.HOT_PINK,
                  boxShadow: SHADOWS.PINK_GLOW,
                }}
              >
                SELECT COLLEGE
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </MotionLink>
            </motion.div>
          </div>

          {/* Sound-wave visualizer card (mid parallax layer) */}
          <motion.div
            variants={riseVariants}
            style={isDesktop ? { x: midX, y: midY } : undefined}
            className="relative justify-self-start rounded-2xl border-2 p-5 lg:justify-self-end"
          >
            <div
              className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
              style={{
                background: `${COLORS.DEEP_INK}80`,
                border: `2px solid ${COLORS.ELECTRIC_VIOLET}`,
                boxShadow: SHADOWS.VIOLET_GLOW,
              }}
            />
            <div className="mb-3 flex items-center justify-between gap-6">
              <span
                className="text-[10px] font-black tracking-[0.3em] uppercase"
                style={{ color: COLORS.ELECTRIC_BLUE }}
              >
                LIVE SIGNAL
              </span>
              <motion.span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: COLORS.HOT_PINK }}
                animate={reduce ? undefined : { opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </div>
            <SoundWave color={COLORS.ACID_LIME} width={300} height={70} />
          </motion.div>
        </div>
      </motion.div>

      {/* ░░ FLOATING STICKERS ░░ */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0"
        style={isDesktop ? { x: midX, y: midY } : undefined}
      >
        <Sticker
          label="KY / 2027"
          bg={COLORS.ACID_LIME}
          fg={COLORS.DEEP_INK}
          rotate={-10}
          float={-10}
          className="top-[20%] left-[6%] sm:left-[8%]"
        />
        <Sticker
          label="ALL SIGNAL. NO SILENCE."
          bg={COLORS.HOT_PINK}
          fg={COLORS.PAPER_WHITE}
          rotate={7}
          float={12}
          className="top-[36%] right-[5%] sm:right-[9%]"
        />
        <Sticker
          label="VARANASI, INDIA"
          bg={COLORS.ELECTRIC_BLUE}
          fg={COLORS.DEEP_INK}
          rotate={-5}
          float={-8}
          className="right-[12%] bottom-[14%] hidden sm:block"
        />
      </motion.div>

      {/* ░░ FILM GRAIN TEXTURE ░░ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      {/* ░░ SCROLL HINT ░░ */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
      >
        <span
          className="text-[10px] font-black tracking-[0.35em] uppercase"
          style={{ color: `${COLORS.PAPER_WHITE}99` }}
        >
          SCROLL ↓
        </span>
      </motion.div>
    </section>
  );
}

export default HeroSection;
