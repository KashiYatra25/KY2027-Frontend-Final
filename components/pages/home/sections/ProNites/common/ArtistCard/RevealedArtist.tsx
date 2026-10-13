"use client";

import { memo } from "react";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════════
// REVEALED ARTIST IMAGE - Shows actual artist photo
// ═══════════════════════════════════════════════════════════════════
export const RevealedArtist = memo(function RevealedArtist({
  image,
  name,
  accentColor,
}: {
  image: string;
  name: string;
  accentColor: string;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(10,5,20,0.9) 0%, rgba(10,5,20,0.3) 40%, transparent 100%)`,
        }}
      />
      {/* Accent glow at bottom */}
      <div
        className="absolute right-0 bottom-0 left-0 h-1/3"
        style={{
          background: `linear-gradient(to top, ${accentColor}30, transparent)`,
        }}
      />
    </div>
  );
});
