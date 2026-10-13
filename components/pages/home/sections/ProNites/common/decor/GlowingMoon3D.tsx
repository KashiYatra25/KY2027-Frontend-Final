"use client";

import { memo, useRef, Suspense } from "react";
import Image from "next/image";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { IMAGES } from "@/lib/images";
import { useAnimationPolicy } from "@/hooks";
import { useMotionZone } from "@/lib/motion";

// ═══════════════════════════════════════════════════════════════════
// 3D MOON MODEL COMPONENT
// ═══════════════════════════════════════════════════════════════════

function MoonModel() {
  const { scene } = useGLTF("/models/Moon.glb");
  const groupRef = useRef<THREE.Group>(null);
  const { isAnimating } = useMotionZone();
  const { invalidate } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      if (isAnimating) {
        // Slow rotation for moon
        groupRef.current.rotation.y += 0.001;
      }
      invalidate();
    }
  });

  // Scale for the moon model
  return <primitive ref={groupRef} object={scene} scale={0.012} position={[0, 0, 0]} />;
}

// Preload the moon model
useGLTF.preload("/models/Moon.glb");

// ═══════════════════════════════════════════════════════════════════
// 3D MOON WITH CANVAS
// ═══════════════════════════════════════════════════════════════════

function Moon3DCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 50 }}
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
        {/* Soft ambient light for overall illumination */}
        <ambientLight intensity={1.5} />
        {/* Main directional light - simulating sun from top-left */}
        <directionalLight position={[-5, 3, 5]} intensity={2} color="#fffaf0" />
        {/* Rim light for glow effect */}
        <directionalLight position={[3, 0, -3]} intensity={0.5} color="#b0c4de" />

        <MoonModel />
      </Suspense>
    </Canvas>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FALLBACK STATIC MOON (for mobile)
// ═══════════════════════════════════════════════════════════════════

function StaticMoonFallback() {
  return (
    <Image
      src={IMAGES.proNites.moon}
      alt=""
      fill
      className="pronites-moon-rotate object-contain"
      style={{
        filter: `drop-shadow(0 0 40px rgba(180,220,255,0.3)) drop-shadow(0 0 80px rgba(150,200,255,0.2)) drop-shadow(0 0 120px rgba(120,180,255,0.15))`,
      }}
      priority
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

/**
 * GlowingMoon3D - Large 3D moon in top-right corner
 * Uses WebGL on desktop, falls back to image on mobile
 * Positioned so only ~half is visible (3/4 moon feel)
 * Responsive sizing for different screen sizes
 */
export const GlowingMoon3D = memo(function GlowingMoon3D() {
  const { isMobile } = useAnimationPolicy();

  return (
    <div className="pointer-events-none absolute -top-[36vh] -right-[100vw] z-[1] aspect-square w-[180vw] sm:-top-[40%] sm:-right-[35%] sm:w-[80vw] lg:-top-[45%] lg:-right-[30%] lg:w-[75vw] xl:-top-[30%] xl:-right-[25%] xl:w-[70vw] 2xl:-top-[55%] 2xl:-right-[20%] 2xl:w-[65vw]">
      {/* Outer atmospheric glow - soft white/blue haze */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, 
            rgba(220,235,255,0.15) 0%, 
            rgba(180,210,255,0.1) 25%, 
            rgba(150,190,255,0.05) 40%, 
            transparent 55%
          )`,
          filter: "blur(60px)",
          transform: "scale(1.3)",
        }}
      />

      {/* Secondary glow ring - creates depth */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, 
            transparent 40%, 
            rgba(200,220,255,0.08) 45%, 
            rgba(180,210,255,0.12) 48%, 
            rgba(160,200,255,0.08) 52%, 
            transparent 60%
          )`,
          filter: "blur(30px)",
          transform: "scale(1.15)",
        }}
      />

      {/* Inner bright glow - moonlight effect */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, 
            rgba(255,255,255,0.25) 0%, 
            rgba(230,240,255,0.15) 20%, 
            rgba(200,220,255,0.08) 35%, 
            transparent 50%
          )`,
          filter: "blur(40px)",
          transform: "scale(1.1)",
        }}
      />

      {/* Soft radiance rings - subtle pulsing feel */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, 
            transparent 35%, 
            rgba(173,216,255,0.06) 40%, 
            transparent 45%,
            rgba(200,230,255,0.04) 50%,
            transparent 55%,
            rgba(180,220,255,0.03) 60%,
            transparent 70%
          )`,
        }}
      />

      {/* Core glow - bright center */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(220,235,255,0.05) 30%, transparent 50%)`,
          filter: "blur(20px)",
        }}
      />

      {/* 3D Moon on desktop, static image on mobile */}
      {isMobile ? <StaticMoonFallback /> : <Moon3DCanvas />}
    </div>
  );
});
