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
  TeamGroup,
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
  { src: "/gallery/photos/day-2-poster.jpg", title: "Kashiyatra Day 2", sub: "Festival" },
  { src: "/gallery/photos/breakdance-crowd.jpg", title: "Street Dance", sub: "Live Show" },
  { src: "/gallery/photos/opening-ceremony.jpg", title: "Opening Ceremony", sub: "Inauguration" },
  { src: "/gallery/photos/crowd-performance.jpg", title: "Stage Interaction", sub: "Live Show" },
  { src: "/gallery/photos/live-concert.jpg", title: "Live Concert", sub: "Pro Nite" },
  { src: "/gallery/photos/folk-performance.jpg", title: "Folk Performance", sub: "Cultural Night" },
  { src: "/gallery/photos/pyrotechnics.jpg", title: "Fireworks", sub: "Pro Nite" },
  { src: "/gallery/photos/dj-set.jpg", title: "DJ Set", sub: "Pro Nite" },
  { src: "/gallery/photos/group-dance.jpg", title: "Group Dance", sub: "Stage Show" },
  { src: "/gallery/photos/awareness-exhibit.jpg", title: "Campus Exhibit", sub: "Festival" },
  { src: "/gallery/photos/fashion-show.jpg", title: "Fashion Showcase", sub: "Stage Show" },
  {
    src: "/gallery/photos/dance-performance.jpg",
    title: "Dance Performance",
    sub: "Cultural Night",
  },
  { src: "/gallery/photos/costume-performance.jpg", title: "Costume Showcase", sub: "Stage Show" },
  { src: "/gallery/photos/music-performance.jpg", title: "Music Performance", sub: "Live Show" },
  { src: "/gallery/photos/pageant.jpg", title: "Pageant", sub: "Stage Show" },
  { src: "/gallery/photos/solo-performance.jpg", title: "Solo Performance", sub: "Stage Show" },
  { src: "/gallery/photos/daytime-dance.jpg", title: "Daytime Dance", sub: "Campus" },
  // Kashiyatra festival photos (replaces the old non-fest placeholder art)
  { src: "/gallery/gallery-01.jpeg", title: "Kashiyatra", sub: "KY 2026" },
  { src: "/gallery/gallery-02.jpeg", title: "Kashiyatra", sub: "KY 2026" },
  { src: "/gallery/gallery-03.jpeg", title: "Kashiyatra", sub: "KY 2026" },
  { src: "/gallery/gallery-04.jpeg", title: "Kashiyatra", sub: "KY 2026" },
  { src: "/gallery/gallery-05.jpeg", title: "Kashiyatra", sub: "KY 2026" },
  { src: "/gallery/gallery-06.jpeg", title: "Kashiyatra", sub: "KY 2026" },
  { src: "/gallery/gallery-07.jpeg", title: "Kashiyatra", sub: "KY 2026" },
  { src: "/gallery/gallery-08.jpeg", title: "Kashiyatra", sub: "KY 2026" },
  { src: "/gallery/gallery-09.jpeg", title: "Kashiyatra", sub: "KY 2026" },
  { src: "/gallery/gallery-10.jpeg", title: "Kashiyatra", sub: "KY 2026" },
  { src: "/gallery/gallery-11.jpeg", title: "Kashiyatra", sub: "KY 2026" },
  { src: "/gallery/gallery-12.jpeg", title: "Kashiyatra", sub: "KY 2026" },
  { src: "/gallery/gallery-13.jpeg", title: "Kashiyatra", sub: "KY 2026" },
  { src: "/gallery/gallery-14.jpeg", title: "Kashiyatra", sub: "KY 2026" },
  { src: "/gallery/gallery-15.jpeg", title: "Kashiyatra", sub: "KY 2026" },
  { src: "/gallery/gallery-16.jpeg", title: "Kashiyatra", sub: "KY 2026" },
  { src: "/gallery/gallery-17.jpeg", title: "Kashiyatra", sub: "KY 2026" },
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
  { src: IMAGES.singers.ritviz, name: "Ritviz", subtitle: "Pro Nite 2026" },
  { src: IMAGES.singers.raftaar, name: "Raftaar", subtitle: "EDM Night" },
  { src: IMAGES.singers.jubinNautiyal, name: "Jubin Nautiyal", subtitle: "Day 2" },
  { src: IMAGES.singers.mohitChauhan, name: "Mohit Chauhan", subtitle: "Sufi Night" },
  { src: IMAGES.singers.vishalShekhar, name: "Vishal-Shekhar", subtitle: "Grand Finale" },
  { src: IMAGES.singers.anubhavBassi, name: "Anubhav Bassi", subtitle: "Comedy Night" },
];

// ═══════════════════════════════════════════════════════════════════
// TEAM PHOTO - Group photo of the organizing team
// ═══════════════════════════════════════════════════════════════════
// Team group photo — set to null until the real team photo is available.
// A "Coming soon" placeholder is shown in its place (see TeamSection).
export const TEAM_PHOTO: TeamPhotoItem | null = null;

// ═══════════════════════════════════════════════════════════════════
// TEAM GROUPS - side-panel categories + member cards
//
// Each group is a link in the "Meet Our Team" side panel. Members with
// no `photo` render a stylish placeholder frame (edit later / add photos).
// ═══════════════════════════════════════════════════════════════════
export const TEAM_GROUPS: TeamGroup[] = [
  {
    id: "tech",
    label: "Tech Team",
    members: [
      { name: "Srajan", role: "Tech Lead", photo: IMAGES.gallery.team.tech.head.srajan },
      {
        name: "Akhilesh",
        role: "Contributor",
        photo: IMAGES.gallery.team.tech.subordinates.akhilesh,
      },
      {
        name: "Prerna",
        role: "Contributor",
        photo: IMAGES.gallery.team.tech.subordinates.prerna,
      },
      {
        name: "Rishikar",
        role: "Contributor",
        photo: IMAGES.gallery.team.tech.subordinates.rishikar,
      },
      {
        name: "G. Prem Kumar",
        role: "Contributor",
        photo: IMAGES.gallery.team.tech.subordinates.gPremKumar,
      },
      {
        name: "Balaji Siddhartha Katiki",
        role: "Contributor",
        photo: IMAGES.gallery.team.tech.subordinates.balajiSiddharthaKatiki,
      },
      {
        name: "Bhavanasi Anjana Akhileswar",
        role: "Contributor",
        photo: IMAGES.gallery.team.tech.subordinates.bhavanasiAnjanaAkhileswar,
      },
      {
        name: "Eraganaboina Krishna Koushik",
        role: "Contributor",
        photo: IMAGES.gallery.team.tech.subordinates.eraganaboinaKrishnaKoushik,
      },
      {
        name: "Meesala Pawan Kumar",
        role: "Contributor",
        photo: IMAGES.gallery.team.tech.subordinates.meesalaPawanKumar,
      },
      {
        name: "Siddu Kumar Reddy Bandi",
        role: "Contributor",
        photo: IMAGES.gallery.team.tech.subordinates.sidduKumarReddyBandi,
      },
      {
        name: "Vancha Abhinav Reddy",
        role: "Contributor",
        photo: IMAGES.gallery.team.tech.subordinates.vanchaAbhinavReddy,
      },
      {
        name: "Y. V. Suresh Kumar Reddy",
        role: "Contributor",
        photo: IMAGES.gallery.team.tech.subordinates.yvSureshKumarReddy,
      },
    ],
  },
];

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
