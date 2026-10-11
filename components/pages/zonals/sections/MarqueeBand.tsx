"use client";

// ═══════════════════════════════════════════════════════════════════
// MARQUEE BAND
//
// Infinite horizontal scrolling marquee for the Zonals page. Renders
// two stacked bands:
//   1. Acid lime text on black ink
//   2. Inverted — black text on acid lime
//
// The motion is a seamless loop: the track holds two identical copies
// of the phrase laid side-by-side and animates by exactly -50% (one
// full copy width), so when the animation restarts the second copy is
// pixel-aligned with where the first began → no visible jump.
//
// Respects prefers-reduced-motion: when enabled the track is static.
// ═══════════════════════════════════════════════════════════════════

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks";
import { COLORS } from "@/components/pages/zonals/constants/palette";

const MARQUEE_TEXT = "MAKE SOME NOISE ✳ FIND YOUR PEOPLE ✳ OWN THE NIGHT ✳ THIS IS ZONALS ✳";

// Seconds for one full copy to scroll past. Larger = slower.
const SCROLL_DURATION = 22;

interface MarqueeRowProps {
  /** Direction of travel. */
  direction: "left" | "right";
  /** Foreground (text) color. */
  color: string;
  /** Background band color. */
  background: string;
  /** Disable motion entirely. */
  reducedMotion: boolean;
}

function MarqueeRow({ direction, color, background, reducedMotion }: MarqueeRowProps) {
  // Scroll left: 0 → -50% (second copy slides into first copy's slot).
  // Scroll right: -50% → 0 (mirror image, still seamless).
  const animateX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div
      className="relative flex w-full overflow-hidden border-y-2 py-3 sm:py-4"
      style={{
        background,
        borderColor: color,
      }}
      role="marquee"
      aria-label={MARQUEE_TEXT.replace(/✳/g, "star")}
    >
      <motion.div
        className="flex shrink-0 flex-nowrap whitespace-nowrap will-change-transform"
        animate={reducedMotion ? undefined : { x: animateX }}
        transition={
          reducedMotion
            ? undefined
            : {
                duration: SCROLL_DURATION,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }
        }
      >
        {/* Two identical copies back-to-back → the -50% shift is seamless. */}
        {[0, 1].map((copy) => (
          <span
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center text-xl font-black tracking-tight whitespace-nowrap uppercase sm:text-3xl md:text-4xl"
            style={{ color }}
          >
            <span className="px-4 sm:px-6">{MARQUEE_TEXT}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function MarqueeBand() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative w-full overflow-hidden select-none" aria-label="Zonals marquee">
      {/* Band 1 — acid lime on black */}
      <MarqueeRow
        direction="left"
        color={COLORS.ACID_LIME}
        background={COLORS.DEEP_INK}
        reducedMotion={prefersReducedMotion}
      />
      {/* Band 2 — inverted: black on acid lime */}
      <MarqueeRow
        direction="right"
        color={COLORS.DEEP_INK}
        background={COLORS.ACID_LIME}
        reducedMotion={prefersReducedMotion}
      />
    </section>
  );
}

export default MarqueeBand;
