"use client";

import { memo } from "react";

/**
 * TopBorder - Top neon line border
 */
export const TopBorder = memo(function TopBorder() {
  return (
    <div className="absolute top-0 right-0 left-0">
      <div
        className="h-[1px]"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            rgba(30, 30, 74, 0.6) 20%,
            rgba(100, 100, 180, 0.4) 50%,
            rgba(30, 30, 74, 0.6) 80%,
            transparent 100%
          )`,
        }}
      />
      <div
        className="hidden h-8 opacity-30 sm:block"
        style={{
          background: `linear-gradient(180deg, rgba(30, 30, 80, 0.5) 0%, transparent 100%)`,
          filter: "blur(10px)",
        }}
      />
    </div>
  );
});
