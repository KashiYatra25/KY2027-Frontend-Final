"use client";

import { memo } from "react";

interface CategoryIconProps {
  className?: string;
  color?: string;
}

// ═══════════════════════════════════════════════════════════════════
// CROSSWINDZ - Music (electric guitar)
// ═══════════════════════════════════════════════════════════════════
export const CrosswindzIcon = memo(function CrosswindzIcon({
  className,
  color = "currentColor",
}: CategoryIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Guitar body */}
      <path
        d="M20 36C16 36 12 40 12 46C12 52 16 56 22 56C26 56 30 54 32 50C34 54 38 56 42 56C48 56 52 52 52 46C52 40 48 36 44 36C40 36 38 38 36 40L32 44L28 40C26 38 24 36 20 36Z"
        fill={color}
        opacity="0.9"
      />
      {/* Sound hole */}
      <circle cx="26" cy="46" r="4" fill="black" opacity="0.2" />
      <circle cx="38" cy="46" r="4" fill="black" opacity="0.2" />
      {/* Neck */}
      <rect x="30" y="8" width="4" height="32" rx="1" fill={color} />
      {/* Headstock */}
      <path d="M28 8L36 8L38 4L26 4L28 8Z" fill={color} />
      {/* Tuning pegs */}
      <circle cx="28" cy="6" r="1.5" fill={color} opacity="0.7" />
      <circle cx="36" cy="6" r="1.5" fill={color} opacity="0.7" />
      {/* Strings */}
      <line x1="30" y1="12" x2="30" y2="40" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="32" y1="12" x2="32" y2="40" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="34" y1="12" x2="34" y2="40" stroke={color} strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
});
