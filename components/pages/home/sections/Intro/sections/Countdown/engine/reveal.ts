import type { IntroCtx } from "./types";

/** Seconds after the reveal starts: title → "IIT (BHU) VARANASI" → tagline. */
const DELAYS = [0.1, 0.6, 1.1];

/** Reveals the poster on the first frame and starts the concert lights. */
export function initReveal(ctx: IntroCtx) {
  const { S, cb } = ctx;

  ctx.enterMain = () => cb.onEnterMain();

  requestAnimationFrame(() => {
    if (!ctx.alive) return;
    S.done = true;
    cb.onReveal(DELAYS);
    ctx.timeout(() => cb.onReady(), (DELAYS[2] + 1.5) * 1000);
    ctx.startFx();
  });
}
