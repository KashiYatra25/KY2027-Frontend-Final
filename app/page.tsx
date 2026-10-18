"use client";

import { Suspense } from "react";
import {
  HeroSection,
  ProNitesSection,
  TheExperience,
  BanarasiVibesSection,
  FooterSection,
  FestHighlightsSection,
} from "@/components/pages/home/sections";
import { Navbar } from "@/components/navbar/Navbar";
import { SignoutToastHandler } from "@/components/auth";

export default function Home() {
  return (
    <main>
      {/* Signout toast handler */}
      <Suspense fallback={null}>
        <SignoutToastHandler />
      </Suspense>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section - the beautiful river section */}
      <div className="sticky top-0 z-0 h-screen">
        <HeroSection />
      </div>

      {/* Rest of the sections */}
      <div className="relative z-10">
        <ProNitesSection />
      </div>
      <div className="relative z-15">
        <TheExperience />
      </div>
      <div className="sticky top-0 z-20">
        <BanarasiVibesSection />
      </div>
      <div className="sticky top-0 z-30">
        <FestHighlightsSection />
      </div>
      {/* Footer uses relative with high z-index to cover sticky sections */}
      <div className="relative z-[100]">
        <FooterSection />
      </div>
    </main>
  );
}
