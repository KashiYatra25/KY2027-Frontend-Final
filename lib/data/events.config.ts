/**
 * Events Configuration
 * All event categories and their sub-events for Kashi Yatra 2027
 *
 * @deprecated This static config is only used by campusMap.config.ts for the schedule page.
 * Events pages now fetch data from the backend API via useEvents/useEventsByCategory hooks.
 * Once the backend has a schedule/events-venue-mapping API, this file can be removed.
 * See: lib/api/hooks/events/useEvents.ts for the API-based approach.
 */

import type { SubEvent, EventCategory } from "@/lib/api/helper/types";

export const EVENT_CATEGORIES: EventCategory[] = [
  {
    id: "natraj",
    name: "Natraj",
    slug: "natraj",
    tagline: "Dance like the cosmos is watching",
    description:
      "The ultimate dance competition celebrating all forms - from classical to contemporary, solo to group. Let your body speak the language of rhythm.",
    icon: "💃",
    color: "#FF6B9D", // Pink
    subEvents: [
      {
        id: "cut-a-rug",
        name: "Cut-A-Rug",
        tagline: "Western Solo Dance Competition",
        description:
          "Unleash your inner dancer and let the rhythm take over the stage! Cut A Rug is the ultimate Western Solo Dance Competition, where you have the chance to shine as a one-person powerhouse, captivating the audience with your moves, energy, and flair.",
        type: "individual",
        registrationOpen: true,
      },
      {
        id: "cypher-of-mobs",
        name: "Cypher of Mobs",
        tagline: "Street Dance Battle Competition",
        description:
          "The streets come alive with rhythm, passion, and raw energy in the Cypher of Mobs. This Street Battle is where every move counts, every beat drops with intensity, and every dancer showcases their unique style in a head-to-head showdown.",
        type: "team",
        teamSize: "4-8 members",
        registrationOpen: true,
      },
      {
        id: "ecstasy",
        name: "Ecstasy",
        tagline: "Duet Dance Competition",
        description:
          "Get ready to experience a symphony of movement, harmony, and rhythm as Ecstasy takes the stage. This Duet Dance Competition celebrates the power of connection, coordination, and creativity.",
        type: "duo",
        registrationOpen: true,
      },
      {
        id: "synchronicity",
        name: "Synchronicity",
        tagline: "Group Dance Competition",
        description:
          "When individual talents merge into one powerful force, magic happens. Synchronicity is the ultimate group dance showdown where coordination meets creativity.",
        type: "team",
        teamSize: "8-15 members",
        registrationOpen: true,
      },
      {
        id: "nritya",
        name: "Nritya",
        tagline: "Classical Dance Competition",
        description:
          "Honor the ancient traditions of Indian classical dance. From Bharatanatyam to Kathak, showcase the grace and discipline of centuries-old art forms.",
        type: "individual",
        registrationOpen: true,
      },
    ],
  },
  {
    id: "crosswindz",
    name: "Crosswindz",
    slug: "crosswindz",
    tagline: "Where melodies meet the soul",
    description:
      "The music competition that celebrates voices and instruments. From soulful solos to band battles, let the music flow through you.",
    icon: "🎤",
    color: "#9D4EDD", // Purple
    subEvents: [
      {
        id: "sur",
        name: "Sur",
        tagline: "Solo Singing Competition",
        description:
          "One voice, one stage, infinite possibilities. Sur is where individual vocal talent shines brightest. Whether you belt out Bollywood classics or soulful ghazals, this is your moment.",
        type: "individual",
        registrationOpen: true,
      },
      {
        id: "jugalbandi",
        name: "Jugalbandi",
        tagline: "Duet Singing Competition",
        description:
          "Two voices intertwining in perfect harmony. Jugalbandi celebrates the magic that happens when two singers come together to create something greater than the sum of parts.",
        type: "duo",
        registrationOpen: true,
      },
      {
        id: "band-of-bands",
        name: "Band of Bands",
        tagline: "Battle of the Bands",
        description:
          "Assemble your crew and rock the stage! Band of Bands is the ultimate showdown where college bands compete for glory, showcasing original compositions and covers.",
        type: "team",
        teamSize: "4-8 members",
        registrationOpen: true,
      },
      {
        id: "unplugged",
        name: "Unplugged",
        tagline: "Acoustic Performance",
        description:
          "Strip away the electronics and let raw talent shine. Unplugged celebrates the beauty of acoustic performances - just you, your instrument, and pure music.",
        type: "individual",
        registrationOpen: true,
      },
    ],
  },
  {
    id: "bandish",
    name: "Bandish",
    slug: "bandish",
    tagline: "Classical notes, timeless beauty",
    description:
      "Dedicated to Indian classical music - vocal and instrumental. Where ragas come alive and tradition meets virtuosity.",
    icon: "🎸",
    color: "#FFD700", // Gold
    subEvents: [
      {
        id: "raag-rang",
        name: "Raag Rang",
        tagline: "Classical Vocal Competition",
        description:
          "Immerse yourself in the depths of Indian classical vocals. From Dhrupad to Khayal, showcase your mastery over the ancient ragas.",
        type: "individual",
        registrationOpen: true,
      },
      {
        id: "tantrang",
        name: "Tantrang",
        tagline: "Instrumental Competition",
        description:
          "Let your instrument speak. Sitar, tabla, sarangi, or santoor - Tantrang celebrates the virtuosos who have mastered classical instruments.",
        type: "individual",
        registrationOpen: true,
      },
      {
        id: "fusion-fiesta",
        name: "Fusion Fiesta",
        tagline: "Classical Fusion Competition",
        description:
          "Where tradition meets innovation. Blend classical elements with modern sounds to create something uniquely beautiful.",
        type: "team",
        teamSize: "2-6 members",
        registrationOpen: true,
      },
    ],
  },
  {
    id: "abhinay",
    name: "Abhinay",
    slug: "abhinay",
    tagline: "The world is a stage",
    description:
      "Theatre and drama competitions that celebrate the art of storytelling through performance. From mono-acts to full productions.",
    icon: "🎭",
    color: "#FF8C42", // Orange
    subEvents: [
      {
        id: "mono-act",
        name: "Mono Act",
        tagline: "Solo Theatre Performance",
        description:
          "One actor, multiple characters, infinite emotions. Mono Act challenges you to captivate the audience single-handedly through your theatrical prowess.",
        type: "individual",
        registrationOpen: true,
      },
      {
        id: "nukkad",
        name: "Nukkad",
        tagline: "Street Play Competition",
        description:
          "Take theatre to the streets! Nukkad celebrates the raw, powerful medium of street plays that address social issues and connect with the masses.",
        type: "team",
        teamSize: "10-20 members",
        registrationOpen: true,
      },
      {
        id: "stage-play",
        name: "Stage Play",
        tagline: "Full Theatre Production",
        description:
          "The grand stage awaits! Bring your complete theatrical production with sets, costumes, and a full cast to compete for the ultimate drama crown.",
        type: "team",
        teamSize: "15-30 members",
        registrationOpen: true,
      },
      {
        id: "mimicry",
        name: "Mimicry",
        tagline: "Voice & Character Imitation",
        description:
          "Master the art of transformation. From celebrity impressions to character voices, showcase your ability to become anyone.",
        type: "individual",
        registrationOpen: true,
      },
    ],
  },
  {
    id: "mirage",
    name: "Mirage",
    slug: "mirage",
    tagline: "Where fashion meets fantasy",
    description:
      "The ultimate fashion competition. From ramp walks to themed collections, showcase style, creativity, and confidence.",
    icon: "👗",
    color: "#00FFFF", // Cyan
    subEvents: [
      {
        id: "runway",
        name: "Runway",
        tagline: "Fashion Walk Competition",
        description:
          "Own the ramp! Runway is where confidence meets style as models strut their stuff and showcase the latest fashion trends.",
        type: "individual",
        registrationOpen: true,
      },
      {
        id: "couture",
        name: "Couture",
        tagline: "Fashion Design Competition",
        description:
          "Design, create, and present. Couture celebrates the designers who bring fabric to life with their creative vision and craftsmanship.",
        type: "team",
        teamSize: "2-4 members",
        registrationOpen: true,
      },
      {
        id: "themed-fashion",
        name: "Themed Fashion",
        tagline: "Conceptual Fashion Show",
        description:
          "Fashion as storytelling. Create collections around themes - from sustainable fashion to futuristic designs. Let your creativity run wild.",
        type: "team",
        teamSize: "6-12 members",
        registrationOpen: true,
      },
    ],
  },
  {
    id: "toolika",
    name: "Toolika",
    slug: "toolika",
    tagline: "Art speaks where words fail",
    description:
      "Visual arts competition celebrating painters, sketchers, and digital artists. Express yourself through colors and strokes.",
    icon: "🎨",
    color: "#ADFF2F", // Lime
    subEvents: [
      {
        id: "canvas",
        name: "Canvas",
        tagline: "Painting Competition",
        description:
          "Let colors tell your story. Canvas is the ultimate platform for painters to showcase their mastery over oils, acrylics, and watercolors.",
        type: "individual",
        registrationOpen: true,
      },
      {
        id: "sketch-it",
        name: "Sketch It",
        tagline: "Sketching Competition",
        description:
          "Just a pencil and your imagination. Sketch It celebrates the raw beauty of line art and the power of black and white.",
        type: "individual",
        registrationOpen: true,
      },
      {
        id: "digital-art",
        name: "Digital Art",
        tagline: "Digital Creation Competition",
        description:
          "Where technology meets artistry. Create stunning digital illustrations, photo manipulations, or 3D renders.",
        type: "individual",
        registrationOpen: true,
      },
      {
        id: "mural",
        name: "Mural",
        tagline: "Large Scale Art Competition",
        description:
          "Think big, paint bigger. Mural challenges artists to create impactful large-scale artworks that transform spaces.",
        type: "team",
        teamSize: "2-4 members",
        registrationOpen: true,
      },
    ],
  },
  {
    id: "enquizta",
    name: "Enquizta",
    slug: "enquizta",
    tagline: "Knowledge is the ultimate power",
    description:
      "Quiz competitions that test your knowledge across domains - from general knowledge to specialized topics.",
    icon: "🧠",
    color: "#E8B4B8", // Rose Gold
    subEvents: [
      {
        id: "general-quiz",
        name: "General Quiz",
        tagline: "The Ultimate Knowledge Test",
        description:
          "Test your knowledge across all domains. From history to pop culture, science to sports - the General Quiz covers it all.",
        type: "team",
        teamSize: "2-3 members",
        registrationOpen: true,
      },
      {
        id: "biz-quiz",
        name: "Biz Quiz",
        tagline: "Business & Finance Quiz",
        description:
          "For the future entrepreneurs and business minds. Test your knowledge of markets, companies, and economic affairs.",
        type: "team",
        teamSize: "2-3 members",
        registrationOpen: true,
      },
      {
        id: "sci-tech",
        name: "Sci-Tech Quiz",
        tagline: "Science & Technology Quiz",
        description:
          "For the geeks and nerds. From quantum physics to the latest tech innovations, prove your scientific prowess.",
        type: "team",
        teamSize: "2-3 members",
        registrationOpen: true,
      },
      {
        id: "entertainment",
        name: "Entertainment Quiz",
        tagline: "Movies, Music & Pop Culture",
        description:
          "Lights, camera, quiz! Test your knowledge of Bollywood, Hollywood, music, and everything entertainment.",
        type: "team",
        teamSize: "2-3 members",
        registrationOpen: true,
      },
    ],
  },
  {
    id: "samwaad",
    name: "Samwaad",
    slug: "samwaad",
    tagline: "The power of words",
    description:
      "Literary and speaking competitions - debates, poetry, creative writing, and more. For those who wield words as their weapon.",
    icon: "📜",
    color: "#B8860B", // Dark Gold
    subEvents: [
      {
        id: "debate",
        name: "Debate",
        tagline: "Parliamentary Debate Competition",
        description:
          "Argue, convince, win. The debate competition tests your ability to construct arguments, counter opponents, and sway opinions.",
        type: "team",
        teamSize: "2 members",
        registrationOpen: true,
      },
      {
        id: "poetry-slam",
        name: "Poetry Slam",
        tagline: "Spoken Word Poetry",
        description:
          "Words that hit different. Poetry Slam celebrates the raw power of spoken word - perform your original pieces with passion.",
        type: "individual",
        registrationOpen: true,
      },
      {
        id: "creative-writing",
        name: "Creative Writing",
        tagline: "Fiction & Non-Fiction Writing",
        description:
          "Let your imagination flow through ink. From short stories to essays, showcase your literary prowess.",
        type: "individual",
        registrationOpen: true,
      },
      {
        id: "extempore",
        name: "Extempore",
        tagline: "Impromptu Speaking",
        description:
          "Think on your feet. Extempore tests your ability to speak eloquently on any topic without preparation.",
        type: "individual",
        registrationOpen: true,
      },
      {
        id: "mun",
        name: "MUN",
        tagline: "Model United Nations",
        description:
          "Diplomacy in action. Represent countries, debate global issues, and draft resolutions in this simulation of the UN.",
        type: "individual",
        registrationOpen: true,
      },
    ],
  },
  {
    id: "zaika",
    name: "Zaika",
    slug: "zaika",
    tagline: "Where taste meets talent",
    description:
      "Culinary competitions that celebrate the art of cooking. From traditional recipes to innovative fusion, let your dishes do the talking.",
    icon: "👨‍🍳",
    color: "#FF6B00", // Saffron
    subEvents: [
      {
        id: "masterchef",
        name: "MasterChef",
        tagline: "Cooking Competition",
        description:
          "Don the chef's hat and showcase your culinary skills. From appetizers to desserts, cook your way to victory.",
        type: "team",
        teamSize: "2-3 members",
        registrationOpen: true,
      },
      {
        id: "bake-off",
        name: "Bake Off",
        tagline: "Baking Competition",
        description:
          "For those who find magic in the oven. Cakes, pastries, breads - let your baked creations steal the show.",
        type: "individual",
        registrationOpen: true,
      },
      {
        id: "mocktail",
        name: "Mocktail Mixology",
        tagline: "Beverage Creation Competition",
        description:
          "Shake, stir, and serve. Create stunning mocktails that are as beautiful as they are delicious.",
        type: "individual",
        registrationOpen: true,
      },
    ],
  },
];

// Helper functions
export function getCategoryBySlug(slug: string): EventCategory | undefined {
  return EVENT_CATEGORIES.find((cat) => cat.slug === slug);
}

export function getSubEventById(categorySlug: string, eventId: string): SubEvent | undefined {
  const category = getCategoryBySlug(categorySlug);
  return category?.subEvents.find((event) => event.id === eventId);
}

export function getAllCategorySlugs(): string[] {
  return EVENT_CATEGORIES.map((cat) => cat.slug);
}
