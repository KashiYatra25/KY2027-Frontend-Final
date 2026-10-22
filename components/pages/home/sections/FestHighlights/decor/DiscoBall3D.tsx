"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMotionZone } from "@/lib/motion/MotionZone";
import { useAnimationPolicy } from "@/hooks";
import { DiscoBallModel } from "./DiscoBallModel";

// 3D Disco Ball with Canvas - skips rendering on mobile for performance
export function DiscoBall3D() {
  const { isMobile } = useAnimationPolicy();
  const { isAnimating } = useMotionZone();

  // Don't render the heavy 3D canvas on mobile at all
  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      className="relative mx-auto h-36 w-36 sm:h-44 sm:w-44"
      initial={{ y: -200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 12,
        delay: 0.2,
      }}
    >
      {/* Hanging wire */}
      <div
        className="absolute top-0 left-1/2 -mt-12 h-12 w-[1px] -translate-x-1/2 bg-gradient-to-b from-gray-600 to-gray-400"
        style={{ zIndex: 30 }}
      />

      {/* LASER BEAMS emitting from ball center - only render when animating */}
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 5 }}>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: "300px",
                height: "2px",
                background: `linear-gradient(90deg, transparent 0%, ${
                  ["#EC4899", "#8B5CF6", "#06B6D4", "#F59E0B", "#10B981", "#A855F7"][i % 6]
                } 10%, ${
                  ["#EC4899", "#8B5CF6", "#06B6D4", "#F59E0B", "#10B981", "#A855F7"][i % 6]
                }80 50%, transparent 100%)`,
                transformOrigin: "center center",
                transform: `rotate(${i * 30}deg)`,
              }}
              animate={{
                opacity: [0.1, 0.7, 0.1],
                scaleX: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2 + (i % 3) * 0.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Rotating laser beams - only render when animating */}
      {isAnimating && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 5 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={`rot-${i}`}
              className="absolute"
              style={{
                width: "350px",
                height: "3px",
                background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 5%, ${
                  ["#EC4899", "#8B5CF6", "#06B6D4"][i % 3]
                } 20%, transparent 100%)`,
                transformOrigin: "center center",
                transform: `rotate(${i * 60}deg)`,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Static glow behind ball - no animation, just gradient */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          zIndex: 10,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(139,92,246,0.5) 30%, rgba(236,72,153,0.3) 60%, transparent 70%)",
          transform: "scale(1.3)",
          opacity: isAnimating ? 0.7 : 0.4,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* 3D Canvas - ONLY RENDER WHEN IN VIEWPORT */}
      {isAnimating && (
        <div className="relative h-full w-full" style={{ zIndex: 20 }}>
          <Canvas
            camera={{ position: [0, 0, 4], fov: 50 }}
            style={{ background: "transparent" }}
            frameloop="demand"
            dpr={1}
            gl={{
              antialias: false,
              powerPreference: "low-power",
              alpha: true,
            }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={3} />
              <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
              <directionalLight position={[-5, -5, 5]} intensity={1.5} color="#ffffff" />

              <DiscoBallModel />
              <Environment preset="sunset" />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Static fallback when not animating */}
      {!isAnimating && (
        <div
          className="relative h-full w-full rounded-full"
          style={{
            zIndex: 20,
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), rgba(139,92,246,0.4) 50%, rgba(100,70,150,0.6))",
            boxShadow: "inset 0 0 30px rgba(255,255,255,0.2), 0 0 40px rgba(139,92,246,0.5)",
          }}
        />
      )}

      {/* Static glow underneath */}
      <div
        className="absolute -bottom-8 left-1/2 h-16 w-48 -translate-x-1/2"
        style={{
          zIndex: 15,
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.3) 0%, rgba(139,92,246,0.5) 30%, rgba(236,72,153,0.3) 60%, transparent 80%)",
          opacity: isAnimating ? 0.7 : 0.4,
          filter: "blur(16px)",
          transition: "opacity 0.3s ease",
        }}
      />
    </motion.div>
  );
}
