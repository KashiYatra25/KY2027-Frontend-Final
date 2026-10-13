"use client";

import { memo, useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASTRONAUT_CONFIG, ASTRONAUT_MODEL_PATH } from "@/components/pages/ca/config/ca.config";
import { COLORS } from "@/components/pages/ca/constants/palette";

gsap.registerPlugin(ScrollTrigger);

// Global scroll progress (updated by GSAP ScrollTrigger)
let globalScrollProgress = 0;

/**
 * Astronaut Model with scroll-controlled rotation and position
 */
function AstronautModel() {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(ASTRONAUT_MODEL_PATH);

  // Clone the scene to avoid conflicts
  const clonedScene = scene.clone();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;

      // Scroll-based horizontal position (right to left)
      const xPos =
        ASTRONAUT_CONFIG.startX +
        globalScrollProgress * (ASTRONAUT_CONFIG.endX - ASTRONAUT_CONFIG.startX);
      meshRef.current.position.x = xPos;

      // Scroll-based rotation
      meshRef.current.rotation.y =
        ASTRONAUT_CONFIG.initialRotationY +
        globalScrollProgress * ASTRONAUT_CONFIG.rotationMultiplierY;

      meshRef.current.rotation.x =
        ASTRONAUT_CONFIG.initialRotationX +
        globalScrollProgress * ASTRONAUT_CONFIG.rotationMultiplierX;

      // Subtle floating animation (relative to base position)
      meshRef.current.position.y =
        ASTRONAUT_CONFIG.positionY +
        Math.sin(time * ASTRONAUT_CONFIG.floatSpeed) * ASTRONAUT_CONFIG.floatAmplitude;
    }
  });

  return (
    <group ref={meshRef} position={[ASTRONAUT_CONFIG.startX, ASTRONAUT_CONFIG.positionY, 0]}>
      <primitive object={clonedScene} scale={ASTRONAUT_CONFIG.scale} />
    </group>
  );
}

// Preload the model
useGLTF.preload(ASTRONAUT_MODEL_PATH);

/**
 * Astronaut3D - WebGL canvas with scroll-controlled astronaut
 */
export const Astronaut3D = memo(function Astronaut3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we only render on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Setup ScrollTrigger for scroll-based rotation
  useEffect(() => {
    if (!isClient) return;

    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        globalScrollProgress = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{
        opacity: 0.7,
      }}
    >
      <Canvas
        camera={{
          position: [0, ASTRONAUT_CONFIG.cameraY, ASTRONAUT_CONFIG.cameraZ],
          fov: ASTRONAUT_CONFIG.fov,
        }}
        style={{ background: "transparent" }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {/* Ambient light for overall visibility */}
        <ambientLight intensity={ASTRONAUT_CONFIG.ambientIntensity} />

        {/* Main directional light */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={ASTRONAUT_CONFIG.mainLightIntensity}
          color="#ffffff"
        />

        {/* Rim light for ethereal glow effect */}
        <directionalLight
          position={[-5, 0, -5]}
          intensity={ASTRONAUT_CONFIG.rimLightIntensity}
          color={COLORS.PURPLE}
        />

        {/* Pink accent light from below */}
        <pointLight position={[0, -3, 2]} intensity={0.5} color={COLORS.PINK} distance={10} />

        {/* Cyan accent light */}
        <pointLight position={[3, 2, -2]} intensity={0.4} color={COLORS.CYAN} distance={10} />

        <Suspense fallback={null}>
          <AstronautModel />
        </Suspense>
      </Canvas>
    </div>
  );
});
