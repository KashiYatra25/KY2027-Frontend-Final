import { memo } from "react";
import { JAZZ_COLORS } from "@/components/pages/home/constants/palette";

export const FoodIcon = memo(function FoodIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="bowlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={JAZZ_COLORS.GOLD} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="44" rx="22" ry="10" fill="url(#bowlGrad)" />
      <path d="M10 44 Q10 58 32 58 Q54 58 54 44" fill={color} />
      <ellipse cx="32" cy="40" rx="18" ry="6" fill={JAZZ_COLORS.AMBER} opacity="0.8" />
      <line x1="38" y1="20" x2="48" y2="38" stroke={JAZZ_COLORS.GOLD} strokeWidth="2" />
      <line x1="42" y1="18" x2="50" y2="36" stroke={JAZZ_COLORS.GOLD_DARK} strokeWidth="2" />
      <path
        d="M24 30 Q22 24 26 20 Q24 16 28 12"
        stroke={JAZZ_COLORS.CREAM}
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      >
        <animate
          attributeName="d"
          dur="2s"
          repeatCount="indefinite"
          values="M24 30 Q22 24 26 20 Q24 16 28 12;M24 30 Q26 24 22 20 Q26 16 24 12;M24 30 Q22 24 26 20 Q24 16 28 12"
        />
      </path>
      <path
        d="M32 28 Q30 22 34 18 Q32 14 36 10"
        stroke={JAZZ_COLORS.CREAM}
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      >
        <animate
          attributeName="d"
          dur="2.5s"
          repeatCount="indefinite"
          values="M32 28 Q30 22 34 18 Q32 14 36 10;M32 28 Q34 22 30 18 Q34 14 32 10;M32 28 Q30 22 34 18 Q32 14 36 10"
        />
      </path>
    </svg>
  );
});
