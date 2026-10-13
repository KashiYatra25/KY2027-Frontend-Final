const noise = (f: string, o: number, a: number, c = "0 0 0") => {
  const [r, g, b] = c.split(" ");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='${f}' numOctaves='${o}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 ${a} 0'/></filter><rect width='100%' height='100%' filter='url(#f)'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

export const TEXTURES = {
  "--gr": noise(".85", 3, 0.5),
  "--wd": noise(".012 .45", 3, 0.95, ".18 .08 .02"),
  "--st": noise(".035", 4, 0.8, ".2 .15 .1"),
};

const squircle = (n: number) => {
  let d = "";
  for (let i = 0; i <= 80; i++) {
    const t = (i / 80) * 6.2832,
      c = Math.cos(t),
      s = Math.sin(t);
    d +=
      (i ? "L" : "M") +
      (0.5 + 0.5 * Math.sign(c) * Math.abs(c) ** (2 / n)).toFixed(3) +
      " " +
      (0.5 + 0.5 * Math.sign(s) * Math.abs(s) ** (2 / n)).toFixed(3);
  }
  return d + "Z";
};

const scallop = (n: number) => {
  let d = "M0 .12",
    x = 0;
  const w = 1 / n;
  for (let i = 0; i < n; i++) {
    d += `Q${(x + w / 2).toFixed(3)} -.1 ${(x + w).toFixed(3)} .12`;
    x += w;
  }
  d += "V.88";
  for (let i = 0; i < n; i++) {
    d += `Q${(x - w / 2).toFixed(3)} 1.1 ${(x - w).toFixed(3)} .88`;
    x -= w;
  }
  return d + "Z";
};

export const CLIPS = [
  "M0 .9V.52C0 .36 .09 .27 .2 .22C.33 .16 .43 .09 .5 0C.57 .09 .67 .16 .8 .22C.91 .27 1 .36 1 .52V.9Q.875 1.1 .75 .9Q.625 1.1 .5 .9Q.375 1.1 .25 .9Q.125 1.1 0 .9Z",
  "M.5 1C.33 .9 0 .64 0 .32C0 .1 .2 0 .5 0S1 .1 1 .32C1 .64 .67 .9 .5 1Z",
  "M.14 0H.86L1 .22V.78L.86 1H.14L0 .78V.22Z",
  "M.1 0H.9A.1 .16 0 0 0 1 .16V.84A.1 .16 0 0 0 .9 1H.1A.1 .16 0 0 0 0 .84V.16A.1 .16 0 0 0 .1 0Z",
  "M.16 0H.84L1 .5L.84 1H.16L0 .5Z",
  "M.06 0H.76L1 .3V.94Q1 1 .94 1H.06Q0 1 0 .94V.06Q0 0 .06 0Z",
  squircle(3.2),
  "M0 .08Q0 0 .08 0H1L.92 .5L1 1H.08Q0 1 0 .92Z",
  scallop(6),
];
