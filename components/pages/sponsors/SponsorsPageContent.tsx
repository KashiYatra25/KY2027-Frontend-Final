"use client";

import { memo } from "react";
import { SponsorsNavbar } from "./components/SponsorsNavbar";
import { PALETTE, GRADIENTS } from "./constants/palette";
import {
  HeroSection,
  ImpactSection,
  WhyBrandsSection,
  SponsorWallSection,
  ActivationsSection,
  CollaborationCTASection,
} from "./sections";

// Import animations
import "./constants/animations.css";

// ═══════════════════════════════════════════════════════════════════
// SPONSORS PAGE CONTENT - KASHI AFTER DARK
// Clean, bold, poster-style design with custom navbar
// ═══════════════════════════════════════════════════════════════════

// Footer
const Footer = memo(function Footer() {
  return (
    <footer className="relative px-4 py-16 sm:px-6" style={{ background: PALETTE.DEEP_INK }}>
      {/* Top border */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${PALETTE.ELECTRIC_VIOLET}50, transparent)`,
        }}
      />

      <div className="mx-auto max-w-6xl text-center 2xl:max-w-7xl">
        {/* Logo */}
        <div
          className="mb-4 text-2xl font-bold tracking-tight"
          style={{
            fontFamily: "var(--font-cinzel-decorative), serif",
            background: GRADIENTS.TITLE,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          KASHIYATRA
        </div>

        {/* Tagline */}
        <p className="mb-6 text-sm tracking-wider" style={{ color: PALETTE.TEXT_MUTED }}>
          The Annual Socio-Cultural Festival • IIT (BHU), Varanasi
        </p>

        {/* Links */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm">
          {["Home", "Events", "Gallery", "Contact"].map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase()}`}
              className="transition-colors hover:text-white"
              style={{ color: PALETTE.TEXT_MUTED }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs" style={{ color: PALETTE.TEXT_MUTED }}>
          © 2027 Kashiyatra. All rights reserved.
        </p>
      </div>
    </footer>
  );
});

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
        <Footer />
      </main>
    </>
  );
}

export default SponsorsPageContent;
