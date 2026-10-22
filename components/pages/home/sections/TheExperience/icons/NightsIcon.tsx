import { memo } from "react";
import { JAZZ_COLORS } from "@/components/pages/home/constants/palette";

export const NightsIcon = memo(function NightsIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={JAZZ_COLORS.GOLD} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <path d="M38 8 A20 20 0 1 1 38 56 A15 15 0 1 0 38 8" fill="url(#moonGrad)" />
      <polygon
        points="14,20 16,24 20,24 17,27 18,32 14,29 10,32 11,27 8,24 12,24"
        fill={JAZZ_COLORS.GOLD}
        opacity="0.8"
      />
      <polygon
        points="52,36 53,38 56,38 54,40 55,43 52,41 49,43 50,40 48,38 51,38"
        fill={JAZZ_COLORS.GOLD}
        opacity="0.6"
      />
      <circle cx="20" cy="42" r="1.5" fill={JAZZ_COLORS.GOLD} opacity="0.5" />
      <circle cx="48" cy="18" r="1" fill={JAZZ_COLORS.GOLD} opacity="0.4" />
    </svg>
  );
});
