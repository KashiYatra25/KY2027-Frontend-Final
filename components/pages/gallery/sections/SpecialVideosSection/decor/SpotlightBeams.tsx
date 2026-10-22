"use client";

import { BeamSVG } from "./BeamSVG";

// ═══════════════════════════════════════════════════════════════════
// SPOTLIGHT BEAMS
// ═══════════════════════════════════════════════════════════════════

export function SpotlightBeams() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <BeamSVG
        className="beam-sway absolute top-0 left-[2%]"
        color="gold"
        swayStart={-14}
        swayEnd={10}
        duration={7}
      />
      <BeamSVG
        className="beam-sway absolute top-0 left-[36%]"
        color="rani"
        swayStart={12}
        swayEnd={-12}
        duration={9}
      />
      <BeamSVG
        className="beam-sway absolute top-0 right-0"
        color="purple"
        swayStart={-8}
        swayEnd={16}
        duration={8}
      />
    </div>
  );
}
