"use client";

import { memo } from "react";

interface CategoryIconProps {
  className?: string;
  color?: string;
}

// ═══════════════════════════════════════════════════════════════════
// NATRAJ - Dance (elegant classical dancer pose)
// ═══════════════════════════════════════════════════════════════════
export const NatrajIcon = memo(function NatrajIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="32" cy="10" r="5" fill={color} />
      {/* Body */}
      <path
        d="M32 15C32 15 30 22 30 28C30 32 31 36 32 40"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Right arm raised */}
      <path d="M32 20C36 18 42 14 46 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Left arm extended */}
      <path d="M32 22C28 24 22 28 16 30" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Right leg bent */}
      <path d="M32 40C34 44 38 48 42 54" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Left leg extended */}
      <path d="M32 40C30 46 26 52 20 58" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Decorative swirl - dance motion */}
      <path
        d="M46 10C48 8 50 10 48 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M16 30C12 32 12 36 16 36"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
});
