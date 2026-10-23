"use client";

import { useMemo, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { COLORS, SHADOWS } from "../constants/palette";
import { VIDEOS, GALLERY_CONFIG } from "../config/data.config";
import type { LightboxItem } from "../types";
import { VideoFrame } from "./VideoFrame";

type VideoReelSectionProps = {
  onVideoClick: (items: LightboxItem[], index: number) => void;
};

// ═══════════════════════════════════════════════════════════════════
// VIDEO REEL SECTION - Scrolling video thumbnails
// ═══════════════════════════════════════════════════════════════════

export function VideoReelSection({ onVideoClick }: VideoReelSectionProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { videos, lightboxItems } = useMemo(() => {
    if (VIDEOS.length === 0) {
      return {
        videos: Array(GALLERY_CONFIG.emptyVideoFrames).fill(null),
        lightboxItems: [],
      };
    }

    const items: LightboxItem[] = VIDEOS.map((v) => ({
      type: "video" as const,
      src: v.src,
      title: v.title,
      sub: v.sub,
    }));

    return { videos: VIDEOS, lightboxItems: items };
  }, []);

  const handleClick = useCallback(
    (index: number) => {
      if (lightboxItems.length > 0) {
        onVideoClick(lightboxItems, index);
      }
    },
    [lightboxItems, onVideoClick]
  );

  // Duplicate for seamless loop
  const duplicatedVideos = useMemo(() => [...videos, ...videos], [videos]);

  return (
    <section ref={sectionRef} className="gallery-section relative z-10 mt-16 sm:mt-24" id="vibe">
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
          Videos
        </p>
        <h2
          className="font-serif text-[clamp(38px,7vw,76px)] leading-none font-normal"
          style={{
            color: COLORS.PAPER,
            textShadow: SHADOWS.SECTION_TITLE,
            fontFamily: "var(--font-cinzel-decorative), var(--font-cinzel), Georgia, serif",
          }}
        >
          Feel the vibe
        </h2>
        <p
          className="mt-3.5 font-serif text-[clamp(20px,2.6vw,28px)] italic"
          style={{
            color: COLORS.TEXT_DIM,
            fontFamily: "var(--font-cormorant), Georgia, serif",
          }}
        >
          Get a taste of what to expect
        </p>
      </motion.div>

      {/* Video reel with fade-in */}
      <motion.div
        className="video-reel mt-7 overflow-hidden py-3.5"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div
          className="film-track film-track-reverse flex w-max"
          style={
            {
              "--reel-duration": `${GALLERY_CONFIG.videoReelDuration}s`,
            } as React.CSSProperties
          }
        >
          {duplicatedVideos.map((video, i) => (
            <VideoFrame
              key={i}
              video={video}
              index={i % videos.length}
              onClick={handleClick}
              isDuplicate={i >= videos.length}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
