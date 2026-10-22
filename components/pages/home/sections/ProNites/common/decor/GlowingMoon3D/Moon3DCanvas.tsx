"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { MoonModel } from "./MoonModel";

export function Moon3DCanvas() {
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
