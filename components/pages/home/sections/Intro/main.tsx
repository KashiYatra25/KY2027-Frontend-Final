"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAnimationPolicy } from "@/hooks";
import { useIntro } from "./context/IntroContext";
import {
  StageBackground,
  FloatingElements,
  CursorTrail,
  EnterButton,
  BlastEffect,
  CountdownPoster,
  FirePot,
  NavigationDrawer,
} from "./sections";
import "./styles/cursor.css";

export function IntroSection() {
  const { phase, isIntroComplete } = useIntro();

  if (isIntroComplete) return null;

  const cursorClass = phase === "loading" ? "intro-cursor-loading" : "intro-cursor";

  return (
    <section className={`relative h-screen w-full overflow-hidden bg-black ${cursorClass}`}>
      {/* Cursor trail effect */}
      <CursorTrail />

      {/* Stage background with zoom effect */}
      <StageBackground />

      {/* Countdown concert poster - shows after blast (replaces the old video) */}
      <CountdownPoster />

      {/* Audio-reactive fire pot - shows during video phase */}
      <FirePot />

      {/* Blast effect overlay */}
      <BlastEffect />

      {/* Enter button with floating elements */}
      <AnimatePresence>
        {(phase === "idle" || phase === "loading") && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
          >
            {/* Floating diamond elements */}
            <FloatingElements />

            {/* Enter button - moved down slightly */}
            <div className="mt-16">
              <EnterButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hold to enter hint at bottom */}
      <AnimatePresence>{phase === "idle" && <HoldHint />}</AnimatePresence>

      {/* Skip button - only during idle and loading */}
      <AnimatePresence>
        {(phase === "idle" || phase === "loading") && <SkipButton />}
      </AnimatePresence>

      {/* Navigation drawer - shows during video phase */}
      <NavigationDrawer />
    </section>
  );
}

function HoldHint() {
  return (
    <motion.div
      className="absolute bottom-20 left-1/2 z-20 hidden -translate-x-1/2 sm:block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 1.5 }}
    >
      <p
        className="text-sm font-light tracking-[0.3em] text-white/80"
        style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}
      >
        HOLD TO ENTER
      </p>

      <motion.div
        className="mt-2 flex justify-center"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 15 L10 5 M6 9 L10 5 L14 9"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function SkipButton() {
  const { skipIntro } = useIntro();

  return (
    <motion.button
      onClick={skipIntro}
      className="absolute right-8 bottom-8 z-30 cursor-pointer rounded-full border border-white/20 px-4 py-2 text-sm text-white/50 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 2 }}
    >
      Skip Intro
    </motion.button>
  );
}
