"use client";

import { motion } from "framer-motion";

const COLORS = {
  BG_DEEP: "#0a0612",
  GOLD: "#d4a853",
  GOLD_LIGHT: "#FFD700",
  AMBER: "#FFA500",
  CREAM: "#fdf6e3",
};

export function UploadLoader() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Main loader */}
        <div className="relative h-24 w-24">
          {/* Outer spinning ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: `3px solid transparent`,
              borderTopColor: COLORS.GOLD_LIGHT,
              borderRightColor: COLORS.GOLD,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Middle ring */}
          <motion.div
            className="absolute inset-3 rounded-full"
            style={{
              border: `2px solid transparent`,
              borderBottomColor: COLORS.AMBER,
              borderLeftColor: COLORS.GOLD,
            }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner pulsing circle */}
          <motion.div
            className="absolute inset-6 rounded-full"
            style={{
              background: `radial-gradient(circle, ${COLORS.GOLD}30 0%, transparent 70%)`,
              boxShadow: `0 0 20px ${COLORS.GOLD}40`,
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Upload icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              animate={{
                y: [0, -4, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                d="M12 16V4M12 4L8 8M12 4L16 8"
                stroke={COLORS.GOLD_LIGHT}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 16V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V16"
                stroke={COLORS.GOLD}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </motion.svg>
          </div>
        </div>

        {/* Loading text */}
        <div className="mt-8 text-center">
          <motion.p
            className="text-base font-light tracking-[0.2em] uppercase"
            style={{ color: COLORS.CREAM }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Uploading
          </motion.p>

          {/* Progress bar */}
          <div
            className="mx-auto mt-4 h-0.5 w-32 overflow-hidden rounded-full"
            style={{ background: `${COLORS.GOLD}20` }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${COLORS.GOLD}, ${COLORS.GOLD_LIGHT}, ${COLORS.GOLD})`,
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
