"use client";

// ═══════════════════════════════════════════════════════════════════
// MULTI EVENT PASS
//
// All-access wristband / ticket hybrid. Theme: electric blue, violet,
// hot pink holographic gradients, layered shapes and an "ALL ACCESS"
// stamp.
//
// Animation (distinct from SingleEventPass's lift+tilt): a continuous
// holographic sheen sweep + gentle float, and on hover the stamp pops
// and rotates. This is an ambient/looping treatment rather than a
// discrete hover transform, intentionally different in character.
//
// Respects prefers-reduced-motion (no sheen loop / float; static stamp).
// ═══════════════════════════════════════════════════════════════════

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks";
import { COLORS, GRADIENTS } from "@/components/pages/zonals/constants/palette";

const PASS_ID = "ZN-2027-#ALL";

const stampVariants: Variants = {
  rest: { rotate: -14, scale: 1 },
  hover: {
    rotate: -8,
    scale: 1.12,
    transition: { type: "spring", stiffness: 320, damping: 12 },
  },
};

export function MultiEventPass() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Ambient float + continuous holographic sheen sweep.
  const floatAnim = prefersReducedMotion ? undefined : { y: [0, -8, 0] };
  const floatTransition = prefersReducedMotion
    ? undefined
    : { duration: 5, ease: "easeInOut" as const, repeat: Infinity };

  const sheenAnim = prefersReducedMotion
    ? undefined
    : { backgroundPosition: ["0% 50%", "200% 50%"] };
  const sheenTransition = prefersReducedMotion
    ? undefined
    : { duration: 6, ease: "linear" as const, repeat: Infinity };

  return (
    <motion.article
      className="group relative w-full max-w-sm cursor-pointer"
      initial="rest"
      animate="rest"
      whileHover={prefersReducedMotion ? undefined : "hover"}
      aria-label="Multi event pass — all access, all the action"
    >
      <motion.div
        animate={floatAnim}
        transition={floatTransition}
        className="relative overflow-hidden rounded-2xl"
        style={{
          border: `3px solid ${COLORS.ELECTRIC_BLUE}`,
          boxShadow: `0 10px 40px ${COLORS.ELECTRIC_VIOLET}55`,
          background: COLORS.DEEP_INK,
        }}
      >
        {/* Holographic sheen layer — animated gradient sweep */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          animate={sheenAnim}
          transition={sheenTransition}
          style={{
            backgroundImage: `linear-gradient(110deg, ${COLORS.ELECTRIC_BLUE} 0%, ${COLORS.ELECTRIC_VIOLET} 25%, ${COLORS.HOT_PINK} 50%, ${COLORS.ELECTRIC_VIOLET} 75%, ${COLORS.ELECTRIC_BLUE} 100%)`,
            backgroundSize: "200% 100%",
            mixBlendMode: "screen",
          }}
        />

        {/* Layered decorative shapes */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-50 blur-xl"
          style={{ background: COLORS.HOT_PINK }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rotate-45 opacity-40 blur-xl"
          style={{ background: COLORS.ELECTRIC_VIOLET }}
        />

        {/* Content */}
        <div className="relative px-5 pt-5 pb-6">
          {/* Wristband strip header */}
          <div className="flex items-center justify-between">
            <span
              className="rounded-full px-3 py-1 text-[0.65rem] font-black tracking-[0.25em] uppercase"
              style={{
                background: COLORS.DEEP_INK,
                color: COLORS.ELECTRIC_BLUE,
                border: `1px solid ${COLORS.ELECTRIC_BLUE}`,
              }}
            >
              Multi Pass
            </span>
            <span className="font-mono text-xs font-bold" style={{ color: COLORS.PAPER_WHITE }}>
              {PASS_ID}
            </span>
          </div>

          {/* Headline */}
          <h3
            className="relative mt-8 text-4xl leading-[0.9] font-black tracking-tight uppercase"
            style={{
              color: COLORS.PAPER_WHITE,
              textShadow: `0 2px 18px ${COLORS.HOT_PINK}aa`,
            }}
          >
            ALL ACCESS.
            <br />
            <span
              style={{
                background: GRADIENTS.VIOLET_PINK,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              ALL THE ACTION.
            </span>
          </h3>

          <p
            className="mt-4 max-w-[28ch] text-sm font-medium"
            style={{ color: `${COLORS.PAPER_WHITE}dd` }}
          >
            Every zone. Every night. One holographic key to the whole damn thing.
          </p>

          {/* Perk chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {["ALL ZONES", "SKIP THE LINE", "VIP DROPS", "COLLECTIBLE"].map((perk) => (
              <span
                key={perk}
                className="rounded-full px-3 py-1 text-[0.65rem] font-bold tracking-wide uppercase"
                style={{
                  background: `${COLORS.PAPER_WHITE}1a`,
                  color: COLORS.PAPER_WHITE,
                  border: `1px solid ${COLORS.ELECTRIC_BLUE}66`,
                }}
              >
                {perk}
              </span>
            ))}
          </div>

          {/* Wristband dotted seam */}
          <div className="mt-6 flex items-center gap-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="h-1 flex-1 rounded-full"
                style={{
                  background: i % 2 === 0 ? COLORS.ELECTRIC_BLUE : COLORS.HOT_PINK,
                  opacity: 0.7,
                }}
              />
            ))}
          </div>
        </div>

        {/* ALL ACCESS stamp */}
        <motion.div
          variants={prefersReducedMotion ? undefined : stampVariants}
          className="absolute right-4 bottom-20 flex h-24 w-24 items-center justify-center rounded-full text-center"
          style={{
            border: `3px solid ${COLORS.HOT_PINK}`,
            color: COLORS.HOT_PINK,
            transform: prefersReducedMotion ? "rotate(-14deg)" : undefined,
            boxShadow: `0 0 18px ${COLORS.HOT_PINK}88`,
            background: `${COLORS.DEEP_INK}cc`,
          }}
          aria-hidden
        >
          <span className="text-sm leading-tight font-black tracking-widest uppercase">
            ALL
            <br />
            ACCESS
          </span>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

export default MultiEventPass;
