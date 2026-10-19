import { JAZZ_COLORS } from "@/components/pages/home/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// EXPERIENCE STATS DATA - With custom SVG icons
// ═══════════════════════════════════════════════════════════════════

export type IconType = "crowd" | "stage" | "artists" | "nights" | "events" | "food";
export type TileSize = "hero" | "feature" | "standard";

export interface ExperienceTile {
  id: string;
  stat: string;
  label: string;
  sublabel?: string;
  color: string;
  accentColor: string;
  size: TileSize;
  icon: IconType;
}

export const EXPERIENCES: ExperienceTile[] = [
  {
    id: "crowd",
    stat: "90K+",
    label: "Footfall",
    sublabel: "Expected",
    color: JAZZ_COLORS.HOT_PINK,
    accentColor: JAZZ_COLORS.GOLD,
    size: "hero",
    icon: "crowd",
  },
  {
    id: "stages",
    stat: "3",
    label: "Massive",
    sublabel: "Stages",
    color: JAZZ_COLORS.ELECTRIC_BLUE,
    accentColor: JAZZ_COLORS.LIME,
    size: "feature",
    icon: "stage",
  },
  {
    id: "artists",
    stat: "20+",
    label: "Artists",
    sublabel: "& Bands",
    color: JAZZ_COLORS.AMBER,
    accentColor: JAZZ_COLORS.HOT_PINK,
    size: "feature",
    icon: "artists",
  },
  {
    id: "nights",
    stat: "3",
    label: "Epic",
    sublabel: "Nights",
    color: JAZZ_COLORS.ROYAL_PURPLE,
    accentColor: JAZZ_COLORS.GOLD,
    size: "standard",
    icon: "nights",
  },
  {
    id: "events",
    stat: "80+",
    label: "Cultural",
    sublabel: "Events",
    color: JAZZ_COLORS.GOLD,
    accentColor: JAZZ_COLORS.DEEP_MAGENTA,
    size: "standard",
    icon: "events",
  },
  {
    id: "food",
    stat: "∞",
    label: "Food",
    sublabel: "& Vibes",
    color: JAZZ_COLORS.LIME,
    accentColor: JAZZ_COLORS.AMBER,
    size: "standard",
    icon: "food",
  },
];
