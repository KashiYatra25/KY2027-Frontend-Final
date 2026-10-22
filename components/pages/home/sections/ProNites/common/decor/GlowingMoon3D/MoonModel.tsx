"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useMotionZone } from "@/lib/motion/MotionZone";

export function MoonModel() {
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
