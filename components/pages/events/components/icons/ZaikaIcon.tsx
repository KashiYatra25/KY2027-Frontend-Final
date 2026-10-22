"use client";

import { memo } from "react";

interface CategoryIconProps {
  className?: string;
  color?: string;
}

// ═══════════════════════════════════════════════════════════════════
// ZAIKA - Culinary (chef hat with steam)
// ═══════════════════════════════════════════════════════════════════
export const ZaikaIcon = memo(function ZaikaIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Chef hat top (toque) */}
      <path
        d="M16 28C12 28 10 24 10 20C10 14 16 10 20 10C22 6 26 4 32 4C38 4 42 6 44 10C48 10 54 14 54 20C54 24 52 28 48 28L16 28Z"
        fill={color}
        opacity="0.9"
      />
      {/* Hat band */}
      <rect x="14" y="28" width="36" height="6" rx="1" fill={color} />
      {/* Hat body pleats */}
      <path d="M20 10L22 28" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <path d="M28 6L28 28" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <path d="M36 6L36 28" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <path d="M44 10L42 28" stroke={color} strokeWidth="0.5" opacity="0.3" />
      {/* Plate */}
      <ellipse cx="32" cy="54" rx="20" ry="6" fill={color} opacity="0.7" />
      <ellipse cx="32" cy="52" rx="14" ry="4" fill={color} opacity="0.5" />
      {/* Steam wisps */}
      <path
        d="M24 40C24 38 26 36 26 38C26 40 24 42 24 40Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M32 38C32 36 34 34 34 36C34 38 32 40 32 38Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M40 40C40 38 42 36 42 38C42 40 40 42 40 40Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
});
