// ═══════════════════════════════════════════════════════════════════
// ZONALS PAGE COLOR PALETTE
// Bold Gen-Z poster theme — high-contrast neon on ink / paper
//
// Self-contained color definitions for the Zonals page so the page
// does not depend on the home palette.
// ═══════════════════════════════════════════════════════════════════

export const COLORS = {
  // Neon accents
  ACID_LIME: "#D7FF00",
  ELECTRIC_VIOLET: "#762BFF",
  HOT_PINK: "#FF3EA5",
  SIGNAL_ORANGE: "#FF5A1F",
  ELECTRIC_BLUE: "#32C5FF",

  // Base tones
  DEEP_INK: "#111111",
  PAPER_WHITE: "#F5F1E8",
} as const;

// ═══════════════════════════════════════════════════════════════════
// GRADIENTS - recurring background / headline gradients
// ═══════════════════════════════════════════════════════════════════

export const GRADIENTS = {
  // Page background (ink base)
  PAGE_BG: `linear-gradient(180deg, ${COLORS.DEEP_INK} 0%, #1a1a1a 50%, ${COLORS.DEEP_INK} 100%)`,

  // Multi-stop headline title gradient
  TITLE: `linear-gradient(135deg, ${COLORS.ACID_LIME} 0%, ${COLORS.ELECTRIC_BLUE} 35%, ${COLORS.HOT_PINK} 70%, ${COLORS.SIGNAL_ORANGE} 100%)`,

  // Violet → pink accent used in inline highlights
  VIOLET_PINK: `linear-gradient(90deg, ${COLORS.ELECTRIC_VIOLET}, ${COLORS.HOT_PINK})`,

  // Lime → blue accent
  LIME_BLUE: `linear-gradient(90deg, ${COLORS.ACID_LIME}, ${COLORS.ELECTRIC_BLUE})`,
} as const;

// ═══════════════════════════════════════════════════════════════════
// SHADOWS / GLOWS - neon glow helpers
// ═══════════════════════════════════════════════════════════════════

export const SHADOWS = {
  CARD: "0 4px 20px rgba(0,0,0,0.5)",
  LIME_GLOW: `0 0 24px ${COLORS.ACID_LIME}55`,
  PINK_GLOW: `0 0 24px ${COLORS.HOT_PINK}55`,
  VIOLET_GLOW: `0 0 24px ${COLORS.ELECTRIC_VIOLET}55`,
  TITLE_DROP: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
} as const;

export type ZonalColor = keyof typeof COLORS;
