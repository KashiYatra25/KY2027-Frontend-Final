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
import { IMAGES } from "@/lib/images";

// ═══════════════════════════════════════════════════════════════════
// PHOTOS - Film reel gallery
// Each line is one photo. Either a plain path/URL or an object with
// optional caption (title, sub) and optional w/h for aspect ratio.
// ═══════════════════════════════════════════════════════════════════
export const PHOTOS: PhotoItem[] = [
  // Gallery photos from Kashi Yatra 2027
  { src: IMAGES.gallery.grandFinale1, title: "Grand Finale", sub: "Pro Nite" },
  { src: IMAGES.gallery.concertNight1, title: "Concert Night", sub: "Main Stage" },
  { src: IMAGES.gallery.concertNight2, title: "Live Performance", sub: "Day 3" },
  { src: IMAGES.gallery.concertNight3, title: "Stage Vibes", sub: "Night Show" },
  { src: IMAGES.gallery.stageLights1, title: "Stage Lights", sub: "Pro Nite" },
  { src: IMAGES.gallery.proniteCrowd1, title: "Crowd Energy", sub: "Pro Nite" },
  { src: IMAGES.gallery.proniteCrowd2, title: "Festival Crowd", sub: "Main Arena" },
  { src: IMAGES.gallery.stageAtmosphere1, title: "Stage Atmosphere", sub: "Night Show" },
  { src: IMAGES.gallery.performance1, title: "Live Show", sub: "Day 2" },
  { src: IMAGES.gallery.festivalVibes1, title: "Festival Vibes", sub: "Campus" },
  { src: IMAGES.gallery.crowdEnergy1, title: "Celebrations", sub: "KY 2027" },
  // Additional slider images
  { src: IMAGES.about.slider.left1, title: "Opening Ceremony", sub: "Day 1" },
  { src: IMAGES.about.slider.right1, title: "Cultural Night", sub: "Day 2" },
  { src: IMAGES.about.slider.left2, title: "Dance Performance", sub: "Natraj" },
  { src: IMAGES.about.slider.right2, title: "Artists Live", sub: "Day 3" },
  { src: IMAGES.about.slider.left3, title: "Memories", sub: "KY 2027" },
];

// ═══════════════════════════════════════════════════════════════════
// VIDEOS - General video reel
// Video clips that scroll horizontally. Provide poster for thumbnail.
//
// NOTE: Videos are served directly from /public/gallery/video (NOT ImageKit).
// They will be migrated to R2 later — update VIDEO_BASE when that happens.
// ═══════════════════════════════════════════════════════════════════
const VIDEO_BASE = "/gallery/video";

export const VIDEOS: VideoItem[] = [
  {
    src: `${VIDEO_BASE}/kashiyatra-highlight-01.mp4`,
    poster: IMAGES.gallery.grandFinale1,
    title: "Pro Nite Highlights",
  },
  {
    src: `${VIDEO_BASE}/kashiyatra-highlight-02.mp4`,
    poster: IMAGES.gallery.proniteCrowd1,
    title: "Crowd Moments",
  },
  {
    src: `${VIDEO_BASE}/kashiyatra-highlight-03.mp4`,
    poster: IMAGES.gallery.stageLights1,
    title: "Festival Aftermovie",
  },
  {
    src: `${VIDEO_BASE}/kashiyatra-highlight-04.mp4`,
    poster: IMAGES.gallery.concertNight1,
    title: "Day 1 Highlights",
  },
  {
    src: `${VIDEO_BASE}/kashiyatra-highlight-05.mp4`,
    poster: IMAGES.gallery.concertNight2,
    title: "Cultural Events",
  },
  {
    src: `${VIDEO_BASE}/kashiyatra-highlight-06.mp4`,
    poster: IMAGES.gallery.stageAtmosphere1,
    title: "Grand Finale",
  },
];

// ═══════════════════════════════════════════════════════════════════
// SPECIAL VIDEOS - Featured showcase (2 videos max recommended)
// These get the spotlight treatment with animated borders
// ═══════════════════════════════════════════════════════════════════
export const SPECIAL_VIDEOS: SpecialVideoItem[] = [
  {
    src: `${VIDEO_BASE}/kashiyatra-highlight-07.mp4`,
    poster: IMAGES.gallery.grandFinale1,
    title: "Live from the crowd",
    sub: "Lights · Fireworks · Chaos",
    orientation: "landscape",
  },
  {
    src: `${VIDEO_BASE}/kashiyatra-highlight-08.mp4`,
    poster: IMAGES.gallery.stageLights1,
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
  { src: IMAGES.singers.ritviz, name: "Ritviz", subtitle: "Pro Nite 2027" },
  { src: IMAGES.singers.raftaar, name: "Raftaar", subtitle: "EDM Night" },
  { src: IMAGES.singers.jubinNautiyal, name: "Jubin Nautiyal", subtitle: "Day 2" },
  { src: IMAGES.singers.mohitChauhan, name: "Mohit Chauhan", subtitle: "Sufi Night" },
  { src: IMAGES.singers.vishalShekhar, name: "Vishal-Shekhar", subtitle: "Grand Finale" },
  { src: IMAGES.singers.anubhavBassi, name: "Anubhav Bassi", subtitle: "Comedy Night" },
];

// ═══════════════════════════════════════════════════════════════════
// TEAM PHOTO - Group photo of the organizing team
// ═══════════════════════════════════════════════════════════════════
export const TEAM_PHOTO: TeamPhotoItem | null = {
  src: IMAGES.gallery.grandFinale1,
  title: "Kashi Yatra 2027 Team",
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
