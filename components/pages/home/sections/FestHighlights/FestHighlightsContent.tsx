"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAnimationPolicy } from "@/hooks";
import { highlights } from "./data/highlights";
import {
  DiscoBall3D,
  LaserBeams,
  FloatingNotes,
  SilhouetteImage,
  Spotlights,
  NeonSideBorders,
} from "./decor";
import { StaticHighlightCard } from "./StaticHighlightCard";
import { AnimatedHighlightCard } from "./AnimatedHighlightCard";

export function FestHighlightsContent() {
  const { shouldAnimate, isMobile } = useAnimationPolicy();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimate) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const cards = contentRef.current?.querySelectorAll(".highlight-card");
      gsap.fromTo(
        cards || [],
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldAnimate]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-6 pb-16 sm:py-8 sm:pb-20 md:pb-24"
      style={{
        background: "linear-gradient(180deg, #0a0510 0%, #1a0a2e 30%, #0f0720 70%, #050208 100%)",
      }}
    >
      {/* Animated Background Elements - Desktop only */}
      <Spotlights />
      <LaserBeams />
      <FloatingNotes />
      <NeonSideBorders />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="text-center">
          {/* 3D Disco Ball - Desktop only */}
          <div className="mb-4 sm:mb-6">
            <DiscoBall3D />
          </div>

          {/* Title with Gradient - Static on mobile */}
          {isMobile ? (
            <h2
              className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl"
              style={{
                background: "linear-gradient(90deg, #EC4899, #8B5CF6, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 40px rgba(139, 92, 246, 0.5)",
              }}
            >
              THE ULTIMATE FEST
            </h2>
          ) : (
            <h2
              className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl"
              style={{
                background: "linear-gradient(90deg, #EC4899, #8B5CF6, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 40px rgba(139, 92, 246, 0.5)",
              }}
            >
              THE ULTIMATE FEST
            </h2>
          )}

          {/* Subtitle - Static */}
          <p className="mb-4 text-sm tracking-[0.4em] text-purple-300 uppercase sm:mb-6 sm:text-base">
            ⚡ 4 Days of Non-Stop Energy ⚡
          </p>

          {/* Description */}
          <div className="mx-auto mb-6 max-w-3xl px-4 sm:mb-8">
            <p className="text-center text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
              Get ready for the{" "}
              <span
                className="font-bold"
                style={{
                  background: "linear-gradient(90deg, #EC4899, #F59E0B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                most electrifying college fest
              </span>
              !
            </p>
            <p className="mt-3 text-center text-base leading-relaxed text-gray-400 sm:text-lg md:text-xl">
              <span className="text-pink-400">Live concerts</span>
              {" • "}
              <span className="text-purple-400">Celebrity performances</span>
              {" • "}
              <span className="text-cyan-400">Insane DJ nights</span>
            </p>
            <p className="mt-4 text-center text-sm leading-relaxed text-gray-500 italic sm:text-base">
              Vibes that&apos;ll blow your mind — This is{" "}
              <span
                className="font-bold not-italic"
                style={{
                  background: "linear-gradient(90deg, #8B5CF6, #06B6D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Kashi Yatra 2027
              </span>
              !
            </p>
          </div>

          {/* Highlight Cards - Static on mobile, animated on desktop */}
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 2xl:max-w-6xl">
            {highlights.map((item, i) =>
              isMobile ? (
                <StaticHighlightCard key={i} item={item} index={i} />
              ) : (
                <AnimatedHighlightCard key={i} item={item} index={i} />
              )
            )}
          </div>
        </div>
      </div>

      {/* Silhouette Image */}
      <SilhouetteImage />
    </section>
  );
}
