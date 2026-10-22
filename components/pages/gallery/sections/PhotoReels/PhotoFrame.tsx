"use client";

import Image from "next/image";
import { COLORS } from "@/components/pages/gallery/constants/palette";
import { GALLERY_CONFIG } from "@/components/pages/gallery/config/data.config";
import type { PhotoItem } from "@/components/pages/gallery/types";

// ═══════════════════════════════════════════════════════════════════
// PHOTO FRAME - Individual frame in the film strip
// ═══════════════════════════════════════════════════════════════════

type PhotoFrameProps = {
  photo: PhotoItem | null;
  index: number;
  frameNumber: string;
  onClick: (index: number) => void;
  isDuplicate: boolean;
};

export function PhotoFrame({ photo, index, frameNumber, onClick, isDuplicate }: PhotoFrameProps) {
  const aspectRatio = photo?.w && photo?.h ? photo.w / photo.h : GALLERY_CONFIG.defaultPhotoAspect;
  const isEmpty = !photo;

  const handleClick = () => {
    // Duplicate frames (second half of the scrolling loop) must also open the
    // lightbox, otherwise clicks on them silently do nothing.
    if (!isEmpty) {
      onClick(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      type="button"
      className={`photo-frame relative mr-3 flex-none transition-transform duration-300 ${
        isEmpty ? "cursor-default" : "cursor-zoom-in hover:z-10 hover:scale-105"
      } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
      style={{
        height: "var(--frame-height, clamp(170px, 24vw, 270px))",
        aspectRatio: aspectRatio,
        outlineColor: COLORS.MARIGOLD,
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isDuplicate ? -1 : 0}
      aria-label={photo?.title || `Photo ${frameNumber}`}
      data-dup={isDuplicate || undefined}
    >
      {isEmpty ? (
        // Empty placeholder frame
        <div
          className="h-full w-full rounded-sm"
          style={{
            background: "rgba(246,236,220,0.06)",
            boxShadow: "inset 0 0 0 1px rgba(246,236,220,0.08)",
          }}
        />
      ) : (
        // Photo image
        <Image
          src={photo.src}
          alt={photo.title || `Gallery photo ${frameNumber}`}
          fill
          className="rounded-sm object-cover transition-[filter] duration-300"
          style={{
            filter: "saturate(0.92) contrast(1.02)",
          }}
          sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 270px"
        />
      )}

      {/* Frame number label */}
      <span
        className="absolute bottom-1 left-1.5 font-mono text-[10px] font-medium tracking-wider"
        style={{
          color: isEmpty ? "rgba(245,166,35,0.55)" : COLORS.MARIGOLD,
          textShadow: isEmpty ? "none" : "0 1px 3px rgba(0,0,0,0.8)",
        }}
      >
        {frameNumber}
      </span>
    </button>
  );
}
