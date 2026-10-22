"use client";

import { motion } from "framer-motion";
import { useMotionZone } from "@/lib/motion/MotionZone";
import { useAnimationPolicy } from "@/hooks";

// Spotlight Cones - Desktop only
export function Spotlights() {
  const { isAnimating } = useMotionZone();
  const { isMobile } = useAnimationPolicy();

  if (!isAnimating || isMobile) return null;

  return (
    <div className="pointer-events-none absolute top-0 right-0 left-0 h-full overflow-hidden">
      {/* Left spotlight */}
      <motion.div
        className="absolute top-0"
        style={{
          left: "5%",
          width: "100px",
          height: "100%",
          background: "linear-gradient(to bottom, #EC489933 0%, transparent 60%)",
          clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
          transformOrigin: "top center",
        }}
        animate={{
          rotate: [-15, 15, -15],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Right spotlight */}
      <motion.div
        className="absolute top-0"
        style={{
          left: "85%",
          width: "100px",
          height: "100%",
          background: "linear-gradient(to bottom, #8B5CF633 0%, transparent 60%)",
          clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
          transformOrigin: "top center",
        }}
        animate={{
          rotate: [15, -15, 15],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 0.5,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
