"use client";

import { Z_HERO, RIVER_WATER_BY_THEME } from "@/components/pages/home/constants";
import { Water } from "./water";
import { Stones } from "./stone/Stones";
import { Lotuses } from "./lotus/Lotuses";
import { Diyas } from "./diya/Diyas";
import { Boats } from "./boat/Boats";

interface RiverProps {
  className?: string;
  /** Current time-of-day theme; tints the water color. */
  timeOfDay?: string;
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * River Section - Contains all river elements
 *
 * Structure:
 * - Water (base layer with ripple animation)
 * - Lotuses (floating lotus flowers)
 * - Diyas (floating oil lamps)
 * - Boats (moving boats - desktop only)
 * - Stones (stepping stone navigation)
 *
 * All elements use individual z-indexes from constants for proper layering
 */
export function River({ className = "", timeOfDay = "night", ref }: RiverProps) {
  const waterGradient = RIVER_WATER_BY_THEME[timeOfDay] ?? RIVER_WATER_BY_THEME.night;

  return (
    <div
      ref={ref}
      className={`absolute right-0 bottom-0 left-0 h-[32vh] sm:h-[30vh] md:h-[32vh] ${className}`}
      style={{
        zIndex: Z_HERO.RIVER,
        background: waterGradient,
        transition: "background 1.5s ease-in-out",
      }}
    >
      {/* Water surface with ripples - both mobile and desktop */}
      <Water className="h-full w-full" timeOfDay={timeOfDay} />

      {/* River elements - each manages its own z-index */}
      <Lotuses />
      <Diyas />
      <Boats />
      <Stones />
    </div>
  );
}
