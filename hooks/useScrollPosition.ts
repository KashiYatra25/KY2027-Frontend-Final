"use client";

import { useState, useEffect, useRef } from "react";

/**
 * This whole custom hook is being created for the purpose of customised navbar rendering based on mouse scroll.
 */

// Config for mouse scrolls.
export interface ScrollPosition {
  scrollY: number;
  viewportHeight: number;
  documentHeight: number;
  /** Progress through page (0-1) */
  progress: number;
}

export interface ScrollVisibilityConfig {
  /** Show when scrollY > this (default: 85% of viewport) */
  showAfterPercent?: number;
  /** Hide when within this distance from bottom on desktop (default: 150% of viewport from bottom) */
  hideBeforeBottomPercent?: number;
  /** Hide when within this distance from bottom on mobile (default: 50% of viewport from bottom) */
  hideBeforeBottomPercentMobile?: number;
  /** Only update state when progress changes by this amount (default: 0.5% = 0.005) */
  progressThreshold?: number;
}

// Helper to get initial values (safe for SSR)
function getInitialPosition(): ScrollPosition {
  if (typeof window === "undefined") {
    return { scrollY: 0, viewportHeight: 0, documentHeight: 0, progress: 0 };
  }
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const maxScroll = documentHeight - viewportHeight;
  const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
  return { scrollY, viewportHeight, documentHeight, progress };
}

function getInitialVisibility(
  showAfterPercent: number,
  hideBeforeBottomPercent: number,
  hideBeforeBottomPercentMobile: number
): boolean {
  if (typeof window === "undefined") return false;
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const isMobile = window.innerWidth < 640;
  const hidePercent = isMobile ? hideBeforeBottomPercentMobile : hideBeforeBottomPercent;
  const showThreshold = viewportHeight * showAfterPercent;
  const hideThreshold = documentHeight - viewportHeight * hidePercent;
  return scrollY > showThreshold && scrollY < hideThreshold;
}

/**
 * Hook to track scroll position and compute visibility state.
 * Uses percentage-based throttling - only updates when scroll changes meaningfully.
 */
export function useScrollPosition(config?: ScrollVisibilityConfig) {
  const {
    showAfterPercent = 0.85,
    hideBeforeBottomPercent = 1.5,
    hideBeforeBottomPercentMobile = 0.5,
    progressThreshold = 0.005,
  } = config || {};

  // Lazy initial state - runs only once, no useEffect needed
  const [position, setPosition] = useState<ScrollPosition>(getInitialPosition);
  const [visible, setVisible] = useState(() =>
    getInitialVisibility(showAfterPercent, hideBeforeBottomPercent, hideBeforeBottomPercentMobile)
  );

  // These refs hold the "last committed" values used as the throttle baseline
  // for comparisons inside handleScroll.
  //
  // lastProgressRef: `progress` is derived purely from scroll/document geometry
  //   and is INDEPENDENT of config. Its correct baseline is always the last
  //   progress we committed to state, so it must NOT be reset when config deps
  //   change — doing so would discard a valid baseline and could trigger a
  //   redundant setState on the next scroll.
  //
  // lastVisibleRef: `shouldBeVisible` DOES depend on config. If config changes
  //   while no scroll/resize event is pending, the returned `visible` would stay
  //   stale until the next event. The sync effect below recomputes visibility
  //   immediately on config change and keeps this ref aligned with the committed
  //   state so the throttle baseline stays correct.
  const lastProgressRef = useRef(position.progress);
  const lastVisibleRef = useRef(visible);

  // Recompute visibility immediately when config deps change, so a config update
  // is reflected without waiting for the next scroll/resize event. Keeps
  // lastVisibleRef in sync with the committed `visible` state.
  useEffect(() => {
    const shouldBeVisible = getInitialVisibility(
      showAfterPercent,
      hideBeforeBottomPercent,
      hideBeforeBottomPercentMobile
    );
    if (shouldBeVisible !== lastVisibleRef.current) {
      lastVisibleRef.current = shouldBeVisible;
      setVisible(shouldBeVisible);
    }
  }, [showAfterPercent, hideBeforeBottomPercent, hideBeforeBottomPercentMobile]);

  // Scroll listener only
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - viewportHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      const isMobile = window.innerWidth < 640;
      const hidePercent = isMobile ? hideBeforeBottomPercentMobile : hideBeforeBottomPercent;
      const showThreshold = viewportHeight * showAfterPercent;
      const hideThreshold = documentHeight - viewportHeight * hidePercent;
      const shouldBeVisible = scrollY > showThreshold && scrollY < hideThreshold;

      const progressChanged = Math.abs(progress - lastProgressRef.current) >= progressThreshold;
      const visibilityChanged = shouldBeVisible !== lastVisibleRef.current;

      // If there is only a significant change (Throttling the setState call)
      if (progressChanged || visibilityChanged) {
        lastProgressRef.current = progress;
        lastVisibleRef.current = shouldBeVisible;

        setPosition({ scrollY, viewportHeight, documentHeight, progress });
        setVisible(shouldBeVisible);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [showAfterPercent, hideBeforeBottomPercent, hideBeforeBottomPercentMobile, progressThreshold]);

  return { ...position, visible };
}
