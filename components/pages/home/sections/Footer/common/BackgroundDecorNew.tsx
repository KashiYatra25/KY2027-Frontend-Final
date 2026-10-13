"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMotionZone } from "@/lib/motion";
import { useAnimationPolicy } from "@/hooks";
import { FOOTER_COLORS, FOOTER_GRADIENTS } from "./constants";
import { IMAGES } from "@/lib/images";

// ═══════════════════════════════════════════════════════════════════
// FOOTER DANCER - Dancer figure on the right side
// ═══════════════════════════════════════════════════════════════════
export const FooterDancer = memo(function FooterDancer() {
  const { isAnimating } = useMotionZone();

  return (
    <motion.div
      className="pointer-events-none absolute top-[5%] right-[1%] z-10 hidden h-[400px] w-[280px] sm:h-[500px] sm:w-[350px] md:block lg:h-[600px] lg:w-[420px]"
      style={{ willChange: "transform" }}
      animate={
        isAnimating
          ? {
              y: [0, -15, 0],
            }
          : {}
      }
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Glow behind dancer - using opacity gradient instead of blur for performance */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: `radial-gradient(ellipse at center, ${FOOTER_COLORS.NEON_PINK}60 0%, ${FOOTER_COLORS.NEON_PURPLE}40 30%, transparent 60%)`,
          transform: "translateZ(0)", // Force GPU layer
        }}
      />

      {/* Dancer image - simplified shadow */}
      <Image
        src={IMAGES.footer.footerDancer}
        alt=""
        fill
        className="object-contain"
        style={{
          filter: `drop-shadow(0 0 20px ${FOOTER_COLORS.NEON_PINK}40)`,
          transform: "translateZ(0)", // Force GPU layer
        }}
      />
    </motion.div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// CONCERT FLOOR - 3D perspective grid from the image
// ═══════════════════════════════════════════════════════════════════
const ConcertFloor = memo(function ConcertFloor() {
  return (
    <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[40%] overflow-hidden">
      <Image
        src="/home/footer/ConcertFloor.png"
        alt=""
        fill
        className="object-cover object-top"
        style={{
          opacity: 0.8,
          maskImage: "linear-gradient(to top, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 60%, transparent 100%)",
        }}
      />
      {/* Overlay glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center bottom, ${FOOTER_COLORS.NEON_PURPLE}20 0%, transparent 70%)`,
        }}
      />
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// GLITCH LINES - Horizontal scan lines (subtle, no blinking)
// ═══════════════════════════════════════════════════════════════════
const GlitchLines = memo(function GlitchLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Scan lines overlay - static */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.05) 2px,
            rgba(255, 255, 255, 0.05) 4px
          )`,
        }}
      />
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// SPOTLIGHT CONES - Sweeping light beams - Desktop only (just 2)
// ═══════════════════════════════════════════════════════════════════
const SpotlightCones = memo(function SpotlightCones() {
  const { isAnimating } = useMotionZone();

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
      {/* Left spotlight */}
      <motion.div
        className="absolute bottom-0 left-[8%] h-[100%] w-[300px] origin-bottom"
        style={{
          background: `linear-gradient(0deg, ${FOOTER_COLORS.NEON_CYAN}30 0%, ${FOOTER_COLORS.NEON_CYAN}08 30%, transparent 100%)`,
          clipPath: "polygon(45% 100%, 55% 100%, 100% 0%, 0% 0%)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
        animate={
          isAnimating
            ? {
                rotate: [-15, 15, -15],
              }
            : {}
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Right spotlight */}
      <motion.div
        className="absolute right-[8%] bottom-0 h-[100%] w-[300px] origin-bottom"
        style={{
          background: `linear-gradient(0deg, ${FOOTER_COLORS.NEON_PINK}30 0%, ${FOOTER_COLORS.NEON_PINK}08 30%, transparent 100%)`,
          clipPath: "polygon(45% 100%, 55% 100%, 100% 0%, 0% 0%)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
        animate={
          isAnimating
            ? {
                rotate: [15, -15, 15],
              }
            : {}
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// CROWD SILHOUETTE - Concert crowd at bottom
// ═══════════════════════════════════════════════════════════════════
const CrowdSilhouette = memo(function CrowdSilhouette() {
  return (
    <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-[5] h-[150px] sm:h-[180px]">
      <Image
        src="/home/proNites/Silhouette.png"
        alt=""
        fill
        className="object-cover object-bottom"
        style={{
          opacity: 1,
          filter: `drop-shadow(0 -10px 30px ${FOOTER_COLORS.NEON_PINK}50)`,
        }}
      />
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// AMBIENT PARTICLES - Floating pixel dust (reduced for performance)
// ═══════════════════════════════════════════════════════════════════
const AmbientParticles = memo(function AmbientParticles() {
  const { isAnimating } = useMotionZone();

  // Reduced to 6 particles for better performance
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: `${10 + i * 15}%`,
    delay: i * 1.5,
    duration: 10 + (i % 3) * 3,
    size: 2,
    color: [FOOTER_COLORS.NEON_CYAN, FOOTER_COLORS.NEON_PINK, FOOTER_COLORS.NEON_PURPLE][i % 3],
  }));

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: "15%",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 6px ${p.color}`,
            opacity: 0.5,
            willChange: "transform",
          }}
          animate={
            isAnimating
              ? {
                  y: [0, -400],
                }
              : {}
          }
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT - BackgroundDecor
// ═══════════════════════════════════════════════════════════════════
export const BackgroundDecor = memo(function BackgroundDecor() {
  return (
    <>
      {/* Concert floor background - Desktop only */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 hidden h-[50%] sm:block">
        <Image
          src={IMAGES.footer.concertFloor}
          alt=""
          fill
          className="object-cover object-top"
          style={{
            opacity: 0.7,
          }}
        />
      </div>

      {/* Spotlight beams - Desktop only (handled inside component) */}
      <SpotlightCones />

      {/* Footer dancer on the right - Desktop only (handled inside component) */}
      <FooterDancer />

      {/* Ambient floating particles - Desktop only (handled inside component) */}
      <AmbientParticles />

      {/* Top edge glow - Both mobile and desktop */}
      <div
        className="absolute top-0 right-0 left-0 h-1"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            ${FOOTER_COLORS.NEON_CYAN} 25%, 
            ${FOOTER_COLORS.NEON_PINK} 50%, 
            ${FOOTER_COLORS.NEON_PURPLE} 75%, 
            transparent 100%
          )`,
          boxShadow: `0 0 20px ${FOOTER_COLORS.NEON_PINK}60`,
        }}
      />
    </>
  );
});

// ═══════════════════════════════════════════════════════════════════
// AMBIENT GLOW - Side and bottom glows
// ═══════════════════════════════════════════════════════════════════
export const AmbientGlow = memo(function AmbientGlow() {
  return (
    <>
      {/* Center bottom glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-[80%] -translate-x-1/2"
        style={{
          background: `radial-gradient(ellipse at bottom, ${FOOTER_COLORS.NEON_PINK}20 0%, transparent 70%)`,
        }}
      />

      {/* Side vignettes */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-full w-[20%]"
        style={{
          background: `linear-gradient(90deg, ${FOOTER_COLORS.BG_DEEP} 0%, transparent 100%)`,
        }}
      />
      <div
        className="pointer-events-none absolute top-0 right-0 h-full w-[20%]"
        style={{
          background: `linear-gradient(-90deg, ${FOOTER_COLORS.BG_DEEP} 0%, transparent 100%)`,
        }}
      />
    </>
  );
});
