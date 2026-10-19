"use client";

// ═══════════════════════════════════════════════════════════════════
// PASS SELECTION
//
// Section that presents the two collectible passes side by side:
//   • SingleEventPass — underground zine ticket (lime/orange/black)
//   • MultiEventPass  — holographic all-access wristband (blue/violet/pink)
//
// Both read as items from the same campaign. The section stacks on
// mobile and sits two-up on larger screens.
//
// Respects prefers-reduced-motion for the heading reveal; the passes
// handle their own reduced-motion behavior.
// ═══════════════════════════════════════════════════════════════════

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks";
import { COLORS, GRADIENTS } from "@/components/pages/zonals/constants/palette";
import { ZONAL_COLLEGES, type ZonalCollege } from "@/components/pages/zonals/config/zonals.config";
import { SingleEventPass } from "./SingleEventPass";
import { MultiEventPass } from "./MultiEventPass";

interface Props {
  college?: ZonalCollege;
}

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 26 },
  },
};

const passVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 24,
      delay: 0.12 * i,
    },
  }),
};

export function PassSelection({ college }: Props) {
  const activeCollege = college ?? ZONAL_COLLEGES[0];
  const prefersReducedMotion = usePrefersReducedMotion();

  const sectionMotion = prefersReducedMotion
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
      aria-label="Pass selection"
    >
      <div className="relative mx-auto max-w-6xl 2xl:max-w-7xl">
        {/* Heading block */}
        <motion.div
          {...sectionMotion}
          variants={headingVariants}
          className="mb-12 text-center sm:mb-16"
        >
          <p
            className="mb-4 text-xs font-bold tracking-[0.35em] uppercase sm:text-sm"
            style={{ color: COLORS.ACID_LIME }}
          >
            ✳ Pick Your Pass
          </p>
          <h2
            className="text-4xl leading-[0.95] font-black tracking-tight uppercase sm:text-6xl"
            style={{
              background: GRADIENTS.TITLE,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Two Ways In
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-base"
            style={{ color: `${COLORS.PAPER_WHITE}cc` }}
          >
            Collectible by design. Grab a single-zone zine ticket or go full holographic with
            all-access.
          </p>
        </motion.div>

        {/* Passes */}
        <motion.div
          {...sectionMotion}
          className="flex flex-col items-center justify-center gap-10 sm:gap-12 lg:flex-row lg:items-stretch"
        >
          <motion.div
            custom={0}
            variants={passVariants}
            className="flex w-full max-w-sm justify-center"
          >
            <SingleEventPass college={activeCollege} />
          </motion.div>

          {/* Divider "/" */}
          <div
            aria-hidden
            className="hidden items-center text-5xl font-black select-none lg:flex"
            style={{ color: `${COLORS.PAPER_WHITE}33` }}
          >
            /
          </div>

          <motion.div
            custom={1}
            variants={passVariants}
            className="flex w-full max-w-sm justify-center"
          >
            <MultiEventPass college={activeCollege} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default PassSelection;
