"use client";

import { useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { COLORS, SHADOWS } from "../constants/palette";
import { VIDEOS, GALLERY_CONFIG } from "../config/data.config";
import type { LightboxItem, VideoItem } from "../types";

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
        className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 lg:px-16"
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

// ═══════════════════════════════════════════════════════════════════
// VIDEO FRAME - Individual video thumbnail with play button
// ═══════════════════════════════════════════════════════════════════

type VideoFrameProps = {
  video: VideoItem | null;
  index: number;
  onClick: (index: number) => void;
  isDuplicate: boolean;
};

function VideoFrame({ video, index, onClick, isDuplicate }: VideoFrameProps) {
  const isEmpty = !video;

  const handleClick = () => {
    if (!isEmpty && !isDuplicate) {
      onClick(index);
    }
  };

  return (
    <button
      type="button"
      className={`video-frame relative mr-4 flex-none rounded-xl transition-none ${
        isEmpty ? "cursor-default" : "cursor-pointer"
      }`}
      style={{
        height: "var(--video-frame-height, clamp(120px, 16vw, 190px))",
        aspectRatio: GALLERY_CONFIG.defaultVideoAspect,
      }}
      onClick={handleClick}
      tabIndex={isDuplicate ? -1 : 0}
      aria-label={video?.title || `Video ${index + 1}`}
      data-dup={isDuplicate || undefined}
    >
      {isEmpty ? (
        // Empty placeholder
        <div
          className="h-full w-full rounded-xl"
          style={{
            background: "rgba(246,236,220,0.06)",
            boxShadow: "inset 0 0 0 1px rgba(246,236,220,0.08)",
          }}
        />
      ) : (
        // Video poster
        <>
          {video.poster ? (
            <Image
              src={video.poster}
              alt={video.title || `Video ${index + 1}`}
              fill
              className="rounded-xl object-cover"
              style={{
                boxShadow: "0 0 0 1px rgba(246,236,220,0.14)",
              }}
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 180px, 220px"
            />
          ) : (
            <div
              className="h-full w-full rounded-xl bg-black/50"
              style={{
                boxShadow: "0 0 0 1px rgba(246,236,220,0.14)",
              }}
            />
          )}
        </>
      )}

      {/* Play button overlay */}
      <div
        className={`play-button absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors duration-300 ${
          isEmpty ? "opacity-40" : "group-hover:bg-[#e5337c]"
        }`}
        style={{
          background: "rgba(13,7,19,0.55)",
          borderColor: COLORS.PAPER,
        }}
      >
        {/* Play triangle */}
        <div
          className="absolute top-[13px] left-[16px]"
          style={{
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "9px 0 9px 15px",
            borderColor: `transparent transparent transparent ${COLORS.PAPER}`,
          }}
        />
      </div>
    </button>
  );
}
