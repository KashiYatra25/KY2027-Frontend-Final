/**
 * Cart Page Palette Constants
 * Consistent with the passes page styling (royal purple/gold theme)
 */

// ═══════════════════════════════════════════════════════════════════
// BASE COLORS
// ═══════════════════════════════════════════════════════════════════

export const COLORS = {
  // Primary palette
  GOLD: "#D4A853",
  BRIGHT_GOLD: "#FFD700",
  DARK_GOLD: "#8B6914",
  MAROON: "#8B1538",

  // Neutrals
  CREAM: "#FDF6E3",
  STONE: "#D4B896",

  // Background colors
  BG_DEEP: "#0a0612",
  BG_CARD: "#1A0A1A",
  BG_CARD_HOVER: "#251525",

  // Status colors
  SUCCESS: "#10B981",
  SUCCESS_BG: "rgba(16, 185, 129, 0.1)",
  ERROR: "#EF4444",
  ERROR_BG: "rgba(239, 68, 68, 0.1)",
  INFO: "#3B82F6",
  INFO_BG: "rgba(59, 130, 246, 0.1)",
  WARNING: "#F59E0B",
  WARNING_BG: "rgba(245, 158, 11, 0.1)",
} as const;

// ═══════════════════════════════════════════════════════════════════
// GRADIENTS
// ═══════════════════════════════════════════════════════════════════

export const GRADIENTS = {
  /** Card background gradient */
  CARD_BG: "linear-gradient(135deg, rgba(30, 20, 40, 0.98) 0%, rgba(45, 25, 55, 0.98) 100%)",
  /** Gold accent line */
  GOLD_LINE: `linear-gradient(90deg, transparent, ${COLORS.GOLD}, transparent)`,
  /** Gold button */
  GOLD_BUTTON: `linear-gradient(135deg, ${COLORS.GOLD}25, ${COLORS.GOLD}15)`,
  /** Success gradient */
  SUCCESS: `linear-gradient(135deg, ${COLORS.SUCCESS}20, ${COLORS.SUCCESS}10)`,
  /** Error gradient */
  ERROR: `linear-gradient(135deg, ${COLORS.ERROR}20, ${COLORS.ERROR}10)`,
  /** Info gradient */
  INFO: `linear-gradient(135deg, ${COLORS.INFO}20, ${COLORS.INFO}10)`,
} as const;

// ═══════════════════════════════════════════════════════════════════
// SHADOWS
// ═══════════════════════════════════════════════════════════════════

export const SHADOWS = {
  CARD: "0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 168, 83, 0.15)",
  CARD_HOVER: "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 168, 83, 0.2)",
  BUTTON: "0 4px 15px rgba(212, 168, 83, 0.4)",
  TOAST: "0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 168, 83, 0.15)",
} as const;

// ═══════════════════════════════════════════════════════════════════
// Z-INDEX
// ═══════════════════════════════════════════════════════════════════

export const Z_INDEX = {
  BACKGROUND: 0,
  CONTENT: 10,
  TOAST: 100,
  MODAL: 200,
} as const;
