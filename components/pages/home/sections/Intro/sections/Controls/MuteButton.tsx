"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useIntro } from "@/components/pages/home/sections/Intro/context/IntroContext";
import { useAnimationPolicy } from "@/hooks";

/**
 * Mute button for intro audio
 * Shows in bottom right corner during loading, blasting, and video phases
 */
export function MuteButton() {
  const { phase, isMuted, toggleMute } = useIntro();

  // Only show when audio is potentially playing
  const showButton = phase === "loading" || phase === "blasting" || phase === "video";

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          onClick={toggleMute}
          className="fixed right-8 bottom-8 z-50 cursor-pointer rounded-full p-3 backdrop-blur-sm transition-colors"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            border: "1px solid rgba(255, 200, 100, 0.3)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1, borderColor: "rgba(255, 200, 100, 0.6)" }}
          whileTap={{ scale: 0.95 }}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5 text-white/70" />
          ) : (
            <Volume2 className="h-5 w-5 text-amber-400" />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
