"use client";

import { GRADIENTS } from "@/components/pages/zonals/constants/palette";
import type { ZonalCollege } from "@/components/pages/zonals/config/zonals.config";
import {
  ZonalsNavbar,
  PassSelection,
  EventsExplorer,
  AtmosphereSection,
  FinalCTA,
} from "./sections";
import { CollegeHeroSection } from "./sections/CollegeHeroSection";

interface Props {
  college: ZonalCollege;
}

export function ZonalCollegePageContent({ college }: Props) {
  return (
    <>
      <ZonalsNavbar />

      <main className="relative min-h-screen" style={{ background: GRADIENTS.PAGE_BG }}>
        <CollegeHeroSection college={college} />
        <PassSelection college={college} />
        <EventsExplorer college={college} />
        <AtmosphereSection />
        <FinalCTA college={college} />
      </main>
    </>
  );
}
