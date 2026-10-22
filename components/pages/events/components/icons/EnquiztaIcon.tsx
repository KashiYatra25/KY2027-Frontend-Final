"use client";

import { memo } from "react";

interface CategoryIconProps {
  className?: string;
  color?: string;
}

// ═══════════════════════════════════════════════════════════════════
// ENQUIZTA - Quiz (lightbulb with question mark)
// ═══════════════════════════════════════════════════════════════════
export const EnquiztaIcon = memo(function EnquiztaIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lightbulb glass */}
      <path
        d="M32 6C22 6 14 14 14 24C14 32 20 38 24 42L24 48L40 48L40 42C44 38 50 32 50 24C50 14 42 6 32 6Z"
        fill={color}
        opacity="0.9"
      />
      {/* Bulb base */}
      <rect x="24" y="48" width="16" height="4" rx="1" fill={color} />
      <rect x="26" y="52" width="12" height="3" rx="1" fill={color} opacity="0.8" />
      <rect x="28" y="55" width="8" height="3" rx="1" fill={color} opacity="0.6" />
      {/* Question mark inside */}
      <path
        d="M28 22C28 18 32 16 36 18C40 20 38 26 34 28L34 32"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.25"
      />
      <circle cx="34" cy="38" r="2" fill="black" opacity="0.25" />
      {/* Glow rays */}
      <path d="M32 2L32 0" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M48 10L52 6" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M16 10L12 6" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M54 24L58 24" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M10 24L6 24" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
});
