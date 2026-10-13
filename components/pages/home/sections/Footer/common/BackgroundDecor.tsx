import { memo } from "react";
import Image from "next/image";
import { MandalaRing } from "./MandalaRing";
import { DiyaSvg } from "@/components/pages/home/sections/Hero/River/diya/DiyaSvg";
import { MotionZone } from "@/lib/motion";
import { IMAGES } from "@/lib/images";
import {
  GRADIENT_BORDER_ROYAL,
  GRADIENT_FOOTER_GLOW,
  GRADIENT_FOOTER_AMBIENT,
} from "@/components/pages/home/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// BACKGROUND DECOR — Ethereal decorative elements for footer
// ═══════════════════════════════════════════════════════════════════
export const BackgroundDecor = memo(function BackgroundDecor() {
  return (
    <>
      {/* ═══ Subtle Rangoli Background Pattern - Desktop only ═══ */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
        <Image
          src={IMAGES.footer.subtleRangoli}
          alt=""
          fill
          className="object-cover"
          style={{
            opacity: 0.15,
            filter: "blur(1px)",
          }}
        />
      </div>

      {/* ═══ Animated Background Mandala ═══ */}
      <div
        className="footer-mandala-slow pointer-events-none absolute top-1/2 left-1/2 h-[120vw] max-h-[850px] w-[120vw] max-w-[850px] -translate-x-1/2 -translate-y-1/2 sm:h-[60vw] sm:w-[60vw]"
        style={{ opacity: 0.25 }}
      >
        <MandalaRing className="h-full w-full text-[#FFD700]" />
      </div>

      {/* ═══ Floating Garland - Top - Desktop only ═══ */}
      <div className="pointer-events-none absolute top-0 left-1/2 hidden h-[160px] w-[95%] max-w-[1100px] -translate-x-1/2 sm:block">
        <Image
          src={IMAGES.footer.floatingGarland}
          alt=""
          fill
          className="object-contain object-top"
          style={{
            opacity: 0.9,
            filter: "drop-shadow(0 5px 15px rgba(255,150,50,0.4))",
          }}
        />
      </div>

      {/* ═══ Ethereal Dancer - Left Side - Desktop only ═══ */}
      <div
        className="pointer-events-none absolute top-[0%] left-[6%] z-[2] hidden h-[700px] w-[500px] md:block"
        style={{
          animation: "fadeInUp 1.5s ease-out forwards",
        }}
      >
        <Image
          src={IMAGES.footer.dancer}
          alt=""
          fill
          className="object-contain"
          style={{
            opacity: 0.95,
            filter: "drop-shadow(0 0 30px rgba(255,180,100,0.5))",
          }}
        />
      </div>

      {/* ═══ Ghat Silhouette - Bottom - Desktop only ═══ */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-[1] hidden h-[150px] sm:block">
        <Image
          src={IMAGES.footer.ghatSilhouette}
          alt=""
          fill
          className="object-cover object-bottom"
          style={{
            opacity: 0.5,
            filter: "drop-shadow(0 -5px 20px rgba(255,180,100,0.3))",
          }}
        />
      </div>

      {/* ═══ Top Royal Border ═══ */}
      <div
        className="absolute top-0 right-0 left-0 z-10 h-1 sm:h-1.5"
        style={{ background: GRADIENT_BORDER_ROYAL }}
      />

      {/* Secondary decorative line */}
      <div
        className="absolute top-2 right-[10%] left-[10%] z-10 h-px sm:top-3"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.3) 50%, transparent 100%)`,
        }}
      />

      {/* ═══ Gold Glow Overlay ═══ */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: GRADIENT_FOOTER_GLOW }}
      />

      {/* ═══ Corner Diyas — Mobile only ═══ */}
      <MotionZone className="pointer-events-none absolute inset-0 sm:hidden">
        <div className="absolute top-14 left-[5%] h-10 w-8 opacity-70">
          <DiyaSvg className="h-full w-full" />
        </div>
        <div className="absolute top-16 right-[5%] h-8 w-6 opacity-50">
          <DiyaSvg className="h-full w-full" />
        </div>
      </MotionZone>

      {/* ═══ Floating Particles - Desktop only ═══ */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
        {[...Array(12)].map((_, i) => (
          <div
            key={`footer-particle-${i}`}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: `${10 + (i % 6) * 15}%`,
              top: `${15 + Math.floor(i / 6) * 40}%`,
              background:
                i % 3 === 0
                  ? "radial-gradient(circle, #FFD700 0%, transparent 70%)"
                  : i % 3 === 1
                    ? "radial-gradient(circle, #FFA500 0%, transparent 70%)"
                    : "radial-gradient(circle, #FF6B00 0%, transparent 70%)",
              animation: `floatParticle ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: "0 0 8px rgba(255,180,50,0.5)",
              opacity: 0.6,
            }}
          />
        ))}
      </div>
    </>
  );
});

// ═══════════════════════════════════════════════════════════════════
// AMBIENT GLOW — bottom ambient glow + side vignettes
// ═══════════════════════════════════════════════════════════════════
export const AmbientGlow = memo(function AmbientGlow() {
  return (
    <>
      {/* ═══ Bottom Ambient Glow ═══ */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-[90%] -translate-x-1/2 sm:h-40 sm:w-[70%]"
        style={{ background: GRADIENT_FOOTER_AMBIENT }}
      />

      {/* Side vignettes - narrower to not cover pillars */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-full w-[15%]"
        style={{
          background: `linear-gradient(90deg, rgba(26,5,8,0.5) 0%, transparent 100%)`,
        }}
      />
      <div
        className="pointer-events-none absolute top-0 right-0 h-full w-[15%]"
        style={{
          background: `linear-gradient(-90deg, rgba(26,5,8,0.5) 0%, transparent 100%)`,
        }}
      />

      {/* Top fade for seamless blend */}
      <div
        className="pointer-events-none absolute top-0 right-0 left-0 h-20"
        style={{
          background: `linear-gradient(180deg, rgba(26,5,8,0.4) 0%, transparent 100%)`,
        }}
      />
    </>
  );
});
