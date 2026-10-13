"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PartyPopper, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { COLORS } from "./constants/palette";

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const WELCOME_SHOWN_KEY = "ky_profile_welcome_shown";

// ═══════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

export function hasWelcomeBeenShown(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(WELCOME_SHOWN_KEY) === "true";
}

export function markWelcomeAsShown(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(WELCOME_SHOWN_KEY, "true");
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function CongratulationsPage() {
  const router = useRouter();

  // Fire confetti on mount
  useEffect(() => {
    // Mark welcome as shown
    markWelcomeAsShown();

    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#d4a853", "#ffd700", "#b8860b", "#fff"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#d4a853", "#ffd700", "#b8860b", "#fff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleContinue = () => {
    router.push("/profile");
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative mb-8"
      >
        <div
          className="flex h-28 w-28 items-center justify-center rounded-full"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD}30 0%, ${COLORS.GOLD_DARK}20 100%)`,
            border: `2px solid ${COLORS.GOLD}50`,
            boxShadow: `0 0 60px ${COLORS.GOLD}30`,
          }}
        >
          <PartyPopper className="h-14 w-14" style={{ color: COLORS.GOLD }} />
        </div>

        {/* Floating sparkles */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="h-6 w-6" style={{ color: COLORS.GOLD }} />
        </motion.div>
        <motion.div
          className="absolute -bottom-1 -left-3"
          animate={{ y: [5, -5, 5], rotate: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Sparkles className="h-5 w-5" style={{ color: COLORS.GOLD_LIGHT }} />
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-4 text-4xl font-bold sm:text-5xl"
        style={{
          background: `linear-gradient(135deg, ${COLORS.CREAM} 0%, ${COLORS.GOLD} 50%, ${COLORS.GOLD_LIGHT} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Congratulations! 🎉
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8 max-w-md text-lg"
        style={{ color: `${COLORS.CREAM}80` }}
      >
        Your profile is now complete! You&apos;re all set to explore the full Kashi Yatra
        experience.
      </motion.p>

      {/* Completion badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-10 flex flex-wrap justify-center gap-3"
      >
        {["Identity Verified", "College Added", "Phone Verified"].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-full px-4 py-2"
            style={{
              background: `${COLORS.SUCCESS}15`,
              border: `1px solid ${COLORS.SUCCESS}40`,
            }}
          >
            <CheckCircle2 className="h-4 w-4" style={{ color: COLORS.SUCCESS }} />
            <span className="text-sm font-medium" style={{ color: COLORS.SUCCESS }}>
              {item}
            </span>
          </div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={handleContinue}
        className="group flex items-center gap-3 rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`,
          color: COLORS.BG_DEEP,
          boxShadow: `0 10px 40px ${COLORS.GOLD}30`,
        }}
      >
        Go to My Profile
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </motion.button>

      {/* Decorative text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-sm"
        style={{ color: `${COLORS.CREAM}40` }}
      >
        Welcome to the Kashi Yatra family!
      </motion.p>
    </div>
  );
}
