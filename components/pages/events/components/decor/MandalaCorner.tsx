"use client";

import { memo } from "react";

interface DecorSvgProps {
  color: string;
  className?: string;
}

// Mandala corner piece - ornate geometric pattern
export const MandalaCorner = memo(function MandalaCorner({ color, className = "" }: DecorSvgProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} style={{ opacity: 0.1 }}>
      {/* Concentric arcs */}
      <path d="M0 200 Q0 0 200 0" stroke={color} strokeWidth="2" fill="none" />
      <path d="M0 160 Q0 40 160 0" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M0 120 Q0 80 120 0" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M0 80 Q0 120 80 0" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
      {/* Decorative dots along the arc */}
      {[40, 80, 120, 160].map((pos, i) => (
        <circle
          key={i}
          cx={pos * 0.3}
          cy={200 - pos}
          r={3 - i * 0.5}
          fill={color}
          opacity={0.5 - i * 0.1}
        />
      ))}
      {/* Inner ornament */}
      <path d="M20 180 L40 160 L20 140" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
});
