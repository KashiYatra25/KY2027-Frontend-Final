"use client";

// ═══════════════════════════════════════════════════════════════════
// ZONALS INTRO
//
// Editorial / poster-style intro section. Big staggered headline,
// oversized index numbers, and hand-annotation style callouts arranged
// in an asymmetric magazine composition.
//
// Headline: "NOT JUST AN EVENT. A WHOLE DAMN EXPERIENCE."
//
// Respects prefers-reduced-motion (static when enabled).
// ═══════════════════════════════════════════════════════════════════

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks";
import { COLORS, GRADIENTS } from "@/components/pages/zonals/constants/palette";

// Headline broken into words for a staggered reveal. The accent flag
// drives the per-word color treatment.
const HEADLINE_WORDS: { text: string; accent?: keyof typeof COLORS }[] = [
  { text: "NOT" },
  { text: "JUST" },
  { text: "AN" },
  { text: "EVENT.", accent: "SIGNAL_ORANGE" },
  { text: "A" },
  { text: "WHOLE" },
  { text: "DAMN", accent: "ACID_LIME" },
  { text: "EXPERIENCE.", accent: "HOT_PINK" },
];

// Editorial annotations keyed to oversized index numbers.
const ANNOTATIONS: {
  index: string;
  label: string;
  note: string;
  accent: keyof typeof COLORS;
}[] = [
  {
    index: "01",
    label: "THE SOUND",
    note: "line-ups that hit different — all night, no filler",
    accent: "ACID_LIME",
  },
  {
    index: "02",
    label: "THE CROWD",
    note: "find your people, lose your voice, make it count",
    accent: "ELECTRIC_BLUE",
  },
  {
    index: "03",
    label: "THE MOMENT",
    note: "a whole world, not a single stage",
    accent: "HOT_PINK",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 28, rotate: -3 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 320, damping: 24 },
  },
};

const annotationVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 26 },
  },
};

export function ZonalsIntro() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // When reduced motion is on, render everything in its final visible
  // state and skip the stagger entirely.
  const motionProps = prefersReducedMotion
    ? { initial: "visible" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <section
      className="relative w-full overflow-hidden px-5 py-20 sm:px-8 sm:py-28"
      style={{ background: COLORS.DEEP_INK }}
      aria-label="Zonals introduction"
    >
      {/* Faint oversized watermark number for depth */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-6 text-[34vw] leading-none font-black opacity-[0.04] select-none sm:text-[26vw]"
        style={{ color: COLORS.PAPER_WHITE }}
      >
        00
      </span>

      <div className="relative mx-auto max-w-6xl 2xl:max-w-7xl">
        {/* Kicker */}
        <motion.p
          {...motionProps}
          variants={annotationVariants}
          className="mb-6 inline-block text-xs font-bold tracking-[0.35em] uppercase sm:text-sm"
          style={{ color: COLORS.ACID_LIME }}
        >
          ✳ Zonals / The Pitch
        </motion.p>

        {/* Staggered editorial headline */}
        <motion.h2
          {...motionProps}
          variants={containerVariants}
          className="flex max-w-5xl flex-wrap gap-x-4 gap-y-1 text-5xl leading-[0.95] font-black tracking-tight uppercase sm:text-7xl md:text-8xl"
          aria-label="Not just an event. A whole damn experience."
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={`${word.text}-${i}`}
              variants={wordVariants}
              className="inline-block"
              style={{
                color: word.accent ? COLORS[word.accent] : COLORS.PAPER_WHITE,
                // Hollow / outline treatment on the plain words for an
                // editorial poster feel.
                WebkitTextStroke: word.accent ? undefined : `1px ${COLORS.PAPER_WHITE}66`,
              }}
            >
              {word.text}
            </motion.span>
          ))}
        </motion.h2>

        {/* Annotation row — oversized numbers + handwritten-style notes */}
        <motion.div
          {...motionProps}
          variants={containerVariants}
          className="mt-16 grid gap-10 sm:mt-20 sm:grid-cols-3"
        >
          {ANNOTATIONS.map((item) => (
            <motion.div key={item.index} variants={annotationVariants} className="relative">
              {/* Thin connector tick */}
              <span
                aria-hidden
                className="mb-3 block h-px w-10"
                style={{ background: COLORS[item.accent] }}
              />
              <div className="flex items-start gap-3">
                <span
                  className="text-6xl leading-none font-black sm:text-7xl"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: `2px ${COLORS[item.accent]}`,
                  }}
                >
                  {item.index}
                </span>
                <div className="pt-1">
                  <h3
                    className="text-lg font-black tracking-wide uppercase sm:text-xl"
                    style={{ color: COLORS[item.accent] }}
                  >
                    {item.label}
                  </h3>
                  <p
                    className="mt-1 max-w-[22ch] text-sm leading-snug italic"
                    style={{ color: `${COLORS.PAPER_WHITE}cc` }}
                  >
                    {item.note}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Underline accent bar using the title gradient */}
        <motion.div
          {...motionProps}
          variants={annotationVariants}
          className="mt-16 h-1.5 w-full max-w-md rounded-full sm:mt-20"
          style={{ background: GRADIENTS.TITLE }}
        />
      </div>
    </section>
  );
}

export default ZonalsIntro;
