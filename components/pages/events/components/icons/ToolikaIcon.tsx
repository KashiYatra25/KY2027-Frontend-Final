"use client";

import { memo } from "react";

interface CategoryIconProps {
  className?: string;
  color?: string;
}

// ═══════════════════════════════════════════════════════════════════
// TOOLIKA - Art (paintbrush with palette)
// ═══════════════════════════════════════════════════════════════════
export const ToolikaIcon = memo(function ToolikaIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Palette */}
      <path
        d="M12 36C12 28 20 22 32 22C44 22 52 28 52 36C52 44 44 52 32 52C20 52 12 44 12 36Z"
        fill={color}
        opacity="0.8"
      />
      {/* Thumb hole */}
      <ellipse cx="22" cy="40" rx="5" ry="4" fill="black" opacity="0.15" />
      {/* Paint dots */}
      <circle cx="32" cy="30" r="4" fill={color} opacity="0.5" />
      <circle cx="42" cy="34" r="3" fill={color} opacity="0.4" />
      <circle cx="38" cy="44" r="3.5" fill={color} opacity="0.45" />
      <circle cx="26" cy="46" r="3" fill={color} opacity="0.4" />
      {/* Paintbrush */}
      <rect x="40" y="4" width="4" height="24" rx="1" fill={color} transform="rotate(30 42 16)" />
      {/* Brush tip */}
      <path d="M52 8L58 4L56 12L52 8Z" fill={color} opacity="0.9" />
      {/* Ferrule */}
      <rect
        x="48"
        y="8"
        width="5"
        height="3"
        rx="0.5"
        fill={color}
        opacity="0.7"
        transform="rotate(30 50 9)"
      />
    </svg>
  );
});
