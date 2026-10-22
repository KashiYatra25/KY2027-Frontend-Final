"use client";

import { useMemo } from "react";
import { COLORS, SHADOWS } from "@/components/pages/gallery/constants/palette";
import type { PhotoItem } from "@/components/pages/gallery/types";
import { PhotoFrame } from "./PhotoFrame";

// ═══════════════════════════════════════════════════════════════════
// FILM REEL - Single scrolling strip with sprocket holes
// ═══════════════════════════════════════════════════════════════════

type FilmReelProps = {
  photos: (PhotoItem | null)[];
  tilt: number;
  duration: number;
  reverse: boolean;
  onPhotoClick: (index: number) => void;
  indexOffset: number;
};

export function FilmReel({
  photos,
  tilt,
  duration,
  reverse,
  onPhotoClick,
  indexOffset,
}: FilmReelProps) {
  // Duplicate photos for seamless loop
  const duplicatedPhotos = useMemo(() => [...photos, ...photos], [photos]);

  return (
    <div
      className="reel -ml-[5%] w-[110%] overflow-hidden py-4"
      style={{
        transform: `rotate(${tilt}deg)`,
        background: COLORS.FILM,
        boxShadow: SHADOWS.REEL,
      }}
    >
      <div
        className={`film-track flex w-max ${reverse ? "film-track-reverse" : ""}`}
        style={
          {
            "--reel-duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {/* Sprocket holes (top and bottom) */}
        <div className="sprocket-holes sprocket-top" />
        <div className="sprocket-holes sprocket-bottom" />

        {/* Photo frames */}
        {duplicatedPhotos.map((photo, i) => (
          <PhotoFrame
            key={i}
            photo={photo}
            index={indexOffset + (i % photos.length)}
            frameNumber={String((i % photos.length) + 1).padStart(2, "0")}
            onClick={onPhotoClick}
            isDuplicate={i >= photos.length}
          />
        ))}
      </div>
    </div>
  );
}
