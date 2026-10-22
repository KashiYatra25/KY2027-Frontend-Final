"use client";

import { useMemo, useCallback } from "react";
import { COLORS } from "@/components/pages/gallery/constants/palette";
import { SPECIAL_VIDEOS } from "@/components/pages/gallery/config/data.config";
import type { LightboxItem } from "@/components/pages/gallery/types";
import { SpecialVideoCard } from "./SpecialVideoCard";
import { SpecialVideoPlaceholder } from "./SpecialVideoPlaceholder";
import { SpotlightBeams } from "./decor/SpotlightBeams";
import { Sparkle } from "./decor/Sparkle";

type SpecialVideosSectionProps = {
  onVideoClick: (items: LightboxItem[], index: number) => void;
};

// ═══════════════════════════════════════════════════════════════════
// SPECIAL VIDEOS SECTION - Featured showcase with spotlight beams
// ═══════════════════════════════════════════════════════════════════

export function SpecialVideosSection({ onVideoClick }: SpecialVideosSectionProps) {
  const lightboxItems = useMemo<LightboxItem[]>(
    () =>
      SPECIAL_VIDEOS.map((v) => ({
        type: "video" as const,
        src: v.src,
        title: v.title,
        sub: v.sub,
      })),
    []
  );

  const handleClick = useCallback(
    (index: number) => {
      if (lightboxItems.length > 0) {
        onVideoClick(lightboxItems, index);
      }
    },
    [lightboxItems, onVideoClick]
  );

  const hasContent = SPECIAL_VIDEOS.length > 0;

  return (
    <section
      className="special-videos-section relative z-10 mt-16 overflow-hidden py-16 sm:mt-24 sm:py-24"
      id="special"
      aria-label="Special videos"
    >
      {/* Background with video (optional) */}
      <div className="absolute inset-0 -z-20" style={{ background: COLORS.INK }}>
        {/* Could add a background video here */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${COLORS.INK} 0, rgba(27,15,36,0.2) 20%, rgba(27,15,36,0.2) 78%, ${COLORS.INK} 100%)`,
          }}
        />
      </div>

      {/* Spotlight beams */}
      <SpotlightBeams />

      {/* Sparkles */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <Sparkle
          style={{ left: "6%", top: "14%", width: 18, height: 18 }}
          delay={0}
          duration={2.8}
          hot
        />
        <Sparkle
          style={{ left: "92%", top: "22%", width: 16, height: 16 }}
          delay={1}
          duration={3.4}
          hot
        />
        <Sparkle
          style={{ left: "48%", top: "6%", width: 14, height: 14 }}
          delay={2}
          duration={3}
          hot
        />
      </div>

      {/* Section header */}
      <div className="relative mx-auto max-w-[1100px] px-4 text-center sm:px-6 2xl:max-w-[1300px]">
        {/* Eyebrow badge */}
        <p
          className="mb-4 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 font-mono text-xs tracking-[0.18em] uppercase"
          style={{
            borderColor: "rgba(245,166,35,0.55)",
            background: "rgba(13,7,19,0.5)",
            color: COLORS.MARIGOLD,
          }}
        >
          <span className="blink-dot h-2 w-2 rounded-full" style={{ background: COLORS.RANI }} />
          Special cut
        </p>

        <h2
          className="font-serif text-[clamp(40px,8vw,88px)] leading-none font-normal"
          style={{
            color: COLORS.PAPER,
            textShadow: `0.04em 0.04em 0 ${COLORS.RANI}`,
            fontFamily: "var(--font-cinzel-decorative), var(--font-cinzel), Georgia, serif",
          }}
        >
          Too good for{" "}
          <span
            className="italic"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "0.8em",
              color: COLORS.MARIGOLD,
              textShadow: "none",
            }}
          >
            the
          </span>{" "}
          reel.
        </h2>

        <p
          className="mt-3 font-serif text-[clamp(20px,2.6vw,28px)] italic"
          style={{
            color: COLORS.TEXT_DIM,
            fontFamily: "var(--font-cormorant), Georgia, serif",
          }}
        >
          Two handpicked videos. Tap, turn the sound on.
        </p>
      </div>

      {/* Video cards */}
      <div
        className="relative mx-auto mt-10 flex max-w-[1100px] flex-wrap items-center justify-center gap-6 px-4 sm:mt-14 sm:gap-16 2xl:max-w-[1300px]"
        id="splStage"
      >
        {hasContent ? (
          SPECIAL_VIDEOS.map((video, i) => (
            <SpecialVideoCard key={i} video={video} index={i} onClick={handleClick} />
          ))
        ) : (
          <>
            <SpecialVideoPlaceholder orientation="landscape" />
            <SpecialVideoPlaceholder orientation="portrait" />
          </>
        )}
      </div>

      {/* Note */}
      <p
        className="relative mt-10 text-center font-mono text-xs tracking-[0.22em] uppercase sm:mt-14"
        style={{ color: COLORS.TEXT_DIM }}
      >
        Tap a video to watch full screen
      </p>
    </section>
  );
}
