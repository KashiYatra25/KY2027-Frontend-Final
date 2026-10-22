"use client";

import { memo } from "react";

interface DecorSvgProps {
  color: string;
  className?: string;
}

// Rangoli star pattern
export const RangoliStar = memo(function RangoliStar({ color, className = "" }: DecorSvgProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} style={{ opacity: 0.12 }}>
      {/* 8-pointed star */}
      <path
        d="M50 5 L55 40 L90 35 L60 50 L90 65 L55 60 L50 95 L45 60 L10 65 L40 50 L10 35 L45 40 Z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner star */}
      <path
        d="M50 20 L53 45 L75 42 L55 50 L75 58 L53 55 L50 80 L47 55 L25 58 L45 50 L25 42 L47 45 Z"
        stroke={color}
        strokeWidth="1"
        fill={`${color}15`}
        opacity="0.7"
      />
      {/* Center */}
      <circle cx="50" cy="50" r="8" stroke={color} strokeWidth="1" fill={`${color}25`} />
      <circle cx="50" cy="50" r="3" fill={color} opacity="0.5" />
    </svg>
  );
});
