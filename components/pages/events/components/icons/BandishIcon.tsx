"use client";

import { memo } from "react";

interface CategoryIconProps {
  className?: string;
  color?: string;
}

// ═══════════════════════════════════════════════════════════════════
// BANDISH - Classical Music (tabla/sitar fusion)
// ═══════════════════════════════════════════════════════════════════
export const BandishIcon = memo(function BandishIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tabla - left drum */}
      <ellipse cx="20" cy="50" rx="12" ry="6" fill={color} opacity="0.9" />
      <path d="M8 50L8 36C8 32 13 28 20 28C27 28 32 32 32 36L32 50" fill={color} opacity="0.8" />
      <ellipse cx="20" cy="36" rx="12" ry="5" fill={color} />
      <circle cx="20" cy="36" r="5" fill="black" opacity="0.2" />
      {/* Tabla - right drum (smaller) */}
      <ellipse cx="46" cy="52" rx="10" ry="5" fill={color} opacity="0.9" />
      <path d="M36 52L36 40C36 36 40 33 46 33C52 33 56 36 56 40L56 52" fill={color} opacity="0.7" />
      <ellipse cx="46" cy="40" rx="10" ry="4" fill={color} opacity="0.8" />
      <circle cx="46" cy="40" r="4" fill="black" opacity="0.15" />
      {/* Musical notes floating */}
      <path
        d="M14 20C14 16 18 14 18 18L18 24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="16" cy="24" r="2" fill={color} opacity="0.5" />
      <path
        d="M50 14C50 10 54 8 54 12L54 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="52" cy="20" r="2" fill={color} opacity="0.5" />
    </svg>
  );
});
