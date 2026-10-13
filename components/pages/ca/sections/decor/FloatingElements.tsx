"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLORS } from "@/components/pages/ca/constants/palette";

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════
// FLOATING ELEMENTS
// Ethereal particles, morphing orbs, and scroll-reactive shapes
// ═══════════════════════════════════════════════════════════════════

export function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax orbs at different depths
      gsap.to(".orb-deep", {
        y: -300,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });

      gsap.to(".orb-mid", {
        y: -180,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      gsap.to(".orb-near", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      // Morphing shapes on scroll
      gsap.to(".morph-shape", {
        borderRadius: "60% 40% 70% 30% / 40% 60% 30% 70%",
        rotation: 180,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // Ethereal rings expand on scroll
      gsap.to(".ethereal-ring", {
        scale: 2,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "50% top",
          scrub: true,
        },
      });

      // Counter-rotating geometric patterns
      gsap.to(".geo-pattern-1", {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 4,
        },
      });

      gsap.to(".geo-pattern-2", {
        rotation: -360,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 6,
        },
      });

      // Floating particles drift
      gsap.utils.toArray(".drift-particle").forEach((particle, i) => {
        gsap.to(particle as HTMLElement, {
          y: -200 - i * 50,
          x: (i % 2 === 0 ? 1 : -1) * 30,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1 + i * 0.3,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {/* Deep layer orbs - slowest parallax */}
      <div
        className="orb-deep absolute top-[5%] left-[8%] h-[400px] w-[400px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.7) 0%, rgba(236, 72, 153, 0) 70%)",
          animation: "breathe 8s ease-in-out infinite",
        }}
      />
      <div
        className="orb-deep absolute top-[60%] right-[5%] h-[350px] w-[350px] rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, transparent 70%)",
          animation: "breathe 10s ease-in-out infinite 2s",
        }}
      />

      {/* Mid layer orbs */}
      <div
        className="orb-mid absolute top-[30%] right-[15%] h-[280px] w-[280px] rounded-full opacity-20 blur-2xl"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.7) 0%, transparent 70%)",
          animation: "breathe 7s ease-in-out infinite 1s",
        }}
      />
      <div
        className="orb-mid absolute bottom-[25%] left-[12%] h-[220px] w-[220px] rounded-full opacity-25 blur-2xl"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, transparent 70%)",
          animation: "breathe 9s ease-in-out infinite 3s",
        }}
      />

      {/* Near layer - fastest parallax */}
      <div
        className="orb-near absolute top-[45%] left-[40%] h-[150px] w-[150px] rounded-full opacity-15 blur-xl"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, transparent 70%)",
          animation: "breathe 5s ease-in-out infinite",
        }}
      />

      {/* Morphing organic shapes */}
      <div
        className="morph-shape absolute top-[20%] right-[25%] h-24 w-24 opacity-20"
        style={{
          background:
            "linear-gradient(135deg, rgba(236, 72, 153, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%)",
          borderRadius: "30% 70% 50% 50% / 50% 30% 70% 50%",
          filter: "blur(1px)",
        }}
      />
      <div
        className="morph-shape absolute top-[65%] left-[18%] h-16 w-16 opacity-25"
        style={{
          background:
            "linear-gradient(135deg, rgba(6, 182, 212, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%)",
          borderRadius: "50% 30% 50% 70% / 70% 50% 30% 50%",
          filter: "blur(1px)",
          animationDelay: "0.5s",
        }}
      />

      {/* Ethereal expanding rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="ethereal-ring absolute h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-500/20"
          style={{ boxShadow: "0 0 40px rgba(236, 72, 153, 0.1)" }}
        />
        <div
          className="ethereal-ring absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/15"
          style={{ boxShadow: "0 0 60px rgba(139, 92, 246, 0.1)", animationDelay: "0.3s" }}
        />
      </div>

      {/* Counter-rotating geometric patterns */}
      <svg
        className="geo-pattern-1 absolute top-[15%] right-[20%] h-32 w-32 opacity-10"
        viewBox="0 0 100 100"
      >
        <polygon points="50,5 95,75 5,75" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
        <polygon points="50,95 5,25 95,25" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={COLORS.PINK} />
            <stop offset="100%" stopColor={COLORS.PURPLE} />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="geo-pattern-2 absolute bottom-[20%] left-[15%] h-40 w-40 opacity-10"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad2)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="url(#grad2)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="url(#grad2)" strokeWidth="0.5" />
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={COLORS.CYAN} />
            <stop offset="100%" stopColor={COLORS.PURPLE} />
          </linearGradient>
        </defs>
      </svg>

      {/* Drifting particles */}
      {[
        { top: "15%", left: "45%", size: 6, color: "pink" },
        { top: "25%", left: "70%", size: 4, color: "purple" },
        { top: "40%", left: "20%", size: 5, color: "cyan" },
        { top: "55%", left: "55%", size: 3, color: "pink" },
        { top: "65%", left: "80%", size: 5, color: "purple" },
        { top: "75%", left: "35%", size: 4, color: "cyan" },
        { top: "85%", left: "60%", size: 6, color: "pink" },
        { top: "10%", left: "85%", size: 3, color: "purple" },
      ].map((p, i) => (
        <div
          key={i}
          className="drift-particle absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background:
              p.color === "pink" ? COLORS.PINK : p.color === "purple" ? COLORS.PURPLE : COLORS.CYAN,
            boxShadow: `0 0 ${p.size * 3}px ${p.color === "pink" ? "rgba(236, 72, 153, 0.8)" : p.color === "purple" ? "rgba(139, 92, 246, 0.8)" : "rgba(6, 182, 212, 0.8)"}`,
            animation: `twinkle ${3 + i * 0.5}s ease-in-out infinite ${i * 0.3}s`,
          }}
        />
      ))}

      {/* Diagonal light streaks */}
      <div
        className="absolute top-0 left-[25%] h-[70%] w-[1px] origin-top opacity-10"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(236, 72, 153, 0.8) 30%, rgba(139, 92, 246, 0.6) 70%, transparent 100%)",
          transform: "rotate(15deg)",
          animation: "lightStreak 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[10%] right-[20%] h-[60%] w-[1px] origin-top opacity-10"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(6, 182, 212, 0.8) 40%, rgba(139, 92, 246, 0.6) 80%, transparent 100%)",
          transform: "rotate(-12deg)",
          animation: "lightStreak 15s ease-in-out infinite 3s",
        }}
      />

      <style jsx>{`
        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.25;
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
        @keyframes lightStreak {
          0%,
          100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
}
