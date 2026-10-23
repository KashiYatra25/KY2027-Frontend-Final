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
import { ZONAL_COLLEGES, type ZonalCollege } from "@/components/pages/zonals/config/zonals.config";
import { PhotocopyTexture } from "./PhotocopyTexture";
import { Barcode } from "./Barcode";

const EVENT_ID = "ZN-2027-#0417";

interface Props {
  college?: ZonalCollege;
}

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

export function SingleEventPass({ college }: Props) {
  const activeCollege = college ?? ZONAL_COLLEGES[0];
  const singlePass = activeCollege.passes.find((p) => p.type === "SINGLE_EVENT");
  const PASS_PRICE = singlePass?.price ?? 400;
  const KONFHUB_URL = activeCollege.registrationUrl;

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
              <span className="block text-2xl font-black" style={{ color: COLORS.SIGNAL_ORANGE }}>
                ₹{PASS_PRICE}
              </span>
            </div>
          </div>

          {/* Buy button */}
          <a
            href={KONFHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full rounded-sm py-3 text-center text-sm font-black tracking-wider uppercase transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: COLORS.SIGNAL_ORANGE,
              color: COLORS.DEEP_INK,
            }}
          >
            Get Single Pass →
          </a>
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
