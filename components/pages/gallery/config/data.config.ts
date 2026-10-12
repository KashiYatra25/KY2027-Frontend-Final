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
  // Gallery photos from Kashi Yatra 2026
  { src: "/gallery/grand-finale-1.jpg", title: "Grand Finale", sub: "Pro Nite" },
  { src: "/gallery/concert-night-1.jpg", title: "Concert Night", sub: "Main Stage" },
  { src: "/gallery/concert-night-2.jpg", title: "Live Performance", sub: "Day 3" },
  { src: "/gallery/concert-night-3.jpg", title: "Stage Vibes", sub: "Night Show" },
  { src: "/gallery/stage-lights-1.jpg", title: "Stage Lights", sub: "Pro Nite" },
  { src: "/gallery/pronite-crowd-1.jpg", title: "Crowd Energy", sub: "Pro Nite" },
  { src: "/gallery/pronite-crowd-2.jpg", title: "Festival Crowd", sub: "Main Arena" },
  { src: "/gallery/stage-atmosphere-1.jpg", title: "Stage Atmosphere", sub: "Night Show" },
  { src: "/gallery/performance-1.jpg", title: "Live Show", sub: "Day 2" },
  { src: "/gallery/festival-vibes-1.jpg", title: "Festival Vibes", sub: "Campus" },
  { src: "/gallery/crowd-energy-1.jpg", title: "Celebrations", sub: "KY 2026" },
  // Additional slider images
  { src: "/about/slider/SliderLeft1.jpg", title: "Opening Ceremony", sub: "Day 1" },
  { src: "/about/slider/SliderRight1.jpg", title: "Cultural Night", sub: "Day 2" },
  { src: "/about/slider/SliderLeft2.jpg", title: "Dance Performance", sub: "Natraj" },
  { src: "/about/slider/SliderRight2.jpg", title: "Artists Live", sub: "Day 3" },
  { src: "/about/slider/SliderLeft3.jpg", title: "Memories", sub: "KY 2026" },
];

// ═══════════════════════════════════════════════════════════════════
// VIDEOS - General video reel
// Video clips that scroll horizontally. Provide poster for thumbnail.
// ═══════════════════════════════════════════════════════════════════
export const VIDEOS: VideoItem[] = [
  {
    src: "/gallery/pronite-highlights.mp4",
    poster: "/gallery/grand-finale-1.jpg",
    title: "Pro Nite Highlights",
  },
  {
    src: "/gallery/crowd-moments.mp4",
    poster: "/gallery/pronite-crowd-1.jpg",
    title: "Crowd Moments",
  },
  {
    src: "/gallery/festival-aftermovie.mp4",
    poster: "/gallery/stage-lights-1.jpg",
    title: "Festival Aftermovie",
  },
  {
    src: "/gallery/pronite-highlights.mp4",
    poster: "/gallery/concert-night-1.jpg",
    title: "Day 1 Highlights",
  },
  {
    src: "/gallery/crowd-moments.mp4",
    poster: "/gallery/concert-night-2.jpg",
    title: "Cultural Events",
  },
  {
    src: "/gallery/festival-aftermovie.mp4",
    poster: "/gallery/stage-atmosphere-1.jpg",
    title: "Grand Finale",
  },
];

// ═══════════════════════════════════════════════════════════════════
// SPECIAL VIDEOS - Featured showcase (2 videos max recommended)
// These get the spotlight treatment with animated borders
// ═══════════════════════════════════════════════════════════════════
export const SPECIAL_VIDEOS: SpecialVideoItem[] = [
  {
    src: "/gallery/festival-aftermovie.mp4",
    poster: "/gallery/grand-finale-1.jpg",
    title: "Live from the crowd",
    sub: "Lights · Fireworks · Chaos",
    orientation: "landscape",
  },
  {
    src: "/gallery/pronite-highlights.mp4",
    poster: "/gallery/stage-lights-1.jpg",
    title: "The night, reimagined",
    sub: "Pro Nite Special",
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
  src: "/gallery/grand-finale-1.jpg",
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
