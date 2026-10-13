import type { IntroCallbacks, IntroCtx, IntroRefs, IntroState } from "./types";
import { initConcertLights } from "./concertLights";
import { initReveal } from "./reveal";
import { initPartyMode } from "./partyMode";
import { initLivingCrowd } from "./livingCrowd";

export interface IntroEngine {
  enter(): void;
  destroy(): void;
}

/**
 * Boots the whole canvas experience against already-mounted DOM nodes.
 * Call `destroy()` on unmount (React StrictMode mounts twice in dev).
 */
export function createIntro(refs: IntroRefs, cb: IntroCallbacks): IntroEngine {
  const S: IntroState = { done: false };

  const ctx: IntroCtx = {
    S,
    refs,
    cb,
    RM: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    alive: true,
    shared: {},
    cleanups: [],
    startFx: () => {},
    enterMain: () => {},
    enter: () => ctx.enterMain(), // party mode replaces this with the flash + confetti version
    on(target, type, fn, opts) {
      target.addEventListener(type, fn, opts);
      ctx.cleanups.push(() => target.removeEventListener(type, fn, opts));
    },
    timeout(fn, ms) {
      const id = window.setTimeout(() => ctx.alive && fn(), ms);
      ctx.cleanups.push(() => clearTimeout(id));
    },
  };

  // Order matters: lights define startFx, party mode wraps it.
  initConcertLights(ctx);
  initReveal(ctx);
  initPartyMode(ctx);
  initLivingCrowd(ctx);

  return {
    enter: () => ctx.enter(),
    destroy() {
      ctx.alive = false;
      ctx.cleanups.forEach((fn) => fn());
      ctx.cleanups.length = 0;
    },
  };
}
