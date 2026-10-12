"use client";

import { useMemo, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { COLORS, GRADIENTS } from "../constants/palette";
import { SPECIAL_VIDEOS } from "../config/data.config";
import type { LightboxItem, SpecialVideoItem } from "../types";

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
      <div className="relative mx-auto max-w-[1100px] px-4 text-center sm:px-6">
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
        className="relative mx-auto mt-10 flex max-w-[1100px] flex-wrap items-center justify-center gap-6 px-4 sm:mt-14 sm:gap-16"
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

// ═══════════════════════════════════════════════════════════════════
// SPECIAL VIDEO CARD - With animated gradient ring border
// ═══════════════════════════════════════════════════════════════════

type SpecialVideoCardProps = {
  video: SpecialVideoItem;
  index: number;
  onClick: (index: number) => void;
};

function SpecialVideoCard({ video, index, onClick }: SpecialVideoCardProps) {
  const isLandscape = video.orientation === "landscape";
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play muted preview on hover
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const play = () => el.play().catch(() => {});
    const pause = () => {
      el.pause();
      el.currentTime = 0;
    };

    el.parentElement?.addEventListener("mouseenter", play);
    el.parentElement?.addEventListener("mouseleave", pause);

    return () => {
      el.parentElement?.removeEventListener("mouseenter", play);
      el.parentElement?.removeEventListener("mouseleave", pause);
    };
  }, []);

  return (
    <div
      className={`special-video-wrapper relative ${
        isLandscape
          ? "max-w-[660px] flex-[1_1_520px]"
          : "w-[clamp(230px,24vw,300px)] flex-[0_0_auto]"
      }`}
      style={
        {
          "--float-tilt": isLandscape ? "-1.8deg" : "2.2deg",
          "--float-duration": isLandscape ? "6.5s" : "5.5s",
        } as React.CSSProperties
      }
    >
      {/* Glow behind card */}
      <div
        className="pointer-events-none absolute inset-[-14%] -z-10"
        style={{
          background:
            "radial-gradient(closest-side, rgba(229,51,124,0.34), rgba(245,166,35,0.12) 65%, transparent)",
        }}
      />

      <button
        type="button"
        className="special-video-card group font-inherit relative block w-full rounded-[20px] border-0 bg-none p-0 text-left transition-transform duration-300 hover:scale-[1.02]"
        style={{
          boxShadow: "0 22px 34px -22px rgba(0,0,0,0.9)",
        }}
        onClick={() => onClick(index)}
        aria-label={`Play special video: ${video.title}`}
      >
        {/* Animated gradient ring */}
        <div className="ring-border pointer-events-none absolute inset-[-4px] -z-0 overflow-hidden rounded-[24px]">
          <div
            className="ring-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: isLandscape ? "150%" : "240%",
              aspectRatio: "1",
              background: GRADIENTS.RING,
            }}
          />
        </div>

        {/* Video container */}
        <div
          className="relative z-10 overflow-hidden rounded-[18px] bg-black"
          style={{
            aspectRatio: isLandscape ? "16/9" : "9/16",
          }}
        >
          {/* Video element or poster */}
          {video.poster ? (
            <Image src={video.poster} alt={video.title} fill className="object-cover" />
          ) : (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="auto"
              tabIndex={-1}
              className="absolute inset-0 h-full w-full object-cover"
              poster={video.poster}
            >
              <source src={video.src} type="video/mp4" />
            </video>
          )}

          {/* Gradient overlays */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(13,7,19,0.88) 0, rgba(13,7,19,0.1) 38%, transparent 60%), linear-gradient(to bottom, rgba(13,7,19,0.5), transparent 22%)",
            }}
          />

          {/* Special tag */}
          <div
            className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 rounded-full px-2.5 py-1.5 font-mono text-[11px] tracking-[0.18em] uppercase"
            style={{
              background: "rgba(13,7,19,0.7)",
              color: COLORS.PAPER,
            }}
          >
            <span className="blink-dot h-2 w-2 rounded-full" style={{ background: COLORS.RANI }} />
            Special
          </div>

          {/* Sound on badge */}
          <div
            className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-full px-2.5 py-1.5 font-mono text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors duration-300 group-hover:bg-[#e5337c] group-hover:text-white"
            style={{
              background: COLORS.MARIGOLD,
              color: COLORS.INK,
            }}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
              <path d="M3 9v6h4l5 4V5L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" />
            </svg>
            Sound on
          </div>

          {/* Play button (center) */}
          <div
            className="play-center absolute top-1/2 left-1/2 z-20 h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 opacity-0 transition-all duration-300 group-hover:bg-[#e5337c] group-hover:opacity-100"
            style={{
              background: "rgba(13,7,19,0.5)",
              borderColor: COLORS.PAPER,
            }}
          >
            <div
              className="absolute top-[18px] left-[23px]"
              style={{
                width: 0,
                height: 0,
                borderStyle: "solid",
                borderWidth: "12px 0 12px 19px",
                borderColor: `transparent transparent transparent ${COLORS.PAPER}`,
              }}
            />
          </div>

          {/* Caption */}
          <div className="pointer-events-none absolute right-4 bottom-3.5 left-4 z-20">
            <b
              className="block text-[clamp(20px,2.6vw,30px)] leading-[1.1] font-normal"
              style={{
                fontFamily: "var(--font-cinzel-decorative), var(--font-cinzel), Georgia, serif",
                color: COLORS.PAPER,
                textShadow: `0.06em 0.06em 0 ${COLORS.RANI}`,
              }}
            >
              {video.title}
            </b>
            <span
              className="mt-1.5 block font-mono text-[11px] tracking-[0.16em] uppercase"
              style={{ color: COLORS.MARIGOLD }}
            >
              {video.sub}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PLACEHOLDER - Empty special video card
// ═══════════════════════════════════════════════════════════════════

function SpecialVideoPlaceholder({ orientation }: { orientation: "landscape" | "portrait" }) {
  const isLandscape = orientation === "landscape";

  return (
    <div
      className={`special-video-wrapper relative ${
        isLandscape
          ? "max-w-[660px] flex-[1_1_520px]"
          : "w-[clamp(230px,24vw,300px)] flex-[0_0_auto]"
      }`}
    >
      <div
        className="relative w-full rounded-[20px]"
        style={{
          aspectRatio: isLandscape ? "16/9" : "9/16",
          background: "rgba(246,236,220,0.05)",
          boxShadow: "inset 0 0 0 2px rgba(246,236,220,0.16)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-mono text-xs tracking-[0.16em] uppercase"
            style={{ color: COLORS.TEXT_DIM }}
          >
            {isLandscape ? "Landscape" : "Portrait"} video
          </span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SPOTLIGHT BEAMS
// ═══════════════════════════════════════════════════════════════════

function SpotlightBeams() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <BeamSVG
        className="beam-sway absolute top-0 left-[2%]"
        color="gold"
        swayStart={-14}
        swayEnd={10}
        duration={7}
      />
      <BeamSVG
        className="beam-sway absolute top-0 left-[36%]"
        color="rani"
        swayStart={12}
        swayEnd={-12}
        duration={9}
      />
      <BeamSVG
        className="beam-sway absolute top-0 right-0"
        color="purple"
        swayStart={-8}
        swayEnd={16}
        duration={8}
      />
    </div>
  );
}

function BeamSVG({
  className,
  color,
  swayStart,
  swayEnd,
  duration,
}: {
  className?: string;
  color: "gold" | "rani" | "purple";
  swayStart: number;
  swayEnd: number;
  duration: number;
}) {
  const colors = {
    gold: "#f5a623",
    rani: "#e5337c",
    purple: "#965aff",
  };

  return (
    <div
      className={`${className} h-[115%] w-[30vw] max-w-[420px] origin-top`}
      style={
        {
          "--sway-start": `${swayStart}deg`,
          "--sway-end": `${swayEnd}deg`,
          "--sway-duration": `${duration}s`,
        } as React.CSSProperties
      }
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id={`beam-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={colors[color]} stopOpacity="0.62" />
            <stop offset="0.88" stopColor={colors[color]} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="46,0 54,0 100,100 0,100" fill={`url(#beam-${color})`} />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SPARKLE
// ═══════════════════════════════════════════════════════════════════

function Sparkle({
  style,
  delay,
  duration,
  hot,
}: {
  style: React.CSSProperties;
  delay: number;
  duration: number;
  hot?: boolean;
}) {
  return (
    <i
      className={`sparkle absolute ${hot ? "hot" : ""}`}
      style={{
        ...style,
        background: hot ? "#ffe9b0" : "#f6d98f",
        clipPath: "polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%)",
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
      aria-hidden="true"
    />
  );
}
