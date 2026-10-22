"use client";

import { memo } from "react";

interface CategoryIconProps {
  className?: string;
  color?: string;
}

// ═══════════════════════════════════════════════════════════════════
// ABHINAY - Theatre (comedy/tragedy masks)
// ═══════════════════════════════════════════════════════════════════
export const AbhinayIcon = memo(function AbhinayIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Happy mask - front */}
      <path
        d="M10 18C10 12 18 8 26 8C34 8 42 12 42 18L42 34C42 42 34 48 26 48C18 48 10 42 10 34L10 18Z"
        fill={color}
        opacity="0.95"
      />
      {/* Happy eyes */}
      <path
        d="M18 22C18 20 20 18 22 20"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M30 22C30 20 32 18 34 20"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />
      {/* Happy smile */}
      <path
        d="M18 34C22 40 30 40 34 34"
        stroke="black"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      {/* Sad mask - behind */}
      <path
        d="M22 24C22 18 30 14 38 14C46 14 54 18 54 24L54 40C54 48 46 54 38 54C30 54 22 48 22 40L22 24Z"
        fill={color}
        opacity="0.5"
      />
      {/* Sad eyes */}
      <path
        d="M32 30C32 32 34 34 36 32"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.2"
      />
      <path
        d="M44 30C44 32 46 34 48 32"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.2"
      />
      {/* Sad frown */}
      <path
        d="M32 46C36 42 44 42 48 46"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.2"
      />
    </svg>
  );
});
