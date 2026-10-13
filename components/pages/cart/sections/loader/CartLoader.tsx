"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";
import { COLORS } from "@/components/pages/cart/constants/palette";

/**
 * Cart Loader - Royal themed loading animation for cart page
 * Features animated shopping bag with orbiting sparkles and elegant progress indicator
 */
export function CartLoader() {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center py-16">
      {/* Main loader container */}
      <div className="relative flex flex-col items-center">
        {/* Animated cart icon with rings */}
        <div className="relative h-32 w-32">
          {/* Outer spinning ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: `3px solid transparent`,
              borderTopColor: COLORS.GOLD,
              borderRightColor: `${COLORS.GOLD}50`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Middle ring - counter rotate */}
          <motion.div
            className="absolute inset-3 rounded-full"
            style={{
              border: `2px solid transparent`,
              borderBottomColor: COLORS.BRIGHT_GOLD,
              borderLeftColor: `${COLORS.GOLD}60`,
            }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner glow */}
          <motion.div
            className="absolute inset-6 rounded-full"
            style={{
              background: `radial-gradient(circle, ${COLORS.GOLD}25 0%, transparent 70%)`,
              boxShadow: `0 0 30px ${COLORS.GOLD}30`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Center shopping bag icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                y: [0, -4, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ShoppingBag
                className="h-10 w-10"
                style={{
                  color: COLORS.GOLD,
                  filter: `drop-shadow(0 0 10px ${COLORS.GOLD}60)`,
                }}
                strokeWidth={1.5}
              />
            </motion.div>
          </div>

          {/* Orbiting sparkles */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                marginTop: -6,
                marginLeft: -6,
              }}
              animate={{
                x: [
                  Math.cos((i * Math.PI) / 2) * 52,
                  Math.cos((i * Math.PI) / 2 + Math.PI * 2) * 52,
                ],
                y: [
                  Math.sin((i * Math.PI) / 2) * 52,
                  Math.sin((i * Math.PI) / 2 + Math.PI * 2) * 52,
                ],
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2,
              }}
            >
              <Sparkles
                className="h-3 w-3"
                style={{
                  color: COLORS.BRIGHT_GOLD,
                  filter: `drop-shadow(0 0 4px ${COLORS.GOLD})`,
                }}
              />
            </motion.div>
          ))}

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute h-1 w-1 rounded-full"
              style={{
                background: COLORS.GOLD,
                boxShadow: `0 0 4px ${COLORS.GOLD}`,
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 80],
                y: [0, -60 - Math.random() * 40],
                opacity: [0.8, 0],
                scale: [1, 0.5],
              }}
              transition={{
                duration: 1.5 + Math.random() * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <div className="mt-10 text-center">
          <motion.p
            className="text-base font-light tracking-[0.15em] uppercase"
            style={{ color: COLORS.CREAM }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading Your Cart
          </motion.p>

          {/* Animated dots */}
          <div className="mt-2 flex items-center justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: COLORS.GOLD }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div
            className="mx-auto mt-4 h-0.5 w-40 overflow-hidden rounded-full"
            style={{ background: `${COLORS.GOLD}15` }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${COLORS.GOLD}60, ${COLORS.BRIGHT_GOLD}, ${COLORS.GOLD}60)`,
                width: "40%",
              }}
              animate={{ x: ["-100%", "350%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        {/* Subtle decorative elements */}
        <div className="mt-8 flex items-center justify-center gap-2 opacity-30">
          <div className="h-px w-6" style={{ background: COLORS.GOLD }} />
          <div className="h-1 w-1 rotate-45" style={{ background: COLORS.GOLD }} />
          <div className="h-1.5 w-1.5 rotate-45" style={{ background: COLORS.GOLD }} />
          <div className="h-1 w-1 rotate-45" style={{ background: COLORS.GOLD }} />
          <div className="h-px w-6" style={{ background: COLORS.GOLD }} />
        </div>
      </div>
    </div>
  );
}
