"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Road, LampPost, BHUGate } from "./common";
import { BanarasiVibesMobile } from "./mobile";
import { BanarasiVibesDesktop } from "./desktop";
import { IMAGES } from "@/lib/images";
import { MotionZone, useMotionZone } from "@/lib/motion";
import { useAnimationPolicy } from "@/hooks";

// Inner component that can access MotionZone context
function BanarasiVibesContent() {
  const { isAnimating } = useMotionZone();
  const { shouldAnimate } = useAnimationPolicy();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gateRef = useRef<HTMLDivElement>(null);
  const rickshawRef = useRef<HTMLDivElement>(null);
  const rickshawAnimRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!shouldAnimate) return;

    const ctx = gsap.context(() => {
      // BHU Gate rising from bottom
      gsap.fromTo(
        gateRef.current,
        { y: 600, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "top 20%",
            scrub: 1.5,
          },
        }
      );

      // Rickshaw continuous movement
      rickshawAnimRef.current = gsap.to(rickshawRef.current, {
        x: "120vw",
        duration: 14,
        ease: "linear",
        repeat: -1,
        onRepeat: () => {
          gsap.set(rickshawRef.current, { x: 0 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldAnimate]);

  // Pause/resume rickshaw animation based on MotionZone context
  useEffect(() => {
    if (rickshawAnimRef.current) {
      if (isAnimating) {
        rickshawAnimRef.current.resume();
      } else {
        rickshawAnimRef.current.pause();
      }
    }
  }, [isAnimating]);

  return (
    <section
      ref={sectionRef}
      data-section="banarasi-vibes"
      className="relative min-h-screen overflow-hidden"
      style={{
        borderRadius: "24px 24px 0 0",
        boxShadow: "0 -20px 60px rgba(0,0,0,0.8)",
        backgroundColor: "#1a1a1a", // Fallback to match road color
      }}
    >
      {/* Background image */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url('${IMAGES.vibes.backgroundDark}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Top Text Content - simple and clean */}
      <div className="pointer-events-none absolute top-8 right-0 left-0 z-[35] sm:top-5 md:top-6">
        <div className="px-4 text-center">
          {/* Main heading - no box, just text with shadow */}
          <h2
            className="mb-2 text-2xl font-bold sm:text-4xl md:text-5xl lg:text-6xl"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: "#FFD700",
              textShadow:
                "0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7), 0 0 40px rgba(255,215,0,0.3)",
            }}
          >
            The Spirit of Banaras
          </h2>

          {/* Simple divider */}
          <div className="mb-3 flex items-center justify-center gap-2">
            <span
              className="h-[1px] w-10 sm:w-16"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.6))" }}
            />
            <span className="text-xs sm:text-sm" style={{ color: "#FFD700" }}>
              ✦
            </span>
            <span
              className="h-[1px] w-10 sm:w-16"
              style={{ background: "linear-gradient(90deg, rgba(255,215,0,0.6), transparent)" }}
            />
          </div>

          {/* Key highlights - inline */}
          <div className="mb-3 flex items-center justify-center gap-3 sm:gap-6">
            <span
              className="text-[10px] tracking-wider sm:text-xs"
              style={{
                color: "#FFD700",
                textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                fontFamily: "'Cinzel', serif",
              }}
            >
              ✦ Music
            </span>
            <span
              className="text-[10px] tracking-wider sm:text-xs"
              style={{
                color: "#FFD700",
                textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                fontFamily: "'Cinzel', serif",
              }}
            >
              ✦ Dance
            </span>
            <span
              className="text-[10px] tracking-wider sm:text-xs"
              style={{
                color: "#FFD700",
                textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                fontFamily: "'Cinzel', serif",
              }}
            >
              ✦ Art
            </span>
            <span
              className="text-[10px] tracking-wider sm:text-xs"
              style={{
                color: "#FFD700",
                textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                fontFamily: "'Cinzel', serif",
              }}
            >
              ✦ Culture
            </span>
          </div>

          {/* Subtitle - simple text */}
          <p
            className="text-xs sm:text-sm md:text-base"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#FDF6E3",
              textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.7)",
              letterSpacing: "0.05em",
            }}
          >
            Where ancient traditions dance with timeless grace
          </p>
        </div>
      </div>

      {/* Desktop-only elements */}
      <BanarasiVibesDesktop
        isAnimating={isAnimating}
        shouldAnimate={shouldAnimate}
        rickshawRef={rickshawRef}
      />

      {/* Mobile-only elements */}
      <BanarasiVibesMobile />

      {/* Common: BHU Gate with Mahamana */}
      <BHUGate ref={gateRef} />

      {/* Common: Road */}
      <Road />

      {/* Common: Lamp Post - on bottom left, partially hidden, high z-index */}
      <MotionZone className="absolute -bottom-4 left-[2%] z-[40] h-32 w-10 sm:-bottom-6 sm:left-[20%] sm:h-[360px] sm:w-[135px]">
        <LampPost className="h-full w-full" />
      </MotionZone>

      {/* Bottom golden border */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-[60]"
        style={{ height: "6px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #8B6914, #FFD700, #E8B820, #FFD700, #C8960C, #FFD700, #8B6914)",
          }}
        />
        <div
          className="absolute top-0 right-0 left-0"
          style={{ height: "1px", background: "rgba(255,255,255,0.3)" }}
        />
      </div>
    </section>
  );
}

// Exported component wraps content with MotionZone
export function BanarasiVibesSection() {
  return (
    <MotionZone threshold={0.05} rootMargin="100px">
      <BanarasiVibesContent />
    </MotionZone>
  );
}
