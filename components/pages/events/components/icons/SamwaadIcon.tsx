"use client";

import { memo } from "react";

interface CategoryIconProps {
  className?: string;
  color?: string;
}

// ═══════════════════════════════════════════════════════════════════
// SAMWAAD - Literary (open book with quill)
// ═══════════════════════════════════════════════════════════════════
export const SamwaadIcon = memo(function SamwaadIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Open book - left page */}
      <path
        d="M32 16C32 16 24 14 12 14L12 52C24 52 32 50 32 50L32 16Z"
        fill={color}
        opacity="0.85"
      />
      {/* Open book - right page */}
      <path
        d="M32 16C32 16 40 14 52 14L52 52C40 52 32 50 32 50L32 16Z"
        fill={color}
        opacity="0.9"
      />
      {/* Book spine */}
      <path d="M32 16L32 50" stroke={color} strokeWidth="2" />
      {/* Text lines - left */}
      <line x1="16" y1="24" x2="28" y2="24" stroke="black" strokeWidth="1" opacity="0.15" />
      <line x1="16" y1="30" x2="26" y2="30" stroke="black" strokeWidth="1" opacity="0.15" />
      <line x1="16" y1="36" x2="28" y2="36" stroke="black" strokeWidth="1" opacity="0.15" />
      <line x1="16" y1="42" x2="24" y2="42" stroke="black" strokeWidth="1" opacity="0.15" />
      {/* Text lines - right */}
      <line x1="36" y1="24" x2="48" y2="24" stroke="black" strokeWidth="1" opacity="0.15" />
      <line x1="36" y1="30" x2="46" y2="30" stroke="black" strokeWidth="1" opacity="0.15" />
      <line x1="36" y1="36" x2="48" y2="36" stroke="black" strokeWidth="1" opacity="0.15" />
      {/* Quill pen */}
      <path
        d="M48 8C48 8 52 4 56 2C56 6 54 10 50 14L46 18L44 16L48 8Z"
        fill={color}
        opacity="0.7"
      />
      <path d="M44 16L38 28" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
});
