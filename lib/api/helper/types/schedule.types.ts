// ═══════════════════════════════════════════════════════════════════
// SCHEDULE PAGE TYPES
// ═══════════════════════════════════════════════════════════════════

import type { EventCategory, SubEvent } from "./events.types";

/** Label colour variants from the original map design. */
export type LabelTone = "blue" | "red" | "green" | "white" | "text";

export interface Venue {
  slug: string;
  name: string;
  /** Text shown on the map label (may contain line breaks). */
  label: string;
  tone: LabelTone;
  large?: boolean;
  /** Label centre. */
  x: number;
  y: number;
  /** Point on the map the label's leader line points to. */
  anchor?: [number, number];
  /** Direction signs etc. are drawn but not clickable. */
  clickable?: boolean;
}

export interface ScheduledEvent {
  event: SubEvent;
  category: EventCategory;
  venue: Venue;
  day: number;
}

export type Layer = "night" | "lights" | "clouds" | "birds" | "labels";

export type MapLayers = Record<Layer, boolean>;

export interface LayerConfig {
  key: Layer;
  label: string;
  icon: string;
}
