"use client";

import { memo } from "react";

type TimeVariant = "dawn" | "day" | "dusk";

export const Sun = memo(function Sun({
  className = "",
  isMobile = false,
  variant = "day",
}: {
  className?: string;
  isMobile?: boolean;
  variant?: TimeVariant;
}) {
  // Dawn has softer, paler colors (rising sun); dusk is a warm, dimmer setting sun.
  const isDawn = variant === "dawn";
  const isDusk = variant === "dusk";

  const colors = isDawn
    ? {
        haloOuter: "rgba(255,230,180,0.04)",
        haloOuterMid: "rgba(255,210,150,0.02)",
        glowOuter: "rgba(255,220,170,0.08)",
        glowOuterMid: "rgba(255,200,140,0.04)",
        glowMiddle: "rgba(255,240,200,0.15)",
        glowMiddleMid: "rgba(255,220,180,0.08)",
        glowInner: "rgba(255,255,245,0.25)",
        glowInnerMid: "rgba(255,250,230,0.12)",
        surface: `radial-gradient(circle at 35% 35%, 
      #FFFEF8 0%, 
      #FFFBF0 15%, 
      #FFF5E0 30%, 
      #FFE8C0 50%, 
      #FFD8A0 70%, 
      #FFC880 85%,
      #FFB860 100%
    )`,
        boxShadow: `
      0 0 30px rgba(255,230,180,0.6),
      0 0 60px rgba(255,210,150,0.4),
      0 0 90px rgba(255,190,130,0.25),
      0 0 130px rgba(255,180,120,0.1),
      inset -3px -3px 15px rgba(255,180,100,0.2),
      inset 3px 3px 12px rgba(255,255,230,0.4)
    `,
      }
    : isDusk
      ? {
          // Setting sun — warm amber→orange→deep-red, softer/dimmer glow to sit in a
          // twilight purple sky without blowing out.
          haloOuter: "rgba(255,150,70,0.05)",
          haloOuterMid: "rgba(230,110,50,0.025)",
          glowOuter: "rgba(255,140,60,0.1)",
          glowOuterMid: "rgba(220,90,40,0.05)",
          glowMiddle: "rgba(255,170,90,0.16)",
          glowMiddleMid: "rgba(230,120,60,0.08)",
          glowInner: "rgba(255,210,150,0.22)",
          glowInnerMid: "rgba(255,170,100,0.1)",
          surface: `radial-gradient(circle at 40% 40%, 
      #FFE8C0 0%, 
      #FFD093 14%, 
      #FBA74E 32%, 
      #F0802A 52%, 
      #D85A1C 72%, 
      #B23E14 88%,
      #8F2E10 100%
    )`,
          boxShadow: `
      0 0 30px rgba(255,150,70,0.55),
      0 0 60px rgba(230,100,50,0.35),
      0 0 95px rgba(200,70,35,0.2),
      0 0 140px rgba(170,55,25,0.1),
      inset -4px -4px 18px rgba(150,45,15,0.35),
      inset 4px 4px 14px rgba(255,220,160,0.3)
    `,
        }
      : {
          haloOuter: "rgba(255,200,100,0.06)",
          haloOuterMid: "rgba(255,160,60,0.03)",
          glowOuter: "rgba(255,180,80,0.12)",
          glowOuterMid: "rgba(255,140,50,0.06)",
          glowMiddle: "rgba(255,220,150,0.2)",
          glowMiddleMid: "rgba(255,180,100,0.1)",
          glowInner: "rgba(255,255,240,0.35)",
          glowInnerMid: "rgba(255,240,200,0.15)",
          surface: `radial-gradient(circle at 35% 35%, 
      #FFFEF8 0%, 
      #FFF8E8 15%, 
      #FFE8C0 30%, 
      #FFD080 50%, 
      #FFA840 70%, 
      #FF8020 85%,
      #FF6000 100%
    )`,
          boxShadow: `
      0 0 40px rgba(255,200,100,0.8),
      0 0 80px rgba(255,160,60,0.5),
      0 0 120px rgba(255,120,40,0.3),
      0 0 180px rgba(255,100,30,0.15),
      inset -4px -4px 20px rgba(255,100,0,0.3),
      inset 4px 4px 15px rgba(255,255,200,0.4)
    `,
        };

  return (
    <div className={`relative ${className}`}>
      {/* Outermost atmospheric halo */}
      <div
        className={`absolute inset-0 rounded-full ${isMobile ? "" : "sun-halo-outer"}`}
        style={{
          transform: "scale(4)",
          background: `radial-gradient(circle, ${colors.haloOuter} 0%, ${colors.haloOuterMid} 40%, transparent 70%)`,
        }}
      />

      {/* Outer warm glow */}
      <div
        className={`absolute inset-0 rounded-full ${isMobile ? "" : "sun-glow-outer"}`}
        style={{
          transform: "scale(2.5)",
          background: `radial-gradient(circle, ${colors.glowOuter} 0%, ${colors.glowOuterMid} 35%, transparent 65%)`,
        }}
      />

      {/* Middle intense glow */}
      <div
        className={`absolute inset-0 rounded-full ${isMobile ? "" : "sun-glow-middle"}`}
        style={{
          transform: "scale(1.8)",
          background: `radial-gradient(circle, ${colors.glowMiddle} 0%, ${colors.glowMiddleMid} 45%, transparent 75%)`,
        }}
      />

      {/* Inner white-hot glow */}
      <div
        className={`absolute inset-0 rounded-full ${isMobile ? "" : "sun-glow-inner"}`}
        style={{
          transform: "scale(1.3)",
          background: `radial-gradient(circle, ${colors.glowInner} 0%, ${colors.glowInnerMid} 50%, transparent 85%)`,
        }}
      />

      {/* Corona rays - matches moon scale(2.2) */}
      <div
        className={`absolute inset-0 ${isMobile ? "" : "sun-corona"}`}
        style={{
          transform: "scale(2.2)",
          background: `
            conic-gradient(
              from 0deg,
              transparent 0deg,
              rgba(255,240,200,0.05) 5deg,
              transparent 10deg,
              rgba(255,220,150,0.03) 20deg,
              transparent 25deg,
              rgba(255,240,200,0.04) 35deg,
              transparent 40deg,
              rgba(255,220,150,0.03) 55deg,
              transparent 60deg,
              rgba(255,240,200,0.05) 70deg,
              transparent 75deg,
              rgba(255,220,150,0.03) 90deg,
              transparent 95deg,
              rgba(255,240,200,0.04) 110deg,
              transparent 115deg,
              rgba(255,220,150,0.03) 130deg,
              transparent 135deg,
              rgba(255,240,200,0.05) 150deg,
              transparent 155deg,
              rgba(255,220,150,0.03) 170deg,
              transparent 175deg,
              rgba(255,240,200,0.04) 190deg,
              transparent 195deg,
              rgba(255,220,150,0.03) 210deg,
              transparent 215deg,
              rgba(255,240,200,0.05) 230deg,
              transparent 235deg,
              rgba(255,220,150,0.03) 250deg,
              transparent 255deg,
              rgba(255,240,200,0.04) 270deg,
              transparent 275deg,
              rgba(255,220,150,0.03) 290deg,
              transparent 295deg,
              rgba(255,240,200,0.05) 310deg,
              transparent 315deg,
              rgba(255,220,150,0.03) 330deg,
              transparent 335deg,
              rgba(255,240,200,0.04) 350deg,
              transparent 360deg
            )
          `,
          borderRadius: "50%",
        }}
      />

      {/* Sun surface - the actual disc */}
      <div
        className={`relative h-full w-full overflow-hidden rounded-full ${isMobile ? "" : "sun-surface"}`}
        style={{
          background: colors.surface,
          boxShadow: colors.boxShadow,
        }}
      >
        {/* Surface shimmer - light sweep */}
        <div
          className={`absolute inset-0 rounded-full ${isMobile ? "" : "sun-light-sweep"}`}
          style={{
            background:
              "linear-gradient(110deg, transparent 0%, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%, transparent 100%)",
          }}
        />

        {/* Hot spot - brightest point */}
        <div
          className="absolute rounded-full"
          style={{
            width: "40%",
            height: "40%",
            top: "20%",
            left: "20%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.6) 0%, rgba(255,255,240,0.3) 40%, transparent 70%)",
          }}
        />

        {/* Secondary highlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: "20%",
            height: "20%",
            top: "30%",
            left: "30%",
            background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
          }}
        />

        {/* Edge darkening for depth */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, transparent 50%, rgba(255,80,0,0.2) 85%, rgba(200,50,0,0.3) 100%)",
          }}
        />

        {/* Subtle surface texture */}
        <div
          className={`absolute inset-0 rounded-full opacity-20 ${isMobile ? "" : "sun-texture"}`}
          style={{
            background: `
              radial-gradient(circle at 25% 40%, rgba(255,200,100,0.4) 0%, transparent 20%),
              radial-gradient(circle at 60% 30%, rgba(255,180,80,0.3) 0%, transparent 15%),
              radial-gradient(circle at 45% 65%, rgba(255,160,60,0.35) 0%, transparent 18%),
              radial-gradient(circle at 70% 55%, rgba(255,200,100,0.25) 0%, transparent 12%)
            `,
          }}
        />
      </div>

      {!isMobile && (
        <style jsx>{`
          .sun-halo-outer {
            animation: sunHaloOuter 8s ease-in-out infinite;
          }
          .sun-glow-outer {
            animation: sunGlowOuter 6s ease-in-out infinite;
          }
          .sun-glow-middle {
            animation: sunGlowMiddle 4s ease-in-out infinite 0.3s;
          }
          .sun-glow-inner {
            animation: sunGlowInner 3s ease-in-out infinite 0.6s;
          }
          .sun-corona {
            animation: sunCorona 30s linear infinite;
          }
          .sun-surface {
            animation: sunSurfacePulse 5s ease-in-out infinite;
          }
          .sun-light-sweep {
            animation: sunLightSweep 8s ease-in-out infinite;
          }
          .sun-texture {
            animation: sunTexture 10s ease-in-out infinite;
          }
        `}</style>
      )}
    </div>
  );
});
