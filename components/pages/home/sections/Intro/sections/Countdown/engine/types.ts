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
    fn: (e: any) => void,
    opts?: AddEventListenerOptions | boolean
  ) => void;
  timeout: (fn: () => void, ms: number) => void;
}
