// ═══════════════════════════════════════════════════════════════════
// ZONALS PAGE CONFIG
//
// ⚠️  PLACEHOLDER DATA ONLY  ⚠️
// All values below are MOCK/placeholder content used to build out the
// Zonals page UI. Replace with real data (dates, cities, venues,
// registration links) before launch. Do NOT ship these to production.
// ═══════════════════════════════════════════════════════════════════

/** Status of a zonal round. */
export type ZonalStatus = "upcoming" | "registration-open" | "completed";

/** A single regional zonal event. */
export interface ZonalEvent {
  id: string;
  /** Display name of the zone, e.g. "North Zone". */
  zone: string;
  /** Host city (PLACEHOLDER). */
  city: string;
  /** Host venue / college (PLACEHOLDER). */
  venue: string;
  /** ISO date string (PLACEHOLDER). */
  date: string;
  status: ZonalStatus;
  /** Accent color key from the Zonals palette. */
  accentColor: string;
  /** External registration link (PLACEHOLDER). */
  registrationUrl: string;
  /** Short blurb (PLACEHOLDER copy). */
  description: string;
}

/** Hero section copy (PLACEHOLDER). */
export const ZONALS_HERO = {
  // TODO(placeholder): replace with final marketing copy
  title: "KASHI YATRA ZONALS",
  subtitle: "Your road to the main stage starts in your city",
  description:
    "Compete in regional elimination rounds across India. Win your zone, earn your spot, and bring the energy to IIT BHU for the grand finale.",
} as const;

/**
 * Mock zonal events.
 * ⚠️ PLACEHOLDER — cities, venues, dates and links are all fake.
 */
export const ZONAL_EVENTS: ZonalEvent[] = [
  {
    id: "north-zone",
    zone: "North Zone",
    city: "New Delhi", // PLACEHOLDER
    venue: "TBD Venue, New Delhi", // PLACEHOLDER
    date: "2027-01-10", // PLACEHOLDER
    status: "registration-open",
    accentColor: "ACID_LIME",
    registrationUrl: "#", // PLACEHOLDER
    description: "Placeholder blurb for the North Zone round. Replace with real details.",
  },
  {
    id: "south-zone",
    zone: "South Zone",
    city: "Bengaluru", // PLACEHOLDER
    venue: "TBD Venue, Bengaluru", // PLACEHOLDER
    date: "2027-01-17", // PLACEHOLDER
    status: "upcoming",
    accentColor: "ELECTRIC_BLUE",
    registrationUrl: "#", // PLACEHOLDER
    description: "Placeholder blurb for the South Zone round. Replace with real details.",
  },
  {
    id: "east-zone",
    zone: "East Zone",
    city: "Kolkata", // PLACEHOLDER
    venue: "TBD Venue, Kolkata", // PLACEHOLDER
    date: "2027-01-24", // PLACEHOLDER
    status: "upcoming",
    accentColor: "HOT_PINK",
    registrationUrl: "#", // PLACEHOLDER
    description: "Placeholder blurb for the East Zone round. Replace with real details.",
  },
  {
    id: "west-zone",
    zone: "West Zone",
    city: "Mumbai", // PLACEHOLDER
    venue: "TBD Venue, Mumbai", // PLACEHOLDER
    date: "2027-01-31", // PLACEHOLDER
    status: "upcoming",
    accentColor: "SIGNAL_ORANGE",
    registrationUrl: "#", // PLACEHOLDER
    description: "Placeholder blurb for the West Zone round. Replace with real details.",
  },
  {
    id: "central-zone",
    zone: "Central Zone",
    city: "Bhopal", // PLACEHOLDER
    venue: "TBD Venue, Bhopal", // PLACEHOLDER
    date: "2027-02-07", // PLACEHOLDER
    status: "upcoming",
    accentColor: "ELECTRIC_VIOLET",
    registrationUrl: "#", // PLACEHOLDER
    description: "Placeholder blurb for the Central Zone round. Replace with real details.",
  },
];

/**
 * Mock "how it works" steps (PLACEHOLDER copy).
 */
export const ZONALS_STEPS: { id: string; title: string; description: string }[] = [
  {
    id: "register",
    title: "Register",
    description: "Placeholder: sign up for the zonal round nearest to you.",
  },
  {
    id: "compete",
    title: "Compete",
    description: "Placeholder: battle it out against the best in your region.",
  },
  {
    id: "qualify",
    title: "Qualify",
    description: "Placeholder: top performers advance to the IIT BHU finale.",
  },
];

// ═══════════════════════════════════════════════════════════════════
// EVENTS EXPLORER CONFIG
//
// ⚠️  PLACEHOLDER DATA ONLY  ⚠️
// Mock "events" (competitions / playgrounds) rendered by the
// EventsExplorer section. Titles, categories, descriptions and the
// `size` layout hints are all MOCK content. Replace with the real
// event line-up (and real imagery) before launch.
// ═══════════════════════════════════════════════════════════════════

/** Visual size hint that drives the asymmetric EventsExplorer grid. */
export type ExploreCardSize = "sm" | "md" | "lg";

/** A single explorable event ("playground") card. */
export interface ExploreEvent {
  id: string;
  /** Oversized index shown behind the card (e.g. "01"). PLACEHOLDER. */
  number: string;
  /** Event title (PLACEHOLDER). */
  title: string;
  /** Short category label shown on the sticker (PLACEHOLDER). */
  category: string;
  /** One-line blurb (PLACEHOLDER copy). */
  description: string;
  /** Accent color key from the Zonals palette. */
  accentColor: string;
  /** Ink or paper foreground, chosen for contrast against `accentColor`. */
  textColor: "ink" | "paper";
  /** Layout size hint — drives span + aspect ratio in the grid. */
  size: ExploreCardSize;
  /** Optional background image (PLACEHOLDER — none wired yet). */
  imageUrl?: string;
}

/** Events Explorer section copy (PLACEHOLDER). */
export const EXPLORE_COPY = {
  // TODO(placeholder): replace with final marketing copy
  eyebrow: "THE LINE-UP",
  title: "PICK YOUR PLAYGROUND",
  subtitle:
    "Dance, music, art, code — every zone, every stage. Find the floor that's got your name on it.",
} as const;

/**
 * Mock explorable events.
 * ⚠️ PLACEHOLDER — titles, categories, copy and sizing are all fake.
 * Different `size` values intentionally create an asymmetric grid.
 */
export const EXPLORE_EVENTS: ExploreEvent[] = [
  {
    id: "stage-wars", // PLACEHOLDER
    number: "01",
    title: "Stage Wars", // PLACEHOLDER
    category: "DANCE", // PLACEHOLDER
    description: "Placeholder blurb — crews go head to head until the floor picks a winner.", // PLACEHOLDER
    accentColor: "ACID_LIME",
    textColor: "ink",
    size: "lg",
  },
  {
    id: "open-mic", // PLACEHOLDER
    number: "02",
    title: "Open Mic", // PLACEHOLDER
    category: "MUSIC", // PLACEHOLDER
    description: "Placeholder blurb — raw vocals, raw energy, one mic.", // PLACEHOLDER
    accentColor: "HOT_PINK",
    textColor: "paper",
    size: "sm",
  },
  {
    id: "canvas-riot", // PLACEHOLDER
    number: "03",
    title: "Canvas Riot", // PLACEHOLDER
    category: "ART", // PLACEHOLDER
    description: "Placeholder blurb — live walls, spray cans and a clock that never stops.", // PLACEHOLDER
    accentColor: "ELECTRIC_BLUE",
    textColor: "ink",
    size: "md",
  },
  {
    id: "hack-the-zone", // PLACEHOLDER
    number: "04",
    title: "Hack The Zone", // PLACEHOLDER
    category: "CODE", // PLACEHOLDER
    description: "Placeholder blurb — ship something unreasonable before sunrise.", // PLACEHOLDER
    accentColor: "SIGNAL_ORANGE",
    textColor: "ink",
    size: "md",
  },
  {
    id: "spotlight", // PLACEHOLDER
    number: "05",
    title: "Spotlight", // PLACEHOLDER
    category: "THEATRE", // PLACEHOLDER
    description: "Placeholder blurb — monologues, mayhem and standing ovations.", // PLACEHOLDER
    accentColor: "ELECTRIC_VIOLET",
    textColor: "paper",
    size: "lg",
  },
  {
    id: "frame-by-frame", // PLACEHOLDER
    number: "06",
    title: "Frame By Frame", // PLACEHOLDER
    category: "FILM", // PLACEHOLDER
    description: "Placeholder blurb — 48 hours, one story, zero excuses.", // PLACEHOLDER
    accentColor: "PAPER_WHITE",
    textColor: "ink",
    size: "sm",
  },
];

// ═══════════════════════════════════════════════════════════════════
// FINAL CTA CONFIG (PLACEHOLDER copy + links)
// ═══════════════════════════════════════════════════════════════════

export const FINAL_CTA = {
  // TODO(placeholder): confirm final copy + destinations
  headline: "DON'T WATCH THE RECAP. BE THE RECAP.",
  supporting: "YOUR PEOPLE. YOUR MOMENTS. YOUR ZONALS.",
  primary: { label: "EXPLORE EVENTS ↗", href: "#events" }, // PLACEHOLDER href
  secondary: { label: "EXPLORE PASSES ↗", href: "/passes" }, // PLACEHOLDER href
} as const;

// ═══════════════════════════════════════════════════════════════════
// ATMOSPHERE SECTION CONFIG (PLACEHOLDER copy)
// ═══════════════════════════════════════════════════════════════════

export const ATMOSPHERE_COPY = {
  // TODO(placeholder): replace with final editorial copy
  headline: "YOU HAD TO BE THERE.",
  words: ["LOUD", "SWEAT", "LIGHTS", "CHAOS", "YOURS"], // PLACEHOLDER accent words
} as const;
