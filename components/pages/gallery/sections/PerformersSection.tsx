"use client";

import { useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { COLORS, SHADOWS, GRADIENTS } from "../constants/palette";
import { PERFORMERS, GALLERY_CONFIG } from "../config/data.config";
import type { LightboxItem, PerformerItem } from "../types";

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

// ═══════════════════════════════════════════════════════════════════
// PERFORMER CARD - Golden polaroid-style floating card
// ═══════════════════════════════════════════════════════════════════

type PerformerCardProps = {
  performer: PerformerItem | null;
  index: number;
  onClick: (index: number) => void;
};

// Predefined tilts and animation delays for visual variety
const CARD_STYLES = [
  { tilt: -2, duration: 6, delay: 0 },
  { tilt: 1.6, duration: 7, delay: -2 },
  { tilt: 2, duration: 5.5, delay: -1 },
  { tilt: -1.4, duration: 6.5, delay: -3 },
  { tilt: -1, duration: 7.5, delay: -4 },
  { tilt: 1.8, duration: 6, delay: -2.5 },
];

function PerformerCard({ performer, index, onClick }: PerformerCardProps) {
  const isEmpty = !performer;
  const style = CARD_STYLES[index % CARD_STYLES.length];
  const isEven = index % 2 === 1;
  const isMiddle = index % 3 === 1; // For 3-col layout

  return (
    <motion.button
      type="button"
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`performer-card group font-inherit relative block w-full rounded-md border-0 p-2.5 pb-0 text-center ${
        isEmpty ? "cursor-default" : "cursor-zoom-in"
      } ${isEven ? "mt-6 md:mt-0" : ""} ${isMiddle ? "md:mt-9" : ""}`}
      style={{
        background: isEmpty ? "rgba(246,236,220,0.05)" : GRADIENTS.PERFORMER_CARD,
        color: COLORS.TEXT_DARK,
        transform: `rotate(${style.tilt}deg)`,
        boxShadow: isEmpty ? "inset 0 0 0 1px rgba(246,236,220,0.16)" : SHADOWS.CARD,
        // Animation CSS variables
        ["--float-tilt" as string]: `${style.tilt}deg`,
        ["--float-duration" as string]: `${style.duration}s`,
        ["--float-delay" as string]: `${style.delay}s`,
      }}
      onClick={() => !isEmpty && onClick(index)}
      disabled={isEmpty}
      aria-label={performer?.name || `Performer ${index + 1}`}
      whileHover={!isEmpty ? { scale: 1.05, y: -5 } : undefined}
      whileTap={!isEmpty ? { scale: 0.98 } : undefined}
    >
      {/* Photo area */}
      <div
        className="relative aspect-[4/5] overflow-hidden"
        style={{
          background: isEmpty ? "transparent" : "#8a5f22",
        }}
      >
        {!isEmpty && performer.src && (
          <Image
            src={performer.src}
            alt={performer.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 25vw"
          />
        )}
      </div>

      {/* Name */}
      {isEmpty ? (
        <span
          className="block py-3.5 font-mono text-[11px] tracking-[0.16em] uppercase"
          style={{ color: COLORS.TEXT_DIM }}
        >
          Performer
        </span>
      ) : (
        <>
          <span
            className="block px-1 pt-3 text-[clamp(16px,2.2vw,22px)] leading-[1.2]"
            style={{
              fontFamily: "var(--font-cinzel-decorative), var(--font-cinzel), Georgia, serif",
            }}
          >
            {performer.name}
          </span>
          {performer.subtitle && (
            <span
              className="block pb-3 font-mono text-[10px] tracking-[0.14em] uppercase"
              style={{ color: "#4a2a10" }}
            >
              {performer.subtitle}
            </span>
          )}
          {!performer.subtitle && <span className="block pb-3.5" />}
        </>
      )}
    </motion.button>
  );
}
