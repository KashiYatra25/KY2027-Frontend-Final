"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useMemo } from "react";
import { useIntro } from "@/components/pages/home/sections/Intro/context/IntroContext";
import { useAnimationPolicy } from "@/hooks";

export function BlastEffect() {
  const { phase, startVideo } = useIntro();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isMobile } = useAnimationPolicy();

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/home/explosion.mp3");
      audioRef.current.volume = 1.0; // Max volume (2x of previous 0.6)
    }
  }, []);

  useEffect(() => {
    if (phase === "blasting") {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }

      // Give the blast time to feel impactful
      const timer = setTimeout(
        () => {
          startVideo();
        },
        isMobile ? 1000 : 1500
      );
      return () => clearTimeout(timer);
    }
  }, [phase, startVideo, isMobile]);

  // Pre-compute spark positions for performance
  const sparkData = useMemo(
    () =>
      [...Array(24)].map((_, i) => ({
        angle: (i / 24) * Math.PI * 2 + (Math.random() - 0.5) * 0.2,
        distance: 28 + Math.random() * 30,
        size: 4 + Math.random() * 4,
        delay: Math.random() * 0.1,
        duration: 0.7 + Math.random() * 0.3,
      })),
    []
  );

  if (phase !== "blasting") return null;

  // MOBILE: Enhanced blast effect - still optimized but more impactful
  if (isMobile) {
    return (
      <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
        {/* Quick white flash */}
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.3, times: [0, 0.15, 1], ease: "easeOut" }}
        />

        {/* Core explosion - expanding golden fireball */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, #FFFFFF 0%, #FFD700 35%, #FF8C00 65%, transparent 100%)",
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{
            width: ["0vw", "100vw", "350vw"],
            height: ["0vw", "100vw", "350vw"],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 0.8, times: [0, 0.3, 1], ease: "easeOut" }}
        />

        {/* Two shockwave rings */}
        {[0, 0.12].map((delay, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              border: `${2.5 - i * 0.5}px solid ${i === 0 ? "#FFD700" : "#FF8C00"}`,
              boxShadow: i === 0 ? "0 0 30px 10px rgba(255, 200, 100, 0.4)" : undefined,
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{
              width: `${250 - i * 50}vmax`,
              height: `${250 - i * 50}vmax`,
              opacity: 0,
            }}
            transition={{ duration: 0.7, ease: "easeOut", delay }}
          />
        ))}

        {/* Light rays - 8 rays for mobile */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <motion.div
            key={`ray-${angle}`}
            className="absolute top-1/2 left-1/2 origin-bottom"
            style={{
              width: "4px",
              height: "120vh",
              background:
                "linear-gradient(to top, transparent 0%, rgba(255, 215, 0, 0.7) 30%, rgba(255, 215, 0, 0.7) 70%, transparent 100%)",
              transform: `translate(-50%, -100%) rotate(${angle}deg)`,
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: [0, 1.2, 1],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}

        {/* Center glow pulse */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "40vw",
            height: "40vw",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,215,0,0.6) 40%, transparent 70%)",
            filter: "blur(10px)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.8, 2.2],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    );
  }

  // DESKTOP: Optimized cinematic blast
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {/* Initial bright white flash */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.25, times: [0, 0.2, 1], ease: "easeOut" }}
      />

      {/* Core explosion - expanding golden fireball */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, #FFFFFF 0%, #FFD700 30%, #FF8C00 60%, transparent 100%)",
        }}
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{
          width: ["0vw", "80vw", "300vw"],
          height: ["0vw", "80vw", "300vw"],
          opacity: [1, 1, 0],
        }}
        transition={{ duration: 1, times: [0, 0.35, 1], ease: "easeOut" }}
      />

      {/* Three shockwave rings */}
      {[0, 0.1, 0.2].map((delay, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            border: `${3 - i * 0.5}px solid ${i === 0 ? "#FFD700" : i === 1 ? "#FFA500" : "#FF8C00"}`,
            boxShadow: i === 0 ? "0 0 40px 15px rgba(255, 200, 100, 0.5)" : undefined,
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{
            width: `${280 - i * 40}vmax`,
            height: `${280 - i * 40}vmax`,
            opacity: 0,
          }}
          transition={{ duration: 0.9, ease: "easeOut", delay }}
        />
      ))}

      {/* Light rays - 12 rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <motion.div
          key={`ray-${angle}`}
          className="absolute top-1/2 left-1/2 origin-bottom"
          style={{
            width: "5px",
            height: "130vh",
            background:
              "linear-gradient(to top, transparent 0%, rgba(255, 215, 0, 0.8) 30%, rgba(255, 215, 0, 0.8) 70%, transparent 100%)",
            transform: `translate(-50%, -100%) rotate(${angle}deg)`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: [0, 1.3, 1],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}

      {/* Sparks - 20 particles */}
      {sparkData.map((spark, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: spark.size,
            height: spark.size,
            background: i % 2 === 0 ? "#FFD700" : "#FFF",
            boxShadow: `0 0 ${spark.size * 2}px rgba(255, 200, 100, 0.7)`,
          }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos(spark.angle) * spark.distance + "vw",
            y: Math.sin(spark.angle) * spark.distance + "vh",
            opacity: 0,
          }}
          transition={{
            duration: spark.duration,
            ease: "easeOut",
            delay: spark.delay,
          }}
        />
      ))}

      {/* Center glow pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "25vw",
          height: "25vw",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,215,0,0.5) 40%, transparent 70%)",
          filter: "blur(15px)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 2, 2.5],
          opacity: [0, 1, 0],
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
