"use client";

import Image from "next/image";
import { memo } from "react";
import { IMAGES } from "@/lib/images";
import { COLORS } from "@/components/pages/contact/constants/palette";
import { MysticDivider } from "./decor";

// ═══════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════
export const ContactHero = memo(function ContactHero() {
  return (
    <section className="relative flex min-h-[52vh] flex-col items-center justify-center overflow-hidden pt-6 sm:min-h-[58vh]">
      {/* Golden Conch (Shankha) centerpiece */}
      <div className="relative mb-2 sm:mb-4">
        {/* Radiant halo behind the conch */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 sm:h-[440px] sm:w-[440px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,215,0,0.25) 0%, rgba(255,180,50,0.12) 40%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <div className="relative aspect-[1420/770] w-[240px] sm:w-[360px] md:w-[420px] lg:animate-[floatOm_6s_ease-in-out_infinite]">
          <Image
            src={IMAGES.contact.conch}
            alt="Sacred golden conch"
            fill
            priority
            className="object-contain"
            style={{
              filter:
                "drop-shadow(0 0 24px rgba(255,215,0,0.5)) drop-shadow(0 0 48px rgba(255,150,50,0.25))",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 2xl:max-w-4xl">
        {/* Eyebrow */}
        <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6 sm:gap-4">
          <div
            className="h-[1px] w-12 sm:w-20"
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS.BRIGHT_GOLD})`,
            }}
          />
          <span className="text-lg sm:text-xl">🪔</span>
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase sm:text-sm sm:tracking-[0.35em]"
            style={{
              color: COLORS.BRIGHT_GOLD,
              textShadow: "0 0 20px rgba(255,215,0,0.5)",
            }}
          >
            We Would Love To Hear From You
          </p>
          <span className="text-lg sm:text-xl">🪔</span>
          <div
            className="h-[1px] w-12 sm:w-20"
            style={{
              background: `linear-gradient(90deg, ${COLORS.BRIGHT_GOLD}, transparent)`,
            }}
          />
        </div>

        {/* Title */}
        <h1
          className="mb-6 text-4xl font-black italic sm:text-5xl md:text-6xl lg:text-7xl"
          style={{
            fontFamily: "Georgia, serif",
            background: `linear-gradient(135deg, ${COLORS.CREAM} 0%, ${COLORS.BRIGHT_GOLD} 40%, ${COLORS.GOLD} 60%, ${COLORS.CREAM} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 4px 30px rgba(255,215,0,0.3)",
          }}
        >
          Get In Touch
        </h1>

        {/* Tagline */}
        <p
          className="mb-8 text-lg leading-relaxed font-medium sm:text-xl md:text-2xl"
          style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
        >
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Let your </span>
          <span
            style={{
              color: COLORS.BRIGHT_GOLD,
              textShadow: "0 0 20px rgba(255,215,0,0.4)",
            }}
          >
            words
          </span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}> travel down the </span>
          <span
            style={{
              color: COLORS.SAFFRON,
              textShadow: "0 0 20px rgba(255,107,0,0.4)",
            }}
          >
            Ganga
          </span>
        </p>

        <MysticDivider />
      </div>
    </section>
  );
});
