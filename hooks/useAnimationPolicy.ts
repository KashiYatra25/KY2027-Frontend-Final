"use client";

import { useEffect, useMemo, useState } from "react";
import { useIsMobile } from "./useIsMobile";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Central animation policy for the entire app.
 *
 * Consolidates breakpoint + reduced-motion checks into one module.
 * MotionZone uses this + in-view detection for its gating.
 *
 * @example
 * const { shouldAnimate, isMobile } = useAnimationPolicy();
 *
 * // Animation decision (respects mobile + accessibility)
 * <motion.div animate={shouldAnimate ? { y: [0, -10, 0] } : {}} />
 *
 * // Layout decision (only screen size, not accessibility)
 * {!isMobile && <DecorativeElement />}
 *
 * // Early return for purely decorative animations
 * if (!shouldAnimate) return null;
 */

/** Single source of truth for mobile breakpoint */
export const ANIMATION_MOBILE_BREAKPOINT = 768;

export interface AnimationPolicy {
  /**
   * Master switch for animations.
   * False if mobile OR user prefers reduced motion.
   * Use for: floating animations, particles, decorative effects.
   */
  shouldAnimate: boolean;

  /**
   * Screen is mobile-sized (< 768px).
   * Use for: layout decisions, showing/hiding elements, "tap" vs "hover" text.
   * NOTE: A desktop user with reduced-motion enabled will have isMobile=false.
   */
  isMobile: boolean;

  /**
   * User has enabled "Reduce Motion" in OS settings.
   * Rarely needed directly - prefer shouldAnimate.
   */
  prefersReducedMotion: boolean;
}

export function useAnimationPolicy(): AnimationPolicy {
  const isMobile = useIsMobile(ANIMATION_MOBILE_BREAKPOINT);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Both useIsMobile and usePrefersReducedMotion default to `false` during SSR
  // and the first client render. Without this guard, shouldAnimate would be
  // `true` on first render (!false && !false), causing animations to start and
  // then flip off once the client effects resolve the real values.
  //
  // We gate shouldAnimate on `mounted` so it stays `false` until the client has
  // hydrated and the underlying hooks have measured the actual environment.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return useMemo(
    () => ({
      shouldAnimate: mounted && !isMobile && !prefersReducedMotion,
      isMobile,
      prefersReducedMotion,
    }),
    [mounted, isMobile, prefersReducedMotion]
  );
}
