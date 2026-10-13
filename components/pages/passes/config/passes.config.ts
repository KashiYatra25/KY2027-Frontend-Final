/**
 * Pass page configuration for Kashiyatra
 * Animation and sizing configuration - pass data comes from backend API
 */

// Types are defined in lib/api/helper/types/pass.types.ts
// PassConfig, PassBenefit, PassDetailItem are re-exported from there via lib/api/helper/types

/**
 * Animation configuration - tune these values to adjust feel
 */
export const ANIMATION = {
  // Card entry animation
  stagger: {
    delayChildren: 0.2,
    staggerChildren: 0.15,
  },

  // Container variants for section animations
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.15, when: "beforeChildren" },
    },
  },

  // Card variants
  card: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }, // easeOut
    },
  },

  // Pass image floating
  float: {
    duration: 3,
    ease: [0.45, 0.05, 0.55, 0.95] as const, // easeInOut
    repeat: Infinity,
    repeatType: "reverse" as const,
  },

  // Hover effects
  hover: {
    scale: 1.03,
    y: -12,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }, // easeOut
  },

  // Image hover
  imageHover: {
    scale: 1.08,
    transition: { duration: 0.3 },
  },

  // Button shimmer
  shimmer: {
    duration: 2,
    repeat: Infinity,
    ease: "linear" as const,
  },
} as const;

/**
 * Responsive breakpoints for pass card sizing
 */
export const CARD_SIZES = {
  mobile: {
    width: "100%",
    imageHeight: 280,
  },
  tablet: {
    width: "300px",
    imageHeight: 320,
  },
  desktop: {
    width: "340px",
    imageHeight: 380,
  },
} as const;
