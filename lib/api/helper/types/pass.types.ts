// ═══════════════════════════════════════════════════════════════════
// PASS TYPES
// Passes are static frontend data (see components/pages/passes/config).
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
 * Frontend pass configuration shape (used by the UI + static config).
 */
export interface PassConfig {
  id: string; // slug (for display/URLs)
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
