"use client";

import { memo } from "react";

interface CategoryIconProps {
  className?: string;
  color?: string;
}

// ═══════════════════════════════════════════════════════════════════
// MIRAGE - Fashion (elegant dress silhouette)
// ═══════════════════════════════════════════════════════════════════
export const MirageIcon = memo(function MirageIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dress form / mannequin */}
      <circle cx="32" cy="10" r="5" fill={color} />
      {/* Neckline */}
      <path
        d="M26 16L32 20L38 16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bodice */}
      <path d="M24 18C24 18 26 28 28 32L36 32C38 28 40 18 40 18" fill={color} opacity="0.9" />
      {/* Flowing skirt */}
      <path
        d="M28 32C24 40 18 52 14 58L50 58C46 52 40 40 36 32L28 32Z"
        fill={color}
        opacity="0.85"
      />
      {/* Skirt details */}
      <path d="M24 42L22 58" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M32 32L32 58" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M40 42L42 58" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Sparkle accents */}
      <circle cx="30" cy="26" r="1" fill={color} opacity="0.5" />
      <circle cx="34" cy="28" r="1" fill={color} opacity="0.5" />
    </svg>
  );
});
