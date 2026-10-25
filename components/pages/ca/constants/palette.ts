// ═══════════════════════════════════════════════════════════════════
// CAMPUS AMBASSADOR PAGE COLOR PALETTE
// Ethereal cosmic theme — pink / purple / cyan gradient system
// ═══════════════════════════════════════════════════════════════════

export const COLORS = {
  // Base background
  BG_DEEP: "#0a0612",

  // Core accent trio (used across gradients, glows and particles)
  PINK: "#ec4899",
  PURPLE: "#8b5cf6",
  CYAN: "#06b6d4",

  // Supporting purples
  VIOLET: "#9333ea",
  INDIGO: "#4f46e5",
  DEEP_PURPLE: "#581c87",

  // Status
  SUCCESS: "#22c55e",
  WARNING: "#eab308",
  ERROR: "#ef4444",

  // Neutrals
  WHITE: "#ffffff",
} as const;

// RGBA helpers for the recurring translucent accents
export const COLORS_RGBA = {
  PINK_10: "rgba(236, 72, 153, 0.1)",
  PINK_20: "rgba(236, 72, 153, 0.2)",
  PINK_30: "rgba(236, 72, 153, 0.3)",
  PINK_50: "rgba(236, 72, 153, 0.5)",
  PURPLE_10: "rgba(139, 92, 246, 0.1)",
  PURPLE_20: "rgba(139, 92, 246, 0.2)",
  PURPLE_30: "rgba(139, 92, 246, 0.3)",
  PURPLE_50: "rgba(139, 92, 246, 0.5)",
  CYAN_30: "rgba(6, 182, 212, 0.3)",
} as const;

// The signature tri-color gradient reused in headlines, buttons and bars
export const GRADIENTS = {
  TRI: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #06b6d4 100%)",
  TRI_90: "linear-gradient(90deg, #ec4899, #8b5cf6, #06b6d4)",
  PINK_PURPLE: "linear-gradient(135deg, #ec4899, #8b5cf6)",
  PURPLE_PINK: "linear-gradient(135deg, #8b5cf6, #ec4899)",
} as const;

export type CAColor = keyof typeof COLORS;
