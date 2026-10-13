"use client";

import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { ROYAL_COLORS } from "@/components/pages/login/constants/palette";

export function MysticGateSection() {
  return (
    <div className="relative hidden lg:block">
      {/* Mystic Login Image with animations */}
      <div
        className="relative mx-auto w-full max-w-[500px]"
        style={{
          animation: "floatUpDown 4s ease-in-out infinite",
        }}
      >
        {/* Glow effect behind image */}
        <div
          className="pointer-events-none absolute -inset-10 inset-0"
          style={{
            background: `radial-gradient(ellipse at center, rgba(255,215,0,0.2) 0%, rgba(255,107,0,0.1) 40%, transparent 70%)`,
            filter: "blur(40px)",
            animation: "pulseGlow 3s ease-in-out infinite",
          }}
        />

        <Image
          src={IMAGES.login.mysticGate}
          alt="Gateway to Kashi Yatra"
          width={600}
          height={800}
          className="relative h-auto w-full rounded-2xl"
          style={{
            filter:
              "drop-shadow(0 0 40px rgba(255,215,0,0.3)) drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
          }}
          priority
        />

        {/* Floating sparkles around the image */}
        <div className="pointer-events-none absolute inset-0 overflow-visible">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-2 w-2 rounded-full"
              style={{
                left: `${10 + i * 15}%`,
                top: `${15 + (i % 3) * 30}%`,
                background: `radial-gradient(circle, ${ROYAL_COLORS.GOLD} 0%, transparent 70%)`,
                boxShadow: `0 0 10px ${ROYAL_COLORS.GOLD}`,
                animation: `sparkleFloat ${2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Decorative quote below image */}
      <div className="mt-8 text-center">
        <p
          className="text-lg leading-relaxed italic"
          style={{
            color: `${ROYAL_COLORS.CREAM}70`,
            fontFamily: "Georgia, serif",
          }}
        >
          &ldquo;Where the sacred Ganga whispers ancient tales,
          <br />
          and every step is a dance of devotion.&rdquo;
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <div
            className="h-px w-12"
            style={{
              background: `linear-gradient(90deg, transparent, ${ROYAL_COLORS.GOLD})`,
            }}
          />
          <span style={{ color: ROYAL_COLORS.GOLD }}>✦</span>
          <div
            className="h-px w-12"
            style={{
              background: `linear-gradient(90deg, ${ROYAL_COLORS.GOLD}, transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
