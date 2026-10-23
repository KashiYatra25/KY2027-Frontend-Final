/**
 * Color Palette Constants for Kashi Yatra 2027
 *
 * Centralized color definitions, gradients, and backgrounds.
 * Import from this file for consistent theming across components.
 */

// ═══════════════════════════════════════════════════════════════════
// BASE COLORS
// ═══════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════
// SKY GRADIENTS
// ═══════════════════════════════════════════════════════════════════

/** Night theme - deep blues and purples */
export const GRADIENT_SKY_NIGHT = `linear-gradient(180deg, 
  #050510 0%, 
  #0a0a1a 10%,
  #0f1025 20%,
  #141430 32%,
  #1a1a40 44%,
  #1e1e4a 54%,
  #222255 64%,
  #1a1a45 74%,
  #141435 84%,
  #0f0f28 94%,
  #0a0a1a 100%
)`;

/** Evening theme - warm oranges, pinks, purples (sunset vibes) */
export const GRADIENT_SKY_EVENING = `linear-gradient(180deg,
  #1a1a2e 0%,
  #2d1f3d 10%,
  #4a2c4a 20%,
  #6b3a50 32%,
  #8b4a55 44%,
  #b86a5a 54%,
  #d4845a 64%,
  #e8a060 74%,
  #f0b86a 84%,
  #f5c87a 94%,
  #f8d888 100%
)`;

// ═══════════════════════════════════════════════════════════════════
// RIVER GRADIENTS
// ═══════════════════════════════════════════════════════════════════

/** River water gradient */
export const GRADIENT_RIVER = `linear-gradient(180deg, 
  #1a4a6e 0%, 
  #15405c 20%, 
  #12354d 40%, 
  #0f2a3e 60%, 
  #0c2030 80%, 
  #081520 100%
)`;

/** Moon reflection on water */
export const GRADIENT_MOON_REFLECTION = `radial-gradient(ellipse, rgba(200,220,255,0.12) 0%, transparent 70%)`;

/**
 * River water gradient per time-of-day theme.
 * Night/dusk keep the deep indigo-blue (the look we like); dawn/evening get
 * warm tints; morning/afternoon get brighter daylight blues.
 */
export const RIVER_WATER_BY_THEME: Record<string, string> = {
  night: `linear-gradient(180deg, #1a4a6e 0%, #15405c 20%, #12354d 40%, #0f2a3e 60%, #0c2030 80%, #081520 100%)`,
  dusk: `linear-gradient(180deg, #3a2f5e 0%, #2f2a52 20%, #272445 40%, #1d1d38 60%, #15162a 80%, #0e0f1d 100%)`,
  evening: `linear-gradient(180deg, #5a3f5e 0%, #4a3650 20%, #3a2c44 40%, #2a2135 60%, #1d1826 80%, #120f18 100%)`,
  dawn: `linear-gradient(180deg, #4a6a8e 0%, #456080 20%, #3d526e 40%, #33455c 60%, #27354a 80%, #1a2636 100%)`,
  morning: `linear-gradient(180deg, #4a7fa6 0%, #437192 20%, #3b6180 40%, #31506b 60%, #264056 80%, #1a2f42 100%)`,
  afternoon: `linear-gradient(180deg, #3a86b5 0%, #3576a0 20%, #2f678c 40%, #285576 60%, #204560 80%, #16344a 100%)`,
};

// ═══════════════════════════════════════════════════════════════════
// FOOTER GRADIENTS (Royal Maroon & Gold Theme)
// ═══════════════════════════════════════════════════════════════════

/** Footer main background - royal maroon depth */
export const GRADIENT_FOOTER = `linear-gradient(180deg, 
  #3d0a18 0%, 
  #5a0f25 15%,
  #6B1328 35%,
  #8B1538 50%,
  #6B1328 65%,
  #5a0f25 85%,
  #3d0a18 100%
)`;

/** Footer alternative - darker, more dramatic */
export const GRADIENT_FOOTER_DARK = `linear-gradient(180deg, 
  #1a0508 0%, 
  #2d0a12 20%,
  #4a1020 40%,
  #5a0f25 60%,
  #3d0a18 80%,
  #1a0508 100%
)`;

/** Footer radial glow overlay */
export const GRADIENT_FOOTER_GLOW = `radial-gradient(ellipse at center 30%, rgba(255,215,0,0.08) 0%, transparent 50%)`;

/** Footer bottom ambient glow */
export const GRADIENT_FOOTER_AMBIENT = `radial-gradient(ellipse at bottom, rgba(255,107,0,0.15) 0%, transparent 60%)`;

// ═══════════════════════════════════════════════════════════════════
// DECORATIVE BORDERS & ACCENTS
// ═══════════════════════════════════════════════════════════════════

/** Gold border gradient - horizontal */
export const GRADIENT_BORDER_GOLD = `linear-gradient(90deg, 
  transparent 0%,
  ${COLORS.MAROON} 10%,
  ${COLORS.BRIGHT_GOLD} 30%, 
  ${COLORS.SAFFRON} 50%, 
  ${COLORS.BRIGHT_GOLD} 70%, 
  ${COLORS.MAROON} 90%,
  transparent 100%
)`;

/** Royal border with maroon accents */
export const GRADIENT_BORDER_ROYAL = `linear-gradient(90deg, 
  ${COLORS.DEEP_MAROON} 0%,
  ${COLORS.MAROON} 15%,
  ${COLORS.BRIGHT_GOLD} 35%, 
  ${COLORS.SAFFRON} 50%, 
  ${COLORS.BRIGHT_GOLD} 65%, 
  ${COLORS.MAROON} 85%,
  ${COLORS.DEEP_MAROON} 100%
)`;

/** Vertical gold divider */
export const GRADIENT_DIVIDER_GOLD = `linear-gradient(180deg, 
  transparent 0%, 
  ${COLORS.BRIGHT_GOLD} 20%, 
  ${COLORS.GOLD} 50%, 
  ${COLORS.BRIGHT_GOLD} 80%, 
  transparent 100%
)`;

// ═══════════════════════════════════════════════════════════════════
// BUTTON & INTERACTIVE GRADIENTS
// ═══════════════════════════════════════════════════════════════════

/** Gold button background */
export const GRADIENT_BUTTON_GOLD = `linear-gradient(135deg, 
  rgba(255,215,0,0.2) 0%, 
  rgba(139,21,56,0.2) 100%
)`;

/** Gold shimmer overlay */
export const GRADIENT_SHIMMER = `linear-gradient(90deg, 
  transparent 0%, 
  rgba(255,215,0,0.3) 50%, 
  transparent 100%
)`;

/** Title text shimmer */
export const GRADIENT_TEXT_SHIMMER = `linear-gradient(90deg, 
  transparent 0%, 
  rgba(255,255,255,0.1) 50%, 
  transparent 100%
)`;

// ═══════════════════════════════════════════════════════════════════
// GLOW EFFECTS
// ═══════════════════════════════════════════════════════════════════

export const GLOW = {
  GOLD_SOFT: "0 0 15px rgba(255,215,0,0.3)",
  GOLD_MEDIUM: "0 0 20px rgba(255,215,0,0.4)",
  GOLD_STRONG: "0 0 30px rgba(255,215,0,0.5)",
  SAFFRON_SOFT: "0 0 15px rgba(255,107,0,0.3)",
  SAFFRON_MEDIUM: "0 0 20px rgba(255,107,0,0.4)",
  MAROON_SOFT: "0 0 15px rgba(139,21,56,0.3)",
  BOAT_GLOW: "drop-shadow(0 0 8px rgba(255,200,100,0.3))",
} as const;

// ═══════════════════════════════════════════════════════════════════
// TEXT SHADOWS
// ═══════════════════════════════════════════════════════════════════

export const TEXT_SHADOW = {
  GOLD_GLOW: "0 0 15px rgba(255,215,0,0.3)",
  GOLD_STRONG: "0 0 20px rgba(255,215,0,0.5)",
  TITLE_DEPTH: "0 2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(255,215,0,0.4)",
} as const;

// ═══════════════════════════════════════════════════════════════════
// SECTION BACKGROUNDS (for consistency)
// ═══════════════════════════════════════════════════════════════════

export const BG_SECTIONS = {
  HERO: GRADIENT_SKY_EVENING,
  RIVER: GRADIENT_RIVER,
  VIBES: `linear-gradient(180deg, #1A1A2E 0%, #0a0a15 100%)`,
  HIGHLIGHTS: `linear-gradient(180deg, #0a0a15 0%, #1A1A2E 50%, #0a0a15 100%)`,
  FOOTER: GRADIENT_FOOTER,
} as const;

// ═══════════════════════════════════════════════════════════════════
// SHADOWS
// ═══════════════════════════════════════════════════════════════════

export const SHADOWS = {
  /** Royal card shadow with purple glow and gold border hint */
  CARD_ROYAL: "0 10px 40px rgba(74, 26, 85, 0.5), 0 0 0 1px rgba(212, 168, 83, 0.2)",
  CARD_ROYAL_HOVER: "0 20px 60px rgba(74, 26, 85, 0.6), 0 0 30px rgba(212, 168, 83, 0.3)",
  /** Badge shadow */
  BADGE_GOLD: "0 4px 20px rgba(212, 168, 83, 0.6)",
  /** Button shadow */
  BUTTON_GOLD: "0 4px 15px rgba(212, 168, 83, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
  /** QR frame shadow */
  QR_FRAME: "0 0 15px rgba(212, 168, 83, 0.2), inset 0 0 10px rgba(0,0,0,0.3)",
} as const;

// ═══════════════════════════════════════════════════════════════════
// TEXT GRADIENTS (for WebkitBackgroundClip text effects)
// ═══════════════════════════════════════════════════════════════════

/** Gold heading text gradient - use with WebkitBackgroundClip: "text" */
export const GRADIENT_TEXT_GOLD = {
  background: `linear-gradient(135deg, ${COLORS.BRIGHT_GOLD} 0%, ${COLORS.GOLD} 50%, ${COLORS.BRIGHT_GOLD} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

/** Gold price text gradient - vertical */
export const GRADIENT_TEXT_GOLD_VERTICAL = {
  background: `linear-gradient(180deg, ${COLORS.BRIGHT_GOLD} 0%, ${COLORS.GOLD} 50%, ${COLORS.BRIGHT_GOLD} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

// ═══════════════════════════════════════════════════════════════════
// BADGE & BUTTON GRADIENTS
// ═══════════════════════════════════════════════════════════════════

/** Popular badge gold gradient */
export const GRADIENT_BADGE_GOLD = `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.BRIGHT_GOLD} 50%, ${COLORS.GOLD} 100%)`;

/** Royal button gradient - vertical gold to brown */
export const GRADIENT_BUTTON_ROYAL = `linear-gradient(180deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_BROWN} 50%, ${COLORS.DARK_GOLD} 100%)`;

// ═══════════════════════════════════════════════════════════════════
// CARD FRAME GRADIENTS
// ═══════════════════════════════════════════════════════════════════

/** Outer gold frame gradient */
export const GRADIENT_FRAME_GOLD = `linear-gradient(180deg, ${COLORS.DARKER_GOLD} 0%, ${COLORS.DARK_GOLD} 10%, ${COLORS.GOLD} 25%, ${COLORS.BRIGHT_GOLD} 50%, ${COLORS.GOLD} 75%, ${COLORS.DARK_GOLD} 90%, ${COLORS.DARKER_GOLD} 100%)`;

/** Inner dark frame gradient */
export const GRADIENT_FRAME_DARK = `linear-gradient(180deg, ${COLORS.CARD_FRAME_DARK} 0%, ${COLORS.CARD_FRAME_MID} 50%, ${COLORS.CARD_FRAME_DARK} 100%)`;

// ═══════════════════════════════════════════════════════════════════
// DECORATIVE LINE GRADIENTS
// ═══════════════════════════════════════════════════════════════════

/** Horizontal decorative line - fade in from left */
export const GRADIENT_LINE_GOLD_LEFT = `linear-gradient(90deg, transparent, ${COLORS.GOLD})`;

/** Horizontal decorative line - fade out to right */
export const GRADIENT_LINE_GOLD_RIGHT = `linear-gradient(90deg, ${COLORS.GOLD}, transparent)`;

/** Border image gradient for ornate borders */
export const GRADIENT_BORDER_ORNATE = `linear-gradient(90deg, transparent 0%, ${COLORS.DARK_GOLD} 15%, ${COLORS.GOLD} 30%, ${COLORS.BRIGHT_GOLD} 50%, ${COLORS.GOLD} 70%, ${COLORS.DARK_GOLD} 85%, transparent 100%)`;

// ═══════════════════════════════════════════════════════════════════
// CONCERT / PRONITES COLORS (Neon concert vibes)
// ═══════════════════════════════════════════════════════════════════

export const CONCERT_COLORS = {
  // Neon accents
  NEON_PINK: "#FF1493",
  NEON_CYAN: "#00FFFF",
  NEON_PURPLE: "#9D4EDD",
  ELECTRIC_BLUE: "#7DF9FF",
  NEON_GOLD: "#FFD700",

  // Warm blends
  WARM_PINK: "#FF6B9D",
  SUNSET_ORANGE: "#FF8C42",

  // Backgrounds - Night sky bluish-black theme (matching Hero night)
  STAGE_TOP: "#050510",
  STAGE_DARK: "#0a0a1a",
  STAGE_PURPLE: "#0f1025",
  STAGE_GLOW: "#1a1a40",
  CARD_BG: "#0d0d20",
} as const;

export const GRADIENT_STAGE = `linear-gradient(180deg, 
  #030308 0%,
  #050510 10%,
  #080815 25%,
  #0a0a1a 40%,
  #0d0d22 55%,
  #0a0a1a 70%,
  #050510 85%,
  #030308 100%
)`;

// ═══════════════════════════════════════════════════════════════════
// FESTIVAL VIBES / JAZZ COLORS (Royal jazz, vintage meets neon)
// ═══════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════
// HERO TIME-BASED SKY GRADIENTS
// ═══════════════════════════════════════════════════════════════════

export type TimeOfDay = "dawn" | "morning" | "afternoon" | "evening" | "dusk" | "night";

// Dawn - Early morning, sun just rising (5:00 - 7:00)
// Cooler tones: deep blue transitioning through soft lavender/pink to pale peach/gold
export const GRADIENT_SKY_DAWN = `linear-gradient(180deg, 
  #1a2040 0%, #252850 8%, #303565 16%, #3d4578 24%, #4a5588 32%,
  #5a6898 40%, #7080a8 48%, #9098b8 56%, #b0a8c0 64%,
  #d0b8c8 72%, #e8c8c0 80%, #f5d8b8 88%, #fce8b0 94%, #fff4c0 100%
)`;

// Morning - Bright daylight (7:00 - 11:00)
export const GRADIENT_SKY_MORNING = `linear-gradient(180deg,
  #87CEEB 0%, #98d4ee 10%, #a8daf0 20%, #b8e0f3 32%, #c8e6f5 44%,
  #d8ecf8 56%, #e8f2fa 68%, #f0f6fc 80%, #f8fafd 90%, #ffffff 100%
)`;

// Afternoon - Warm golden sun high (11:00 - 16:00)
export const GRADIENT_SKY_AFTERNOON = `linear-gradient(180deg,
  #4a90c2 0%, #5a9ac8 10%, #6aa4ce 20%, #7aaed4 32%, #8ab8da 44%,
  #9ac2e0 56%, #b0cce6 68%, #c6d6ec 80%, #dce0f2 90%, #f0e8e0 100%
)`;

// Dusk - Twilight afterglow (19:00 - 21:00) - Warm purples, magentas with fading orange
export const GRADIENT_SKY_DUSK = `linear-gradient(180deg,
  #1a1035 0%, #251845 8%, #2f1f52 16%, #3a2560 24%, #452a6a 32%,
  #523272 40%, #5e3a78 48%, #6a4280 56%, #754a85 64%, 
  #80528a 72%, #8a5a8f 80%, #956292 88%, #a06a95 94%, #aa7298 100%
)`;

// Map time of day to gradient
export const TIME_GRADIENTS: Record<TimeOfDay, string> = {
  dawn: GRADIENT_SKY_DAWN,
  morning: GRADIENT_SKY_MORNING,
  afternoon: GRADIENT_SKY_AFTERNOON,
  evening: GRADIENT_SKY_EVENING,
  dusk: GRADIENT_SKY_DUSK,
  night: GRADIENT_SKY_NIGHT,
};

// Whether to show moon for each time period
export const SHOW_MOON: Record<TimeOfDay, boolean> = {
  dawn: false,
  morning: false,
  afternoon: false,
  evening: false,
  dusk: false,
  night: true,
};

// Whether to show stars for each time period
export const SHOW_STARS: Record<TimeOfDay, boolean> = {
  dawn: false,
  morning: false,
  afternoon: false,
  evening: false,
  dusk: true,
  night: true,
};

// Opacity for stars
export const STARS_OPACITY: Record<TimeOfDay, number> = {
  dawn: 0,
  morning: 0,
  afternoon: 0,
  evening: 0,
  dusk: 0.3,
  night: 1,
};

// Get time of day from hour
export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 7) return "dawn";
  if (hour >= 7 && hour < 11) return "morning";
  if (hour >= 11 && hour < 16) return "afternoon";
  if (hour >= 16 && hour < 19) return "evening";
  if (hour >= 19 && hour < 21) return "dusk";
  return "night";
}
