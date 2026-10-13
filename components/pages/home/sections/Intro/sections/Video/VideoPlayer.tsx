"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useIntro } from "@/components/pages/home/sections/Intro/context/IntroContext";
import { useAnimationPolicy } from "@/hooks";

export function VideoPlayer() {
  const { phase } = useIntro();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (phase === "video" && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, [phase]);

  // Only show during video phase (not complete - hero takes over then)
  if (phase !== "video") return null;

  return (
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="/intro/ConcertStage.webm"
        loop
        muted
        playsInline
      />

      {/* Gradient overlays for better UI visibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, 
              rgba(0,0,0,0.4) 0%, 
              transparent 20%, 
              transparent 60%, 
              rgba(0,0,0,0.6) 100%
            )
          `,
        }}
      />

      {/* Title overlay - Custom Text with Decorations */}
      <motion.div
        className="absolute top-[5%] left-1/2 w-full -translate-x-1/2 px-4 sm:top-[8%]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          {/* Left Decoration - Stylized Sitar */}
          <motion.svg
            width="60"
            height="80"
            viewBox="0 0 60 80"
            className="hidden sm:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {/* Sitar neck */}
            <path
              d="M30 5 L30 55"
              stroke="url(#goldGradLeft)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Sitar body */}
            <ellipse
              cx="30"
              cy="65"
              rx="18"
              ry="12"
              fill="none"
              stroke="url(#goldGradLeft)"
              strokeWidth="2"
            />
            {/* Tuning pegs */}
            <circle cx="25" cy="10" r="3" fill="#FFD700" />
            <circle cx="35" cy="15" r="3" fill="#DAA520" />
            <circle cx="25" cy="20" r="3" fill="#FFD700" />
            {/* Strings */}
            <line
              x1="28"
              y1="25"
              x2="28"
              y2="55"
              stroke="#FFF8DC"
              strokeWidth="0.5"
              opacity="0.6"
            />
            <line
              x1="30"
              y1="25"
              x2="30"
              y2="55"
              stroke="#FFF8DC"
              strokeWidth="0.5"
              opacity="0.6"
            />
            <line
              x1="32"
              y1="25"
              x2="32"
              y2="55"
              stroke="#FFF8DC"
              strokeWidth="0.5"
              opacity="0.6"
            />
            {/* Decorative swirl */}
            <path
              d="M15 40 Q5 50 15 60"
              stroke="#FFD700"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="goldGradLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF8DC" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Main Title */}
          <div className="text-center">
            {/* KASHI YATRA */}
            <motion.h1
              className="text-4xl font-black tracking-wider sm:text-5xl md:text-6xl lg:text-7xl"
              style={{
                fontFamily: "var(--font-cinzel-decorative), serif",
                background:
                  "linear-gradient(180deg, #FFF8DC 0%, #FFD700 25%, #DAA520 50%, #B8860B 75%, #8B6914 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter:
                  "drop-shadow(0 4px 8px rgba(0,0,0,0.5)) drop-shadow(0 0 30px rgba(255,215,0,0.4))",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              KASHI YATRA
            </motion.h1>

            {/* Decorative line with lotus */}
            <motion.div
              className="mt-2 flex items-center justify-center gap-2 sm:gap-4"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div
                className="h-[1px] w-12 sm:w-20 md:w-28"
                style={{
                  background: "linear-gradient(90deg, transparent, #FFD700, #DAA520)",
                }}
              />
              <span
                className="text-lg sm:text-xl"
                style={{
                  color: "#FFD700",
                  textShadow: "0 0 15px rgba(255,215,0,0.8)",
                }}
              >
                ✦ 🪷 ✦
              </span>
              <div
                className="h-[1px] w-12 sm:w-20 md:w-28"
                style={{
                  background: "linear-gradient(90deg, #DAA520, #FFD700, transparent)",
                }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="mt-2 text-sm tracking-[0.2em] italic sm:mt-3 sm:text-base sm:tracking-[0.3em] md:text-lg"
              style={{
                fontFamily: "Georgia, serif",
                color: "rgba(255, 248, 220, 0.9)",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              where art comes alive
            </motion.p>
          </div>

          {/* Right Decoration - Stylized Tabla */}
          <motion.svg
            width="60"
            height="80"
            viewBox="0 0 60 80"
            className="hidden sm:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {/* Dayan (right drum) */}
            <ellipse
              cx="20"
              cy="55"
              rx="15"
              ry="8"
              fill="none"
              stroke="url(#goldGradRight)"
              strokeWidth="2"
            />
            <path
              d="M5 55 L5 30 Q20 25 35 30 L35 55"
              fill="none"
              stroke="url(#goldGradRight)"
              strokeWidth="2"
            />
            <ellipse
              cx="20"
              cy="30"
              rx="15"
              ry="6"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
            />
            {/* Syahi (black center) */}
            <circle cx="20" cy="30" r="5" fill="#2a2a2a" stroke="#FFD700" strokeWidth="0.5" />

            {/* Bayan (left drum) - smaller */}
            <ellipse
              cx="45"
              cy="60"
              rx="12"
              ry="6"
              fill="none"
              stroke="url(#goldGradRight)"
              strokeWidth="2"
            />
            <path
              d="M33 60 L33 40 Q45 36 57 40 L57 60"
              fill="none"
              stroke="url(#goldGradRight)"
              strokeWidth="2"
            />
            <ellipse
              cx="45"
              cy="40"
              rx="12"
              ry="5"
              fill="none"
              stroke="#DAA520"
              strokeWidth="1.5"
            />
            {/* Syahi */}
            <circle cx="45" cy="40" r="4" fill="#2a2a2a" stroke="#DAA520" strokeWidth="0.5" />

            {/* Music notes */}
            <text x="10" y="18" fill="#FFD700" fontSize="12" opacity="0.8">
              ♪
            </text>
            <text x="45" y="25" fill="#DAA520" fontSize="10" opacity="0.7">
              ♫
            </text>

            <defs>
              <linearGradient id="goldGradRight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF8DC" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>
      </motion.div>
    </motion.div>
  );
}
