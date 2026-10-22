import { memo } from "react";
import { JAZZ_COLORS } from "@/components/pages/home/constants/palette";

export const StageIcon = memo(function StageIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="stageGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={JAZZ_COLORS.GOLD} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="14" rx="8" ry="10" fill="url(#stageGrad)" />
      <rect x="30" y="24" width="4" height="20" fill={color} />
      <ellipse cx="32" cy="48" rx="12" ry="4" fill={color} opacity="0.5" />
      {[...Array(5)].map((_, i) => (
        <line
          key={i}
          x1="26"
          y1={8 + i * 3}
          x2="38"
          y2={8 + i * 3}
          stroke={JAZZ_COLORS.BG_DEEP}
          strokeWidth="1.5"
          opacity="0.4"
        />
      ))}
      <path d="M18 14 Q14 14 14 20" stroke={color} strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M12 10 Q6 14 6 24" stroke={color} strokeWidth="2" fill="none" opacity="0.3" />
      <path d="M46 14 Q50 14 50 20" stroke={color} strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M52 10 Q58 14 58 24" stroke={color} strokeWidth="2" fill="none" opacity="0.3" />
    </svg>
  );
});
