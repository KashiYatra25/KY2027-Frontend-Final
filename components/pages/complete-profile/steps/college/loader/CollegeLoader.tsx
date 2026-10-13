"use client";

import { motion } from "framer-motion";

const COLORS = {
  BG_DEEP: "#0a0612",
  GOLD: "#d4a853",
  GOLD_LIGHT: "#FFD700",
  AMBER: "#FFA500",
  CREAM: "#fdf6e3",
};

export function CollegeLoader() {
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

          {/* Graduation cap icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <defs>
                <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={COLORS.CREAM} />
                  <stop offset="50%" stopColor={COLORS.GOLD_LIGHT} />
                  <stop offset="100%" stopColor={COLORS.GOLD} />
                </linearGradient>
              </defs>
              {/* Graduation cap */}
              <path
                d="M12 3L1 9L12 15L23 9L12 3Z"
                stroke="url(#capGrad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path d="M12 15V21" stroke="url(#capGrad)" strokeWidth="1.5" strokeLinecap="round" />
              <path
                d="M5 11V17C5 17 8 20 12 20C16 20 19 17 19 17V11"
                stroke="url(#capGrad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Tassel */}
              <motion.path
                d="M21 9V14"
                stroke={COLORS.GOLD_LIGHT}
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                  x: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.circle
                cx="21"
                cy="15"
                r="1"
                fill={COLORS.GOLD_LIGHT}
                animate={{
                  x: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.svg>
          </div>

          {/* Orbiting dots */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{
                background: COLORS.GOLD_LIGHT,
                boxShadow: `0 0 6px ${COLORS.GOLD}`,
                top: "50%",
                left: "50%",
                marginTop: -3,
                marginLeft: -3,
              }}
              animate={{
                x: [
                  Math.cos((i * Math.PI * 2) / 3) * 40,
                  Math.cos((i * Math.PI * 2) / 3 + Math.PI * 2) * 40,
                ],
                y: [
                  Math.sin((i * Math.PI * 2) / 3) * 40,
                  Math.sin((i * Math.PI * 2) / 3 + Math.PI * 2) * 40,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2,
              }}
            />
          ))}
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
            Updating College
          </motion.p>

          {/* Progress bar */}
          <div
            className="mx-auto mt-4 h-0.5 w-36 overflow-hidden rounded-full"
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
