"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useIntro } from "@/components/pages/home/sections/Intro/context/IntroContext";
import { useAnimationPolicy } from "@/hooks";

/**
 * Stage background with ZOOM and GLOW effect when holding
 * MOBILE: Simplified - no streaks, no wave rings, minimal effects
 */
export function StageBackground() {
  const { phase, loadProgress } = useIntro();
  const { isMobile } = useAnimationPolicy();

  if (phase === "video" || phase === "complete") return null;

  const isLoading = phase === "loading";
  const intensity = loadProgress / 100;

  // ZOOM: Reduced on mobile
  const zoomScale = isMobile ? 1 + intensity * 0.5 : 1 + intensity * 1.2;

  return (
    <motion.div
      className="absolute inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === "blasting" ? 0 : 1 }}
      transition={{ duration: phase === "blasting" ? 0.3 : 1 }}
    >
      {/* Black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Stage image - ZOOMS IN and GLOWS while holding */}
      <motion.div
        className="absolute inset-0"
        style={{
          transform: `scale(${zoomScale})`,
          transformOrigin: "center center",
        }}
      >
        {/* Image with brightness/saturation filter */}
        <div
          className="absolute inset-0 transition-all duration-100"
          style={{
            filter: isLoading
              ? `brightness(${1 + intensity * 0.5}) saturate(${1 + intensity * 0.8})`
              : "brightness(1) saturate(1)",
          }}
        >
          <Image
            src="/intro/Stage.png"
            alt="Concert Stage"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Golden glow overlay - DESKTOP ONLY */}
        {!isMobile && isLoading && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, rgba(255, 180, 50, ${intensity * 0.25}) 0%, transparent 60%)`,
              mixBlendMode: "screen",
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Tunnel vignette */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-100"
        style={{
          background: isLoading
            ? `radial-gradient(circle at center, 
                transparent ${Math.max(0, 15 - intensity * 10)}%, 
                rgba(0,0,0,${0.5 + intensity * 0.4}) ${Math.max(20, 40 - intensity * 25)}%, 
                rgba(0,0,0,0.95) 100%)`
            : "radial-gradient(circle at center, transparent 18%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      {/* Speed streaks - DESKTOP ONLY */}
      {!isMobile && isLoading && intensity > 0.08 && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
            <motion.div
              key={`streak-${angle}`}
              className="absolute top-1/2 left-1/2"
              style={{
                width: 2.5 + intensity * 2,
                height: `${12 + intensity * 55}%`,
                background: `linear-gradient(to bottom, 
                  transparent 0%, 
                  rgba(255, 215, 0, ${0.1 + intensity * 0.3}) 30%, 
                  rgba(255, 200, 100, ${0.2 + intensity * 0.4}) 50%, 
                  transparent 100%)`,
                transformOrigin: "center top",
                transform: `rotate(${angle}deg) translateY(-50%)`,
              }}
              animate={{
                scaleY: [0.5, 1.3, 0.5],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Expanding wave rings - DESKTOP ONLY */}
      {!isMobile && isLoading && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`wave-${i}`}
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                border: `${2.5 - i * 0.5}px solid rgba(255, 200, 100, ${0.4 - i * 0.1})`,
                boxShadow: `0 0 20px rgba(255, 200, 100, ${0.3 - i * 0.08})`,
              }}
              initial={{ width: 20, height: 20, opacity: 0 }}
              animate={{
                width: [20, 800],
                height: [20, 800],
                opacity: [intensity * 0.8, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Center energy buildup - DESKTOP ONLY */}
      {!isMobile && isLoading && (
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 100 + intensity * 300,
            height: 100 + intensity * 300,
            background: `radial-gradient(circle, 
              rgba(255, 215, 0, ${0.15 + intensity * 0.25}) 0%, 
              rgba(255, 180, 50, ${0.08 + intensity * 0.15}) 40%, 
              transparent 70%)`,
            filter: "blur(20px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 0.35, repeat: Infinity }}
        />
      )}

      {/* Corner flares - DESKTOP ONLY */}
      {!isMobile && isLoading && intensity > 0.3 && (
        <>
          <motion.div
            className="pointer-events-none absolute top-0 left-0 h-80 w-80"
            style={{
              background: `radial-gradient(circle at top left, rgba(255, 200, 100, ${intensity * 0.4}) 0%, transparent 55%)`,
              filter: "blur(30px)",
            }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
          <motion.div
            className="pointer-events-none absolute top-0 right-0 h-80 w-80"
            style={{
              background: `radial-gradient(circle at top right, rgba(255, 200, 100, ${intensity * 0.4}) 0%, transparent 55%)`,
              filter: "blur(30px)",
            }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 0.3, repeat: Infinity, delay: 0.15 }}
          />
        </>
      )}

      {/* Subtle idle glow - DESKTOP ONLY */}
      {!isMobile && phase === "idle" && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at center, rgba(255, 180, 100, 0.12) 0%, transparent 45%)",
          }}
        />
      )}
    </motion.div>
  );
}
