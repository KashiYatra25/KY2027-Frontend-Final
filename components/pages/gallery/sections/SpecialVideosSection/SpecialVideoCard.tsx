"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { COLORS, GRADIENTS } from "@/components/pages/gallery/constants/palette";
import type { SpecialVideoItem } from "@/components/pages/gallery/types";

// ═══════════════════════════════════════════════════════════════════
// SPECIAL VIDEO CARD - With animated gradient ring border
// ═══════════════════════════════════════════════════════════════════

type SpecialVideoCardProps = {
  video: SpecialVideoItem;
  index: number;
  onClick: (index: number) => void;
};

export function SpecialVideoCard({ video, index, onClick }: SpecialVideoCardProps) {
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
