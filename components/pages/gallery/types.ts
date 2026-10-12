// ═══════════════════════════════════════════════════════════════════
// GALLERY PAGE TYPES
// ═══════════════════════════════════════════════════════════════════

export type PhotoItem = {
  src: string;
  title?: string;
  sub?: string;
  w?: number;
  h?: number;
};

export type VideoItem = {
  src: string;
  poster?: string;
  title?: string;
  sub?: string;
  w?: number;
  h?: number;
};

export type SpecialVideoItem = {
  src: string;
  poster?: string;
  title: string;
  sub: string;
  orientation: "landscape" | "portrait";
};

export type PerformerItem = {
  src: string;
  name: string;
  subtitle?: string;
};

export type TeamPhotoItem = {
  src: string;
  title?: string;
  aspectRatio?: number;
};

export type LightboxItem = {
  type: "photo" | "video";
  src: string;
  title?: string;
  sub?: string;
};
