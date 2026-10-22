import { memo } from "react";
import { JAZZ_COLORS } from "@/components/pages/home/constants/palette";

export const CrowdIcon = memo(function CrowdIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="crowdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={JAZZ_COLORS.GOLD} />
        </linearGradient>
      </defs>
      <circle cx="20" cy="18" r="8" fill="url(#crowdGrad)" opacity="0.9" />
      <circle cx="44" cy="18" r="8" fill="url(#crowdGrad)" opacity="0.9" />
      <circle cx="32" cy="22" r="9" fill="url(#crowdGrad)" />
      <path d="M8 54 Q20 35 32 38 Q44 35 56 54" fill="url(#crowdGrad)" opacity="0.7" />
      <path d="M14 58 Q23 42 32 45 Q41 42 50 58" fill="url(#crowdGrad)" opacity="0.85" />
      <path
        d="M18 30 L16 22 M22 28 L24 20 M42 28 L40 20 M46 30 L48 22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
});
