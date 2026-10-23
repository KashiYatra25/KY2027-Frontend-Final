"use client";

import { useMemo, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COLORS, SHADOWS } from "../constants/palette";
import { PERFORMERS, GALLERY_CONFIG } from "../config/data.config";
import type { LightboxItem } from "../types";
import { PerformerCard } from "./PerformerCard";

type PerformersSectionProps = {
  onCardClick: (items: LightboxItem[], index: number) => void;
};

// ═══════════════════════════════════════════════════════════════════
// PERFORMERS SECTION - Floating golden polaroid cards
// ═══════════════════════════════════════════════════════════════════

export function PerformersSection({ onCardClick }: PerformersSectionProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const { performers, lightboxItems } = useMemo(() => {
    if (PERFORMERS.length === 0) {
      return {
        performers: Array(GALLERY_CONFIG.emptyPerformerCards).fill(null),
        lightboxItems: [],
      };
    }

    const items: LightboxItem[] = PERFORMERS.map((p) => ({
      type: "photo" as const,
      src: p.src,
      title: p.name,
      sub: p.subtitle,
    }));

    return { performers: PERFORMERS, lightboxItems: items };
  }, []);

  const handleClick = useCallback(
    (index: number) => {
      if (lightboxItems.length > 0) {
        onCardClick(lightboxItems, index);
      }
    },
    [lightboxItems, onCardClick]
  );

  return (
    <section ref={sectionRef} className="gallery-section relative z-10 mt-16 sm:mt-24" id="stage">
      {/* Section header with scroll animation */}
      <motion.div
        className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 lg:px-16 2xl:max-w-[1400px]"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p
          className="mb-2.5 font-mono text-xs tracking-[0.18em] uppercase"
          style={{ color: COLORS.MARIGOLD }}
        >
          Performers
        </p>
        <h2
          className="font-serif text-[clamp(38px,7vw,76px)] leading-none font-normal"
          style={{
            color: COLORS.PAPER,
            textShadow: SHADOWS.SECTION_TITLE,
            fontFamily: "var(--font-cinzel-decorative), var(--font-cinzel), Georgia, serif",
          }}
        >
          They performed on our Stage.
        </h2>
      </motion.div>

      {/* Performer cards grid with staggered animation */}
      <div className="mx-auto mt-10 max-w-[1200px] px-4 sm:px-6 md:px-12 lg:px-16 2xl:max-w-[1400px]">
        <motion.div
          className="performers-grid grid grid-cols-2 gap-[clamp(18px,3.4vw,40px)] pb-8 md:grid-cols-3"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {performers.map((performer, i) => (
            <PerformerCard key={i} performer={performer} index={i} onClick={handleClick} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
