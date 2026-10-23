"use client";

import Image from "next/image";
import { COLORS } from "../constants/palette";
import { GALLERY_CONFIG } from "../config/data.config";
import type { VideoItem } from "../types";

// ═══════════════════════════════════════════════════════════════════
// VIDEO FRAME - Individual video thumbnail with play button
// ═══════════════════════════════════════════════════════════════════

type VideoFrameProps = {
  video: VideoItem | null;
  index: number;
  onClick: (index: number) => void;
  isDuplicate: boolean;
};

export function VideoFrame({ video, index, onClick, isDuplicate }: VideoFrameProps) {
  const isEmpty = !video;

  const handleClick = () => {
    // Duplicate frames map to a valid index too, so they must also open the
    // lightbox — otherwise clicks on the scrolling loop's second half do
    // nothing ("sometimes works, sometimes not").
    if (!isEmpty) {
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
