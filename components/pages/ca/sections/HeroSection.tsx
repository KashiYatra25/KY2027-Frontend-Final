"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMAGES } from "@/lib/images";
import { COLORS, COLORS_RGBA } from "@/components/pages/ca/constants/palette";

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════
// HERO SECTION
// Image + badge are ABSOLUTE POSITIONED, text content is CENTERED
// Breakpoints: sm / md / lg only
// ═══════════════════════════════════════════════════════════════════

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      // Badges stagger entrance
      gsap.from(".hero-badge", {
        y: 30,
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.5,
        ease: "back.out(1.7)",
      });

      // Character - static, no animation

      // Subtitle fade in
      gsap.from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: "power2.out",
      });

      // Scroll indicator
      gsap.to(".scroll-indicator", {
        y: 15,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power2.inOut",
      });

      gsap.to(".scroll-indicator", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "10% top",
          end: "30% top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden px-4 pt-24 pb-16">
      {/* Golden badge - ABSOLUTE POSITIONED - near top-right */}
      <div
        ref={badgeRef}
        className="absolute top-28 right-4 z-20 h-24 w-24 will-change-transform sm:right-8 sm:h-32 sm:w-32 md:right-12 lg:h-48 lg:w-48"
      >
        <Image
          src={IMAGES.ca.goldenBadge}
          alt="Campus Ambassador Badge"
          fill
          className="ca-ethereal-glow object-contain"
          style={{
            filter: "drop-shadow(0 0 30px rgba(234,179,8,0.6))",
          }}
        />
      </div>

      {/* Left-aligned content */}
      <div className="relative z-30 ml-[5%] flex max-w-2xl flex-col items-start pt-16 text-left md:ml-[8%] lg:pt-24 2xl:max-w-3xl">
        {/* Funky badges */}
        <div className="mb-8 flex flex-wrap justify-start gap-3">
          {["🔥 LIMITED SPOTS", "⚡ EXCLUSIVE PERKS", "🎯 LEAD YOUR CAMPUS"].map((badge, i) => (
            <span
              key={i}
              className="hero-badge rounded-full px-4 py-2 text-xs font-bold tracking-wider uppercase backdrop-blur-sm will-change-transform"
              style={{
                background:
                  i === 0
                    ? `linear-gradient(135deg, ${COLORS_RGBA.PINK_30} 0%, ${COLORS_RGBA.PINK_30} 100%)`
                    : i === 1
                      ? `linear-gradient(135deg, ${COLORS_RGBA.PURPLE_30} 0%, ${COLORS_RGBA.PURPLE_30} 100%)`
                      : `linear-gradient(135deg, ${COLORS_RGBA.CYAN_30} 0%, ${COLORS_RGBA.CYAN_30} 100%)`,
                border: `1px solid ${i === 0 ? COLORS_RGBA.PINK_30 : i === 1 ? COLORS_RGBA.PURPLE_30 : COLORS_RGBA.CYAN_30}`,
                color: i === 0 ? COLORS.PINK : i === 1 ? COLORS.PURPLE : COLORS.CYAN,
                boxShadow: `0 0 20px ${i === 0 ? COLORS_RGBA.PINK_30 : i === 1 ? COLORS_RGBA.PURPLE_30 : COLORS_RGBA.CYAN_30}`,
              }}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Main title */}
        <h1 ref={titleRef} className="mb-6 will-change-transform">
          <span className="block text-5xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="ca-gradient-text">CAMPUS</span>
          </span>
          <span className="mt-2 block text-5xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="text-white" style={{ textShadow: "0 0 60px rgba(255,255,255,0.3)" }}>
              AMBASSADOR
            </span>
          </span>
        </h1>

        {/* Decorative line */}
        <div className="relative mb-8 h-[3px] w-64 overflow-hidden rounded-full">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${COLORS.PINK} 20%, ${COLORS.PURPLE} 50%, ${COLORS.CYAN} 80%, transparent 100%)`,
            }}
          />
          <div className="ca-shimmer absolute inset-0" />
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle mb-12 max-w-xl text-lg leading-relaxed text-gray-300 will-change-transform sm:text-xl lg:text-2xl">
          Be the <span className="font-semibold text-pink-400">face of your college</span> at IIT
          BHU&apos;s grandest cultural festival. Lead, inspire, and unlock{" "}
          <span className="font-semibold text-purple-400">exclusive rewards</span>.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-start gap-10 sm:gap-16">
          {[
            { value: "500+", label: "Colleges" },
            { value: "50K+", label: "Participants" },
            { value: "₹2L+", label: "In Prizes" },
          ].map((stat, i) => (
            <div key={i} className="group text-center">
              <div className="ca-gradient-text text-4xl font-black transition-transform duration-300 group-hover:scale-110 sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm tracking-wider text-gray-500 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3 text-gray-400 will-change-transform">
        <span className="text-xs font-medium tracking-[0.3em] uppercase">Scroll to explore</span>
        <div className="relative">
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-gray-500/50 pt-2">
            <div className="h-3 w-1.5 animate-bounce rounded-full bg-gradient-to-b from-pink-500 to-purple-500" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.4;
          }
        }
      `}</style>
    </section>
  );
}
