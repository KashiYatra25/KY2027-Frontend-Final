"use client";

import { memo } from "react";

// ═══════════════════════════════════════════════════════════════════
// 2027 ETHEREAL BADGE + floating sparkles + mobile tagline
// Rendered INSIDE the GSAP-animated <h1 ref={titleRef}> in main.tsx,
// after the logo <Image>. Purely decorative, no GSAP ref.
// ═══════════════════════════════════════════════════════════════════
export const TitleBadge = memo(function TitleBadge() {
  return (
    <>
      {/* 2027 Ethereal Badge */}
      <div className="relative mt-4 inline-block sm:mt-5 md:mt-6">
        {/* Outer divine glow rings */}
        <div
          className="absolute inset-0 -m-4 rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(255,215,0,0.15) 0%, transparent 70%)",
            animation: "yearAura 3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0 -m-8 rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(255,165,0,0.1) 0%, transparent 60%)",
            animation: "yearAura 3.5s ease-in-out infinite reverse",
          }}
        />

        {/* Main container */}
        <div
          className="relative rounded-full px-8 py-2 sm:px-10 sm:py-3 md:px-14 md:py-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,215,0,0.15) 0%, rgba(255,140,0,0.08) 50%, rgba(255,215,0,0.15) 100%)",
            border: "1px solid rgba(255,215,0,0.4)",
            boxShadow:
              "0 0 30px rgba(255,215,0,0.3), 0 0 60px rgba(255,165,0,0.15), inset 0 0 20px rgba(255,215,0,0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Shimmer overlay */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                animation: "shimmerSlide 3s ease-in-out infinite",
              }}
            />
          </div>

          {/* Year */}
          <span
            className="block text-2xl font-bold tracking-wider sm:text-3xl md:text-4xl lg:text-5xl"
            style={{
              fontFamily: "'Noto Sans Devanagari', serif",
              color: "#FFD700",
              textShadow:
                "0 0 20px rgba(255,215,0,0.9), 0 0 40px rgba(255,165,0,0.6), 0 0 60px rgba(255,140,0,0.4)",
              animation: "textGlow 2s ease-in-out infinite",
            }}
          >
            2027
          </span>
        </div>

        {/* Floating sparkles - Desktop only */}
        <div className="hidden sm:block">
          {[...Array(6)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute h-1 w-1 rounded-full"
              style={{
                left: `${10 + i * 16}%`,
                top: `${i % 2 === 0 ? -20 : 120}%`,
                background: "#FFD700",
                boxShadow: "0 0 6px #FFD700, 0 0 12px rgba(255,215,0,0.5)",
                animation: `sparkleFloat ${2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile tagline - premium minimal styling */}
      <div className="mt-8 px-4 text-center sm:hidden">
        {/* Main tagline - elegant serif */}
        <p
          className="text-base leading-relaxed tracking-wide"
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontStyle: "italic",
            fontWeight: 400,
            color: "rgba(253,246,227,0.85)",
            letterSpacing: "0.02em",
          }}
        >
          Where the sacred Ganga meets
        </p>
        <p
          className="mt-1 text-lg font-semibold tracking-wide"
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            background: "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          the rhythm of celebration
        </p>

        {/* Subtle divider */}
        <div
          className="mx-auto mt-4 mb-3 h-px w-12"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.5), transparent)",
          }}
        />

        {/* Date badge */}
        <p
          className="text-xs font-medium tracking-[0.25em] uppercase"
          style={{
            color: "rgba(255,215,0,0.7)",
          }}
        >
          14th–17th January 2027
        </p>
      </div>
    </>
  );
});
