"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Moon } from "@/components/pages/home/sections/Hero/Sky/Moon";
import { Sun } from "@/components/pages/home/sections/Hero/Sky/Sun";
import { CinematicSky } from "@/components/pages/home/sections/Hero/Sky/CinematicSky";
import { FlyingBirds } from "@/components/pages/home/sections/Hero/Sky/Birds";
import { River } from "@/components/pages/home/sections/Hero/River";
import { useTimeOfDay } from "@/hooks/useTimeOfDay";
import { useAnimationPolicy } from "@/hooks";
import { MotionZone } from "@/lib/motion/MotionZone";
import { IMAGES } from "@/lib/images";
import { Kandeels } from "@/components/pages/home/sections/Hero/desktop/Kandeels";
import { DriftingClouds } from "@/components/pages/home/sections/Hero/desktop/DriftingClouds";
import { EmberField } from "@/components/pages/home/sections/Hero/desktop/EmberField";
import { MobileKite } from "@/components/pages/home/sections/Hero/mobile/MobileKite";
import { HeroLeft, HeroRight, ThemePicker } from "@/components/pages/home/sections/Hero/common";
import type { TimeOfDay } from "@/components/pages/home/constants/palette";

// Register plugin at module level (runs once when file is imported)
gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════
// HERO TITLE THEME
//
// The KASHIYATRA wordmark + "2027" are gradient-filled (background-clip: text).
// The default bright gold reads great at night/dusk but washes out against the
// bright blue morning/afternoon sky — so we adapt the gradient + drop-shadow
// per time-of-day: deeper high-contrast gold + a strong dark halo for daylight,
// luminous bright gold + glow for darker skies.
// ═══════════════════════════════════════════════════════════════════
interface HeroTitleStyle {
  titleGradient: string;
  titleFilter: string;
  yearGradient: string;
  yearFilter: string;
}

// Bright-sky look: richer/darker gold + strong dark shadow for legibility.
const HERO_TITLE_DAYLIGHT: HeroTitleStyle = {
  titleGradient:
    "linear-gradient(180deg, #FFF3C4 0%, #F0B429 22%, #C87F0A 50%, #8C5A00 78%, #5C3A00 100%)",
  titleFilter:
    "drop-shadow(0 2px 2px rgba(60,30,0,0.55)) drop-shadow(0 3px 10px rgba(0,0,0,0.5)) drop-shadow(0 0 2px rgba(92,58,0,0.9))",
  yearGradient: "linear-gradient(180deg, #FFE08A 0%, #E8A020 50%, #B8860B 100%)",
  yearFilter: "drop-shadow(0 2px 3px rgba(60,30,0,0.5)) drop-shadow(0 0 2px rgba(92,58,0,0.8))",
};

// Dark-sky look: original luminous bright gold with a warm glow.
const HERO_TITLE_NIGHT: HeroTitleStyle = {
  titleGradient:
    "linear-gradient(180deg, #FFFAF0 0%, #FFD700 20%, #DAA520 45%, #B8860B 70%, #996515 100%)",
  titleFilter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4)) drop-shadow(0 0 40px rgba(255,215,0,0.6))",
  yearGradient: "linear-gradient(180deg, #FFE4B5 0%, #FFD700 50%, #FFA500 100%)",
  yearFilter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 0 20px rgba(255,165,0,0.5))",
};

// Transitional skies (dawn / dusk / evening): warm bright gold, softer glow.
const HERO_TITLE_TWILIGHT: HeroTitleStyle = {
  titleGradient:
    "linear-gradient(180deg, #FFF4D6 0%, #FFD24D 24%, #E39A1A 52%, #A86A08 80%, #7A4B00 100%)",
  titleFilter:
    "drop-shadow(0 3px 6px rgba(30,15,0,0.5)) drop-shadow(0 0 24px rgba(255,180,60,0.5))",
  yearGradient: "linear-gradient(180deg, #FFE4B5 0%, #FFCC33 50%, #FFA500 100%)",
  yearFilter: "drop-shadow(0 2px 4px rgba(30,15,0,0.4)) drop-shadow(0 0 16px rgba(255,165,0,0.5))",
};

function getHeroTitleStyle(timeOfDay: TimeOfDay): HeroTitleStyle {
  switch (timeOfDay) {
    case "morning":
    case "afternoon":
      return HERO_TITLE_DAYLIGHT;
    case "night":
      return HERO_TITLE_NIGHT;
    default: // dawn, evening, dusk
      return HERO_TITLE_TWILIGHT;
  }
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const celestialRef = useRef<HTMLDivElement>(null); // Moon or Sun
  const titleRef = useRef<HTMLHeadingElement>(null);
  const riverRef = useRef<HTMLDivElement>(null);
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const kitesRef = useRef<HTMLDivElement>(null);

  // Get current time-based sky configuration
  const {
    gradient,
    showMoon,
    showStars,
    starsOpacity,
    timeOfDay,
    isPickerOpen,
    isManualMode,
    togglePicker,
    closePicker,
    setTheme,
    resetToAuto,
  } = useTimeOfDay();
  const { isMobile, shouldAnimate } = useAnimationPolicy();

  // Theme-adaptive hero title colors (legible across day/dusk/night skies).
  const titleStyle = getHeroTitleStyle(timeOfDay);

  // Entry animation: Celestial body (Moon or Sun)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(celestialRef.current, { scale: 0.5, opacity: 0 });
      gsap.to(celestialRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Entry animation: Title
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { y: -50, opacity: 0 });
      gsap.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Entry animation: Hero right & left artwork
  useEffect(() => {
    /**
     * gsap.context() --> Creates a scope for animations that makes cleanup easy. All animations created inside it are tracked and can be reverted with a single call.
     * Why use it?
      React re-renders can create duplicate animations
      Without context, you'd manually track and kill each animation
      Essential for React's useEffect cleanup
     */

    const ctx = gsap.context(() => {
      gsap.set(heroRightRef.current, { x: 250, opacity: 0 });
      gsap.set(heroLeftRef.current, { x: -250, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.8 });

      /*
        Symbol	Meaning
        "<"	Same start as previous
        ">"	Same end as previous
        "<0.2"	0.2s after previous starts
        ">-0.2"	0.2s before previous ends
        (none)	After previous ends	Sequential
        "-=0.3"	0.3s before previous ends	Overlap
        "+=0.3"	0.3s after previous ends	Gap
        2	At exactly 2 seconds	Absolute
        "<"	Same start as previous	Simultaneous
        "<0.2"	0.2s after previous starts	Slight delay from same start
       */

      tl.to(heroRightRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "none",
      }).to(heroLeftRef.current, { x: -40, opacity: 1, duration: 0.5, ease: "none" }, "<");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Entry animation: Kites - Desktop only, flies in after hero artwork (not at night)
  useEffect(() => {
    // Skip on mobile or if it's night time
    if (isMobile) return;
    if (timeOfDay === "night") return;
    if (!kitesRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(kitesRef.current, {
        x: -150,
        y: 50,
        opacity: 0,
        scale: 0.6,
        rotation: -30,
      });

      // Animate in after hero artwork (delay matches timeline: 0.8 + 0.5 + 0.2 = 1.5s)
      gsap.to(kitesRef.current, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: -10,
        duration: 0.8,
        delay: 1.6, // After hero artwork animation
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [timeOfDay, isMobile]);

  // Parallax scroll: Celestial body & Hero right artwork - Desktop only
  useEffect(() => {
    // Skip parallax on mobile for performance
    if (isMobile) return;
    if (!shouldAnimate) return;

    const ctx = gsap.context(() => {
      // Use quickTo for performant scroll-driven animations
      // quickTo creates a reusable setter instead of spawning new tweens
      const celestialY = gsap.quickTo(celestialRef.current, "y", {
        duration: 0.1,
        ease: "none",
      });
      const heroRightX = gsap.quickTo(heroRightRef.current, "x", {
        duration: 0.1,
        ease: "none",
      });
      const heroLeftX = gsap.quickTo(heroLeftRef.current, "x", {
        duration: 0.1,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          celestialY(p * -200);
          heroRightX(p * 60); // slide left -> right on scroll (base x is 0 from entry)
          heroLeftX(p * -100 - 40); // -40 is the base x position from entry animation
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shouldAnimate]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen max-w-[100vw] overflow-hidden"
      style={{
        background: gradient,
        transition: "background 1.5s ease-in-out",
      }}
    >
      {/* Cinematic Sky with stars, clouds, shooting stars - only visible at night/dusk */}
      {showStars && (
        <div style={{ opacity: starsOpacity, transition: "opacity 1.5s ease-in-out" }}>
          <CinematicSky className="z-1" />
        </div>
      )}

      {/* Varanasi Background - Mobile optimized */}
      <div
        className="pointer-events-none absolute right-0 bottom-[26%] left-0 z-6 h-[25%] sm:bottom-[27%] sm:h-[28%] md:bottom-[26%] md:h-[30%]"
        style={{
          backgroundImage: `url('${IMAGES.hero.varanasiBack}')`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          opacity: 0.5,
          filter: "brightness(0.3) saturate(0.5)",
          mixBlendMode: "luminosity",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      />

      {/* Enhanced Moon glow spreading into sky */}
      <div
        className="pointer-events-none absolute inset-0 z-2"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 12%, rgba(220,230,255,0.12) 0%, transparent 50%),
            radial-gradient(ellipse 40% 30% at 50% 10%, rgba(255,255,250,0.08) 0%, transparent 40%)
          `,
        }}
      />

      {/* Moon reflection on river hint */}
      <div
        className="pointer-events-none absolute bottom-[5%] left-1/2 z-14 h-[25%] w-[20%] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 100% 50% at 50% 0%, rgba(255,255,250,0.06) 0%, transparent 60%)",
          animation: "moonReflectionShimmer 4s ease-in-out infinite",
        }}
      />

      {/* Faint drifting clouds - Desktop only */}
      <DriftingClouds />

      {/* Floating Kandeels (Sky Lanterns) - Desktop only */}
      <Kandeels />

      {/* Theme Selection - Mode Change Button OR Theme Picker */}
      {!isPickerOpen ? (
        /* Mode Change Button - Top Right (shown when picker is closed) */
        <button
          onClick={togglePicker}
          className="group absolute top-4 right-4 z-[100] h-12 w-12 cursor-pointer transition-transform duration-300 hover:scale-110 sm:top-6 sm:right-6 sm:h-14 sm:w-14 md:h-16 md:w-16"
          aria-label="Open theme picker"
          title="Choose theme"
        >
          <Image
            src={IMAGES.hero.modeChange}
            alt="Choose Theme"
            width={64}
            height={64}
            className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.6)] transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]"
            style={{
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            }}
          />
        </button>
      ) : (
        /* Theme Picker (shown when button is clicked) */
        <ThemePicker
          isOpen={isPickerOpen}
          currentTheme={timeOfDay}
          isManualMode={isManualMode}
          onSelectTheme={setTheme}
          onSelectAuto={resetToAuto}
          onClose={closePicker}
        />
      )}

      {/* Flying Birds - Mobile optimized */}
      {/* Wrapped in MotionZone to pause SMIL animations when off-screen */}
      <MotionZone className="absolute top-[6%] left-0 z-30 h-10 w-full overflow-hidden sm:top-[8%] sm:h-14 md:h-18">
        <FlyingBirds className="h-full w-full" />
      </MotionZone>

      {/* Second flock - hidden on mobile for performance */}
      <MotionZone className="absolute top-[12%] left-0 z-30 hidden h-10 w-full overflow-hidden opacity-60 sm:top-[15%] sm:block sm:h-12 md:h-16">
        <FlyingBirds className="h-full w-full" />
      </MotionZone>

      {/* Celestial Body - Moon or Sun based on time of day */}
      {/* Dawn sun rises on the right, morning/afternoon are high & centered,
          evening/dusk are a smaller, lower SETTING sun. */}
      <div
        ref={celestialRef}
        className={`absolute z-5 ${
          showMoon
            ? "top-[2%] left-1/2 h-16 w-16 -translate-x-1/2 sm:top-[3%] sm:h-20 sm:w-20 md:h-28 md:w-28" // Moon - centered, high
            : timeOfDay === "dawn"
              ? "top-[12%] right-[8%] h-12 w-12 sm:top-[8%] sm:right-[25%] sm:h-16 sm:w-16 md:h-20 md:w-20" // Dawn - right side, rising
              : timeOfDay === "morning"
                ? "top-[5%] left-1/2 h-14 w-14 -translate-x-1/2 sm:top-[6%] sm:h-18 sm:w-18 md:h-24 md:w-24" // Morning - centered, rising
                : timeOfDay === "evening" || timeOfDay === "dusk"
                  ? "top-[3%] left-1/2 h-12 w-12 -translate-x-1/2 sm:top-[4%] sm:h-16 sm:w-16 md:top-[3%] md:h-20 md:w-20" // Evening/Dusk - smaller, high (clears the title)
                  : "top-[2%] left-1/2 h-16 w-16 -translate-x-1/2 sm:top-[3%] sm:h-20 sm:w-20 md:h-28 md:w-28" // Afternoon - centered, high
        }`}
        style={{ transition: "all 1s ease-in-out" }}
      >
        {showMoon ? (
          <Moon className="h-full w-full" isMobile={isMobile} />
        ) : (
          <Sun
            className="h-full w-full"
            isMobile={isMobile}
            variant={
              timeOfDay === "dawn"
                ? "dawn"
                : timeOfDay === "evening" || timeOfDay === "dusk"
                  ? "dusk"
                  : "day"
            }
          />
        )}
      </div>

      {/* Kites - Desktop only, top-left, hidden at night and dawn */}
      {timeOfDay !== "night" && timeOfDay !== "dawn" && (
        <div
          ref={kitesRef}
          className="pointer-events-none absolute top-[8%] left-[5%] z-50 hidden w-[20vw] max-w-[280px] sm:block"
          style={{
            transform: "rotate(-10deg)",
            opacity: 0, // Start hidden, GSAP will animate it in
          }}
        >
          <Image
            src={IMAGES.hero.kites}
            alt="Flying Kites"
            width={350}
            height={300}
            className="h-auto w-full"
            style={{
              animation: "kitesFloat 4s ease-in-out infinite",
              filter: "drop-shadow(0 6px 15px rgba(0,0,0,0.25))",
            }}
          />
        </div>
      )}

      {/* Kites - Mobile only, floating animation, hidden at night */}
      {timeOfDay !== "night" && <MobileKite />}

      {/* Title - Mobile optimized */}
      <h1
        ref={titleRef}
        className="absolute top-[22%] left-1/2 z-[1000] w-full -translate-x-1/2 px-4 text-center sm:top-[24%] md:top-[26%]"
      >
        {/* Creative Text Logo */}
        <div className="relative inline-block">
          {/* Main Title */}
          <div
            className="text-4xl font-black tracking-wide sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "var(--font-cinzel-decorative), serif",
              backgroundImage: titleStyle.titleGradient,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: titleStyle.titleFilter,
            }}
          >
            KASHIYATRA
          </div>

          {/* Decorative Divider with Lotus */}
          <div className="mt-1 flex items-center justify-center gap-2 sm:gap-3">
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent via-amber-500/80 to-amber-400 sm:w-14 md:w-20" />
            <span
              className="text-base text-amber-400 sm:text-lg md:text-xl"
              style={{
                textShadow: "0 0 15px rgba(255,215,0,0.9), 0 0 30px rgba(255,165,0,0.5)",
              }}
            >
              ✦ 🪷 ✦
            </span>
            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent via-amber-500/80 to-amber-400 sm:w-14 md:w-20" />
          </div>

          {/* Year */}
          <div
            className="mt-1 text-xl font-semibold tracking-[0.3em] sm:mt-2 sm:text-2xl sm:tracking-[0.4em] md:text-3xl lg:text-4xl"
            style={{
              fontFamily: "var(--font-cinzel), serif",
              backgroundImage: titleStyle.yearGradient,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: titleStyle.yearFilter,
            }}
          >
            2027
          </div>

          {/* Mobile Tagline - Only visible on mobile */}
          <div className="mt-6 px-2 sm:hidden">
            {/* Main tagline */}
            <p
              className="text-sm leading-relaxed tracking-wide"
              style={{
                fontFamily: "'Georgia', serif",
                fontStyle: "italic",
                color: "rgba(253,246,227,0.8)",
              }}
            >
              Where the sacred Ganga meets
            </p>
            <p
              className="mt-0.5 text-base font-semibold tracking-wide"
              style={{
                fontFamily: "'Georgia', serif",
                background: "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 10px rgba(255,215,0,0.5))",
              }}
            >
              the rhythm of celebration
            </p>

            {/* Subtle divider */}
            <div
              className="mx-auto mt-4 h-px w-16"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.6), transparent)",
              }}
            />

            {/* Date */}
            <p
              className="mt-3 text-xs font-medium tracking-[0.2em] uppercase"
              style={{
                color: "rgba(255,215,0,0.7)",
              }}
            >
              14–17 January 2027
            </p>
          </div>
        </div>
      </h1>

      {/* HERO LEFT - left-side hero artwork (single image, no day/night) */}
      <HeroLeft ref={heroLeftRef} />

      {/* HERO RIGHT - right-side hero artwork (single image, no day/night) */}
      <HeroRight ref={heroRightRef} timeOfDay={timeOfDay} />

      {/* RIVER - Contains water, lotus, diyas, boats, and stepping stones */}
      {/* RIVER - Contains water, lotus, diyas, boats, and stepping stones */}
      {/* Wrapped in MotionZone to pause SMIL animations when off-screen */}
      <MotionZone>
        <River ref={riverRef} timeOfDay={timeOfDay} />
      </MotionZone>

      {/* Floating embers - Desktop only */}
      <EmberField />
    </section>
  );
}
