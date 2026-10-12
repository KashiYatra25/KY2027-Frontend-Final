"use client";

import { ThemedNavbar } from "@/components/navbar";
import { useScrollPosition } from "@/hooks/useScrollPosition";

/**
 * Navbar Exports
 *
 * Usage:
 *   import { Navbar, ThemedNavbar } from "@/components/navbar/Navbar";
 *
 *   // Default scroll-aware navbar
 *   <Navbar />
 *
 *   // Or use themed navbar directly
 *   <ThemedNavbar position="fixed" topOffset={18} theme="main" />
 */

/**
 * Navbar (Default)
 *
 * A single, page-level fixed navbar that:
 * 1. Is hidden while Hero, ProNites, and FestivalVibes sections are on screen
 * 2. Reveals once the user scrolls past 85% of viewport height
 * 3. Hides again when near the footer
 *
 * Uses useScrollPosition hook for smart throttling and mobile-aware thresholds.
 */
export function Navbar() {
  const { visible } = useScrollPosition({
    showAfterPercent: 0.85, // Show after scrolling ~85% of viewport (when ProNites header visible)
    hideBeforeBottomPercent: 1.5, // Hide when 1.5x viewport from bottom (desktop)
    hideBeforeBottomPercentMobile: 0.5, // Hide when 0.5x viewport from bottom (mobile)
  });

  return (
    <div
      className="fixed inset-x-0 top-0 z-[200]"
      style={{
        transform: visible ? "translateY(0) translateZ(0)" : "translateY(-120%) translateZ(0)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        willChange: "transform, opacity",
        transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        backfaceVisibility: "hidden",
      }}
      aria-hidden={!visible}
    >
      <ThemedNavbar position="relative" topOffset={18} theme="main" />
    </div>
  );
}
