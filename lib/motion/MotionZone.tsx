"use client";

import { useAnimationPolicy } from "@/hooks";
import { ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

/**
 * MotionZone Context
 *
 * Provides animation state to descendants. Framer-motion components
 * can read this to honor the zone's pause state.
 */
interface MotionZoneContextValue {
  /** Whether animations should be running */
  isAnimating: boolean;
  /** Whether device is mobile (for layout decisions) */
  isMobile: boolean;
}

const MotionZoneContext = createContext<MotionZoneContextValue>({
  isAnimating: true,
  isMobile: false,
});

/**
 * Hook for descendants to read the zone's animation state.
 * Useful for framer-motion components that need to conditionally animate.
 *
 * @example
 * const { isAnimating, isMobile } = useMotionZone();
 *
 * // Animation decision
 * <motion.div animate={isAnimating ? { scale: [1, 1.1, 1] } : {}} />
 *
 * // Layout decision (independent of animation policy)
 * {!isMobile && <DecorativeElement />}
 */
export function useMotionZone() {
  const context = useContext(MotionZoneContext);
  if (context === undefined) {
    throw new Error("useMotionZone must be used within a MotionZone");
  }
  return context;
}

interface MotionZoneProps {
  children: ReactNode;
  /**
   * Root margin for IntersectionObserver.
   * Default "10%" means animations resume when within 10% of viewport.
   */
  rootMargin?: string;
  /**
   * Intersection threshold. Default 0 means any pixel visible triggers.
   */
  threshold?: number;
  /**
   * Optional className for the wrapper div.
   */
  className?: string;
  /**
   * Optional inline styles for the wrapper div.
   */
  style?: React.CSSProperties;
  /**
   * If true, skip the IntersectionObserver and only gate on reduced-motion.
   * Useful for always-visible zones.
   */
  alwaysVisible?: boolean;
}

/**
 * MotionZone — a container that pauses ambient animations when:
 * - The zone is off-screen (IntersectionObserver)
 * - User prefers reduced motion (prefers-reduced-motion: reduce)
 *
 * Gates three animation mechanisms:
 * - SVG SMIL: calls pauseAnimations()/unpauseAnimations() on SVG descendants
 * - CSS @keyframes: sets animation-play-state: paused via inline style
 * - Framer-motion: provides context that descendants can read
 *
 * Use for decorative/ambient animation clusters (diyas, birds, particles).
 * Do NOT wrap interactive controls (buttons, cards with hover feedback).
 *
 * @example
 * <MotionZone>
 *   <River />  // All SMIL animations inside pause when off-screen
 * </MotionZone>
 */
export function MotionZone({
  children,
  rootMargin = "10%",
  threshold = 0,
  className = "",
  style,
  alwaysVisible = false,
}: MotionZoneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate, isMobile } = useAnimationPolicy();
  const [isInView, setIsInView] = useState(false);

  // Compute whether animations should run (policy + in-view)
  const isAnimating = shouldAnimate && isInView;

  // Track in-view state via IntersectionObserver
  useEffect(() => {
    if (alwaysVisible) {
      setIsInView(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Skip on server or if IntersectionObserver unavailable
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [rootMargin, threshold, alwaysVisible]);

  // Pause/unpause SVG SMIL animations when isAnimating changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const svgs = container.querySelectorAll("svg");
    svgs.forEach((svg) => {
      try {
        if (isAnimating) {
          (svg as SVGSVGElement).unpauseAnimations?.();
        } else {
          (svg as SVGSVGElement).pauseAnimations?.();
        }
      } catch {
        // Some SVGs may not support SMIL methods; ignore
      }
    });
  }, [isAnimating]);

  // Context value for framer-motion descendants
  const contextValue = useMemo(() => ({ isAnimating, isMobile }), [isAnimating, isMobile]);

  return (
    <MotionZoneContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={className}
        style={{
          ...style,
          // Gate CSS @keyframes animations
          animationPlayState: isAnimating ? "running" : "paused",
        }}
        data-motion-paused={!isAnimating}
      >
        {children}
      </div>
    </MotionZoneContext.Provider>
  );
}
