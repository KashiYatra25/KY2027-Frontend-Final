/**
 * Z-Index Constants for Kashi Yatra 2027
 *
 * Organized by section for easy management.
 * Higher numbers = closer to viewer (on top)
 */

// ═══════════════════════════════════════════════════════════════════
// NAVBAR (Highest priority - always on top)
// ═══════════════════════════════════════════════════════════════════
export const Z_NAVBAR = {
  CONTAINER: 200,
  BADGE: 10,
  NAV_LINKS: 10,
  SECONDARY_LINKS: 10,
  HAMBURGER: 20,
  MOBILE_DROPDOWN: 10,
} as const;

// ═══════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════
export const Z_HERO = {
  // Sky layers (background)
  SKY: 1,
  MOON_GLOW: 2,
  CLOUDS: 3,
  KANDEELS: 4,
  MOON: 5,
  VARANASI_BACK: 6,
  MOON_REFLECTION: 14,

  // Title area
  TITLE: 20,
  BIRDS: 30,

  // Hero artwork (left + right)
  HERO_RIGHT: 71,
  HERO_LEFT: 71,

  // River elements (layered from bottom to top)
  RIVER: 70,

  // Lotus flowers (individual z-indexes)
  LOTUS_1: 75,
  LOTUS_2: 75,
  LOTUS_3: 76,
  LOTUS_4: 76,

  // Diyas (individual z-indexes)
  DIYA_1: 76,
  DIYA_2: 76,
  DIYA_3: 77,
  DIYA_4: 77,
  DIYA_5: 77,
  DIYA_6: 77,

  // Boats (individual z-indexes)
  BOAT_PILGRIM: 81,
  BOAT_STEAMER: 82,
  BOAT_SIMPLE: 79,

  // Stepping stones (individual z-indexes)
  STONE_SCHEDULE: 80,
  STONE_EVENTS: 80,
  STONE_REGISTER: 80,
  STONE_GALLERY: 80,
  STONE_ABOUT: 80,
} as const;

// ═══════════════════════════════════════════════════════════════════
// BANARASI VIBES SECTION
// ═══════════════════════════════════════════════════════════════════
export const Z_VIBES = {
  // Background elements
  MANDALA: 5,

  // Gate composition
  GATE: 10,
  MAHAMANA: 5,
  GATE_IMAGE: 10,

  // Road elements
  ROAD: 25,
  LAMPPOST: 28,
  DIYA_MOBILE: 30,

  // Desktop-only characters (flanking the gate)
  GANGA_AARTI_SAINT: 35,
  BHARATNATYAM_DANCER: 35,

  // Rickshaw
  RICKSHAW: 40,

  // Road surface
  ROAD_SURFACE: 60,
} as const;

// ═══════════════════════════════════════════════════════════════════
// FEST HIGHLIGHTS SECTION
// ═══════════════════════════════════════════════════════════════════
export const Z_HIGHLIGHTS = {
  BACKGROUND: 1,
  DURGA: 20,
  PARTICLES: 30,
  CONTENT: 10,
  FLOATING_DIYAS: 30,
} as const;

// ═══════════════════════════════════════════════════════════════════
// FOOTER SECTION
// ═══════════════════════════════════════════════════════════════════
export const Z_FOOTER = {
  CONTENT: 10,
} as const;

// ═══════════════════════════════════════════════════════════════════
// PAGE LEVEL (Sticky sections)
// ═══════════════════════════════════════════════════════════════════
export const Z_PAGE = {
  HERO: 0,
  BANARASI_VIBES: 10,
  FEST_HIGHLIGHTS: 20,
  FOOTER: 70,
} as const;
