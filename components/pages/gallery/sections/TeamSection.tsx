"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { COLORS, SHADOWS } from "../constants/palette";
import { TEAM_PHOTO } from "../config/data.config";
import type { LightboxItem } from "../types";

type TeamSectionProps = {
  onPhotoClick: (items: LightboxItem[], index: number) => void;
};

// ═══════════════════════════════════════════════════════════════════
// TEAM SECTION - Team photo with polaroid frame
// ═══════════════════════════════════════════════════════════════════

export function TeamSection({ onPhotoClick }: TeamSectionProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const hasPhoto = TEAM_PHOTO !== null;

  const handleClick = useCallback(() => {
    if (hasPhoto && TEAM_PHOTO) {
      onPhotoClick(
        [
          {
            type: "photo",
            src: TEAM_PHOTO.src,
            title: TEAM_PHOTO.title || "Kashi Yatra Team",
          },
        ],
        0
      );
    }
  }, [hasPhoto, onPhotoClick]);

  return (
    <section ref={sectionRef} className="gallery-section relative z-10 mt-16 sm:mt-24" id="team">
      {/* Section header with scroll animation */}
      <motion.div
        className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 lg:px-16"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p
          className="mb-2.5 font-mono text-xs tracking-[0.18em] uppercase"
          style={{ color: COLORS.MARIGOLD }}
        >
          The people
        </p>
        <h2
          className="font-serif text-[clamp(38px,7vw,76px)] leading-none font-normal"
          style={{
            color: COLORS.PAPER,
            textShadow: SHADOWS.SECTION_TITLE,
            fontFamily: "var(--font-cinzel-decorative), var(--font-cinzel), Georgia, serif",
          }}
        >
          <span
            className="italic"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "0.8em",
              color: COLORS.MARIGOLD,
              textShadow: "none",
            }}
          >
            Meet
          </span>{" "}
          OUR TEAM
        </h2>
      </motion.div>

      {/* Team photo with animation */}
      <motion.div
        className="mx-auto mt-9 max-w-[1200px] px-4 sm:px-6 md:px-12 lg:px-16"
        initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
        animate={
          isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.9, rotate: 3 }
        }
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {hasPhoto && TEAM_PHOTO ? (
          <motion.button
            type="button"
            className="team-photo-frame group mx-auto block w-full max-w-[820px] -rotate-1 cursor-zoom-in overflow-hidden border-[10px]"
            style={{
              borderColor: COLORS.PAPER,
              background: "#e6d8bd",
              aspectRatio: TEAM_PHOTO.aspectRatio || 1.6,
              boxShadow: "0 30px 60px -26px rgba(0,0,0,0.85)",
            }}
            onClick={handleClick}
            aria-label={TEAM_PHOTO.title || "View team photo"}
            whileHover={{ scale: 1.02, rotate: 0 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={TEAM_PHOTO.src}
              alt={TEAM_PHOTO.title || "Kashi Yatra Team"}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 820px"
            />
          </motion.button>
        ) : (
          <TeamPhotoPlaceholder />
        )}
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PLACEHOLDER - Empty team photo frame
// ═══════════════════════════════════════════════════════════════════

function TeamPhotoPlaceholder() {
  return (
    <div
      className="team-photo-placeholder mx-auto flex w-full max-w-[820px] -rotate-1 items-center justify-center border-2 border-dashed"
      style={{
        borderColor: "rgba(246,236,220,0.28)",
        background: "rgba(246,236,220,0.05)",
        aspectRatio: 1.6,
      }}
    >
      <span
        className="font-mono text-xs tracking-[0.16em] uppercase"
        style={{ color: COLORS.TEXT_DIM }}
      >
        Team photo
      </span>
    </div>
  );
}
