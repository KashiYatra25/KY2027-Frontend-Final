// ═══════════════════════════════════════════════════════════════════
// SPONSORS PAGE - KASHI AFTER DARK PALETTE
// Bold Gen-Z poster theme — clean neon on dark
// ═══════════════════════════════════════════════════════════════════

export const PALETTE = {
  // Neon accents
  ACID_LIME: "#D7FF00",
  ELECTRIC_VIOLET: "#8B5CF6",
  HOT_PINK: "#FF3EA5",
  NEON_CYAN: "#00E5FF",
  FESTIVAL_GOLD: "#FFC247",
  SIGNAL_ORANGE: "#FF6B35",

  // Base tones
  DEEP_INK: "#0A0A0F",
  MIDNIGHT: "#111118",
  PAPER_WHITE: "#F5F1E8",

  // Text
  TEXT_PRIMARY: "#FFFFFF",
  TEXT_SECONDARY: "rgba(255, 255, 255, 0.7)",
  TEXT_MUTED: "rgba(255, 255, 255, 0.5)",
} as const;

// ═══════════════════════════════════════════════════════════════════
// GRADIENTS
// ═══════════════════════════════════════════════════════════════════

export const GRADIENTS = {
  // Page background
  PAGE_BG: `linear-gradient(180deg, ${PALETTE.DEEP_INK} 0%, ${PALETTE.MIDNIGHT} 50%, ${PALETTE.DEEP_INK} 100%)`,

  // Headline gradients
  TITLE: `linear-gradient(135deg, ${PALETTE.ACID_LIME} 0%, ${PALETTE.NEON_CYAN} 50%, ${PALETTE.HOT_PINK} 100%)`,
  GOLD_TITLE: `linear-gradient(135deg, ${PALETTE.FESTIVAL_GOLD} 0%, ${PALETTE.SIGNAL_ORANGE} 100%)`,

  // Accent gradients
  VIOLET_PINK: `linear-gradient(90deg, ${PALETTE.ELECTRIC_VIOLET}, ${PALETTE.HOT_PINK})`,
  LIME_CYAN: `linear-gradient(90deg, ${PALETTE.ACID_LIME}, ${PALETTE.NEON_CYAN})`,

  // Button
  CTA_PRIMARY: `linear-gradient(135deg, ${PALETTE.HOT_PINK} 0%, ${PALETTE.ELECTRIC_VIOLET} 100%)`,
  CTA_SECONDARY: `linear-gradient(135deg, ${PALETTE.ACID_LIME} 0%, ${PALETTE.NEON_CYAN} 100%)`,
} as const;

// ═══════════════════════════════════════════════════════════════════
// SHADOWS / GLOWS
// ═══════════════════════════════════════════════════════════════════

export const SHADOWS = {
  CARD: "0 4px 30px rgba(0,0,0,0.5)",
  LIME_GLOW: `0 0 30px ${PALETTE.ACID_LIME}40`,
  PINK_GLOW: `0 0 30px ${PALETTE.HOT_PINK}40`,
  VIOLET_GLOW: `0 0 30px ${PALETTE.ELECTRIC_VIOLET}40`,
  CYAN_GLOW: `0 0 30px ${PALETTE.NEON_CYAN}40`,
  GOLD_GLOW: `0 0 30px ${PALETTE.FESTIVAL_GOLD}40`,
} as const;

// Tier-specific styling (for potential future use)
export const TIER_STYLES = {
  title: {
    color: PALETTE.FESTIVAL_GOLD,
    glow: SHADOWS.GOLD_GLOW,
    gradient: `linear-gradient(135deg, ${PALETTE.FESTIVAL_GOLD}15 0%, transparent 100%)`,
  },
  "powered-by": {
    color: PALETTE.HOT_PINK,
    glow: SHADOWS.PINK_GLOW,
    gradient: `linear-gradient(135deg, ${PALETTE.HOT_PINK}15 0%, transparent 100%)`,
  },
  partner: {
    color: PALETTE.NEON_CYAN,
    glow: SHADOWS.CYAN_GLOW,
    gradient: `linear-gradient(135deg, ${PALETTE.NEON_CYAN}15 0%, transparent 100%)`,
  },
} as const;
