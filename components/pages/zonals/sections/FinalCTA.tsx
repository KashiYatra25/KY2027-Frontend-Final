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
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLORS } from "@/components/pages/zonals/constants/palette";
import { FINAL_CTA, type ZonalCollege } from "@/components/pages/zonals/config/zonals.config";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  college?: ZonalCollege;
}

// Split headline on the period so each sentence stacks on its own line.
const HEADLINE_LINES = FINAL_CTA.headline
  .split(". ")
  .map((l, i, arr) => (i < arr.length - 1 ? `${l}.` : l));

export function FinalCTA({ college }: Props) {
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

        {/* Buttons */}
        <div className="cta-rise mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={FINAL_CTA.primary.href}
            className="group inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-black tracking-wider uppercase transition-transform duration-200 hover:-translate-y-1 sm:text-lg"
            style={{
              background: COLORS.DEEP_INK,
              color: COLORS.ACID_LIME,
              boxShadow: `0 6px 0 ${COLORS.HOT_PINK}`,
            }}
          >
            {FINAL_CTA.primary.label}
          </Link>

          <Link
            href={FINAL_CTA.secondary.href}
            className="group inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-black tracking-wider uppercase transition-transform duration-200 hover:-translate-y-1 sm:text-lg"
            style={{
              background: COLORS.PAPER_WHITE,
              color: COLORS.DEEP_INK,
              border: `3px solid ${COLORS.DEEP_INK}`,
              boxShadow: `0 6px 0 ${COLORS.DEEP_INK}`,
            }}
          >
            {FINAL_CTA.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Floating sticker chip (gentle idle bob) ───────────────────────────
interface FloatingStickerProps {
  children: React.ReactNode;
  className?: string;
  rotate: number;
  bg: string;
  color: string;
  delay: number;
  disabled: boolean;
}

function FloatingSticker({
  children,
  className = "",
  rotate,
  bg,
  color,
  delay,
  disabled,
}: FloatingStickerProps) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute hidden rounded-full px-4 py-2 text-xs font-black tracking-widest uppercase sm:inline-block ${className}`}
      style={{
        background: bg,
        color,
        rotate: `${rotate}deg`,
        border: `2px solid ${COLORS.DEEP_INK}`,
        boxShadow: "0 4px 0 rgba(0,0,0,0.35)",
      }}
      animate={disabled ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.span>
  );
}

// ── Burst / seal star (SVG) ───────────────────────────────────────────
function BurstStar({ size, fill }: { size: number; fill: string }) {
  // 12-point burst built from alternating outer/inner radii.
  const points = 12;
  const outer = 50;
  const inner = 38;
  const cx = 50;
  const cy = 50;
  const path = Array.from({ length: points * 2 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / points) * i - Math.PI / 2;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="presentation"
      className="opacity-90"
    >
      <polygon points={path} fill={fill} stroke={COLORS.DEEP_INK} strokeWidth="2" />
      <circle cx="50" cy="50" r="22" fill={COLORS.DEEP_INK} />
      <text
        x="50"
        y="54"
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill={COLORS.ACID_LIME}
        style={{ letterSpacing: "0.1em" }}
      >
        2027
      </text>
    </svg>
  );
}
