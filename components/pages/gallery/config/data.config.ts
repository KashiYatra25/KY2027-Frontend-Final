// ═══════════════════════════════════════════════════════════════════
// GALLERY PAGE DATA CONFIGURATION
//
// Add your photos, videos, performers, and team photo here.
// Each array can be empty - the page will show placeholder frames.
// ═══════════════════════════════════════════════════════════════════

import type {
  PhotoItem,
  VideoItem,
  SpecialVideoItem,
  PerformerItem,
  TeamPhotoItem,
} from "../types";

// ═══════════════════════════════════════════════════════════════════
// PHOTOS - Film reel gallery
// Each line is one photo. Either a plain path/URL or an object with
// optional caption (title, sub) and optional w/h for aspect ratio.
// ═══════════════════════════════════════════════════════════════════
export const PHOTOS: PhotoItem[] = [
  // Using slider images as sample gallery photos
  { src: "/about/slider/SliderLeft1.jpg", title: "Kashi Yatra 2026", sub: "Opening Ceremony" },
  { src: "/about/slider/SliderRight1.jpg", title: "Pro Nite", sub: "Main Stage" },
  { src: "/about/slider/SliderLeft2.jpg", title: "Cultural Night", sub: "Day 2" },
  { src: "/about/slider/SliderRight2.jpg", title: "Dance Performance", sub: "Natraj" },
  { src: "/about/slider/SliderLeft3.jpg", title: "Crowd Energy", sub: "Pro Nite" },
  { src: "/about/slider/SliderRight3.jpg", title: "Stage Lights", sub: "Night Show" },
  { src: "/about/slider/SliderLeft4.jpg", title: "Artists Live", sub: "Day 3" },
  { src: "/about/slider/SliderRight4.jpg", title: "Festival Vibes", sub: "Campus" },
  { src: "/about/slider/SliderLeft5.jpg", title: "Celebrations", sub: "Day 4" },
  { src: "/about/slider/SliderRight5.jpg", title: "Grand Finale", sub: "Closing" },
  { src: "/about/slider/SliderLeft6.jpg", title: "Memories", sub: "KY 2026" },
  { src: "/about/slider/SliderRight6.jpg", title: "Till Next Time", sub: "See You" },
];

// ═══════════════════════════════════════════════════════════════════
// VIDEOS - General video reel
// Video clips that scroll horizontally. Provide poster for thumbnail.
// ═══════════════════════════════════════════════════════════════════
export const VIDEOS: VideoItem[] = [
  // Using slider images as video posters (actual videos would be added later)
  { src: "#", poster: "/about/slider/SliderLeft1.jpg", title: "Day 1 Highlights" },
  { src: "#", poster: "/about/slider/SliderRight2.jpg", title: "Pro Nite Moments" },
  { src: "#", poster: "/about/slider/SliderLeft3.jpg", title: "Cultural Events" },
  { src: "#", poster: "/about/slider/SliderRight4.jpg", title: "Campus Tour" },
  { src: "#", poster: "/about/slider/SliderLeft5.jpg", title: "Grand Finale" },
  { src: "#", poster: "/about/slider/SliderRight6.jpg", title: "Aftermovie Teaser" },
];

// ═══════════════════════════════════════════════════════════════════
// SPECIAL VIDEOS - Featured showcase (2 videos max recommended)
// These get the spotlight treatment with animated borders
// ═══════════════════════════════════════════════════════════════════
export const SPECIAL_VIDEOS: SpecialVideoItem[] = [
  {
    src: "#",
    poster: "/about/slider/SliderRight1.jpg",
    title: "Live from the crowd",
    sub: "Lights · Fireworks · Chaos",
    orientation: "landscape",
  },
  {
    src: "#",
    poster: "/about/slider/SliderLeft4.jpg",
    title: "The night, reimagined",
    sub: "Special reel",
    orientation: "portrait",
  },
];

// ═══════════════════════════════════════════════════════════════════
// PERFORMERS - Past artist cards
// Golden polaroid-style cards with floating animation
// ═══════════════════════════════════════════════════════════════════
export const PERFORMERS: PerformerItem[] = [
  { src: "/singers/Ritviz.jpg", name: "Ritviz", subtitle: "Pro Nite 2026" },
  { src: "/singers/Raftaar.jpeg", name: "Raftaar", subtitle: "EDM Night" },
  { src: "/singers/JubinNautiyal.webp", name: "Jubin Nautiyal", subtitle: "Day 2" },
  { src: "/singers/MohitChauhan.webp", name: "Mohit Chauhan", subtitle: "Sufi Night" },
  { src: "/singers/VishalShekhar.webp", name: "Vishal-Shekhar", subtitle: "Grand Finale" },
  { src: "/singers/AnubhavBassi.jpeg", name: "Anubhav Bassi", subtitle: "Comedy Night" },
];

// ═══════════════════════════════════════════════════════════════════
// TEAM PHOTO - Group photo of the organizing team
// ═══════════════════════════════════════════════════════════════════
export const TEAM_PHOTO: TeamPhotoItem | null = {
  src: "/about/slider/SliderRight1.jpg",
  title: "Kashi Yatra 2026 Team",
  aspectRatio: 1.6,
};

// ═══════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════
export const GALLERY_CONFIG = {
  // Number of empty placeholder frames to show when no content
  emptyPhotoFrames: 12,
  emptyVideoFrames: 8,
  emptyPerformerCards: 6,

  // Film reel settings
  reelDurationA: 46, // seconds for top reel
  reelDurationB: 54, // seconds for bottom reel (reverse)
  videoReelDuration: 40,

  // Default aspect ratios
  defaultPhotoAspect: 3 / 2,
  defaultVideoAspect: 16 / 9,
  defaultPerformerAspect: 4 / 5,
} as const;
