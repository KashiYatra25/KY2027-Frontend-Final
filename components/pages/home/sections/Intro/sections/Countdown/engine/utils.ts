export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));

export const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
