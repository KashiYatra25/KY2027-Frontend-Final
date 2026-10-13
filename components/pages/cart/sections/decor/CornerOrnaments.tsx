"use client";

import { COLORS } from "@/components/pages/cart/constants/palette";

/**
 * Decorative corner ornaments for the page
 */
export function CornerOrnaments() {
  const ornamentStyle = {
    width: "120px",
    height: "120px",
    opacity: 0.15,
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Top-left corner */}
      <div className="absolute top-20 left-4 sm:left-8" style={ornamentStyle}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 0 Q50 10, 50 50 Q10 50, 0 0"
            fill="none"
            stroke={COLORS.GOLD}
            strokeWidth="1"
          />
          <circle cx="25" cy="25" r="3" fill={COLORS.GOLD} />
          <path d="M10 10 L30 10 M10 10 L10 30" stroke={COLORS.GOLD} strokeWidth="0.5" />
        </svg>
      </div>

      {/* Top-right corner */}
      <div
        className="absolute top-20 right-4 sm:right-8"
        style={{ ...ornamentStyle, transform: "scaleX(-1)" }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 0 Q50 10, 50 50 Q10 50, 0 0"
            fill="none"
            stroke={COLORS.GOLD}
            strokeWidth="1"
          />
          <circle cx="25" cy="25" r="3" fill={COLORS.GOLD} />
          <path d="M10 10 L30 10 M10 10 L10 30" stroke={COLORS.GOLD} strokeWidth="0.5" />
        </svg>
      </div>

      {/* Bottom-left corner */}
      <div
        className="absolute bottom-8 left-4 sm:left-8"
        style={{ ...ornamentStyle, transform: "scaleY(-1)" }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 0 Q50 10, 50 50 Q10 50, 0 0"
            fill="none"
            stroke={COLORS.GOLD}
            strokeWidth="1"
          />
          <circle cx="25" cy="25" r="3" fill={COLORS.GOLD} />
        </svg>
      </div>

      {/* Bottom-right corner */}
      <div
        className="absolute right-4 bottom-8 sm:right-8"
        style={{ ...ornamentStyle, transform: "scale(-1, -1)" }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 0 Q50 10, 50 50 Q10 50, 0 0"
            fill="none"
            stroke={COLORS.GOLD}
            strokeWidth="1"
          />
          <circle cx="25" cy="25" r="3" fill={COLORS.GOLD} />
        </svg>
      </div>
    </div>
  );
}
