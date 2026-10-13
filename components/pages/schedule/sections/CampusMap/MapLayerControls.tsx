"use client";

import { MapControls } from "./MapControls";
import type { Layer, MapLayers } from "@/lib/api/helper/types";

/** Night / Lights / Clouds / Birds / Labels toggles - vertical hover menu. */
export function MapLayerControls({
  layers,
  onToggle,
  isNight = true,
  className = "",
}: {
  layers: MapLayers;
  onToggle: (key: Layer) => void;
  isNight?: boolean;
  className?: string;
}) {
  return (
    <MapControls
      layers={layers}
      onToggle={onToggle}
      onSearchClick={() => {}}
      isNight={isNight}
      className={className}
    />
  );
}
