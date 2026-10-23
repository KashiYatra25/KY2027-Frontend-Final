"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  createParticles,
  createSparkles,
  computeAllValues,
  type Particle,
  type Sparkle,
  type ComputedValues,
} from "./helper/elements";
import {
  drawWaterGradient,
  drawMoonlightReflection,
  drawWaveLayers,
  drawFlowLines,
  drawRipples,
  drawDiyaReflections,
  drawSparkles,
  drawParticles,
  drawMist,
  drawForegroundWave,
  drawCaustics,
} from "./helper/draw";
import { DiyaLightsOverlay } from "./DiyaLightsOverlay";

export const Water = memo(function Water({
  className = "",
  timeOfDay = "night",
}: {
  className?: string;
  timeOfDay?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);
  const computedRef = useRef<ComputedValues | null>(null);
  const animationIdRef = useRef<number>(0);
  const timeRef = useRef(0);
  // Live theme ref so the rAF draw loop always reads the latest value.
  const timeOfDayRef = useRef(timeOfDay);
  timeOfDayRef.current = timeOfDay;

  // Track dimensions for memoization
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Memoize all computed values - only recalculates when dimensions change
  const computed = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return null;
    return computeAllValues(dimensions.width, dimensions.height);
  }, [dimensions.width, dimensions.height]);

  // Update ref for use in animation loop
  useEffect(() => {
    computedRef.current = computed;
  }, [computed]);

  // Resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    // Update dimensions (triggers useMemo recalculation)
    setDimensions({ width: w, height: h });

    // Reinitialize particles/sparkles
    particlesRef.current = createParticles(w, h);
    sparklesRef.current = createSparkles(w, h);
  }, []);

  // Effect 1: Canvas resize handling
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Effect 2: Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const computed = computedRef.current;
      if (!computed) {
        animationIdRef.current = requestAnimationFrame(draw);
        return;
      }

      const { width: w, height: h } = computed;
      timeRef.current += 0.008;
      const time = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      drawWaterGradient(ctx, w, h, timeOfDayRef.current);
      drawMoonlightReflection(ctx, w, h);
      drawWaveLayers(ctx, w, time, computed);
      drawFlowLines(ctx, time, computed);
      drawRipples(ctx, time, computed);
      drawDiyaReflections(ctx, time, computed);
      drawSparkles(ctx, w, h, time, sparklesRef.current);
      drawParticles(ctx, w, h, time, particlesRef.current);
      drawMist(ctx, w, h);
      drawForegroundWave(ctx, w, h, time, computed);
      drawCaustics(ctx, w, h, time);

      animationIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationIdRef.current);
  }, []);

  return (
    <div className={`relative h-full w-full ${className}`} style={{ minHeight: "100px" }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ display: "block", minHeight: "100px" }}
      />
      <DiyaLightsOverlay />
    </div>
  );
});
