// Types
export interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  type: number;
}

export interface Sparkle {
  x: number;
  y: number;
  life: number;
  maxLife: number;
}

export interface WaveLayer {
  yRatio: number;
  amp: number;
  freq: number;
  speed: number;
  alpha: number;
  color: string;
}

export interface ComputedWaveLayer extends WaveLayer {
  y: number;
  freqMultiplied: number;
  speedMultiplied: number;
  ampHalf: number;
  ampThird: number;
}

export interface DiyaPosition {
  xRatio: number;
  yRatio: number;
}

export interface ComputedDiya {
  x: number;
  y: number;
}

export interface RippleBase {
  xRatio: number;
  yRatio: number;
  timeOffset: number;
}

// Factory functions
export const createParticles = (width: number, height: number, count = 15): Particle[] => {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 2 + Math.random() * 4,
      speed: 0.3 + Math.random() * 0.5,
      opacity: 0.3 + Math.random() * 0.4,
      type: Math.floor(Math.random() * 3),
    });
  }
  return particles;
};

export const createSparkles = (width: number, height: number, count = 25): Sparkle[] => {
  const sparkles: Sparkle[] = [];
  for (let i = 0; i < count; i++) {
    sparkles.push({
      x: Math.random() * width,
      y: Math.random() * height * 0.4,
      life: Math.random() * 100,
      maxLife: 80 + Math.random() * 60,
    });
  }
  return sparkles;
};

// Static config
export const WAVE_LAYERS: WaveLayer[] = [
  { yRatio: 0.05, amp: 3, freq: 0.008, speed: 1.2, alpha: 0.12, color: "200, 230, 255" },
  { yRatio: 0.12, amp: 4, freq: 0.006, speed: 0.9, alpha: 0.1, color: "180, 210, 245" },
  { yRatio: 0.22, amp: 5, freq: 0.005, speed: 0.7, alpha: 0.08, color: "160, 190, 230" },
  { yRatio: 0.35, amp: 6, freq: 0.004, speed: 0.5, alpha: 0.06, color: "140, 170, 215" },
  { yRatio: 0.5, amp: 4, freq: 0.003, speed: 0.4, alpha: 0.04, color: "120, 150, 200" },
  { yRatio: 0.68, amp: 8, freq: 0.007, speed: 0.6, alpha: 0.07, color: "100, 140, 190" },
  { yRatio: 0.82, amp: 10, freq: 0.009, speed: 0.8, alpha: 0.09, color: "80, 130, 180" },
];

export const DIYA_POSITIONS: DiyaPosition[] = [
  { xRatio: 0.15, yRatio: 0.25 },
  { xRatio: 0.32, yRatio: 0.35 },
  { xRatio: 0.48, yRatio: 0.22 },
  { xRatio: 0.65, yRatio: 0.3 },
  { xRatio: 0.82, yRatio: 0.28 },
];

export const WATER_GRADIENT_STOPS = [
  { offset: 0, color: "#1a4a6e" },
  { offset: 0.15, color: "#15405c" },
  { offset: 0.35, color: "#12354d" },
  { offset: 0.55, color: "#0f2a3e" },
  { offset: 0.75, color: "#0c2030" },
  { offset: 1, color: "#081520" },
] as const;

export const MOON_GRADIENT_STOPS = [
  { offset: 0, color: "rgba(200, 220, 255, 0.18)" },
  { offset: 0.3, color: "rgba(180, 200, 240, 0.1)" },
  { offset: 0.6, color: "rgba(150, 180, 220, 0.04)" },
  { offset: 1, color: "rgba(100, 150, 200, 0)" },
] as const;

// Pre-compute expensive values based on dimensions
export const computeWaveLayers = (h: number): ComputedWaveLayer[] => {
  return WAVE_LAYERS.map((layer) => ({
    ...layer,
    y: h * layer.yRatio,
    freqMultiplied: layer.freq * 1.5,
    speedMultiplied: layer.speed * 1.3,
    ampHalf: layer.amp * 0.5,
    ampThird: layer.amp * 0.3,
  }));
};

export const computeDiyaPositions = (w: number, h: number): ComputedDiya[] => {
  return DIYA_POSITIONS.map((pos) => ({
    x: w * pos.xRatio,
    y: h * pos.yRatio,
  }));
};

export const computeRippleBases = (): RippleBase[] => {
  const bases: RippleBase[] = [];
  for (let i = 0; i < 6; i++) {
    bases.push({
      xRatio: 0.15 + i * 0.14,
      yRatio: 0.15 + (i % 3) * 0.25,
      timeOffset: i * 1.5,
    });
  }
  return bases;
};

export const computeFlowLineYs = (h: number): number[] => {
  const ys: number[] = [];
  const step = h * 0.075;
  const start = h * 0.1;
  for (let i = 0; i < 12; i++) {
    ys.push(start + i * step);
  }
  return ys;
};

// Pre-compute X coordinates for wave drawing (avoid recalculating every frame)
export const computeWaveXCoords = (w: number, step = 3): number[] => {
  const coords: number[] = [];
  for (let x = 0; x <= w; x += step) {
    coords.push(x);
  }
  return coords;
};

export const computeFlowLineXCoords = (w: number, step = 5): number[] => {
  const coords: number[] = [];
  for (let x = 0; x <= w; x += step) {
    coords.push(x);
  }
  return coords;
};

export const computeForegroundXCoords = (w: number, step = 2): number[] => {
  const coords: number[] = [];
  for (let x = 0; x <= w; x += step) {
    coords.push(x);
  }
  return coords;
};

// Computed values container type
export interface ComputedValues {
  waveLayers: ComputedWaveLayer[];
  diyaPositions: ComputedDiya[];
  rippleBases: RippleBase[];
  flowLineYs: number[];
  waveXCoords: number[];
  flowLineXCoords: number[];
  foregroundXCoords: number[];
  width: number;
  height: number;
}

export const computeAllValues = (w: number, h: number): ComputedValues => ({
  waveLayers: computeWaveLayers(h),
  diyaPositions: computeDiyaPositions(w, h),
  rippleBases: computeRippleBases(),
  flowLineYs: computeFlowLineYs(h),
  waveXCoords: computeWaveXCoords(w),
  flowLineXCoords: computeFlowLineXCoords(w),
  foregroundXCoords: computeForegroundXCoords(w),
  width: w,
  height: h,
});
