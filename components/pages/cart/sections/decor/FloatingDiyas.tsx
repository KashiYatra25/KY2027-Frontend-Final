"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/components/pages/cart/constants/palette";

/**
 * Small floating diya/lamp animations
 */
export function FloatingDiyas() {
  const diyas = [
    { top: "15%", left: "5%", delay: 0, size: 20 },
    { top: "25%", right: "8%", delay: 1.5, size: 16 },
    { top: "55%", left: "3%", delay: 3, size: 18 },
    { top: "70%", right: "5%", delay: 2, size: 22 },
    { top: "85%", left: "10%", delay: 4, size: 14 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {diyas.map((diya, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: diya.top,
            left: diya.left,
            right: diya.right,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: diya.delay,
          }}
        >
          {/* Diya icon */}
          <svg
            width={diya.size}
            height={diya.size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Flame */}
            <motion.ellipse
              cx="12"
              cy="6"
              rx="3"
              ry="5"
              fill={COLORS.GOLD}
              animate={{
                scaleY: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Inner flame */}
            <ellipse cx="12" cy="7" rx="1.5" ry="2.5" fill="#FFF5E6" opacity={0.8} />
            {/* Diya base */}
            <path
              d="M6 14 C6 12, 8 11, 12 11 C16 11, 18 12, 18 14 L17 18 C17 19, 15 20, 12 20 C9 20, 7 19, 7 18 L6 14Z"
              fill={COLORS.MAROON}
              opacity={0.8}
            />
            {/* Diya rim */}
            <ellipse cx="12" cy="14" rx="6" ry="2" fill={COLORS.GOLD} opacity={0.6} />
          </svg>

          {/* Glow effect */}
          <div
            className="absolute -inset-2 rounded-full blur-md"
            style={{
              background: `radial-gradient(circle, ${COLORS.GOLD}40 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
