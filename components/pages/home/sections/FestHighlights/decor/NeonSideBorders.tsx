"use client";

import { motion } from "framer-motion";
import { useMotionZone } from "@/lib/motion/MotionZone";
import { useAnimationPolicy } from "@/hooks";

// Neon Side Borders - Desktop only
export function NeonSideBorders() {
  const { isAnimating } = useMotionZone();
  const { isMobile } = useAnimationPolicy();

  if (!isAnimating || isMobile) return null;

  return (
    <>
      {/* Left Border */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-4 hidden lg:block xl:left-8"
        style={{ zIndex: 5 }}
      >
        {/* Main gradient bar */}
        <motion.div
          className="absolute top-[10%] bottom-[25%] left-0 w-1"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, #EC4899 15%, #8B5CF6 40%, #06B6D4 60%, #8B5CF6 85%, transparent 100%)",
            boxShadow: "0 0 20px #8B5CF6, 0 0 40px #8B5CF680, 0 0 60px #EC489940",
            borderRadius: "2px",
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            boxShadow: [
              "0 0 20px #8B5CF6, 0 0 40px #8B5CF680, 0 0 60px #EC489940",
              "0 0 30px #EC4899, 0 0 60px #8B5CF6, 0 0 80px #06B6D450",
              "0 0 20px #8B5CF6, 0 0 40px #8B5CF680, 0 0 60px #EC489940",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Outer glow line */}
        <motion.div
          className="absolute top-[10%] bottom-[25%] left-[-4px] w-2"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, #EC489950 15%, #8B5CF650 40%, #06B6D450 60%, #8B5CF650 85%, transparent 100%)",
            filter: "blur(8px)",
            borderRadius: "4px",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Pulsing light nodes along the bar */}
        {[15, 30, 45, 60, 75].map((pos, i) => (
          <motion.div
            key={`left-node-${i}`}
            className="absolute left-[-3px] h-3 w-3 rounded-full"
            style={{
              top: `${pos}%`,
              background: ["#EC4899", "#8B5CF6", "#06B6D4", "#8B5CF6", "#EC4899"][i],
              boxShadow: `0 0 15px ${["#EC4899", "#8B5CF6", "#06B6D4", "#8B5CF6", "#EC4899"][i]}, 0 0 30px ${["#EC4899", "#8B5CF6", "#06B6D4", "#8B5CF6", "#EC4899"][i]}80`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Traveling light effect */}
        <motion.div
          className="absolute left-[-1px] h-16 w-2 rounded-full"
          style={{
            background: "linear-gradient(180deg, transparent, #fff, transparent)",
            filter: "blur(2px)",
          }}
          animate={{
            top: ["10%", "70%", "10%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Vertical Text - "LIVE" */}
        <motion.div
          className="absolute top-[30%] left-6 flex flex-col gap-2"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span
            className="rotate-180 text-3xl font-black tracking-[0.2em] xl:text-4xl"
            style={{
              background: "linear-gradient(180deg, #EC4899, #8B5CF6, #06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 20px #EC489980) drop-shadow(0 0 40px #8B5CF650)",
            }}
          >
            LIVE
          </span>
        </motion.div>
      </div>

      {/* Right Border */}
      <div
        className="pointer-events-none absolute top-0 right-4 bottom-0 hidden lg:block xl:right-8"
        style={{ zIndex: 5 }}
      >
        {/* Main gradient bar */}
        <motion.div
          className="absolute top-[10%] right-0 bottom-[25%] w-1"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, #06B6D4 15%, #8B5CF6 40%, #EC4899 60%, #8B5CF6 85%, transparent 100%)",
            boxShadow: "0 0 20px #8B5CF6, 0 0 40px #8B5CF680, 0 0 60px #06B6D440",
            borderRadius: "2px",
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            boxShadow: [
              "0 0 20px #8B5CF6, 0 0 40px #8B5CF680, 0 0 60px #06B6D440",
              "0 0 30px #06B6D4, 0 0 60px #8B5CF6, 0 0 80px #EC489950",
              "0 0 20px #8B5CF6, 0 0 40px #8B5CF680, 0 0 60px #06B6D440",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />

        {/* Outer glow line */}
        <motion.div
          className="absolute top-[10%] right-[-4px] bottom-[25%] w-2"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, #06B6D450 15%, #8B5CF650 40%, #EC489950 60%, #8B5CF650 85%, transparent 100%)",
            filter: "blur(8px)",
            borderRadius: "4px",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Pulsing light nodes along the bar */}
        {[15, 30, 45, 60, 75].map((pos, i) => (
          <motion.div
            key={`right-node-${i}`}
            className="absolute right-[-3px] h-3 w-3 rounded-full"
            style={{
              top: `${pos}%`,
              background: ["#06B6D4", "#8B5CF6", "#EC4899", "#8B5CF6", "#06B6D4"][i],
              boxShadow: `0 0 15px ${["#06B6D4", "#8B5CF6", "#EC4899", "#8B5CF6", "#06B6D4"][i]}, 0 0 30px ${["#06B6D4", "#8B5CF6", "#EC4899", "#8B5CF6", "#06B6D4"][i]}80`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3 + 0.15,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Traveling light effect */}
        <motion.div
          className="absolute right-[-1px] h-16 w-2 rounded-full"
          style={{
            background: "linear-gradient(180deg, transparent, #fff, transparent)",
            filter: "blur(2px)",
          }}
          animate={{
            top: ["70%", "10%", "70%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating Vertical Text - "CONCERT" */}
        <motion.div
          className="absolute top-[30%] right-6 flex flex-col gap-2"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          animate={{
            y: [0, 15, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <span
            className="text-3xl font-black tracking-[0.2em] xl:text-4xl"
            style={{
              background: "linear-gradient(180deg, #06B6D4, #8B5CF6, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 20px #06B6D480) drop-shadow(0 0 40px #8B5CF650)",
            }}
          >
            CONCERT
          </span>
        </motion.div>
      </div>
    </>
  );
}
