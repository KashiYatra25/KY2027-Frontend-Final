"use client";

import { GRADIENTS } from "@/components/pages/zonals/constants/palette";
import { ZonalsNavbar, HeroSection, AtmosphereSection, FinalCTA } from "./sections";

export function ZonalsLandingContent() {
  return (
    <>
      <ZonalsNavbar />

      <main className="relative min-h-screen" style={{ background: GRADIENTS.PAGE_BG }}>
        {/* ── Animated hero (big ZONALS. headline, starbursts, live-signal) ── */}
        <HeroSection />

        {/* ── Atmosphere / "PICK YOUR PLAYGROUND" editorial collage ── */}
        <AtmosphereSection />

        {/* ── Closing CTA ── */}
        <FinalCTA />
      </main>
    </>
  );
}
