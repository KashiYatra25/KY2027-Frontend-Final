// ═══════════════════════════════════════════════════════════════════
// EVENTS PAGE COLOR PALETTE
// ═══════════════════════════════════════════════════════════════════

// Base colors (kept in sync with the home palette for app-wide consistency)
export const COLORS = {
  // Primary palette
  SAFFRON: "#FF6B00",
  GOLD: "#D4A853",
  BRIGHT_GOLD: "#FFD700",
  DARK_GOLD: "#8B6914",
  DARKER_GOLD: "#4a3510",
  GOLD_BROWN: "#B8860B",
  MAROON: "#8B1538",
  DARK_MAROON: "#5a0f25",
  ROYAL_MAROON: "#6B1328",
  DEEP_MAROON: "#3d0a18",

  // Neutrals
  CREAM: "#FDF6E3",
  STONE: "#D4B896",
  DARK_BROWN: "#2D1810",
  LAVENDER: "#9D8CD9",

  // Blues
  GANGA_BLUE: "#1A5F7A",
  DEEP_NIGHT: "#1A1A2E",
  MIDNIGHT: "#0a0a15",

  // River blues
  RIVER_SURFACE: "#1a4a6e",
  RIVER_MID: "#15405c",
  RIVER_DEEP: "#0c2030",

  // Background colors
  BG_DEEP: "#0a0612",

  // Card backgrounds
  CARD_DARK_PURPLE: "#1A0A1A",
  CARD_FRAME_DARK: "#1a0d10",
  CARD_FRAME_MID: "#2a1a18",
} as const;

// Festival vibes / jazz colors (royal jazz, vintage meets neon)
export const JAZZ_COLORS = {
  // Deep royal backgrounds
  BG_DEEP: "#0c0810",
  BG_ROYAL: "#150a14",
  BG_WINE: "#1f0c18",

  // Royal accents
  GOLD: "#FFD700",
  GOLD_DARK: "#B8860B",
  ROSE_GOLD: "#E8B4B8",
  ROYAL_PURPLE: "#6B21A8",
  DEEP_MAGENTA: "#9D174D",

  // Jazz neons
  ELECTRIC_BLUE: "#00D4FF",
  HOT_PINK: "#FF1493",
  LIME: "#ADFF2F",
  AMBER: "#FFBF00",

  // Text
  CREAM: "#FDF6E3",
  IVORY: "#FFFFF0",
} as const;

// Event type colors
export const EVENT_TYPE_COLORS = {
  individual: {
    bg: "rgba(255,20,147,0.2)", // HOT_PINK
    text: "#ff1493",
  },
  duo: {
    bg: "rgba(0,191,255,0.2)", // ELECTRIC_BLUE
    text: "#00bfff",
  },
  team: {
    bg: "rgba(138,43,226,0.2)", // ROYAL_PURPLE
    text: "#e6e6fa", // LAVENDER
  },
} as const;
