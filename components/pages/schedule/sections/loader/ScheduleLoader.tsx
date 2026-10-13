"use client";

import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// SCHEDULE PAGE LOADER
// Ethereal, mystical loader inspired by Banaras/Kashi aesthetics
// Features: floating diyas (lamps), gentle glow effects, sacred geometry
// ═══════════════════════════════════════════════════════════════════

export function ScheduleLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Main container with sacred geometry */}
      <div className="relative h-40 w-40">
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(240,181,74,0.15) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Rotating sacred circle - outer */}
        <motion.div
          className="absolute inset-2 rounded-full border border-[#D4A853]/30"
          style={{
            boxShadow: "0 0 20px rgba(212,168,83,0.2), inset 0 0 20px rgba(212,168,83,0.1)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Rotating sacred circle - middle */}
        <motion.div
          className="absolute inset-6 rounded-full border border-[#f3e6c8]/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner glowing orb */}
        <motion.div
          className="absolute inset-10 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(240,181,74,0.4) 0%, rgba(212,168,83,0.1) 50%, transparent 70%)",
            boxShadow: "0 0 40px rgba(240,181,74,0.3), 0 0 60px rgba(212,168,83,0.2)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating diya flames - positioned around the circle */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: `rotate(${angle}deg) translateY(-56px)`,
            }}
          >
            <motion.div
              className="relative -translate-x-1/2"
              animate={{
                y: [0, -3, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            >
              {/* Flame */}
              <div
                className="h-3 w-2 rounded-full"
                style={{
                  background: "linear-gradient(to top, #f0b54a, #ff9a2a, #fff6d8)",
                  boxShadow: "0 0 8px #f0b54a, 0 0 16px rgba(240,181,74,0.5)",
                  filter: "blur(0.5px)",
                }}
              />
              {/* Tiny diya base */}
              <div
                className="mx-auto h-1 w-2.5 rounded-b-full"
                style={{
                  background: "linear-gradient(to bottom, #8B4513, #654321)",
                }}
              />
            </motion.div>
          </motion.div>
        ))}

        {/* Center Om symbol or decorative element */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className="font-[family-name:var(--font-cinzel)] text-2xl"
            style={{
              color: "#D4A853",
              textShadow: "0 0 20px rgba(212,168,83,0.6)",
            }}
          >
            ॐ
          </span>
        </motion.div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute h-1 w-1 rounded-full bg-[#D4A853]/60"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, (i % 2 === 0 ? 1 : -1) * 10, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.p
          className="font-[family-name:var(--font-cinzel)] text-sm font-medium tracking-[0.3em] text-[#D4A853] uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Preparing Your Journey
        </motion.p>
        <motion.p
          className="mt-2 font-[family-name:var(--font-cormorant)] text-xs tracking-[0.15em] text-[#f3e6c8]/50"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          काशी यात्रा २०२७
        </motion.p>
      </motion.div>
    </div>
  );
}
