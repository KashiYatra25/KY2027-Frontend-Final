/** Shared, mutable state used by the canvas modules. */
export interface IntroState {
  done: boolean; // poster has been revealed
  enterGo?: boolean; // ENTER already triggered
}

/** DOM nodes the engine draws into / animates every frame (rendered by React). */
export interface IntroRefs {
  stage: HTMLDivElement;
  base: HTMLImageElement;
  fx: HTMLCanvasElement;
  fx2: HTMLCanvasElement;
  mv: HTMLCanvasElement;
  hx: HTMLCanvasElement;
  pp: HTMLCanvasElement;
  flash: HTMLDivElement;
}

/** Engine -> React. Only coarse phase changes go through React state. */
export interface IntroCallbacks {
  onReveal(delays: number[]): void; // poster revealed (per-band fade-in delays, seconds)
  onReady(): void; // poster is clickable
  onEnterMain(): void; // user chose to enter the site
}

// ============================================================================
// Animation particle/entity types for canvas FX modules
// ============================================================================

/** Confetti particle */
export interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  w: number;
  h: number;
  hu: number;
  ph: number;
  l: number;
  m: number;
}

/** Shockwave ring */
export interface ShockwaveRing {
  x: number;
  y: number;
  r: number;
  sp: number;
  hu: number;
  w: number;
}

/** Glow stick */
export interface GlowStick {
  x: number;
  y: number;
  hu: number;
  ph: number;
  len: number;
  sp: number;
}

/** Bokeh ball */
export interface BokehBall {
  x: number;
  y: number;
  r: number;
  hu: number;
  sp: number;
  ph: number;
}

/** Pyro fountain */
export interface PyroFountain {
  x: number;
  y: number;
  t: number;
}

/** Pyro spark particle (spawned from fountains) */
export interface PyroSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hu: number;
  l: number;
  m: number;
}

/** Firework trail (for partyMode) */
export interface FireworkTrail {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hu: number;
  l: number;
  fuse: number;
  str: number;
  t: number;
}

/** Crowd person properties (for partyMode) */
export interface CrowdPerson {
  x: number;
  s: number;
  ph: number;
  arm: number;
  phone: boolean;
  hu: number;
  j: number;
  w: number;
  h: number;
  hs: number;
  hand: number;
  lean: number;
  hgt: number;
  sp: number;
  turn: number;
}

/** Crowd row (for partyMode) */
export interface CrowdRow {
  u: number;
  yb: number;
  col: string;
  rim: number;
  P: CrowdPerson[];
}

// Concert lights types
/** Phone light position */
export interface PhoneLight {
  x: number;
  y: number;
  type: number;
}

/** Firework particle (for concertLights) */
export interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hu: number;
  l: number;
  s: number;
  rv: number;
  str: number;
  // Additional properties used in concertLights
  life?: number;
  max?: number;
  cr?: number;
  drag?: number;
  grav?: number;
  tw?: number;
  ph?: number;
  c?: number[];
  size?: number;
  ks?: string;
}

/** Lantern */
export interface Lantern {
  x: number;
  y: number;
  vx: number;
  vy: number;
  sc: number;
  ph: number;
  sw: number;
  l: number;
}

/** Crowd phone-light dot (concertLights CROWD array) */
export interface CrowdPhoneLight {
  x: number;
  y: number;
  k: string;
  s: number;
  ph: number;
  sp: number;
  f: number;
  sway: number;
}

/** String-bulb light (concertLights STRB array) */
export interface StringBulb {
  x: number;
  y: number;
  s: number;
  ph: number;
  sp: number;
  sp2: number;
}

/** Rocket in flight (concertLights RK array) */
export interface Rocket {
  sx: number;
  sy: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  s: number;
  t: number;
  dur: number;
}

/** Firework spark particle (concertLights PT array) */
export interface FireworkSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  c: number[];
  drag: number;
  grav: number;
  size: number;
  ks: number;
  tw: boolean;
  cr: boolean;
  ph: number;
}

/** Ground glow burst (concertLights GL array) */
export interface GroundGlow {
  x: number;
  y: number;
  r: number;
  c: string;
  t: number;
  max: number;
}

// Living crowd types
/** Arm silhouette */
export interface ArmSilhouette {
  x: number;
  y: number;
  s?: number;
  u: number;
  ph: number;
  hu: number;
  up?: number;
  hand?: number;
  side?: number;
  wave?: number;
  hs: number;
  hs2?: number;
  w?: number;
  h?: number;
  both?: boolean;
  turn?: number;
  phone?: boolean;
  stick?: boolean;
  lean?: number;
  j?: number;
  jump?: number;
  arm?: number;
  wf?: number;
  gear?: number;
}

/** Standing person silhouette */
export interface StandingSilhouette {
  x: number;
  y: number;
  s?: number;
  u: number;
  hu: number;
  ph: number;
  w: number;
  h: number;
  hs: number;
  hs2?: number;
  wave?: number;
  jump?: number;
  j: number;
  arm?: number;
  both?: boolean;
  turn?: number;
  phone?: boolean;
  stick?: boolean;
  lean?: number;
  wf?: number;
  hand?: number;
  gear?: number;
  dl?: number;
  up?: number;
  side?: number;
}

/** Crowd layer configuration */
export interface CrowdLayer {
  y0: number;
  y1: number;
  amp: number;
  sway: number;
  wv: number;
  jit: number;
  rate: number;
  fT: number;
  fB: number;
  plate: boolean;
  seed: number;
  x0?: number;
  x1?: number;
  pulse?: boolean;
}

/** Person draw parameters - kept for backwards compat but use StandingSilhouette */
export type PersonDrawParams = StandingSilhouette;

// ============================================================================
// End animation types
// ============================================================================

export interface IntroCtx {
  S: IntroState;
  refs: IntroRefs;
  cb: IntroCallbacks;
  RM: boolean; // prefers-reduced-motion
  alive: boolean;
  shared: { K?: number; EL?: number }; // beat envelope / beat clock shared between modules

  // late-bound entry points (modules assign / wrap them while initialising)
  startFx: () => void;
  enterMain: () => void;
  enter: () => void;

  // helpers that auto-clean on destroy
  cleanups: Array<() => void>;
  on: (
    target: EventTarget,
    type: string,
    fn: EventListener,
    opts?: AddEventListenerOptions | boolean
  ) => void;
  timeout: (fn: () => void, ms: number) => void;
}
