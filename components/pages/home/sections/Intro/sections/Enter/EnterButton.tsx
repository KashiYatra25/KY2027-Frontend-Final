"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useCallback, useState } from "react";
import { useIntro } from "@/components/pages/home/sections/Intro/context/IntroContext";
import { useAnimationPolicy } from "@/hooks";

const HOLD_DURATION = 3500; // 3.5 seconds

export function EnterButton() {
  const {
    phase,
    loadProgress,
    startLoading,
    cancelLoading,
    startBlast,
    setLoadProgress,
    skipIntro,
  } = useIntro();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { isMobile } = useAnimationPolicy();

  const handleMouseDown = useCallback(() => {
    if (phase !== "idle") return;

    startLoading();

    const startTime = Date.now();
    // MOBILE: 80ms interval, DESKTOP: 50ms
    const interval = isMobile ? 80 : 50;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setLoadProgress(progress);

      if (progress >= 100) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        startBlast();
      }
    }, interval);
  }, [phase, startLoading, setLoadProgress, startBlast, isMobile]);

  const handleMouseUp = useCallback(() => {
    if (phase !== "loading") return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    cancelLoading();
  }, [phase, cancelLoading]);

  // Mobile: Direct click triggers blast (no hold required)
  const handleMobileClick = useCallback(() => {
    if (phase !== "idle") return;
    startBlast();
  }, [phase, startBlast]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const isLoading = phase === "loading";
  const intensity = loadProgress / 100;
  const circumference = 2 * Math.PI * 58;
  const strokeDashoffset = circumference - (loadProgress / 100) * circumference;

  const [isHovered, setIsHovered] = useState(false);

  // MOBILE: Simple click-to-enter version (no hold, no audio)
  if (isMobile) {
    return (
      <motion.div
        className="relative cursor-pointer select-none"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onClick={handleMobileClick}
      >
        {/* Simple glow */}
        <div
          className="absolute rounded-full"
          style={{
            inset: -15,
            background: "radial-gradient(circle, rgba(255, 200, 100, 0.25) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        {/* Main SVG Button */}
        <svg width="130" height="130" viewBox="0 0 140 140" className="relative z-10">
          <defs>
            <linearGradient id="progressGoldM" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FF8C00" />
            </linearGradient>

            <linearGradient id="textGoldM" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF8DC" />
              <stop offset="100%" stopColor="#DAA520" />
            </linearGradient>
          </defs>

          {/* Background track */}
          <circle
            cx="70"
            cy="70"
            r="58"
            fill="none"
            stroke="rgba(255, 200, 100, 0.2)"
            strokeWidth="2"
          />

          {/* Full progress circle (always complete) */}
          <circle
            cx="70"
            cy="70"
            r="58"
            fill="none"
            stroke="url(#progressGoldM)"
            strokeWidth="2"
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
          />

          {/* Inner circle */}
          <circle
            cx="70"
            cy="70"
            r="50"
            fill="rgba(20, 15, 40, 0.9)"
            stroke="rgba(255, 200, 100, 0.4)"
            strokeWidth="1"
          />

          {/* Text - Just "ENTER" */}
          <text
            x="70"
            y="70"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="url(#textGoldM)"
            fontSize="15"
            fontWeight="400"
            letterSpacing="4"
            style={{ fontFamily: "inherit" }}
          >
            ENTER
          </text>
        </svg>
      </motion.div>
    );
  }

  // DESKTOP: Full animated version
  return (
    <motion.div
      className="relative cursor-pointer select-none"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        handleMouseUp();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Hover glow effect */}
      {isHovered && !isLoading && (
        <motion.div
          className="pointer-events-none absolute rounded-full"
          style={{
            inset: -35,
            background: "radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%)",
            filter: "blur(15px)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Outer glow aura */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: -25,
          background: `radial-gradient(circle, rgba(255, 200, 100, ${isLoading ? 0.25 + intensity * 0.3 : 0.15}) 0%, transparent 70%)`,
          filter: "blur(12px)",
        }}
        animate={{
          scale: isLoading ? [1, 1.3, 1] : [1, 1.15, 1],
          opacity: isLoading ? [0.6, 1, 0.6] : [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: isLoading ? 0.4 : 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Pulsing emission rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`pulse-${i}`}
          className="pointer-events-none absolute rounded-full"
          style={{
            inset: 0,
            border: `${isLoading ? 2.5 : 2}px solid rgba(255, 200, 100, ${isLoading ? 0.6 - i * 0.15 : 0.4 - i * 0.1})`,
            boxShadow: `0 0 ${isLoading ? 15 : 10}px rgba(255, 200, 100, ${isLoading ? 0.5 - i * 0.12 : 0.35 - i * 0.08})`,
          }}
          animate={{
            scale: [1, isLoading ? 2.5 : 2],
            opacity: [isLoading ? 0.6 : 0.45, 0],
          }}
          transition={{
            duration: isLoading ? 0.9 : 2,
            repeat: Infinity,
            delay: i * (isLoading ? 0.3 : 0.6),
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      ))}

      {/* Main SVG Button */}
      <svg width="140" height="140" viewBox="0 0 140 140" className="relative z-10">
        <defs>
          <linearGradient id="progressGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>

          <linearGradient id="textGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF8DC" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#DAA520" />
          </linearGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="innerBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(30, 25, 50, 0.85)" />
            <stop offset="100%" stopColor="rgba(15, 12, 30, 0.92)" />
          </radialGradient>
        </defs>

        {/* Background track */}
        <circle
          cx="70"
          cy="70"
          r="58"
          fill="none"
          stroke="rgba(255, 200, 100, 0.18)"
          strokeWidth="2.5"
        />

        {/* Progress circle */}
        <circle
          cx="70"
          cy="70"
          r="58"
          fill="none"
          stroke="url(#progressGold)"
          strokeWidth={isLoading ? 4 : 2.5}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 70 70)"
          filter="url(#softGlow)"
        />

        {/* Inner circle */}
        <circle
          cx="70"
          cy="70"
          r="50"
          fill="url(#innerBg)"
          stroke="rgba(255, 200, 100, 0.45)"
          strokeWidth="1.5"
        />

        {/* Rotating shimmer */}
        <motion.circle
          cx="70"
          cy="70"
          r="50"
          fill="none"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="1.5"
          strokeDasharray="20 75"
          strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: isLoading ? 2 : 8, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "70px 70px" }}
        />

        {/* Text */}
        <text
          x="70"
          y={isLoading ? "65" : "70"}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="url(#textGold)"
          fontSize="16"
          fontWeight="400"
          letterSpacing="5"
          filter="url(#softGlow)"
          style={{ fontFamily: "inherit" }}
        >
          {isLoading ? "HOLD" : "ENTER"}
        </text>

        {/* Loading percentage */}
        {isLoading && (
          <text
            x="70"
            y="88"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(255, 200, 100, 0.85)"
            fontSize="12"
            fontWeight="300"
            style={{ fontFamily: "inherit" }}
          >
            {Math.round(loadProgress)}%
          </text>
        )}
      </svg>

      {/* Sparkle dots */}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const radian = (angle * Math.PI) / 180;
        const radius = 80;
        // Round so server (Node) and client trig results serialize identically
        const x = Math.round(Math.cos(radian) * radius * 100) / 100;
        const y = Math.round(Math.sin(radian) * radius * 100) / 100;

        return (
          <motion.div
            key={`dot-${angle}`}
            className="absolute rounded-full bg-amber-400"
            style={{
              width: 5,
              height: 5,
              left: `calc(50% + ${x}px - 2.5px)`,
              top: `calc(50% + ${y}px - 2.5px)`,
              boxShadow: `0 0 ${isLoading ? 8 + intensity * 6 : 5}px ${isLoading ? 3 + intensity * 3 : 2}px rgba(255, 200, 100, ${isLoading ? 0.7 : 0.4})`,
            }}
            animate={{
              scale: isLoading ? [1, 1.6, 1] : [0.85, 1.15, 0.85],
              opacity: isLoading ? [0.7, 1, 0.7] : [0.4, 0.65, 0.4],
            }}
            transition={{
              duration: isLoading ? 0.35 : 2,
              repeat: Infinity,
              delay: angle / 500,
            }}
          />
        );
      })}

      {/* Emission particles */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const radian = (angle * Math.PI) / 180;
        const distance = isLoading ? 60 + intensity * 40 : 45;
        return (
          <motion.div
            key={`emit-${angle}`}
            className="pointer-events-none absolute rounded-full"
            style={{
              width: isLoading ? 4 : 3,
              height: isLoading ? 4 : 3,
              left: 70,
              top: 70,
              background: "#FFD700",
              boxShadow: `0 0 ${isLoading ? 8 : 5}px ${isLoading ? 3 : 2}px rgba(255, 200, 100, ${isLoading ? 0.8 : 0.5})`,
            }}
            animate={{
              x: [0, Math.cos(radian) * distance],
              y: [0, Math.sin(radian) * distance],
              opacity: [isLoading ? 1 : 0.6, 0],
              scale: [1, isLoading ? 0.3 : 0.4],
            }}
            transition={{
              duration: isLoading ? 0.7 : 1.8,
              repeat: Infinity,
              delay: (angle / 360) * (isLoading ? 0.7 : 1.8),
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        );
      })}
    </motion.div>
  );
}
