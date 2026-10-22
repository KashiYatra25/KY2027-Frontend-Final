"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useMotionZone } from "@/lib/motion/MotionZone";

// 3D Disco Ball Model Component - respects MotionZone pause state
export function DiscoBallModel() {
  const { scene } = useGLTF("/models/DiscoBall.glb");
  const groupRef = useRef<THREE.Group>(null);
  const { isAnimating } = useMotionZone();
  const { invalidate } = useThree();

  useFrame(() => {
    if (groupRef.current && isAnimating) {
      groupRef.current.rotation.y += 0.005;
      invalidate(); // Request a new frame for demand mode
    }
  });

  return <primitive ref={groupRef} object={scene} scale={1.5} position={[0, 0, 0]} />;
}

// Preload
useGLTF.preload("/models/DiscoBall.glb");
