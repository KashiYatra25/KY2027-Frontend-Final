"use client";

import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeroSection,
  ProNitesSection,
  TheExperience,
  BanarasiVibesSection,
  FooterSection,
  FestHighlightsSection,
  IntroSection,
  IntroProvider,
  useIntro,
} from "@/components/pages/home/sections";
import { Navbar } from "@/components/navbar/Navbar";
import { SignoutToastHandler } from "@/components/auth";

export default function Home() {
  return (
    <IntroProvider>
      <HomeContent />
    </IntroProvider>
  );
}

function HomeContent() {
  const { isIntroComplete } = useIntro();

  return (
    <main>
      {/* Signout toast handler */}
      <Suspense fallback={null}>
        <SignoutToastHandler />
      </Suspense>

      {/* Intro Section - renders until complete */}
      {!isIntroComplete && (
        <div className="fixed inset-0 z-[200]">
          <IntroSection />
        </div>
      )}

      {/* Main site content - always rendered but hidden during intro */}
      <AnimatePresence>
        {isIntroComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Navbar - revealed after intro */}
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
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
