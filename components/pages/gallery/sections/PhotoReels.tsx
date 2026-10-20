"use client";

import { useMemo, useCallback } from "react";
import Image from "next/image";
import { COLORS, SHADOWS } from "../constants/palette";
import { PHOTOS, GALLERY_CONFIG } from "../config/data.config";
import type { LightboxItem, PhotoItem } from "../types";

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

function FilmReel({ photos, tilt, duration, reverse, onPhotoClick, indexOffset }: FilmReelProps) {
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

function PhotoFrame({ photo, index, frameNumber, onClick, isDuplicate }: PhotoFrameProps) {
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
