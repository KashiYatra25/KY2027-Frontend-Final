"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useIntro } from "@/components/pages/home/sections/Intro/context/IntroContext";
import { useAnimationPolicy } from "@/hooks";

export function ContinueButton() {
  const { phase, completeIntro } = useIntro();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/click.mp3");
      audioRef.current.volume = 0.5;
    }
  }, []);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    completeIntro();
  };

  if (phase !== "video") return null;

  return (
    <motion.div
      className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
    >
      <motion.button
        onClick={handleClick}
        className="group relative cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute inset-[-15px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 200, 100, 0.2) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* SVG Button - BIGGER */}
        <svg width="260" height="70" viewBox="0 0 260 70" className="relative">
          {/* Decorative corners */}
          <defs>
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#DAA520" />
            </linearGradient>

            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(40, 30, 50, 0.9)" />
              <stop offset="100%" stopColor="rgba(20, 15, 30, 0.95)" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main shape - ornate border */}
          <path
            d="M25 5 L235 5 Q255 5 255 25 L255 45 Q255 65 235 65 L25 65 Q5 65 5 45 L5 25 Q5 5 25 5"
            fill="url(#bgGradient)"
            stroke="url(#borderGradient)"
            strokeWidth="1.5"
            filter="url(#glow)"
          />

          {/* Corner ornaments - top left */}
          <path
            d="M12 18 L12 12 L18 12"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Corner ornaments - top right */}
          <path
            d="M248 18 L248 12 L242 12"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Corner ornaments - bottom left */}
          <path
            d="M12 52 L12 58 L18 58"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Corner ornaments - bottom right */}
          <path
            d="M248 52 L248 58 L242 58"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Decorative dots */}
          <circle cx="32" cy="35" r="2" fill="#DAA520" opacity="0.6" />
          <circle cx="228" cy="35" r="2" fill="#DAA520" opacity="0.6" />

          {/* Text */}
          <text
            x="130"
            y="38"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#FFE4B5"
            fontSize="16"
            fontWeight="400"
            letterSpacing="4"
            style={{ fontFamily: "inherit" }}
          >
            ENTER KASHI
          </text>

          {/* Arrow icon */}
          <motion.g
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M205 35 L215 35 M211 30 L216 35 L211 40"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>
        </svg>

        {/* Shimmer effect on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent)",
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.button>
    </motion.div>
  );
}
