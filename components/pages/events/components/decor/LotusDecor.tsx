"use client";

import { memo } from "react";

interface DecorSvgProps {
  color: string;
  className?: string;
}

// Lotus flower - symbol of purity and celebration
export const LotusDecor = memo(function LotusDecor({ color, className = "" }: DecorSvgProps) {
  return (
    <svg viewBox="0 0 120 100" fill="none" className={className} style={{ opacity: 0.12 }}>
      {/* Center petal */}
      <path
        d="M60 10 Q70 30 60 55 Q50 30 60 10"
        stroke={color}
        strokeWidth="1.5"
        fill={`${color}20`}
      />
      {/* Left petals */}
      <path
        d="M40 25 Q55 40 45 60 Q30 40 40 25"
        stroke={color}
        strokeWidth="1.2"
        fill={`${color}15`}
        transform="rotate(-15, 60, 50)"
      />
      <path
        d="M25 40 Q45 50 35 70 Q15 55 25 40"
        stroke={color}
        strokeWidth="1"
        fill={`${color}10`}
        transform="rotate(-25, 60, 50)"
      />
      {/* Right petals */}
      <path
        d="M80 25 Q65 40 75 60 Q90 40 80 25"
        stroke={color}
        strokeWidth="1.2"
        fill={`${color}15`}
        transform="rotate(15, 60, 50)"
      />
      <path
        d="M95 40 Q75 50 85 70 Q105 55 95 40"
        stroke={color}
        strokeWidth="1"
        fill={`${color}10`}
        transform="rotate(25, 60, 50)"
      />
      {/* Base */}
      <ellipse
        cx="60"
        cy="70"
        rx="25"
        ry="8"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      {/* Center dot */}
      <circle cx="60" cy="45" r="4" fill={color} opacity="0.4" />
    </svg>
  );
});
