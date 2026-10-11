"use client";

// ═══════════════════════════════════════════════════════════════════
// EVENT CARD
//
// Asymmetric, bright, poster-style card used in the EventsExplorer grid.
//  • Oversized ghost number bleeding off the corner
//  • Category "sticker" chip
//  • Pointer-driven 3D tilt on hover (framer-motion springs)
//  • Image / content reveal animation when it enters the viewport
//
// Data is PLACEHOLDER (see zonals.config.ts → EXPLORE_EVENTS).
// `imageUrl` is optional; when absent we render a tinted gradient panel
// as a clearly-marked image placeholder.
// ═══════════════════════════════════════════════════════════════════

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { COLORS } from "@/components/pages/zonals/constants/palette";
import type { ExploreEvent } from "@/components/pages/zonals/config/zonals.config";

// Map the palette color keys to hex. Falls back to acid lime for safety.
function resolveColor(key: string): string {
  return (COLORS as Record<string, string>)[key] ?? COLORS.ACID_LIME;
}

// Size hint → grid span + min-height. Drives the asymmetric layout.
const SIZE_STYLES: Record<ExploreEvent["size"], { className: string; minHeight: string }> = {
  sm: { className: "sm:col-span-1 sm:row-span-1", minHeight: "clamp(240px, 30vw, 320px)" },
  md: { className: "sm:col-span-1 sm:row-span-2", minHeight: "clamp(320px, 40vw, 460px)" },
  lg: { className: "sm:col-span-2 sm:row-span-2", minHeight: "clamp(360px, 44vw, 520px)" },
};

interface EventCardProps {
  event: ExploreEvent;
  /** Stagger index — delays the reveal slightly per card. */
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-10% 0px -10% 0px" });

  const accent = resolveColor(event.accentColor);
  const fg = event.textColor === "ink" ? COLORS.DEEP_INK : COLORS.PAPER_WHITE;
  const size = SIZE_STYLES[event.size];

  // ── Pointer-driven tilt ────────────────────────────────────────────
  const px = useMotionValue(0.5); // 0..1 pointer X within card
  const py = useMotionValue(0.5); // 0..1 pointer Y within card

  const springCfg = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), springCfg);
  const rotateY = useSpring(useTransform(px, [0, 1], [-10, 10]), springCfg);
  // Subtle highlight that tracks the pointer.
  const glowX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glowBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]: string[]) =>
      `radial-gradient(260px circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 70%)`
  );

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={cardRef}
      className={`group relative ${size.className}`}
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.article
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-7"
        style={{
          minHeight: size.minHeight,
          background: accent,
          color: fg,
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
          boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
          border: `2px solid ${COLORS.DEEP_INK}`,
        }}
      >
        {/* Pointer-tracking highlight */}
        {!prefersReducedMotion && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: glowBackground,
            }}
          />
        )}

        {/* Oversized ghost number (bleeds off the top-right corner) */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-6 -right-3 leading-none font-black select-none"
          style={{
            fontSize: "clamp(7rem, 16vw, 14rem)",
            color: fg,
            opacity: 0.12,
            transform: "translateZ(20px)",
          }}
        >
          {event.number}
        </span>

        {/* ── Top row: category sticker ───────────────────────────── */}
        <div
          className="relative flex items-start justify-between"
          style={{ transform: "translateZ(40px)" }}
        >
          <span
            className="inline-block rotate-[-4deg] rounded-full px-3 py-1 text-xs font-black tracking-widest uppercase"
            style={{
              background: fg,
              color: accent,
              boxShadow: "0 3px 0 rgba(0,0,0,0.35)",
            }}
          >
            {event.category}
          </span>
        </div>

        {/* ── Image reveal panel ──────────────────────────────────── */}
        <div
          className="relative my-4 flex-1 overflow-hidden rounded-2xl"
          style={{ border: `2px solid ${fg}`, transform: "translateZ(20px)" }}
        >
          {/* The reveal: a wipe panel slides away to expose the image/placeholder. */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{ background: COLORS.DEEP_INK, originX: 0 }}
            initial={{ scaleX: 1 }}
            animate={isInView ? { scaleX: 0 } : undefined}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.7,
              delay: prefersReducedMotion ? 0 : index * 0.08 + 0.25,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
          {event.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.imageUrl}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            // PLACEHOLDER visual — no real imagery wired yet.
            <div
              className="flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105"
              style={{
                background: `repeating-linear-gradient(135deg, ${fg}1a 0 14px, transparent 14px 28px), ${accent}`,
              }}
            >
              <span className="text-xs font-bold tracking-widest uppercase opacity-50">
                image placeholder
              </span>
            </div>
          )}
        </div>

        {/* ── Bottom: title + description ──────────────────────────── */}
        <div className="relative" style={{ transform: "translateZ(40px)" }}>
          <h3
            className="font-black uppercase"
            style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)", lineHeight: 0.95 }}
          >
            {event.title}
          </h3>
          <p className="mt-2 max-w-[42ch] text-sm font-medium opacity-80 sm:text-base">
            {event.description}
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
}
