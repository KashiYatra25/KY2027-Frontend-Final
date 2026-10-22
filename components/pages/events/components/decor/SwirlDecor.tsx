"use client";

import { memo } from "react";

interface DecorSvgProps {
  color: string;
  className?: string;
}

// Swirl/wave pattern
export const SwirlDecor = memo(function SwirlDecor({ color, className = "" }: DecorSvgProps) {
  return (
    <svg viewBox="0 0 150 50" fill="none" className={className} style={{ opacity: 0.1 }}>
      <path
        d="M0 25 Q15 5 30 25 Q45 45 60 25 Q75 5 90 25 Q105 45 120 25 Q135 5 150 25"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M0 25 Q15 15 30 25 Q45 35 60 25 Q75 15 90 25 Q105 35 120 25 Q135 15 150 25"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
});
