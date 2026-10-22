"use client";

import { memo } from "react";

interface DecorSvgProps {
  color: string;
  className?: string;
}

// Diya/lamp flame - festive element
export const DiyaDecor = memo(function DiyaDecor({ color, className = "" }: DecorSvgProps) {
  return (
    <svg viewBox="0 0 60 100" fill="none" className={className} style={{ opacity: 0.15 }}>
      {/* Flame */}
      <path
        d="M30 5 Q45 25 30 45 Q15 25 30 5"
        stroke={color}
        strokeWidth="1.5"
        fill={`${color}30`}
      />
      <path
        d="M30 15 Q38 28 30 38 Q22 28 30 15"
        stroke={color}
        strokeWidth="1"
        fill={`${color}20`}
      />
      {/* Lamp base */}
      <ellipse
        cx="30"
        cy="55"
        rx="20"
        ry="6"
        stroke={color}
        strokeWidth="1.5"
        fill={`${color}15`}
      />
      <path
        d="M10 55 Q10 75 20 80 L40 80 Q50 75 50 55"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Base stand */}
      <ellipse
        cx="30"
        cy="85"
        rx="15"
        ry="4"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <path d="M20 80 L20 85 M40 80 L40 85" stroke={color} strokeWidth="1" opacity="0.6" />
    </svg>
  );
});
