/**
 * Shared React Hooks
 *
 * Reusable hooks extracted from components for testability and leverage.
 */

export { useIsMobile } from "./useIsMobile";
export { useScrollPosition } from "./useScrollPosition";
export { usePrefersReducedMotion } from "./usePrefersReducedMotion";
export { useAnimationPolicy, ANIMATION_MOBILE_BREAKPOINT } from "./useAnimationPolicy";
export type { AnimationPolicy } from "./useAnimationPolicy";
export { useModalA11y } from "./useModalA11y";
export { useViewport } from "./useViewport";
export type { Viewport } from "./useViewport";
