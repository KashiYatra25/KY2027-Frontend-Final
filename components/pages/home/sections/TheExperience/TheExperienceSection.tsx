"use client";

import { memo, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JAZZ_COLORS } from "@/components/pages/home/constants/palette";
import { EXPERIENCES } from "./data/experiences.config";
import { JazzTile } from "./tiles/JazzTile";
import { SectionTitle } from "./decor/SectionTitle";
import { MotionZone } from "@/lib/motion/MotionZone";
import { useAnimationPolicy } from "@/hooks";
import { BackgroundDecor } from "./desktop/BackgroundDecor";
import { BottomBorder } from "./desktop/BottomBorder";
import { FloatingOrbs } from "./desktop/FloatingOrbs";
import { SareeDrape } from "./desktop/SareeDrape";
import { DesktopDJ } from "./desktop/DesktopDJ";
import { ScrollingTextBG } from "./desktop/ScrollingTextBG";
import { MobileDJ } from "./mobile/MobileDJ";

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════
// MAIN FESTIVAL VIBES SECTION
// ═══════════════════════════════════════════════════════════════════

export const TheExperience = memo(function TheExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);
  const djRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useAnimationPolicy();

  // GSAP ScrollTrigger animations - Desktop only
  useEffect(() => {
    if (!shouldAnimate) return;

    const ctx = gsap.context(() => {
      // Title fade in and slide up
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // Tiles stagger in from bottom
      gsap.fromTo(
        tilesRef.current?.children || [],
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tilesRef.current,
            start: "top 90%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // DJ slides in from right
      gsap.fromTo(
        djRef.current,
        { x: 200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1.5,
          },
        }
      );

      // Tagline fades in
      gsap.fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: taglineRef.current,
            start: "top 95%",
            end: "top 75%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldAnimate]);

  return (
    <MotionZone>
      <section
        ref={sectionRef}
        className="relative overflow-hidden py-16 sm:py-20 md:py-28"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, ${JAZZ_COLORS.ROYAL_PURPLE}20 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, ${JAZZ_COLORS.DEEP_MAGENTA}15 0%, transparent 50%),
            linear-gradient(180deg, ${JAZZ_COLORS.BG_DEEP} 0%, ${JAZZ_COLORS.BG_ROYAL} 30%, ${JAZZ_COLORS.BG_WINE} 70%, ${JAZZ_COLORS.BG_DEEP} 100%)
          `,
        }}
      >
        {/* Scrolling text background - Desktop only */}
        <ScrollingTextBG />

        {/* Art deco pattern overlay */}
        <BackgroundDecor />

        {/* Floating orbs - Desktop only */}
        <FloatingOrbs />

        {/* Banarasi Saree Drape - Top Right Corner - Static (all screens) */}
        <SareeDrape />

        {/* DJ Character - Desktop only, scroll-revealed via GSAP */}
        <DesktopDJ ref={djRef} />

        {/* DJ Character - Mobile only, static, lower z-index (no animation) */}
        <MobileDJ />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 2xl:max-w-7xl">
          {/* Section Title */}
          <div ref={titleRef}>
            <SectionTitle />
          </div>

          {/* Bento Grid */}
          <div
            ref={tilesRef}
            className="grid auto-rows-[120px] grid-cols-2 gap-4 sm:auto-rows-[140px] sm:grid-cols-3 sm:gap-5 md:auto-rows-[160px] md:gap-6 lg:pr-[15%]"
          >
            {EXPERIENCES.map((tile, i) => (
              <JazzTile key={tile.id} tile={tile} index={i} />
            ))}
          </div>

          {/* Bottom tagline */}
          <div ref={taglineRef} className="mt-10 text-center sm:mt-14">
            <div
              className="inline-flex items-center gap-3 rounded-full px-6 py-3 sm:gap-4 sm:px-8 sm:py-4"
              style={{
                background: `linear-gradient(135deg, ${JAZZ_COLORS.BG_ROYAL}90 0%, ${JAZZ_COLORS.BG_WINE}90 100%)`,
                border: `1px solid ${JAZZ_COLORS.GOLD}30`,
                boxShadow: `0 0 30px ${JAZZ_COLORS.GOLD}10`,
              }}
            >
              <span
                className="text-sm font-bold tracking-wider sm:text-base"
                style={{
                  color: JAZZ_COLORS.GOLD,
                  textShadow: `0 0 10px ${JAZZ_COLORS.GOLD}50`,
                }}
              >
                14–17 JANUARY 2027
              </span>
              <span style={{ color: JAZZ_COLORS.CREAM, opacity: 0.3 }}>•</span>
              <span
                className="text-sm font-medium tracking-wide sm:text-base"
                style={{ color: JAZZ_COLORS.CREAM, opacity: 0.7 }}
              >
                IIT (BHU) Varanasi
              </span>
            </div>
          </div>
        </div>

        {/* Bottom decorative border */}
        <BottomBorder />
      </section>
    </MotionZone>
  );
});
