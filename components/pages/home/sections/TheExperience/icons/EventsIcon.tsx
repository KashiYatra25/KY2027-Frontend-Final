import { memo } from "react";
import { JAZZ_COLORS } from "@/components/pages/home/constants/palette";

export const EventsIcon = memo(function EventsIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="maskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="50%" stopColor={JAZZ_COLORS.DEEP_MAGENTA} />
          <stop offset="100%" stopColor={JAZZ_COLORS.GOLD} />
        </linearGradient>
      </defs>
      <ellipse cx="22" cy="28" rx="14" ry="18" fill="url(#maskGrad)" />
      <ellipse cx="16" cy="24" rx="3" ry="4" fill={JAZZ_COLORS.BG_DEEP} />
      <ellipse cx="28" cy="24" rx="3" ry="4" fill={JAZZ_COLORS.BG_DEEP} />
      <path d="M14 36 Q22 44 30 36" stroke={JAZZ_COLORS.BG_DEEP} strokeWidth="2.5" fill="none" />
      <ellipse cx="42" cy="36" rx="14" ry="18" fill={color} opacity="0.6" />
      <ellipse cx="36" cy="32" rx="3" ry="4" fill={JAZZ_COLORS.BG_DEEP} />
      <ellipse cx="48" cy="32" rx="3" ry="4" fill={JAZZ_COLORS.BG_DEEP} />
      <path d="M34 46 Q42 40 50 46" stroke={JAZZ_COLORS.BG_DEEP} strokeWidth="2" fill="none" />
      <path
        d="M8 50 Q12 45 18 48"
        stroke={JAZZ_COLORS.GOLD}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
});
