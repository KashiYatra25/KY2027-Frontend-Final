/* eslint-disable @typescript-eslint/no-explicit-any */
// Canvas FX module ported from kashiyatra-countdown-clean.
// Concert lights, beams, crowd phone-lights, lanterns, fireworks.
// Note: This file uses dynamic animation structures that are difficult to type strictly.
import { clamp } from "./utils";
import type { IntroCtx } from "./types";

/** Phase 5: live concert lights, beams, crowd phone-lights, lanterns, fireworks. */
export function initConcertLights(ctx: IntroCtx) {
  const { RM, refs } = ctx;
  const { stage } = refs;

  const FIREWORKS = true; // set false to turn crackers off
  const fx = refs.fx,
    c = fx.getContext("2d")!;
  const PH = [
      [0.678, 0.715, 2],
      [0.569, 0.717, 2],
      [0.58, 0.718, 0],
      [0.206, 0.719, 0],
      [0.531, 0.721, 0],
      [0.546, 0.721, 0],
      [0.577, 0.721, 2],
      [0.66, 0.721, 2],
      [0.527, 0.722, 0],
      [0.779, 0.722, 0],
      [0.541, 0.723, 1],
      [0.199, 0.724, 2],
      [0.558, 0.724, 2],
      [0.772, 0.724, 2],
      [0.989, 0.724, 0],
      [0.208, 0.725, 0],
      [0.768, 0.725, 2],
      [0.553, 0.726, 0],
      [0.147, 0.727, 2],
      [0.156, 0.727, 0],
      [0.203, 0.727, 2],
      [0.223, 0.727, 2],
      [0.592, 0.727, 0],
      [0.696, 0.727, 2],
      [0.801, 0.727, 2],
      [0.115, 0.728, 2],
      [0.132, 0.728, 2],
      [0.151, 0.728, 0],
      [0.16, 0.728, 2],
      [0.17, 0.728, 2],
      [0.24, 0.728, 2],
      [0.572, 0.728, 0],
      [0.166, 0.729, 2],
      [0.679, 0.729, 0],
      [0.706, 0.729, 2],
      [0.649, 0.731, 0],
      [0.126, 0.732, 0],
      [0.496, 0.732, 0],
      [0.617, 0.732, 0],
      [0.753, 0.732, 0],
      [0.658, 0.733, 2],
      [0.766, 0.733, 2],
      [0.809, 0.733, 0],
      [0.417, 0.735, 2],
      [0.602, 0.735, 2],
      [0.794, 0.735, 2],
      [0.817, 0.735, 2],
      [0.687, 0.737, 2],
      [0.27, 0.738, 2],
      [0.743, 0.738, 2],
      [0.333, 0.739, 2],
      [0.344, 0.739, 0],
      [0.567, 0.739, 2],
      [0.638, 0.739, 2],
      [0.748, 0.739, 2],
      [0.717, 0.74, 2],
      [0.916, 0.74, 1],
      [0.34, 0.741, 0],
      [0.384, 0.741, 2],
      [0.645, 0.741, 2],
      [0.286, 0.742, 0],
      [0.904, 0.742, 2],
      [0.216, 0.743, 0],
      [0.303, 0.743, 2],
      [0.403, 0.743, 2],
      [0.686, 0.743, 2],
      [0.974, 0.743, 0],
      [0.254, 0.744, 2],
      [0.858, 0.744, 0],
      [0.965, 0.744, 2],
      [0.983, 0.744, 0],
      [0.375, 0.745, 2],
      [0.756, 0.745, 2],
      [0.805, 0.745, 2],
      [0.349, 0.746, 2],
      [0.771, 0.746, 2],
      [0.862, 0.746, 0],
      [0.881, 0.746, 2],
      [0.841, 0.747, 2],
      [0.554, 0.749, 2],
      [0.607, 0.749, 2],
      [0.726, 0.749, 2],
      [0.711, 0.751, 2],
      [0.716, 0.751, 2],
      [0.732, 0.751, 0],
      [0.323, 0.752, 0],
      [0.667, 0.752, 2],
      [0.771, 0.752, 2],
      [0.679, 0.753, 2],
      [0.682, 0.753, 2],
      [0.753, 0.753, 2],
      [0.821, 0.754, 2],
      [0.639, 0.758, 2],
      [0.699, 0.76, 2],
      [0.763, 0.761, 2],
      [0.763, 0.761, 2],
      [0.689, 0.762, 2],
    ],
    ST = [
      [0.325, 0.673],
      [0.959, 0.673],
      [0.169, 0.674],
      [0.172, 0.674],
      [0.955, 0.675],
      [0.99, 0.675],
      [0.882, 0.676],
      [0.828, 0.677],
      [0.983, 0.677],
      [0.993, 0.677],
      [0.162, 0.678],
      [0.812, 0.678],
      [0.993, 0.678],
      [0.998, 0.678],
      [0.803, 0.679],
      [0.222, 0.68],
      [0.864, 0.68],
      [0.959, 0.68],
      [0.974, 0.68],
      [0.987, 0.68],
      [0.197, 0.681],
      [0.216, 0.681],
      [0.838, 0.681],
      [0.842, 0.681],
      [0.867, 0.681],
      [0.931, 0.681],
      [0.964, 0.681],
      [0.979, 0.681],
      [0.851, 0.682],
      [0.885, 0.682],
      [0.944, 0.682],
      [0.954, 0.682],
      [0.873, 0.684],
      [0.912, 0.684],
      [0.94, 0.684],
      [0.949, 0.684],
      [0.967, 0.684],
      [0.905, 0.685],
      [0.915, 0.686],
      [0.925, 0.686],
      [0.824, 0.688],
      [0.834, 0.688],
      [0.845, 0.688],
      [0.922, 0.688],
      [0.935, 0.688],
      [0.239, 0.689],
      [0.378, 0.689],
      [0.85, 0.689],
      [0.853, 0.689],
      [0.862, 0.69],
      [0.194, 0.692],
      [0.367, 0.692],
      [0.438, 0.693],
      [0.199, 0.694],
      [0.204, 0.694],
      [0.391, 0.694],
      [0.001, 0.695],
      [0.013, 0.695],
      [0.831, 0.695],
      [0.005, 0.696],
      [0.207, 0.696],
      [0.883, 0.696],
      [0.886, 0.696],
      [0.95, 0.696],
      [0.958, 0.696],
      [0.213, 0.697],
      [0.258, 0.697],
      [0.34, 0.697],
      [0.4, 0.697],
      [0.412, 0.697],
      [0.421, 0.697],
      [0.431, 0.697],
      [0.221, 0.698],
      [0.331, 0.698],
      [0.124, 0.699],
      [0.127, 0.699],
      [0.237, 0.699],
      [0.261, 0.699],
      [0.32, 0.699],
      [0.111, 0.7],
      [0.175, 0.7],
      [0.229, 0.7],
      [0.449, 0.7],
      [0.905, 0.7],
      [0.102, 0.701],
      [0.114, 0.701],
      [0.135, 0.701],
      [0.144, 0.701],
      [0.165, 0.701],
      [0.178, 0.701],
      [0.29, 0.701],
      [0.437, 0.701],
      [0.875, 0.701],
      [0.093, 0.702],
      [0.243, 0.702],
      [0.254, 0.702],
      [0.264, 0.702],
      [0.352, 0.702],
      [0.439, 0.702],
      [0.443, 0.702],
      [0.249, 0.704],
      [0.274, 0.704],
      [0.308, 0.704],
      [0.325, 0.704],
      [0.389, 0.704],
      [0.098, 0.705],
      [0.269, 0.705],
      [0.284, 0.705],
      [0.335, 0.705],
      [0.34, 0.705],
      [0.355, 0.705],
      [0.384, 0.705],
      [0.421, 0.705],
      [0.965, 0.705],
      [0.206, 0.706],
      [0.281, 0.706],
      [0.294, 0.706],
      [0.298, 0.706],
      [0.302, 0.706],
      [0.36, 0.706],
      [0.367, 0.706],
      [0.403, 0.708],
      [0.377, 0.71],
      [0.381, 0.71],
      [0.393, 0.711],
      [0.396, 0.711],
      [0.42, 0.711],
      [0.083, 0.712],
      [0.927, 0.712],
      [0.093, 0.713],
      [0.905, 0.714],
      [0.968, 0.714],
      [0.239, 0.715],
      [0.874, 0.715],
      [0.959, 0.715],
    ];
  const LANT = [
    [0.091, 0.831],
    [0.21, 0.834],
    [0.808, 0.834],
    [0.961, 0.834],
  ];
  let FW = 0,
    FH = 0,
    sc = 1,
    px = 1,
    running = false,
    lastT = 0,
    T = 0,
    nextBurst = 1.2,
    nextFin = 18,
    ft: ReturnType<typeof setTimeout> | undefined,
    CROWD: any[] = [],
    STRB: any[] = [],
    SP: Record<string, HTMLCanvasElement> = {};
  const PT: any[] = [],
    RK: any[] = [],
    GL: any[] = [];
  const rr = (a: number, b: number) => a + Math.random() * (b - a);
  const PAL = [
    [255, 196, 92],
    [255, 140, 50],
    [255, 95, 110],
    [255, 222, 160],
    [175, 135, 255],
    [115, 205, 255],
    [255, 250, 235],
    [255, 125, 200],
  ];
  const LP = [
    [255, 170, 60],
    [255, 80, 150],
    [150, 110, 255],
    [90, 200, 255],
    [255, 220, 140],
  ];
  function pc(i: number, spd = 0.22) {
    const n = LP.length,
      p = (((T * spd + i * 0.41) % n) + n) % n,
      f0 = Math.floor(p),
      a = LP[f0],
      b = LP[(f0 + 1) % n],
      f = p - f0,
      s = f * f * (3 - 2 * f);
    return (
      Math.round(a[0] + (b[0] - a[0]) * s) +
      "," +
      Math.round(a[1] + (b[1] - a[1]) * s) +
      "," +
      Math.round(a[2] + (b[2] - a[2]) * s)
    );
  }
  function sprite(rgb: string) {
    const s = document.createElement("canvas");
    s.width = s.height = 64;
    const g = s.getContext("2d")!,
      gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, `rgba(${rgb},1)`);
    gr.addColorStop(0.16, `rgba(${rgb},.6)`);
    gr.addColorStop(0.45, `rgba(${rgb},.14)`);
    gr.addColorStop(1, `rgba(${rgb},0)`);
    g.fillStyle = gr;
    g.fillRect(0, 0, 64, 64);
    return s;
  }
  SP = {
    cool: sprite("214,228,255"),
    warm: sprite("255,196,110"),
    pink: sprite("255,135,190"),
    blue: sprite("120,190,255"),
    white: sprite("255,250,240"),
  };

  function build() {
    CROWD = PH.map(([x, y, k]) => ({
      x,
      y,
      k: ["cool", "warm", "blue"][k],
      s: (0.85 + 0.5 * clamp((y - 0.715) / 0.09)) * rr(0.8, 1.3),
      ph: rr(0, 6.28),
      sp: rr(0.4, 1.5),
      f: rr(9, 20),
      sway: 0,
    }));
    const ex = FW < 900 ? 45 : 80;
    for (let i = 0; i < ex; i++) {
      const b = PH[(Math.random() * PH.length) | 0],
        z = Math.random();
      const x = b[0] + rr(-0.014, 0.014),
        y = clamp(b[1] + rr(-0.012, 0.016), 0.722, 0.79);
      if (x > 0.38 && x < 0.62 && y > 0.75) continue; // keep clear of the ENTER plate
      CROWD.push({
        x,
        y,
        k: z < 0.6 ? "cool" : z < 0.78 ? "warm" : z < 0.9 ? "pink" : "blue",
        s: rr(0.55, 0.9) * (0.85 + 0.5 * clamp((y - 0.715) / 0.09)),
        ph: rr(0, 6.28),
        sp: rr(0.5, 1.8),
        f: rr(9, 20),
        sway: 1,
      });
    }
    STRB = ST.map(([x, y]) => ({
      x,
      y,
      s: rr(0.8, 1.25),
      ph: rr(0, 6.28),
      sp: rr(1.5, 4),
      sp2: rr(3, 8),
    }));
  }
  function size() {
    FW = stage.clientWidth;
    FH = stage.clientHeight;
    sc = FW / 1600;
    px = Math.max(0.75, sc);
    const d = Math.min(devicePixelRatio || 1, 2, Math.sqrt(2.6e6 / (FW * FH)));
    fx.width = Math.round(FW * d);
    fx.height = Math.round(FH * d);
    c.setTransform(d, 0, 0, d, 0, 0);
    c.lineCap = "round";
    build();
  }
  function beat() {
    const per = 60 / 124,
      ph = (T % per) / per,
      bar = Math.floor(T / per) % 8 === 0;
    return Math.exp(-ph * 5) * (bar ? 1.5 : 1);
  }

  /* ---- moving searchlight beams from the stage truss ---- */
  function beams(k: number) {
    for (let i = 0; i < 6; i++) {
      const ox = (0.55 + i * 0.034) * FW,
        oy = 0.565 * FH;
      const ang =
        (((i - 2.5) * 13 + 26 * Math.sin(T * (0.45 + i * 0.11) + i * 1.7)) * Math.PI) / 180;
      const len = FH * (0.64 + 0.1 * Math.sin(T * 0.7 + i)),
        w = len * 0.05,
        col = pc(i),
        a = 0.15 + 0.13 * k;
      c.save();
      c.translate(ox, oy);
      c.rotate(ang);
      let g = c.createLinearGradient(0, 0, 0, -len);
      g.addColorStop(0, `rgba(${col},${a})`);
      g.addColorStop(0.6, `rgba(${col},${a * 0.35})`);
      g.addColorStop(1, `rgba(${col},0)`);
      c.fillStyle = g;
      c.beginPath();
      c.moveTo(-3 * px, 0);
      c.lineTo(-w, -len);
      c.lineTo(w, -len);
      c.lineTo(3 * px, 0);
      c.closePath();
      c.fill();
      g = c.createLinearGradient(0, 0, 0, -len);
      g.addColorStop(0, `rgba(255,250,235,${a * 0.9})`);
      g.addColorStop(0.5, `rgba(${col},${a * 0.25})`);
      g.addColorStop(1, `rgba(${col},0)`);
      c.fillStyle = g;
      c.beginPath();
      c.moveTo(-2 * px, 0);
      c.lineTo(-w * 0.3, -len);
      c.lineTo(w * 0.3, -len);
      c.lineTo(2 * px, 0);
      c.closePath();
      c.fill();
      c.restore();
    }
  }
  /* ---- truss lights, stage wash, LED screens, haze ---- */
  function stageLights(k: number) {
    for (let i = 0; i < 7; i++) {
      const x = (0.545 + i * 0.03) * FW,
        y = 0.565 * FH,
        r = 0.05 * FW * (1 + 0.25 * k),
        col = pc(i, 0.3),
        a = 0.16 + 0.2 * k * (0.55 + 0.45 * Math.sin(T * 5 + i * 1.3));
      const g = c.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${col},${a})`);
      g.addColorStop(1, `rgba(${col},0)`);
      c.fillStyle = g;
      c.fillRect(x - r, y - r, 2 * r, 2 * r);
    }
    const wx = 0.63 * FW,
      wy = 0.62 * FH,
      wr = 0.17 * FW,
      wc = pc(2, 0.18),
      wg = c.createRadialGradient(wx, wy, 0, wx, wy, wr);
    wg.addColorStop(0, `rgba(${wc},${0.1 + 0.16 * k})`);
    wg.addColorStop(1, `rgba(${wc},0)`);
    c.fillStyle = wg;
    c.fillRect(wx - wr, wy - wr, 2 * wr, 2 * wr);
    for (const [sx, sy, sw, sh, ph] of [
      [0.476, 0.6, 0.036, 0.09, 0],
      [0.762, 0.574, 0.05, 0.106, 1.7],
    ]) {
      const col = pc(ph * 2 + 1, 0.5),
        a = 0.1 + 0.14 * (0.5 + 0.5 * Math.sin(T * 9 + ph)) * (0.6 + 0.4 * k) + 0.1 * k;
      c.fillStyle = `rgba(${col},${a})`;
      c.fillRect(sx * FW, sy * FH, sw * FW, sh * FH);
    }
    for (let i = 0; i < 2; i++) {
      const x = (0.6 + 0.14 * Math.sin(T * 0.18 + i * 3)) * FW,
        y = (0.5 + 0.02 * Math.sin(T * 0.3 + i)) * FH,
        r = 0.22 * FW,
        col = pc(i + 3, 0.1);
      const g = c.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${col},.07)`);
      g.addColorStop(1, `rgba(${col},0)`);
      c.fillStyle = g;
      c.fillRect(x - r, y - r, 2 * r, 2 * r);
    }
  }
  /* ---- realistic crowd: shimmer on the photo's own phone-lights & bulbs (no fake blobs) ---- */
  function crowd(k: number) {
    for (const d of CROWD) {
      // phone torches
      let a = 0.5 + 0.5 * Math.sin(T * d.sp + d.ph);
      a = a * a * (3 - 2 * a);
      const wave = 0.5 + 0.5 * Math.sin(d.x * 6 - T * 1.7);
      a =
        (0.3 + 0.7 * a) *
        (0.8 + 0.2 * Math.sin(T * d.f + d.ph * 3)) *
        (0.72 + 0.28 * wave) *
        (1 + 0.18 * k);
      const x = d.x * FW + (d.sway ? Math.sin(T * 1.9 + d.ph) * 2.2 * px : 0),
        y = d.y * FH + (d.sway ? Math.sin(T * 2.6 + d.ph) * 1.4 * px : 0),
        r = 3.6 * px * d.s;
      c.globalAlpha = Math.min(1, a * 0.6);
      c.drawImage(SP[d.k], x - r, y - r, 2 * r, 2 * r);
      c.globalAlpha = Math.min(1, a);
      c.drawImage(SP.white, x - r * 0.3, y - r * 0.3, r * 0.6, r * 0.6);
    }
    for (const d of STRB) {
      // string bulbs (candle-like flicker)
      const fl = 0.62 + 0.38 * Math.sin(T * d.sp + d.ph) * Math.sin(T * d.sp2 + d.ph * 1.7),
        x = d.x * FW,
        y = d.y * FH,
        r = 5.5 * px * d.s;
      c.globalAlpha = 0.42 * fl;
      c.drawImage(SP.warm, x - r, y - r, 2 * r, 2 * r);
      c.globalAlpha = 0.5 * fl;
      c.drawImage(SP.white, x - r * 0.3, y - r * 0.3, r * 0.6, r * 0.6);
    }
    c.globalAlpha = 1;
    LANT.forEach(([lx, ly], i) => {
      // lantern flames
      const a = 0.28 + 0.2 * Math.sin(T * 7 + i * 2) * Math.sin(T * 11.3 + i),
        r = 0.03 * FW;
      c.globalAlpha = Math.max(0, a);
      c.drawImage(SP.warm, lx * FW - r, ly * FH - r, 2 * r, 2 * r);
    });
    c.globalAlpha = 1;
  }

  /* ---- fireworks, aimed only at the part of the sky actually on screen ---- */
  function visSpan() {
    const r = stage.getBoundingClientRect();
    return [
      Math.max(0.03, -r.left / r.width),
      Math.min(0.97, (innerWidth - r.left) / r.width),
      Math.max(0.02, -r.top / r.height),
    ];
  }
  function inTitle(x: number, y: number) {
    const a = (x - 0.5) / 0.26,
      b = (y - 0.245) / 0.21;
    return a * a + b * b < 1;
  }
  function pickTarget() {
    const [vl, vr, vt] = visSpan();
    let x = rr(vl + 0.02, Math.max(vl + 0.03, vr - 0.02)),
      y = rr(Math.max(0.06, vt + 0.04), 0.45),
      s = 1;
    for (let i = 0; i < 16; i++) {
      x = rr(vl + 0.02, Math.max(vl + 0.03, vr - 0.02));
      y = rr(Math.max(0.06, vt + 0.04), 0.45);
      if (!inTitle(x, y)) break;
    }
    if (inTitle(x, y)) {
      y = rr(0.43, 0.5);
      s = 0.8;
    }
    return { x: x * FW, y: y * FH, s };
  }
  function launch(delay = 0, t?: { x: number; y: number; s?: number }) {
    const target = t || pickTarget();
    const sx = rr(0.44, 0.62) * FW,
      sy = 0.6 * FH;
    RK.push({
      sx,
      sy,
      x: sx,
      y: sy,
      tx: target.x,
      ty: target.y,
      s: target.s || 1,
      t: -delay,
      dur: rr(0.85, 1.25),
    });
  }
  function burst(x: number, y: number, s: number) {
    const col = PAL[(Math.random() * PAL.length) | 0],
      col2 = PAL[(Math.random() * PAL.length) | 0];
    const type = (Math.random() * 5) | 0,
      n = Math.round(100 * (FW < 900 ? 0.7 : 1)),
      k = Math.max(sc, 0.55) * s,
      tilt = rr(-0.6, 0.6);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 6.2832 + rr(-0.04, 0.04);
      let sp,
        c1 = col,
        life,
        drag = 1.3,
        grav = 65 * k,
        size = 1.6,
        ks = 0.035,
        tw = false,
        cr = false,
        vx,
        vy;
      if (type === 1) {
        sp = 235 * k;
        vx = Math.cos(a) * sp;
        vy = Math.sin(a) * sp * 0.45;
        const ca = Math.cos(tilt),
          sa = Math.sin(tilt),
          rx = vx * ca - vy * sa,
          ry = vx * sa + vy * ca;
        vx = rx;
        vy = ry;
        life = rr(1.3, 1.7);
        drag = 1.5;
      } else {
        if (type === 2) {
          sp = rr(90, 230) * k;
          c1 = [255, 190, 80];
          life = rr(2.2, 3.2);
          drag = 0.9;
          grav = 115 * k;
          ks = 0.06;
          tw = true;
          size = 1.3;
        } else if (type === 3) {
          const inner = i % 2;
          sp = (inner ? 125 : 250) * rr(0.9, 1.05) * k;
          c1 = inner ? col2 : col;
          life = rr(1.3, 1.8);
        } else {
          sp = rr(150, 270) * k;
          life = rr(1.2, 1.8);
          if (type === 4) {
            c1 = [255, 235, 190];
            cr = true;
          }
        }
        vx = Math.cos(a) * sp;
        vy = Math.sin(a) * sp;
      }
      PT.push({
        x,
        y,
        vx,
        vy,
        life: 0,
        max: life,
        c: c1,
        drag,
        grav,
        size,
        ks,
        tw,
        cr,
        ph: rr(0, 6.28),
      });
    }
    GL.push({ x, y, r: rr(230, 330) * k, c: col.join(","), t: 0, max: 0.9 });
  }
  function fireworks(dt: number) {
    for (let i = RK.length - 1; i >= 0; i--) {
      const k = RK[i];
      k.t += dt;
      if (k.t < 0) continue;
      const u = Math.min(1, k.t / k.dur),
        e = 1 - Math.pow(1 - u, 2.4);
      k.x = k.sx + (k.tx - k.sx) * e + Math.sin(k.t * 16) * 2 * px;
      k.y = k.sy + (k.ty - k.sy) * e;
      if (PT.length < 1500)
        for (let j = 0; j < 2; j++)
          PT.push({
            x: k.x,
            y: k.y,
            vx: rr(-14, 14),
            vy: rr(10, 45),
            life: 0,
            max: rr(0.3, 0.55),
            c: [255, 185, 100],
            drag: 1,
            grav: 25,
            size: 1.3,
            ks: 0.02,
            tw: false,
            cr: false,
            ph: 0,
          });
      c.fillStyle = "rgba(255,236,190,.95)";
      c.beginPath();
      c.arc(k.x, k.y, 2.2 * px, 0, 6.2832);
      c.fill();
      if (u >= 1) {
        burst(k.tx, k.ty, k.s);
        RK.splice(i, 1);
      }
    }
    for (let i = GL.length - 1; i >= 0; i--) {
      const g = GL[i];
      g.t += dt;
      if (g.t > g.max) {
        GL.splice(i, 1);
        continue;
      }
      const a = 0.28 * Math.pow(1 - g.t / g.max, 2),
        gr = c.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
      gr.addColorStop(0, `rgba(${g.c},${a})`);
      gr.addColorStop(1, `rgba(${g.c},0)`);
      c.fillStyle = gr;
      c.fillRect(g.x - g.r, g.y - g.r, g.r * 2, g.r * 2);
    }
    for (let i = PT.length - 1; i >= 0; i--) {
      const p = PT[i];
      p.life += dt;
      if (p.life >= p.max) {
        if (p.cr)
          for (let j = 0; j < 3; j++)
            PT.push({
              x: p.x,
              y: p.y,
              vx: rr(-90, 90),
              vy: rr(-90, 90),
              life: 0,
              max: rr(0.2, 0.4),
              c: [255, 250, 230],
              drag: 2,
              grav: 0,
              size: 1.4,
              ks: 0.03,
              tw: true,
              cr: false,
              ph: rr(0, 6),
            });
        PT.splice(i, 1);
        continue;
      }
      const f = Math.exp(-p.drag * dt);
      p.vx *= f;
      p.vy = p.vy * f + p.grav * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      let a = Math.pow(1 - p.life / p.max, 1.15);
      if (p.tw) a *= 0.55 + 0.45 * Math.sin(T * 38 + p.ph);
      c.strokeStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${a.toFixed(3)})`;
      c.lineWidth = Math.max(1, p.size * px) * (0.6 + 0.6 * a);
      c.beginPath();
      c.moveTo(p.x - p.vx * p.ks, p.y - p.vy * p.ks);
      c.lineTo(p.x, p.y);
      c.stroke();
    }
  }
  /* keep the logo crisp: soften whatever passes behind the title */
  function titleMask() {
    c.save();
    c.globalCompositeOperation = "destination-out";
    c.translate(0.5 * FW, 0.24 * FH);
    c.scale(1, 0.445);
    const r = 0.24 * FW,
      g = c.createRadialGradient(0, 0, 0, 0, 0, r);
    g.addColorStop(0, "rgba(0,0,0,.92)");
    g.addColorStop(0.72, "rgba(0,0,0,.85)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    c.fillStyle = g;
    c.fillRect(-r, -r, 2 * r, 2 * r);
    c.restore();
  }
  function loop(now: number) {
    if (!ctx.alive) return;
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    T += dt;
    c.clearRect(0, 0, FW, FH);
    c.globalCompositeOperation = "lighter";
    const k = beat();
    beams(k);
    stageLights(k);
    crowd(k);
    if (FIREWORKS) {
      nextBurst -= dt;
      if (nextBurst <= 0) {
        launch();
        if (Math.random() < 0.25) launch(0.3);
        nextBurst = rr(2.2, 4.2);
      }
      nextFin -= dt;
      if (nextFin <= 0) {
        for (let i = 0; i < 8; i++) launch(i * 0.16);
        nextFin = rr(20, 28);
      }
      fireworks(dt);
    }
    titleMask();
    requestAnimationFrame(loop);
  }
  ctx.startFx = function () {
    if (running || RM) return;
    running = true;
    size();
    fx.style.opacity = "1";
    lastT = performance.now();
    if (FIREWORKS) {
      launch(0);
      launch(0.35);
    }
    requestAnimationFrame(loop);
  };
  ctx.on(window, "resize", () => {
    clearTimeout(ft);
    ft = setTimeout(() => running && size(), 150);
  });
  ctx.on(document, "pointerdown", ((e: PointerEvent) => {
    // tap the sky → fire a cracker there
    if (!running || !FIREWORKS || (e.target as Element).closest("[data-ui]")) return;
    const r = stage.getBoundingClientRect();
    launch(0, {
      x: ((e.clientX - r.left) / r.width) * FW,
      y: Math.min((e.clientY - r.top) / r.height, 0.5) * FH,
      s: 1,
    });
  }) as EventListener);
}
