// ═══════════════════════════════════════════════════════════════════
// PASS TYPES
// Types for festival passes API
// ═══════════════════════════════════════════════════════════════════

export interface PassBenefit {
  text: string;
  highlight?: boolean;
}

export interface PassDetail {
  icon: string;
  title: string;
  description: string;
}

/**
 * Alias for PassDetail, kept for the frontend pass config shape.
 */
export type PassDetailItem = PassDetail;

/**
 * Frontend pass configuration shape (used by UI components).
 * Derived from the backend Pass via `toPassConfig`.
 */
export interface PassConfig {
  id: string; // slug (for display/URLs)
  _id?: string; // MongoDB ObjectId (for API calls like cart) - optional for static config
  name: string;
  price: number;
  image: string;
  tagline: string;
  accentColor: string;
  glowColor: string;
  benefits: PassBenefit[];
  popular?: boolean; // For highlighting recommended pass
  details: PassDetailItem[]; // Detailed info for modal
}

export interface Pass {
  _id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  tagline: string;
  accentColor: string;
  glowColor: string;
  popular?: boolean;
  benefits: PassBenefit[];
  details: PassDetail[];
  sortOrder: number;
  active: boolean;
}

export interface PassesApiResponse {
  info: string;
  passes: Pass[];
  count: number;
}
