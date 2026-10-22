"use client";

import { useState, useCallback } from "react";
import { COLORS } from "./constants/palette";
import { GalleryNavbar } from "./sections/GalleryNavbar/GalleryNavbar";
import { HeroSection } from "./sections/HeroSection";
import { PhotoReels } from "./sections/PhotoReels/PhotoReels";
import { VideoReelSection } from "./sections/VideoReelSection";
import { SpecialVideosSection } from "./sections/SpecialVideosSection/SpecialVideosSection";
import { PerformersSection } from "./sections/PerformersSection";
import { TeamSection } from "./sections/TeamSection/TeamSection";
import { FooterSection } from "./sections/FooterSection";
import { Lightbox } from "./sections/Lightbox";
import { GlowBackgrounds } from "./sections/GlowBackgrounds";
import { DecoElements } from "./sections/decor";
import { Sparkles } from "./sections/Sparkles";
import type { LightboxItem } from "./types";

// ═══════════════════════════════════════════════════════════════════
// GALLERY PAGE CONTENT
// Cinematic gallery with film reels, videos, and performer cards
// ═══════════════════════════════════════════════════════════════════

export function GalleryPageContent() {
  const [lightbox, setLightbox] = useState<{
    items: LightboxItem[];
    index: number;
  } | null>(null);

  const openLightbox = useCallback((items: LightboxItem[], index: number) => {
    setLightbox({ items, index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const navigateLightbox = useCallback((direction: "prev" | "next") => {
    setLightbox((prev) => {
      if (!prev) return null;
      const newIndex =
        direction === "prev"
          ? (prev.index - 1 + prev.items.length) % prev.items.length
          : (prev.index + 1) % prev.items.length;
      return { ...prev, index: newIndex };
    });
  }, []);

  return (
    <>
      {/* Custom Gallery Navbar - matches cinematic film theme */}
      <GalleryNavbar />

      {/* Page container */}
      <div
        className="gallery-page relative min-h-screen overflow-x-hidden"
        style={{ background: COLORS.INK, color: COLORS.TEXT }}
      >
        {/* Background glows */}
        <GlowBackgrounds />

        {/* Decorative line art */}
        <DecoElements />

        {/* Animated sparkles */}
        <Sparkles />

        {/* Main content */}
        <main className="relative z-10">
          {/* Hero section with title and camera illustration */}
          <HeroSection />

          {/* Photo film reels */}
          <PhotoReels onPhotoClick={openLightbox} />

          {/* Video reel section */}
          <VideoReelSection onVideoClick={openLightbox} />

          {/* Special videos showcase */}
          <SpecialVideosSection onVideoClick={openLightbox} />

          {/* Performers section */}
          <PerformersSection onCardClick={openLightbox} />

          {/* Team photo section */}
          <TeamSection onPhotoClick={openLightbox} />

          {/* Footer */}
          <FooterSection />
        </main>

        {/* Lightbox overlay */}
        {lightbox && (
          <Lightbox
            items={lightbox.items}
            currentIndex={lightbox.index}
            onClose={closeLightbox}
            onNavigate={navigateLightbox}
          />
        )}
      </div>
    </>
  );
}
