import { useEffect, useState } from "react";

export type Viewport = { vw: number; vh: number; narrow: boolean };

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

export const reducedMotion = () => matchMedia("(prefers-reduced-motion:reduce)").matches;

export function replay(el: Element | null, cls: string) {
  if (!el) return;
  el.classList.remove(cls);
  void (el as HTMLElement).offsetWidth;
  el.classList.add(cls);
}
