/**
 * Position Constants for Kashi Yatra 2027
 *
 * Responsive positioning organized by element type.
 * Format: { mobile, sm, md, lg } for each breakpoint
 * Values use CSS units (%, px, vh, vw)
 */

// ═══════════════════════════════════════════════════════════════════
// HERO SECTION - RIVER ELEMENTS
// ═══════════════════════════════════════════════════════════════════

/** Stepping stone positions */
export const POS_STONES = {
  SCHEDULE: {
    mobile: { bottom: "60%", left: "5%" },
    sm: { bottom: "27%", left: "8%" },
  },
  EVENTS: {
    mobile: { bottom: "25%", left: "10%" },
    sm: { bottom: "14%", left: "28%" },
  },
  REGISTER: {
    mobile: { bottom: "46%", left: "50%", transform: "translateX(-50%)" },
    sm: { bottom: "41%", left: "50%", transform: "translateX(-50%)" },
  },
  GALLERY: {
    mobile: { bottom: "73%", right: "5%" },
    sm: { bottom: "17%", left: "68%", right: "auto" },
  },
  ABOUT: {
    mobile: { bottom: "30%", right: "8%" },
    sm: { bottom: "50%", left: "86%", right: "auto" },
  },
} as const;

/** Lotus flower positions */
export const POS_LOTUS = {
  LOTUS_1: {
    mobile: { bottom: "53%", left: "12%" },
    sm: { bottom: "65%", left: "15%" },
  },
  LOTUS_2: {
    mobile: { bottom: "36%", left: "48%" },
    sm: { bottom: "85%", left: "55%" },
  },
  LOTUS_3: {
    mobile: { bottom: "65%", left: "78%" },
    sm: { bottom: "77%", left: "80%" },
  },
  LOTUS_4: {
    sm: { bottom: "5%", left: "40%" },
    desktopOnly: true,
  },
} as const;

/** Diya positions */
export const POS_DIYA = {
  DIYA_1: {
    mobile: { bottom: "16%", left: "13%" },
    sm: { bottom: "76%", left: "5%" },
  },
  DIYA_2: {
    mobile: { bottom: "81%", left: "45%" },
    sm: { bottom: "10%", left: "18%" },
  },
  DIYA_3: {
    mobile: { bottom: "15%", left: "55%" },
    sm: { bottom: "8%", left: "58%" },
  },
  DIYA_4: {
    mobile: { bottom: "13%", left: "72%" },
    sm: { bottom: "83%", left: "75%" },
    desktopOnly: true,
  },
  DIYA_5: {
    mobile: { bottom: "25%", left: "88%" },
    sm: { bottom: "46%", left: "90%" },
  },
  DIYA_6: {
    mobile: { bottom: "10%", left: "42%" },
    sm: { bottom: "85%", left: "45%" },
    desktopOnly: true,
  },
} as const;

/** Boat positions and animation start points */
export const POS_BOATS = {
  PILGRIM: {
    bottom: { sm: "20%" },
    startLeft: "-20vw",
  },
  STEAMER: {
    bottom: { sm: "4%" },
    startLeft: "110vw",
  },
  SIMPLE: {
    bottom: { sm: "38%" },
    startLeft: "30vw",
  },
} as const;

// ═══════════════════════════════════════════════════════════════════
// HERO SECTION - BUILDINGS
// ═══════════════════════════════════════════════════════════════════

/** Hero right artwork position */
export const POS_HERO_RIGHT = {
  mobile: { bottom: "31%", right: "-9%" },
  sm: { bottom: "31%", right: "-6%" },
  md: { bottom: "28%", right: "-7%" },
} as const;

/** Hero left artwork position */
export const POS_HERO_LEFT = {
  mobile: { bottom: "29%", left: "-5%" },
  sm: { bottom: "28%", left: "-3%" },
  md: { bottom: "25.5%", left: "-2%" },
} as const;

/** Moon position */
export const POS_HERO_MOON = {
  mobile: { top: "2%" },
  sm: { top: "3%" },
  md: { top: "4%" },
} as const;

/** Title position */
export const POS_HERO_TITLE = {
  mobile: { top: "12%" },
  sm: { top: "14%" },
  md: { top: "18%" },
} as const;

// ═══════════════════════════════════════════════════════════════════
// BANARASI VIBES SECTION
// ═══════════════════════════════════════════════════════════════════

/** BHU Gate position */
export const POS_VIBES_GATE = {
  mobile: { bottom: "60px" },
  sm: { bottom: "-150px" },
} as const;

/** Mahamana position (relative to gate) */
export const POS_VIBES_MAHAMANA = {
  bottom: "8%",
  left: "50%",
  transform: "translateX(-50%)",
} as const;

/** Lamppost position */
export const POS_VIBES_LAMPPOST = {
  mobile: { left: "2%", bottom: "70px" },
  sm: { left: "5%", bottom: "100px" },
} as const;

/** Rickshaw position */
export const POS_VIBES_RICKSHAW = {
  startLeft: "-200px",
  bottom: "5px",
} as const;

/** Mobile diya position (BanarasiVibes) */
export const POS_VIBES_DIYA_MOBILE = {
  top: "38%",
  left: "50%",
  transform: "translateX(-50%) translateY(-50%)",
} as const;
