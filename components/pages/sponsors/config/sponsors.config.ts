import { IMAGES } from "@/lib/images";

// Sponsor tier configuration with display order and styling
export type SponsorTier =
  "title" | "major" | "co-title" | "powered-by" | "co-powered-by" | "partner";

export interface Sponsor {
  name: string;
  logo: string; // path to logo image
  tier: SponsorTier;
  category: string; // e.g., "Title Sponsor", "Gaming Partner"
}

// Tier configuration for styling
export const TIER_CONFIG: Record<
  SponsorTier,
  {
    order: number;
    cardSize: "xl" | "lg" | "md" | "sm";
    glowColor: string;
    borderColor: string;
  }
> = {
  title: {
    order: 1,
    cardSize: "xl",
    glowColor: "rgba(255, 215, 0, 0.4)",
    borderColor: "rgba(255, 215, 0, 0.6)",
  },
  major: {
    order: 2,
    cardSize: "lg",
    glowColor: "rgba(255, 180, 0, 0.35)",
    borderColor: "rgba(255, 180, 0, 0.5)",
  },
  "co-title": {
    order: 3,
    cardSize: "lg",
    glowColor: "rgba(255, 165, 0, 0.3)",
    borderColor: "rgba(255, 165, 0, 0.45)",
  },
  "powered-by": {
    order: 4,
    cardSize: "md",
    glowColor: "rgba(255, 140, 0, 0.25)",
    borderColor: "rgba(255, 140, 0, 0.4)",
  },
  "co-powered-by": {
    order: 5,
    cardSize: "md",
    glowColor: "rgba(212, 168, 83, 0.25)",
    borderColor: "rgba(212, 168, 83, 0.4)",
  },
  partner: {
    order: 6,
    cardSize: "sm",
    glowColor: "rgba(184, 134, 11, 0.2)",
    borderColor: "rgba(184, 134, 11, 0.35)",
  },
};

// Card sizes in pixels - responsive for stamp design
export const CARD_SIZES = {
  xl: {
    width: 540,
    height: 420,
    logoSize: 180,
    mobileWidth: 280,
    mobileHeight: 220,
    mobileLogoSize: 100,
  },
  lg: {
    width: 500,
    height: 390,
    logoSize: 160,
    mobileWidth: 260,
    mobileHeight: 200,
    mobileLogoSize: 90,
  },
  md: {
    width: 460,
    height: 360,
    logoSize: 140,
    mobileWidth: 240,
    mobileHeight: 190,
    mobileLogoSize: 85,
  },
  sm: {
    width: 420,
    height: 330,
    logoSize: 120,
    mobileWidth: 220,
    mobileHeight: 175,
    mobileLogoSize: 80,
  },
};

// Previous edition sponsors data - Using ImageKit CDN
export const SPONSORS_2027: Sponsor[] = [
  // Title Tier
  {
    name: "Title Sponsor",
    logo: IMAGES.sponsors.titleSponsor,
    tier: "title",
    category: "Title Sponsor",
  },

  // Co-Title Tier
  {
    name: "Co-Title Partner",
    logo: IMAGES.sponsors.coTitlePartner,
    tier: "co-title",
    category: "Co-Title",
  },

  // Major Tier
  {
    name: "Major Sponsor",
    logo: IMAGES.sponsors.majorSponsor,
    tier: "major",
    category: "Major Sponsor",
  },

  // Powered By Tier
  {
    name: "Powered By Partner",
    logo: IMAGES.sponsors.poweredByPartner,
    tier: "powered-by",
    category: "Powered By",
  },

  // Co-Powered By Tier
  {
    name: "Co-Powered By Partner",
    logo: IMAGES.sponsors.coPoweredByPartner,
    tier: "co-powered-by",
    category: "Co-Powered By",
  },
  {
    name: "Adani Co-Powered Partner",
    logo: IMAGES.sponsors.adaniCoPoweredPartner,
    tier: "co-powered-by",
    category: "Co-Powered By",
  },

  // Partners - Event Titles
  {
    name: "Crosswindz Title",
    logo: IMAGES.sponsors.eventTitleCrosswindz,
    tier: "partner",
    category: "Title of Crosswindz",
  },
  {
    name: "Enquizta & Samvad Title",
    logo: IMAGES.sponsors.titleEnquiztaSamvad,
    tier: "partner",
    category: "Title of Enquizta & Samvad",
  },

  // Partners - Industry
  {
    name: "Energy Partner",
    logo: IMAGES.sponsors.energyPartner,
    tier: "partner",
    category: "Energy Partner",
  },
  {
    name: "Steel Partner",
    logo: IMAGES.sponsors.steelPartner,
    tier: "partner",
    category: "Steel Partner",
  },
  {
    name: "Build Partner",
    logo: IMAGES.sponsors.buildPartner,
    tier: "partner",
    category: "Build Partner",
  },
  {
    name: "Construction Partner",
    logo: IMAGES.sponsors.constructionPartner,
    tier: "partner",
    category: "Construction Partner",
  },
  {
    name: "Infrastructure Partner",
    logo: IMAGES.sponsors.infrastructurePartner,
    tier: "partner",
    category: "Infrastructure Partner",
  },
  {
    name: "Real Estate Partner",
    logo: IMAGES.sponsors.realEstatePartner,
    tier: "partner",
    category: "Real Estate Partner",
  },
  {
    name: "Development Partner",
    logo: IMAGES.sponsors.developmentPartner,
    tier: "partner",
    category: "Development Partner",
  },

  // Partners - Social & CSR
  {
    name: "NMDC Sustainability Partner",
    logo: IMAGES.sponsors.nmdcSustainabilityPartner,
    tier: "partner",
    category: "Sustainability Partner",
  },
  {
    name: "CSR Partner",
    logo: IMAGES.sponsors.csrPartner,
    tier: "partner",
    category: "CSR Partner",
  },
  {
    name: "Social Welfare Partner",
    logo: IMAGES.sponsors.socialWelfarePartner,
    tier: "partner",
    category: "Social Welfare Partner",
  },
  {
    name: "Nation Building Partner",
    logo: IMAGES.sponsors.nationBuildingPartner,
    tier: "partner",
    category: "Nation Building Partner",
  },
  {
    name: "Community Partner",
    logo: IMAGES.sponsors.communityPartner,
    tier: "partner",
    category: "Community Partner",
  },

  // Partners - Hospitality & Lifestyle
  {
    name: "Hospitality Partner",
    logo: IMAGES.sponsors.hospitalityPartner,
    tier: "partner",
    category: "Hospitality Partner",
  },
  {
    name: "Coffee Partner",
    logo: IMAGES.sponsors.coffeePartner,
    tier: "partner",
    category: "Coffee Partner",
  },
  {
    name: "Chocolate Partner",
    logo: IMAGES.sponsors.chocolatePartner,
    tier: "partner",
    category: "Chocolate Partner",
  },
  {
    name: "Fragrance Partner",
    logo: IMAGES.sponsors.fragrancePartner,
    tier: "partner",
    category: "Fragrance Partner",
  },
  {
    name: "Saree Partner",
    logo: IMAGES.sponsors.sareePartner,
    tier: "partner",
    category: "Saree Partner",
  },

  // Partners - Media & Tech
  {
    name: "Gaming Partner",
    logo: IMAGES.sponsors.gamingPartner,
    tier: "partner",
    category: "Gaming Partner",
  },
  {
    name: "Music Streaming Partner",
    logo: IMAGES.sponsors.musicStreamingPartner,
    tier: "partner",
    category: "Music Streaming Partner",
  },
  {
    name: "Innovation Partner",
    logo: IMAGES.sponsors.innovationPartner,
    tier: "partner",
    category: "Innovation Partner",
  },
  {
    name: "Dalimss News",
    logo: IMAGES.sponsors.dalimssNewsPartner,
    tier: "partner",
    category: "Official Partner",
  },
  {
    name: "The Vibe",
    logo: IMAGES.sponsors.theVibePartner,
    tier: "partner",
    category: "Official Partner",
  },
];

// Group sponsors by tier for display
export function groupSponsorsByTier(sponsors: Sponsor[]) {
  const grouped: Record<SponsorTier, Sponsor[]> = {
    title: [],
    major: [],
    "co-title": [],
    "powered-by": [],
    "co-powered-by": [],
    partner: [],
  };

  sponsors.forEach((sponsor) => {
    grouped[sponsor.tier].push(sponsor);
  });

  return grouped;
}
