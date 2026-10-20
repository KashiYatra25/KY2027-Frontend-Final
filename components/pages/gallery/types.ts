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

// ── Team section (side-panel + member cards) ──────────────────────────
export type TeamMember = {
  name: string;
  role: string;
  /** Photo URL. Empty/undefined renders a stylish placeholder frame. */
  photo?: string;
  instagram?: string;
  linkedin?: string;
};

export type TeamGroup = {
  /** Stable id used for the side-panel link + anchor. */
  id: string;
  /** Label shown in the side panel. */
  label: string;
  members: TeamMember[];
};

export type LightboxItem = {
  type: "photo" | "video";
  src: string;
  title?: string;
  sub?: string;
};
