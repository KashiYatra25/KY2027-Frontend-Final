import { useEffect, useState } from "react";

export type Viewport = { vw: number; vh: number; narrow: boolean };

/**
 * Tracks the current viewport size and a `narrow` flag (max-width: 900px).
 * Updates on window resize; SSR-safe initial state.
 */
export function useViewport(): Viewport {
  const [v, setV] = useState<Viewport>({ vw: 0, vh: 0, narrow: false });
  useEffect(() => {
    const mq = matchMedia("(max-width:900px)");
    const update = () => setV({ vw: innerWidth, vh: innerHeight, narrow: mq.matches });
    update();
    addEventListener("resize", update);
    return () => removeEventListener("resize", update);
  }, []);
  return v;
}
