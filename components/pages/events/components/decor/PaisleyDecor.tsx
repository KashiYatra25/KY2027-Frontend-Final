"use client";

import { memo } from "react";

interface DecorSvgProps {
  color: string;
  className?: string;
}

// Paisley/Mango motif - traditional Indian design
export const PaisleyDecor = memo(function PaisleyDecor({ color, className = "" }: DecorSvgProps) {
  return (
    <svg viewBox="0 0 100 150" fill="none" className={className} style={{ opacity: 0.15 }}>
      <path
        d="M50 10 C20 10 5 40 5 70 C5 110 30 140 50 140 C70 140 95 110 95 70 C95 40 80 10 50 10 Z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M50 25 C30 25 20 45 20 65 C20 95 35 120 50 120 C65 120 80 95 80 65 C80 45 70 25 50 25 Z"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.7"
      />
      <circle cx="50" cy="55" r="8" fill={color} opacity="0.3" />
      <path d="M50 70 Q40 85 50 100 Q60 85 50 70" stroke={color} strokeWidth="1" fill="none" />
      <path d="M35 45 Q50 35 65 45" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
});
