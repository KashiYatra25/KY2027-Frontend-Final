"use client";

// ═══════════════════════════════════════════════════════════════════
// SINGLE EVENT PASS
//
// Underground concert ticket design — photocopied / zine aesthetic.
// Theme: acid lime, signal orange, black. Includes faux ticket
// perforations, an event ID, a barcode graphic and an oversized "01".
//
// Hover: the whole ticket lifts and tilts, and a hidden "details"
// strip reveals.
//
// Respects prefers-reduced-motion (no lift/tilt; details shown static).
// ═══════════════════════════════════════════════════════════════════

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks";
import { COLORS, SHADOWS } from "@/components/pages/zonals/constants/palette";

const EVENT_ID = "ZN-2027-#0417";

// Barcode rendered as a run of bars with pseudo-random widths. Static
// array keeps SSR/CSR output deterministic.
const BARCODE_BARS = [
  3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 1, 2, 4, 1, 2, 1, 3, 1, 1, 2, 2, 1, 4, 1, 1, 3, 1, 2, 1, 1, 3, 2, 1,
  4, 1, 2,
];

const cardVariants: Variants = {
  rest: { y: 0, rotate: 0, scale: 1 },
  hover: {
    y: -12,
    rotate: -2,
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 18 },
  },
};

const detailsVariants: Variants = {
  rest: { opacity: 0, height: 0, marginTop: 0 },
  hover: {
    opacity: 1,
    height: "auto",
    marginTop: 16,
    transition: { type: "spring", stiffness: 260, damping: 26 },
  },
};

function PhotocopyTexture() {
  // Subtle grain + diagonal "toner streak" overlay for the zine feel.
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `
          repeating-linear-gradient(115deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 5px),
          radial-gradient(circle at 20% 30%, rgba(0,0,0,0.10) 0, transparent 55%),
          radial-gradient(circle at 80% 70%, rgba(0,0,0,0.08) 0, transparent 50%)
        `,
        mixBlendMode: "multiply",
      }}
    />
  );
}

function Barcode({ color }: { color: string }) {
  return (
    <div className="flex h-10 items-end gap-[2px]" role="img" aria-label="barcode graphic">
      {BARCODE_BARS.map((w, i) => (
        <span
          key={i}
          style={{
            width: `${w}px`,
            height: i % 7 === 0 ? "100%" : "80%",
            background: color,
          }}
        />
      ))}
    </div>
  );
}

export function SingleEventPass() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Perforation dots along the vertical tear line.
  const perforations = Array.from({ length: 12 });

  return (
    <motion.article
      className="group relative w-full max-w-sm cursor-pointer"
      initial="rest"
      animate="rest"
      whileHover={prefersReducedMotion ? undefined : "hover"}
      variants={cardVariants}
      style={{ perspective: 1000 }}
      aria-label="Single event pass — one event, all in"
    >
      <div
        className="relative overflow-hidden rounded-sm"
        style={{
          background: COLORS.PAPER_WHITE,
          border: `3px solid ${COLORS.DEEP_INK}`,
          boxShadow: SHADOWS.CARD,
        }}
      >
        <PhotocopyTexture />

        {/* Top ribbon */}
        <div
          className="relative flex items-center justify-between px-5 py-2"
          style={{ background: COLORS.DEEP_INK }}
        >
          <span
            className="text-xs font-black tracking-[0.3em] uppercase"
            style={{ color: COLORS.ACID_LIME }}
          >
            Single Pass
          </span>
          <span className="font-mono text-xs font-bold" style={{ color: COLORS.SIGNAL_ORANGE }}>
            {EVENT_ID}
          </span>
        </div>

        {/* Body */}
        <div className="relative px-5 pt-6 pb-5">
          {/* Oversized index number */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-2 right-3 text-[7rem] leading-none font-black"
            style={{
              color: "transparent",
              WebkitTextStroke: `3px ${COLORS.SIGNAL_ORANGE}`,
              opacity: 0.9,
            }}
          >
            01
          </span>

          <h3
            className="relative max-w-[12ch] text-4xl leading-[0.9] font-black tracking-tight uppercase"
            style={{ color: COLORS.DEEP_INK }}
          >
            ONE EVENT.
            <br />
            <span style={{ color: COLORS.SIGNAL_ORANGE }}>ALL IN.</span>
          </h3>

          <p
            className="relative mt-4 max-w-[26ch] text-sm font-medium"
            style={{ color: `${COLORS.DEEP_INK}cc` }}
          >
            One zone. One night. Pick your scene and go all in — no half-measures.
          </p>

          {/* Hover-revealed details strip */}
          <motion.div
            variants={prefersReducedMotion ? undefined : detailsVariants}
            initial={prefersReducedMotion ? false : "rest"}
            className="relative overflow-hidden"
            style={prefersReducedMotion ? { opacity: 1, height: "auto", marginTop: 16 } : undefined}
          >
            <ul
              className="space-y-1 border-l-2 pl-3 text-xs font-semibold tracking-wide uppercase"
              style={{
                borderColor: COLORS.ACID_LIME,
                color: COLORS.DEEP_INK,
              }}
            >
              <li>→ Entry to one zone of your choice</li>
              <li>→ Full line-up access</li>
              <li>→ Collectible zine ticket</li>
            </ul>
          </motion.div>

          {/* Perforation tear line */}
          <div className="relative my-5 flex items-center justify-between">
            {perforations.map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: `${COLORS.DEEP_INK}99` }}
              />
            ))}
          </div>

          {/* Footer: barcode + stub */}
          <div className="relative flex items-end justify-between gap-4">
            <Barcode color={COLORS.DEEP_INK} />
            <div className="text-right">
              <span
                className="block font-mono text-[0.65rem]"
                style={{ color: `${COLORS.DEEP_INK}99` }}
              >
                ADMIT ONE
              </span>
              <span
                className="block text-lg font-black uppercase"
                style={{ color: COLORS.SIGNAL_ORANGE }}
              >
                GEN ADM
              </span>
            </div>
          </div>
        </div>

        {/* Side perforation notches (semicircle cutouts) */}
        <span
          aria-hidden
          className="absolute top-[52%] -left-2 h-4 w-4 rounded-full"
          style={{ background: COLORS.DEEP_INK }}
        />
        <span
          aria-hidden
          className="absolute top-[52%] -right-2 h-4 w-4 rounded-full"
          style={{ background: COLORS.DEEP_INK }}
        />
      </div>
    </motion.article>
  );
}

export default SingleEventPass;
