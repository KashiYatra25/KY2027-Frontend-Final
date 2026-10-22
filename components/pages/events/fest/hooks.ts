export const reducedMotion = () => matchMedia("(prefers-reduced-motion:reduce)").matches;

export function replay(el: Element | null, cls: string) {
  if (!el) return;
  el.classList.remove(cls);
  void (el as HTMLElement).offsetWidth;
  el.classList.add(cls);
}
