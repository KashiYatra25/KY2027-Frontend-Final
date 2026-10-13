"use client";

import Image from "next/image";
import { memo } from "react";
import { IMAGES } from "@/lib/images";
import { COLORS } from "@/components/pages/contact/constants/palette";
import { useAnimationPolicy } from "@/hooks";

/**
 * AmbientDecor
 *
 * Desktop-only spiritual ambience for the Contact page. Everything here is
 * wrapped in `hidden lg:block` so it never renders on mobile/tablet, keeping
 * the mobile experience lightweight (per project convention).
 *
 * When the user prefers reduced motion, all infinite CSS loops are frozen via
 * `animation-play-state: paused` while the decorations stay visible.
 */
export const AmbientDecor = memo(function AmbientDecor() {
  const { shouldAnimate } = useAnimationPolicy();
  const play = shouldAnimate ? "running" : "paused";

  return (
    <div
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
      aria-hidden
    >
      {/* Slowly rotating mandala - top right */}
      <div className="absolute -top-40 -right-40 h-[520px] w-[520px] opacity-[0.12]">
        <Image
          src={IMAGES.contact.mandalaOrnament}
          alt=""
          fill
          className="animate-spin object-contain"
          style={{ animationDuration: "140s", animationPlayState: play }}
        />
      </div>

      {/* Slowly rotating mandala - bottom left (reverse) */}
      <div
        className="absolute -bottom-48 -left-48 h-[600px] w-[600px] opacity-[0.10]"
        style={{
          animation: `spin 160s linear infinite reverse`,
          animationPlayState: play,
        }}
      >
        <Image src={IMAGES.contact.mandalaOrnament} alt="" fill className="object-contain" />
      </div>

      {/* Peacock - right edge with teal/gold glow */}
      <div className="absolute top-1/3 -right-8 h-[420px] w-[320px] -translate-y-1/2 md:-right-12 md:h-[500px] md:w-[380px] lg:-right-16 lg:h-[560px] lg:w-[440px]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, rgba(0,180,150,0.18) 0%, rgba(255,215,0,0.10) 40%, transparent 70%)",
            filter: "blur(50px)",
            animation: "pulseSlow 5s ease-in-out infinite",
            animationPlayState: play,
          }}
        />
        <Image
          src={IMAGES.contact.peacock}
          alt=""
          fill
          className="object-contain opacity-40"
          style={{
            filter:
              "drop-shadow(0 0 40px rgba(0,180,150,0.4)) drop-shadow(0 0 80px rgba(255,215,0,0.25))",
          }}
        />
      </div>

      {/* Floating diyas drifting upward */}
      {[
        { left: "8%", top: "62%", size: 60, delay: "0s", dur: "7s" },
        { left: "18%", top: "78%", size: 44, delay: "1.5s", dur: "9s" },
        { left: "82%", top: "70%", size: 52, delay: "0.8s", dur: "8s" },
        { left: "91%", top: "50%", size: 38, delay: "2.2s", dur: "10s" },
      ].map((d, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animation: `diyaFloat ${d.dur} ease-in-out ${d.delay} infinite`,
            animationPlayState: play,
          }}
        >
          <Image
            src={IMAGES.contact.floatingDiya}
            alt=""
            fill
            className="object-contain"
            style={{ filter: "drop-shadow(0 0 12px rgba(255,180,50,0.7))" }}
          />
        </div>
      ))}

      {/* Twinkling golden sparks */}
      {[
        { left: "25%", top: "30%", delay: "0s" },
        { left: "60%", top: "22%", delay: "1.1s" },
        { left: "72%", top: "40%", delay: "2s" },
        { left: "40%", top: "68%", delay: "0.6s" },
        { left: "12%", top: "44%", delay: "1.7s" },
      ].map((s, i) => (
        <span
          key={`spark-${i}`}
          className="absolute rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: 6,
            height: 6,
            background: COLORS.BRIGHT_GOLD,
            boxShadow: `0 0 10px 2px ${COLORS.BRIGHT_GOLD}`,
            animation: `twinkle 3.5s ease-in-out ${s.delay} infinite`,
            animationPlayState: play,
          }}
        />
      ))}
    </div>
  );
});
