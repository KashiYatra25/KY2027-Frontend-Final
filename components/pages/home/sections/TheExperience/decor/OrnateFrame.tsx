"use client";

import { memo } from "react";

// ═══════════════════════════════════════════════════════════════════
// ORNATE FRAME COMPONENT - Royal border decoration
// ═══════════════════════════════════════════════════════════════════

interface OrnateFrameProps {
  color: string;
  className?: string;
}

export const OrnateFrame = memo(function OrnateFrame({ color, className = "" }: OrnateFrameProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {/* Corner flourishes */}
      <svg className="absolute top-0 left-0 h-8 w-8 sm:h-12 sm:w-12" viewBox="0 0 48 48">
        <path
          d="M4 44 L4 20 Q4 4 20 4 L44 4"
          stroke={color}
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        <circle cx="8" cy="8" r="3" fill={color} opacity="0.4" />
      </svg>
      <svg className="absolute top-0 right-0 h-8 w-8 rotate-90 sm:h-12 sm:w-12" viewBox="0 0 48 48">
        <path
          d="M4 44 L4 20 Q4 4 20 4 L44 4"
          stroke={color}
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        <circle cx="8" cy="8" r="3" fill={color} opacity="0.4" />
      </svg>
      <svg
        className="absolute bottom-0 left-0 h-8 w-8 -rotate-90 sm:h-12 sm:w-12"
        viewBox="0 0 48 48"
      >
        <path
          d="M4 44 L4 20 Q4 4 20 4 L44 4"
          stroke={color}
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        <circle cx="8" cy="8" r="3" fill={color} opacity="0.4" />
      </svg>
      <svg
        className="absolute right-0 bottom-0 h-8 w-8 rotate-180 sm:h-12 sm:w-12"
        viewBox="0 0 48 48"
      >
        <path
          d="M4 44 L4 20 Q4 4 20 4 L44 4"
          stroke={color}
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        <circle cx="8" cy="8" r="3" fill={color} opacity="0.4" />
      </svg>
    </div>
  );
});
