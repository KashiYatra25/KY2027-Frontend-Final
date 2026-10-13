import { IMAGES } from "@/lib/images";
import { GuitarIcon, CrowdIcon, StageIcon, TrophyIcon } from "./icons";

// ═══════════════════════════════════════════════════════════════════
// STATS SECTION DATA - Stat counters and landmark stamps
// ═══════════════════════════════════════════════════════════════════

export const stats = [
  {
    value: "15+",
    label: "Years of Legacy",
    Icon: GuitarIcon,
    color: "#6366f1",
  },
  { value: "90K+", label: "Expected Crowd", Icon: CrowdIcon, color: "#8b5cf6" },
  { value: "50+", label: "Live Events", Icon: StageIcon, color: "#6366f1" },
  {
    value: "100+",
    label: "Colleges Compete",
    Icon: TrophyIcon,
    color: "#8b5cf6",
  },
];

// Stamps data - All 5 IIT BHU landmark stamps
// Positioned around the edges, fully visible, larger size
export const stamps = [
  {
    src: IMAGES.about.stamps.mainBuilding,
    alt: "IIT BHU Main Building",
    rotate: -8,
    position: "top-4 left-4 xl:left-12",
    floatDelay: 0,
    size: "w-52 xl:w-72",
    imgSize: 300,
  },
  {
    src: IMAGES.about.stamps.library,
    alt: "Central Library",
    rotate: 6,
    position: "top-4 right-4 xl:right-12",
    floatDelay: 0.5,
    size: "w-52 xl:w-72",
    imgSize: 300,
  },
  {
    src: IMAGES.about.stamps.mandir,
    alt: "Vishwanath Mandir",
    rotate: -5,
    position: "bottom-24 left-4 xl:left-8",
    floatDelay: 1,
    size: "w-48 xl:w-64",
    imgSize: 280,
  },
  {
    src: IMAGES.about.stamps.heritageHostel,
    alt: "Heritage Hostel",
    rotate: 4,
    position: "bottom-2 right-4 xl:right-8",
    floatDelay: 1.5,
    size: "w-48 xl:w-64",
    imgSize: 280,
  },
  {
    src: IMAGES.about.stamps.kyVenue,
    alt: "KY Venue",
    rotate: -3,
    position: "-bottom-20 left-1/2 -translate-x-1/2",
    floatDelay: 2,
    size: "w-[400px] xl:w-[500px]",
    imgSize: 400,
  },
];
