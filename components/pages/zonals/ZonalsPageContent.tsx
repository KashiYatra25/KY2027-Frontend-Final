"use client";

import { GRADIENTS } from "@/components/pages/zonals/constants/palette";
import { HeroSection, EventsExplorer, AtmosphereSection, FinalCTA, ZonalsNavbar } from "./sections";

// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT - ZonalsPageContent
//
// Shell that wires up the page shell (navbar + background) and composes
// the individual sections. Sections consume PLACEHOLDER data from
// zonals.config.ts.
//
// NOTE: Hero / HowItWorks / Zones sections are owned by other stages and
// slot in above EventsExplorer when ready.
// ═══════════════════════════════════════════════════════════════════

export function ZonalsPageContent() {
  return (
    <>
      {/* Custom Zonals Navbar - art-directed festival navigation */}
      <ZonalsNavbar />

      <main className="relative min-h-screen" style={{ background: GRADIENTS.PAGE_BG }}>
        {/* ───────────────────────────────────────────────────────────
            SECTIONS
        ─────────────────────────────────────────────────────────── */}
        <HeroSection />
        <EventsExplorer />
        <AtmosphereSection />
        <FinalCTA />
      </main>
    </>
  );
}
