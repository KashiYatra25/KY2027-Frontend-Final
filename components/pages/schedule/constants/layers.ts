// ═══════════════════════════════════════════════════════════════════
// SCHEDULE PAGE CONSTANTS
// ═══════════════════════════════════════════════════════════════════

import type { MapLayers, LayerConfig } from "@/lib/api/helper/types";

export const DEFAULT_LAYERS: MapLayers = {
  night: true,
  lights: true,
  clouds: true,
  birds: true,
  labels: true,
};

export const LAYERS: LayerConfig[] = [
  { key: "night", label: "Night", icon: "🌙" },
  { key: "lights", label: "Lights", icon: "💡" },
  { key: "clouds", label: "Clouds", icon: "☁️" },
  { key: "birds", label: "Birds", icon: "🐦" },
  { key: "labels", label: "Labels", icon: "🏷️" },
];
