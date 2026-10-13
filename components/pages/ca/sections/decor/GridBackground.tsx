"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMAGES } from "@/lib/images";
import { COLORS_RGBA } from "@/components/pages/ca/constants/palette";

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════
// COSMIC BACKGROUND
// Multi-layer parallax nebula with ethereal particle effects
// ═══════════════════════════════════════════════════════════════════

export function GridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax layers at different speeds
      gsap.to(".nebula-layer-1", {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      gsap.to(".nebula-layer-2", {
        y: -80,
        x: 30,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });

      // Aurora wave animation
      gsap.to(".aurora-wave", {
        backgroundPosition: "200% 50%",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      // Rotate cosmic dust on scroll
      gsap.to(".cosmic-dust", {
        rotation: 180,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 3,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden">
      {/* Base cosmic background image */}
      <div className="nebula-layer-1 absolute inset-0 scale-110">
        <Image
          src={IMAGES.ca.cosmicBackground}
          alt=""
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Second parallax layer - duplicate with offset and blend */}
      <div className="nebula-layer-2 absolute inset-0 scale-125 opacity-40">
        <Image
          src={IMAGES.ca.cosmicBackground}
          alt=""
          fill
          className="object-cover"
          style={{ filter: "hue-rotate(30deg) saturate(1.3)" }}
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Aurora wave overlay */}
      <div
        className="aurora-wave absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(
            45deg,
            transparent 0%,
            rgba(236, 72, 153, 0.1) 20%,
            transparent 40%,
            rgba(139, 92, 246, 0.15) 60%,
            transparent 80%,
            rgba(6, 182, 212, 0.1) 100%
          )`,
          backgroundSize: "400% 400%",
        }}
      />

      {/* Cosmic dust - rotating radial pattern */}
      <div
        className="cosmic-dust absolute top-1/2 left-1/2 h-[200vmax] w-[200vmax] -translate-x-1/2 -translate-y-1/2 opacity-10"
        style={{
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            ${COLORS_RGBA.PINK_30} 30deg,
            transparent 60deg,
            ${COLORS_RGBA.PURPLE_30} 120deg,
            transparent 150deg,
            ${COLORS_RGBA.CYAN_30} 210deg,
            transparent 240deg,
            ${COLORS_RGBA.PINK_30} 300deg,
            transparent 330deg,
            transparent 360deg
          )`,
        }}
      />

      {/* Gradient depth layers */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% 0%, rgba(88, 28, 135, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse 80% 50% at 80% 100%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
            linear-gradient(180deg, rgba(10, 6, 18, 0.5) 0%, transparent 20%, transparent 80%, rgba(10, 6, 18, 0.7) 100%)
          `,
        }}
      />

      {/* Animated grid with perspective */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "center top",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 60%)",
        }}
      />

      {/* Film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
