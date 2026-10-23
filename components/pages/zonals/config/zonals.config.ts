// ═══════════════════════════════════════════════════════════════════
// ZONALS PAGE CONFIG
//
// Zonals are regional events held at partner colleges.
// Each college has its own events and pass types.
// Passes are college-specific (RGIPT pass won't work at other colleges).
// ═══════════════════════════════════════════════════════════════════

/** Status of a zonal college. */
export type ZonalStatus = "upcoming" | "registration-open" | "completed";

/** Pass types for zonals */
export type ZonalPassType = "SINGLE_EVENT" | "MULTI_EVENT";

/** Visual size hint that drives the asymmetric EventsExplorer grid. */
export type ExploreCardSize = "sm" | "md" | "lg";

/** Pass info for a college */
export interface ZonalPass {
  type: ZonalPassType;
  price: number;
  description: string;
  perks: string[];
}

/** An event at a zonal college */
export interface ZonalEvent {
  id: string;
  slug: string;
  name: string;
  description?: string;
  category?: string;
}

/** A partner college hosting zonals */
export interface ZonalCollege {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  venue: string;
  date: string; // ISO date string
  status: ZonalStatus;
  accentColor: string;
  registrationUrl: string;
  description: string;
  passes: ZonalPass[];
  events: ZonalEvent[];
  prizeDistribution: {
    first: string;
    second: string;
    participation: string;
  };
}

/** A single explorable event card for the grid view */
export interface ExploreEvent {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  accentColor: string;
  textColor: "ink" | "paper";
  size: ExploreCardSize;
  imageUrl?: string;
}

// ═══════════════════════════════════════════════════════════════════
// COPY & CONTENT
// ═══════════════════════════════════════════════════════════════════

/** Hero section copy */
export const ZONALS_HERO = {
  title: "KASHI YATRA ZONALS",
  subtitle: "Your road to the main stage starts in your city",
  description:
    "Compete in regional elimination rounds across India. Win your zone, earn your spot, and bring the energy to IIT BHU for the grand finale.",
} as const;

/** How it works steps */
export const ZONALS_STEPS: { id: string; title: string; description: string }[] = [
  {
    id: "register",
    title: "Register",
    description: "Sign up and get your pass for the zonal round at your nearest partner college.",
  },
  {
    id: "compete",
    title: "Compete",
    description: "Battle it out against the best talent in your region across multiple events.",
  },
  {
    id: "qualify",
    title: "Qualify",
    description: "Top performers advance to the grand finale at IIT BHU.",
  },
];

/** Events Explorer section copy */
export const EXPLORE_COPY = {
  eyebrow: "THE LINE-UP",
  title: "PICK YOUR PLAYGROUND",
  subtitle:
    "Dance, music, art, drama — every zone, every stage. Find the event that's got your name on it.",
} as const;

/** Final CTA config */
export const FINAL_CTA = {
  headline: "DON'T WATCH THE RECAP. BE THE RECAP.",
  supporting: "YOUR PEOPLE. YOUR MOMENTS. YOUR ZONALS.",
  primary: { label: "EXPLORE EVENTS ↗", href: "#events" },
  secondary: { label: "SELECT COLLEGE ↗", href: "#colleges" },
} as const;

/** Atmosphere section copy */
export const ATMOSPHERE_COPY = {
  headline: "YOU HAD TO BE THERE.",
  words: ["LOUD", "SWEAT", "LIGHTS", "CHAOS", "YOURS"],
} as const;

// ═══════════════════════════════════════════════════════════════════
// RGIPT EVENTS
// ═══════════════════════════════════════════════════════════════════

const RGIPT_EVENTS: ZonalEvent[] = [
  {
    id: "rgipt-solo-group-dance",
    slug: "solo-group-dance",
    name: "Solo & Group Dance",
    category: "DANCE",
  },
  { id: "rgipt-abhivyakti", slug: "abhivyakti", name: "Abhivyakti", category: "ART" },
  { id: "rgipt-film-fever", slug: "film-fever", name: "Film Fever", category: "ART" },
  {
    id: "rgipt-canvas-of-imagination",
    slug: "canvas-of-imagination",
    name: "Canvas of Imagination",
    category: "ART",
  },
  { id: "rgipt-mono-act", slug: "mono-act", name: "Mono Act", category: "THEATRE" },
  { id: "rgipt-mr-ms", slug: "mr-ms-rgipt", name: "Mr. & Ms. RGIPT", category: "PERSONALITY" },
  { id: "rgipt-nukkad-natak", slug: "nukkad-natak", name: "Nukkad Natak", category: "THEATRE" },
  { id: "rgipt-debate", slug: "debate", name: "Debate", category: "LITERARY" },
  { id: "rgipt-quiz", slug: "quiz", name: "Quiz", category: "LITERARY" },
  {
    id: "rgipt-words-of-wonder",
    slug: "words-of-wonder",
    name: "Words of Wonder",
    category: "LITERARY",
  },
  {
    id: "rgipt-solo-instrumental-music",
    slug: "solo-instrumental-music",
    name: "Solo Instrumental & Solo Music",
    category: "MUSIC",
  },
];

// ═══════════════════════════════════════════════════════════════════
// ZONAL COLLEGES
// ═══════════════════════════════════════════════════════════════════

export const ZONAL_COLLEGES: ZonalCollege[] = [
  {
    id: "rgipt",
    slug: "rgipt",
    name: "Rajiv Gandhi Institute of Petroleum Technology",
    shortName: "RGIPT",
    city: "Amethi",
    state: "Uttar Pradesh",
    venue: "TBD", // PLACEHOLDER
    date: "2027-01-15", // PLACEHOLDER
    status: "registration-open",
    accentColor: "ACID_LIME",
    registrationUrl: "https://konfhub.com/kashiyatra-rgipt-zonals-2027",
    description:
      "Join us at RGIPT for an exciting showcase of talent across 11 events. Compete, perform, and win amazing prizes!",
    passes: [
      {
        type: "SINGLE_EVENT",
        price: 400,
        description: "Register for any 1 event of your choice",
        perks: ["Access to 1 event", "Participation certificate", "Chance to win prizes"],
      },
      {
        type: "MULTI_EVENT",
        price: 550,
        description: "Register for unlimited events",
        perks: [
          "Access to all 11 events",
          "Participation certificate for each event",
          "Best value for multi-talented performers",
          "Chance to win prizes in multiple categories",
        ],
      },
    ],
    events: RGIPT_EVENTS,
    prizeDistribution: {
      first: "35% of prize pool",
      second: "25% of prize pool",
      participation: "Certificate for all participants",
    },
  },
];

// ═══════════════════════════════════════════════════════════════════
// EXPLORE EVENTS (for grid view)
// ═══════════════════════════════════════════════════════════════════

/** Convert zonal events to explore card format */
export function getExploreEventsForCollege(college: ZonalCollege): ExploreEvent[] {
  const colors = ["ACID_LIME", "HOT_PINK", "ELECTRIC_BLUE", "SIGNAL_ORANGE", "ELECTRIC_VIOLET"];
  const sizes: ExploreCardSize[] = ["lg", "sm", "md", "md", "lg", "sm"];

  return college.events.map((event, index) => ({
    id: event.id,
    number: String(index + 1).padStart(2, "0"),
    title: event.name,
    category: event.category || "EVENT",
    description: event.description || `Compete in ${event.name} at ${college.shortName}`,
    accentColor: colors[index % colors.length],
    textColor: index % 2 === 0 ? "ink" : "paper",
    size: sizes[index % sizes.length],
  }));
}

export const EXPLORE_EVENTS = getExploreEventsForCollege(ZONAL_COLLEGES[0]);
