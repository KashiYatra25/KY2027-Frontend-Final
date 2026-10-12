import { memo, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GRADIENT_STAGE, CONCERT_COLORS, ARTISTS } from "./constants";
import {
  HeadlinerCard,
  FeaturingCard,
  SectionTitle,
  GlowingMoon,
  DancingGirlFestiveVibes,
  TopBorder,
  BottomBorder,
  GridOverlay,
} from "./common";
import { FloatingSoundParticles, AnimatedSpeakers, VerticalNeonText } from "./common/decor";
import { MotionZone } from "@/lib/motion";
import { useAnimationPolicy } from "@/hooks";

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════
// MAIN PRONITES SECTION
// Clean composition of all sub-components
// ═══════════════════════════════════════════════════════════════════
export const ProNitesSection = memo(function ProNitesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const headlinersRef = useRef<HTMLDivElement>(null);
  const featuringRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate, isMobile } = useAnimationPolicy();

  // GSAP ScrollTrigger animations - Desktop only
  useEffect(() => {
    if (!shouldAnimate) return;

    const ctx = gsap.context(() => {
      // Title fade in and slide up
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
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

      // Headliner & Featuring cards: no scroll animation (render statically on desktop)
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldAnimate]);

  const headliners = ARTISTS.filter((a) => a.isHeadliner);
  const previousLineups = ARTISTS.filter((a) => !a.isHeadliner);

  return (
    <MotionZone>
      <section
        ref={sectionRef}
        className="relative overflow-hidden py-20 sm:py-28"
        style={{ background: GRADIENT_STAGE }}
      >
        {/* ═══ Background Elements ═══ */}
        <GlowingMoon />
        <DancingGirlFestiveVibes />
        <GridOverlay />
        <FloatingSoundParticles />
        <AnimatedSpeakers />
        <VerticalNeonText />
        <TopBorder />

        {/* ═══ Main Content ═══ */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 2xl:max-w-7xl">
          <div ref={titleRef}>
            <SectionTitle />
          </div>

          {/* Headliners */}
          <div className="mb-12 sm:mb-16">
            <div className="mb-6 flex items-center justify-center gap-4 sm:mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50 sm:w-20" />
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase sm:text-sm"
                style={{
                  color: CONCERT_COLORS.NEON_GOLD,
                  textShadow: `0 0 15px ${CONCERT_COLORS.NEON_GOLD}80`,
                }}
              >
                ★ Headliners ★
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/50 sm:w-20" />
            </div>

            <div
              ref={headlinersRef}
              className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8"
            >
              {headliners.map((artist, i) => (
                <HeadlinerCard key={artist.id} artist={artist} index={i} />
              ))}
            </div>
          </div>

          {/* Previous Lineups */}
          <div className="mb-6 sm:mb-8">
            <div className="mb-6 flex items-center justify-center gap-4 sm:mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500/30 sm:w-16" />
              <span
                className="text-xs font-bold tracking-[0.15em] uppercase sm:text-sm"
                style={{
                  color: CONCERT_COLORS.NEON_GOLD,
                  textShadow: `0 0 10px ${CONCERT_COLORS.NEON_GOLD}60`,
                }}
              >
                ✦ Previous Lineups ✦
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500/30 sm:w-16" />
            </div>

            <div
              ref={featuringRef}
              className="mx-auto grid max-w-[320px] grid-cols-2 gap-7 sm:max-w-4xl sm:grid-cols-4 sm:gap-5 2xl:max-w-5xl"
            >
              {previousLineups.map((artist, i) => (
                <FeaturingCard key={artist.id} artist={artist} index={i} />
              ))}
            </div>
          </div>
        </div>

        <BottomBorder />
      </section>
    </MotionZone>
  );
});
