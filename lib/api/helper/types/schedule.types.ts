// ═══════════════════════════════════════════════════════════════════
// SCHEDULE PAGE TYPES
// Types for schedule API responses and frontend components
// ═══════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════
// VENUE TYPES
// ═══════════════════════════════════════════════════════════════════

/** Label colour variants from the original map design. */
export type LabelTone = "blue" | "red" | "green" | "white" | "text";

export interface Venue {
  slug: string;
  name: string;
  /** Text shown on the map label (may contain line breaks). */
  label: string;
  tone: LabelTone;
  large?: boolean;
  /** Label centre (percentage of map). */
  x: number;
  y: number;
  /** Point on the map the label's leader line points to. */
  anchor?: [number, number];
  /** Direction signs etc. are drawn but not clickable. */
  clickable?: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// FEST DAY TYPES
// ═══════════════════════════════════════════════════════════════════

export interface FestDay {
  dayNumber: number;
  date: string;
  displayDate: string;
  name?: string;
}

/** Map of day number to display date: { 1: "14 Jan", 2: "15 Jan", ... } */
export type FestDaysMap = Record<number, string>;

// ═══════════════════════════════════════════════════════════════════
// SCHEDULED EVENT TYPES (from backend API)
// ═══════════════════════════════════════════════════════════════════

/** Event details as returned by schedule API */
export interface ScheduledEventData {
  id: string;
  name: string;
  tagline: string;
  description: string | null;
  type: "individual" | "duo" | "team";
  teamSize?: string;
  registrationOpen: boolean;
}

/** Category info as returned by schedule API */
export interface ScheduledEventCategory {
  id: string;
  name: string;
  slug: string;
}

/** Full scheduled event from backend */
export interface ScheduledEvent {
  event: ScheduledEventData;
  category: ScheduledEventCategory;
  venue: Venue;
  day: number;
  startTime?: string;
  endTime?: string;
}

// ═══════════════════════════════════════════════════════════════════
// API RESPONSE TYPES
// ═══════════════════════════════════════════════════════════════════

export interface ScheduleApiResponse {
  statusCode: number;
  message: string;
  info: string;
  scheduledEvents: ScheduledEvent[];
  venues: Venue[];
  festDays: FestDaysMap;
  count: number;
}

export interface VenuesApiResponse {
  statusCode: number;
  message: string;
  info: string;
  venues: Venue[];
  count: number;
}

export interface FestDaysApiResponse {
  statusCode: number;
  message: string;
  info: string;
  festDays: FestDay[];
  festDaysMap: FestDaysMap;
  count: number;
}

export interface VenueScheduleApiResponse {
  statusCode: number;
  message: string;
  info: string;
  venue: Venue;
  scheduledEvents: Omit<ScheduledEvent, "venue">[];
  eventsByDay: Record<number, Omit<ScheduledEvent, "venue">[]>;
  festDays: FestDaysMap;
  count: number;
}

// ═══════════════════════════════════════════════════════════════════
// QUERY PARAMS
// ═══════════════════════════════════════════════════════════════════

export interface ScheduleQueryParams {
  day?: number;
  venue?: string;
  category?: string;
}

// ═══════════════════════════════════════════════════════════════════
// MAP LAYER TYPES
// ═══════════════════════════════════════════════════════════════════

export type Layer = "night" | "lights" | "clouds" | "birds" | "labels";

export type MapLayers = Record<Layer, boolean>;

export interface LayerConfig {
  key: Layer;
  label: string;
  icon: string;
}

// ═══════════════════════════════════════════════════════════════════
// CATEGORY METADATA (for UI display - icons, colors)
// ═══════════════════════════════════════════════════════════════════

export interface CategoryMetadata {
  name: string;
  icon: string;
  color: string;
  tagline: string;
}

export type CategoryMetadataMap = Record<string, CategoryMetadata>;
