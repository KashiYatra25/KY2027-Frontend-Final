import { memo } from "react";
import { JAZZ_COLORS } from "@/components/pages/home/constants/palette";

export const ArtistsIcon = memo(function ArtistsIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="guitarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={JAZZ_COLORS.GOLD} />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor={JAZZ_COLORS.DEEP_MAGENTA} />
        </linearGradient>
      </defs>
      <ellipse cx="42" cy="44" rx="14" ry="16" fill="url(#guitarGrad)" />
      <ellipse cx="42" cy="44" rx="4" ry="5" fill={JAZZ_COLORS.BG_DEEP} />
      <rect x="22" y="8" width="6" height="32" rx="2" fill={color} />
      <rect x="20" y="4" width="10" height="8" rx="2" fill={color} />
      <circle cx="22" cy="6" r="2" fill={JAZZ_COLORS.GOLD} />
      <circle cx="22" cy="10" r="2" fill={JAZZ_COLORS.GOLD} />
      <circle cx="28" cy="6" r="2" fill={JAZZ_COLORS.GOLD} />
      <circle cx="28" cy="10" r="2" fill={JAZZ_COLORS.GOLD} />
      <line
        x1="25"
        y1="14"
        x2="42"
        y2="44"
        stroke={JAZZ_COLORS.GOLD}
        strokeWidth="0.5"
        opacity="0.5"
      />
    </svg>
  );
});
