"use client";

import { motion } from "framer-motion";

const COLORS = {
  BG_DEEP: "#0a0612",
  GOLD: "#d4a853",
  GOLD_LIGHT: "#FFD700",
  AMBER: "#FFA500",
  CREAM: "#fdf6e3",
};

export function VerifyLoader() {
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

          {/* Shield/verify icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                stroke={COLORS.GOLD_LIGHT}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <motion.path
                d="M9 12l2 2 4-4"
                stroke={COLORS.GOLD}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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
            Verifying
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

          <p className="mt-3 text-xs" style={{ color: `${COLORS.CREAM}50` }}>
            Extracting details from your Aadhaar
          </p>
        </div>
      </div>
    </div>
  );
}
