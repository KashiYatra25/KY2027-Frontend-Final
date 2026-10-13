"use client";

import { ThemedNavbar } from "@/components/navbar";
import {
  HeroSection,
  LegacySection,
  StatsSection,
  EssenceSection,
  VisionSection,
  CTASection,
} from ".";
import { NeonGridBackground, LaserBeams } from "./sections/decor";

// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE CONTENT - Clean minimal design
// ═══════════════════════════════════════════════════════════════════
export function AboutPageContent() {
  return (
    <>
      {/* Fixed navbar - About theme (purple/blue concert) */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="about" />
      </div>

      {/* Subtle background */}
      <NeonGridBackground />

      {/* Laser beams effect from top to bottom */}
      <LaserBeams />

      <main className="relative z-10 min-h-screen pt-16 sm:pt-24">
        <HeroSection />
        <LegacySection />
        <StatsSection />
        <EssenceSection />
        {/* Vision section - hidden on mobile */}
        <div className="hidden sm:block">
          <VisionSection />
        </div>
        <CTASection />
      </main>
    </>
  );
}
