"use client";

import { memo } from "react";

// ═══════════════════════════════════════════════════════════════════
// BACKGROUND DECOR — art deco pattern overlay
// (rendered before the main content, matching original DOM order)
// ═══════════════════════════════════════════════════════════════════

export const BackgroundDecor = memo(function BackgroundDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23FFD700' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: "60px 60px",
      }}
    />
  );
});
