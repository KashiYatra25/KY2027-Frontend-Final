"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemedNavbar } from "@/components/navbar";
import {
  HeroSection,
  PerksSection,
  TimelineSection,
  CTASection,
} from "@/components/pages/ca/sections";
import {
  FloatingElements,
  GridBackground,
  Astronaut3D,
} from "@/components/pages/ca/sections/decor";
import { COLORS, COLORS_RGBA, GRADIENTS } from "@/components/pages/ca/constants/palette";

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════
// CAMPUS AMBASSADOR PAGE
// Ethereal design with smooth GSAP scroll animations
// ═══════════════════════════════════════════════════════════════════

export function CAPageContent() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scroll-based parallax for floating elements
      gsap.to(".ca-float-slow", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      gsap.to(".ca-float-fast", {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      // Subtle color shift on scroll
      gsap.to(".color-shift-layer", {
        filter: "hue-rotate(30deg)",
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: COLORS.BG_DEEP }}
    >
      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="about" />
      </div>

      {/* Background effects */}
      <GridBackground />
      <FloatingElements />

      {/* 3D Astronaut with scroll-controlled rotation */}
      <Astronaut3D />

      {/* Color shift layer */}
      <div className="color-shift-layer pointer-events-none fixed inset-0 z-[1] opacity-30 mix-blend-overlay">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${COLORS_RGBA.PINK_30} 0%, ${COLORS_RGBA.PURPLE_30} 50%, ${COLORS_RGBA.CYAN_30} 100%)`,
          }}
        />
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none fixed inset-0 z-[1]">
        {/* Top glow */}
        <div
          className="absolute top-0 left-1/2 h-[700px] w-[1000px] -translate-x-1/2 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(147, 51, 234, 0.5) 0%, rgba(79, 70, 229, 0.2) 40%, transparent 70%)",
          }}
        />
        {/* Bottom accent */}
        <div
          className="absolute right-0 bottom-0 left-0 h-[500px] opacity-35"
          style={{
            background: "linear-gradient(to top, rgba(236, 72, 153, 0.2) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Scroll progress indicator */}
      <div className="fixed top-0 right-0 left-0 z-[300] h-[2px]">
        <div
          className="h-full origin-left"
          style={{
            background: GRADIENTS.TRI_90,
          }}
          ref={(el) => {
            if (el) {
              gsap.to(el, {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: "body",
                  start: "top top",
                  end: "bottom bottom",
                  scrub: true,
                },
              });
              gsap.set(el, { scaleX: 0 });
            }
          }}
        />
      </div>

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <PerksSection />
        <TimelineSection />
        <CTASection />
      </main>

      {/* Custom styles for funky effects */}
      <style jsx global>{`
        @keyframes caGlitch {
          0%,
          100% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
        }

        @keyframes caPulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes caFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes caGradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes etherealGlow {
          0%,
          100% {
            filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.4))
              drop-shadow(0 0 40px rgba(139, 92, 246, 0.2));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(236, 72, 153, 0.6))
              drop-shadow(0 0 60px rgba(139, 92, 246, 0.4));
          }
        }

        .ca-glitch:hover {
          animation: caGlitch 0.3s ease-in-out;
        }

        .ca-gradient-text {
          background: linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4, #ec4899);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: caGradientShift 4s ease infinite;
        }

        .ca-glow-pink {
          box-shadow:
            0 0 20px rgba(236, 72, 153, 0.5),
            0 0 40px rgba(236, 72, 153, 0.3);
        }

        .ca-glow-purple {
          box-shadow:
            0 0 20px rgba(139, 92, 246, 0.5),
            0 0 40px rgba(139, 92, 246, 0.3);
        }

        .ca-shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        .ca-ethereal-glow {
          animation: etherealGlow 4s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(10, 6, 18, 0.8);
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #ec4899, #8b5cf6);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
