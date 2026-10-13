"use client";

import { JAZZ_COLORS } from "@/components/pages/contact/constants/palette";
import { ThemedNavbar } from "@/components/navbar";
import { AmbientDecor, ContactHero, ContactForm, ContactInfo } from ".";

// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE CONTENT
// ═══════════════════════════════════════════════════════════════════
export function ContactPageContent() {
  return (
    <>
      {/* Fixed navbar - always visible (matches events/passes/about internal pages) */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="main" />
      </div>

      <main
        className="relative min-h-screen overflow-hidden pt-20 sm:pt-24"
        style={{
          background: `linear-gradient(180deg, 
            ${JAZZ_COLORS.BG_DEEP} 0%, 
            ${JAZZ_COLORS.BG_ROYAL} 12%,
            ${JAZZ_COLORS.BG_WINE} 35%,
            ${JAZZ_COLORS.BG_ROYAL} 60%,
            ${JAZZ_COLORS.BG_WINE} 80%,
            ${JAZZ_COLORS.BG_DEEP} 100%
          )`,
        }}
      >
        {/* Desktop-only ambient spiritual animations */}
        <AmbientDecor />

        {/* Content sits above the ambient layer */}
        <div className="relative z-10">
          <ContactHero />
          <ContactForm />
          <ContactInfo />
        </div>
      </main>
    </>
  );
}
