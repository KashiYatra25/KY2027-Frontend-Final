"use client";

import { SponsorsNavbar } from "./components/SponsorsNavbar";
import { GRADIENTS } from "./constants/palette";
import {
  HeroSection,
  ImpactSection,
  WhyBrandsSection,
  SponsorWallSection,
  ActivationsSection,
  CollaborationCTASection,
  FooterSection,
} from "./sections";

// Import animations
import "./constants/animations.css";

// ═══════════════════════════════════════════════════════════════════
// SPONSORS PAGE CONTENT - KASHI AFTER DARK
// Clean, bold, poster-style design with custom navbar
// ═══════════════════════════════════════════════════════════════════

export function SponsorsPageContent() {
  return (
    <>
      {/* Custom Sponsors Navbar */}
      <SponsorsNavbar />

      <main className="relative min-h-screen" style={{ background: GRADIENTS.PAGE_BG }}>
        <HeroSection />
        <ImpactSection />
        <WhyBrandsSection />
        <SponsorWallSection />
        <ActivationsSection />
        <CollaborationCTASection />
        <FooterSection />
      </main>
    </>
  );
}

export default SponsorsPageContent;
