"use client";

import { useMemo, useCallback } from "react";
import { PHOTOS, GALLERY_CONFIG } from "@/components/pages/gallery/config/data.config";
import type { LightboxItem } from "@/components/pages/gallery/types";
import { FilmReel } from "./FilmReel";

type PhotoReelsProps = {
  onPhotoClick: (items: LightboxItem[], index: number) => void;
};

// ═══════════════════════════════════════════════════════════════════
// PHOTO REELS - Two film strips scrolling in opposite directions
// ═══════════════════════════════════════════════════════════════════

export function PhotoReels({ onPhotoClick }: PhotoReelsProps) {
  // Split photos between two reels or use placeholders
  const { reelA, reelB, lightboxItems } = useMemo(() => {
    if (PHOTOS.length === 0) {
      return {
        reelA: Array(GALLERY_CONFIG.emptyPhotoFrames / 2).fill(null),
        reelB: Array(GALLERY_CONFIG.emptyPhotoFrames / 2).fill(null),
        lightboxItems: [],
      };
    }

    const half = Math.ceil(PHOTOS.length / 2);
    const items: LightboxItem[] = PHOTOS.map((p) => ({
      type: "photo" as const,
      src: p.src,
      title: p.title,
      sub: p.sub,
    }));

    return {
      reelA: PHOTOS.slice(0, half),
      reelB: PHOTOS.slice(half),
      lightboxItems: items,
    };
  }, []);

  const handleClick = useCallback(
    (index: number) => {
      if (lightboxItems.length > 0) {
        onPhotoClick(lightboxItems, index);
      }
    },
    [lightboxItems, onPhotoClick]
  );

  return (
    <section
      className="gallery-reels relative z-10 mt-10 flex flex-col gap-[30px] overflow-hidden py-6"
      aria-label="Photo reels"
    >
      {/* Reel A - tilted left, scrolls right */}
      <FilmReel
        photos={reelA}
        tilt={-1.6}
        duration={GALLERY_CONFIG.reelDurationA}
        reverse={false}
        onPhotoClick={handleClick}
        indexOffset={0}
      />

      {/* Reel B - tilted right, scrolls left (reverse) */}
      <FilmReel
        photos={reelB}
        tilt={1.6}
        duration={GALLERY_CONFIG.reelDurationB}
        reverse={true}
        onPhotoClick={handleClick}
        indexOffset={reelA.length}
      />
    </section>
  );
}
