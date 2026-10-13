// ═══════════════════════════════════════════════════════════════════
// GALLERY PAGE COLOR PALETTE
//
// Cinematic film-reel aesthetic with warm golds, deep purples, and
// rani pink accents. Inspired by vintage cameras and festival energy.
// ═══════════════════════════════════════════════════════════════════

export const COLORS = {
  // Deep backgrounds
  INK: "#1b0f24",
  PAPER: "#fbf3e4",
  FILM: "#0d0713",
  BG_DEEP: "#0a0612",

  // Primary palette
  MARIGOLD: "#f5a623",
  RANI: "#e5337c",
  GOLD: "#D4A853",
  BRIGHT_GOLD: "#FFD700",

  // Text colors
  TEXT: "#f6ecdc",
  TEXT_DIM: "#b9a8c4",
  TEXT_DARK: "#1b0f24",

  // Accents
  SAFFRON: "#FF6B00",
  MAROON: "#8B1538",
  CREAM: "#FDF6E3",
  PURPLE: "#8a4bff",
} as const;

// ═══════════════════════════════════════════════════════════════════
// CSS VARIABLES - For use in Tailwind classes and inline styles
// ═══════════════════════════════════════════════════════════════════

export const CSS_VARS = {
  "--gallery-ink": COLORS.INK,
  "--gallery-paper": COLORS.PAPER,
  "--gallery-marigold": COLORS.MARIGOLD,
  "--gallery-rani": COLORS.RANI,
  "--gallery-text": COLORS.TEXT,
  "--gallery-text-dim": COLORS.TEXT_DIM,
  "--gallery-film": COLORS.FILM,
} as const;

// ═══════════════════════════════════════════════════════════════════
// GRADIENTS
// ═══════════════════════════════════════════════════════════════════

export const GRADIENTS = {
  // Page background glows
  GLOW_PRIMARY: `radial-gradient(420px 320px at 82% 18%, rgba(245,166,35,0.28), transparent 70%),
                 radial-gradient(520px 380px at 12% 8%, rgba(229,51,124,0.24), transparent 70%)`,
  GLOW_SECONDARY: `radial-gradient(480px 360px at 90% 30%, rgba(229,51,124,0.16), transparent 70%),
                   radial-gradient(420px 320px at 6% 70%, rgba(245,166,35,0.14), transparent 70%)`,
  GLOW_TERTIARY: `radial-gradient(520px 380px at 10% 20%, rgba(245,166,35,0.15), transparent 70%),
                  radial-gradient(460px 340px at 92% 75%, rgba(229,51,124,0.15), transparent 70%)`,

  // Title gradient
  TITLE: `linear-gradient(135deg, ${COLORS.BRIGHT_GOLD} 0%, ${COLORS.GOLD} 50%, ${COLORS.SAFFRON} 100%)`,

  // Golden card gradient
  PERFORMER_CARD: "linear-gradient(160deg, #cf9a42, #a8742a)",

  // Spotlight beams
  BEAM_GOLD: `linear-gradient(to bottom, rgba(245,166,35,0.62) 0%, transparent 88%)`,
  BEAM_RANI: `linear-gradient(to bottom, rgba(229,51,124,0.62) 0%, transparent 88%)`,
  BEAM_PURPLE: `linear-gradient(to bottom, rgba(138,75,255,0.62) 0%, transparent 88%)`,

  // Animated ring gradient (for special videos)
  RING: `conic-gradient(${COLORS.MARIGOLD}, ${COLORS.RANI}, ${COLORS.PURPLE}, ${COLORS.MARIGOLD})`,
} as const;

// ═══════════════════════════════════════════════════════════════════
// SHADOWS / GLOWS
// ═══════════════════════════════════════════════════════════════════

export const SHADOWS = {
  REEL: "0 22px 36px -22px rgba(0,0,0,0.8)",
  CARD: "0 24px 40px -22px rgba(0,0,0,0.85)",
  LIGHTBOX: "0 30px 70px rgba(0,0,0,0.7)",
  FRAME_BORDER: `10px solid ${COLORS.PAPER}`,
  TITLE_TEXT: `0.045em 0.045em 0 ${COLORS.RANI}`,
  SECTION_TITLE: `0.04em 0.04em 0 ${COLORS.RANI}`,
} as const;

// ═══════════════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════════════

export const ANIMATIONS = {
  // Film reel scroll durations
  REEL_FAST: "46s",
  REEL_SLOW: "54s",
  VIDEO_REEL: "40s",

  // Card float
  FLOAT_DURATION: "6s",

  // Ring spin
  RING_SPIN: "5s",

  // Spotlight sway
  BEAM_SWAY: "8s",
} as const;

export type GalleryColor = keyof typeof COLORS;
