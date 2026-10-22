"use client";

import { MandalaLarge } from "./MandalaLarge";
import { Paisley } from "./Paisley";
import { Vine } from "./Vine";
import { Swirl } from "./Swirl";
import { StarShape } from "./StarShape";
import { Lotus } from "./Lotus";

// ═══════════════════════════════════════════════════════════════════
// DECORATIVE ELEMENTS - Cream-colored SVG line art scattered on page
// ═══════════════════════════════════════════════════════════════════

export function DecoElements() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-visible opacity-65"
      aria-hidden="true"
    >
      {/* Top left mandala */}
      <div
        className="absolute opacity-[0.37]"
        style={{
          top: -70,
          left: -120,
          width: "clamp(240px, 34vw, 420px)",
        }}
      >
        <MandalaLarge />
      </div>

      {/* Top right paisley */}
      <div
        className="absolute opacity-[0.48]"
        style={{
          top: "clamp(250px, 26vw, 330px)",
          left: "52%",
          width: "clamp(50px, 7vw, 90px)",
          transform: "rotate(24deg)",
        }}
      >
        <Paisley />
      </div>

      {/* Right side vine */}
      <div
        className="absolute opacity-[0.34]"
        style={{
          top: "clamp(120px, 12vw, 180px)",
          right: "clamp(34px, 5vw, 90px)",
          width: "clamp(40px, 6vw, 76px)",
          transform: "rotate(8deg)",
        }}
      >
        <Vine />
      </div>

      {/* Left swirl */}
      <div
        className="absolute opacity-[0.48]"
        style={{
          top: "clamp(300px, 34vw, 420px)",
          left: "3%",
          width: "clamp(90px, 13vw, 170px)",
        }}
      >
        <Swirl />
      </div>

      {/* Center sparkle */}
      <div
        className="absolute opacity-[0.62]"
        style={{
          top: "clamp(190px, 19vw, 250px)",
          left: "46%",
          width: 30,
        }}
      >
        <StarShape />
      </div>

      {/* Bottom lotus */}
      <div
        className="absolute opacity-[0.44]"
        style={{
          bottom: -10,
          right: "3%",
          width: "clamp(220px, 32vw, 400px)",
        }}
      >
        <Lotus />
      </div>

      {/* Bottom left mandala */}
      <div
        className="absolute opacity-[0.31]"
        style={{
          bottom: 30,
          left: -90,
          width: "clamp(200px, 26vw, 320px)",
          transform: "rotate(11deg)",
        }}
      >
        <MandalaLarge />
      </div>
    </div>
  );
}
