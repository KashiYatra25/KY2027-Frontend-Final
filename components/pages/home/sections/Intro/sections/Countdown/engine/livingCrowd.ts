// Canvas FX module ported from kashiyatra-countdown-clean.
// Living crowd: the photo's own crowd sliced into strips that bounce on the beat.
import type { IntroCtx, ArmSilhouette, StandingSilhouette, CrowdLayer } from "./types";

/** Living crowd: the photo's own crowd is sliced into strips that bounce on the beat, plus silhouettes that wave and jump. */
export function initLivingCrowd(ctx: IntroCtx) {
  const { S, RM, refs } = ctx;
  const { stage, base } = refs;

  if (RM) return;
  const PI2 = Math.PI * 2,
    R = (a: number, b: number) => a + Math.random() * (b - a),
    per = 60 / 124;
  const hash = (i: number) => {
    const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  };
  const neon = (hu: number, l = 60, a = 1) => `hsla(${((hu % 360) + 360) % 360},100%,${l}%,${a})`;
  const mv = refs.mv;
  const m = mv.getContext("2d")!,
    tc = document.createElement("canvas"),
    t2 = tc.getContext("2d")!;
  let FW = 0,
    FH = 0,
    d = 1,
    ARM: ArmSilhouette[] = [],
    STD: StandingSilhouette[] = [],
    doneT = 0;

  /* y0/y1 = band of the photo (fraction of image height) · amp = jump height · wv = wave density · rate = jumps per beat */
  const LAY = [
    {
      y0: 0.708,
      y1: 0.772,
      amp: 0.013,
      sway: 0.0014,
      wv: 11,
      jit: 1.6,
      rate: 1,
      fT: 0.3,
      fB: 0.38,
      plate: false,
      seed: 0,
    },
    {
      y0: 0.77,
      y1: 0.885,
      amp: 0.014,
      sway: 0.0024,
      wv: 7,
      jit: 1.2,
      rate: 0.5,
      fT: 0.22,
      fB: 0.3,
      plate: true,
      seed: 900,
    },
    {
      y0: 0.862,
      y1: 1.0,
      amp: 0.026,
      sway: 0.0045,
      wv: 5,
      jit: 1.0,
      rate: 0.5,
      fT: 0.18,
      fB: 0,
      plate: true,
      seed: 1800,
    },
    {
      y0: 0.655,
      y1: 0.722,
      amp: 0.0045,
      sway: 0.0006,
      wv: 14,
      jit: 0.3,
      rate: 1,
      fT: 0.4,
      fB: 0.4,
      plate: false,
      seed: 2700,
      pulse: true,
      x0: 0.5,
      x1: 0.74,
    },
  ];
  const smoothS = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };

  function size() {
    FW = stage.clientWidth;
    FH = stage.clientHeight;
    if (!FW) return;
    d = Math.min(devicePixelRatio || 1, 1.5, Math.sqrt(2.6e6 / (FW * FH)));
    mv.width = Math.round(FW * d);
    mv.height = Math.round(FH * d);
    m.setTransform(d, 0, 0, d, 0, 0);
    m.lineCap = "round";
    tc.width = mv.width;
    tc.height = Math.ceil(0.22 * FH * d);
    t2.setTransform(d, 0, 0, d, 0, 0);
    const nA = FW < 900 ? 56 : 112,
      half = nA >> 1,
      A = () => {
        const z = Math.random(),
          h = Math.random();
        return {
          hs: z < 0.26 ? 0 : z < 0.46 ? 1 : z < 0.68 ? 2 : z < 0.78 ? 3 : z < 0.88 ? 4 : 5,
          hand: h < 0.72 ? 0 : 2,
          w: R(0.96, 1.08),
          h: R(0.96, 1.06),
          turn: R(-0.06, 0.06),
        };
      };
    ARM = [];
    for (let r = 0; r < 2; r++)
      for (let i = 0; i < half; i++) {
        const x = Math.min(0.995, Math.max(0.005, (i + (r ? 0.5 : 0.1) + R(-0.07, 0.07)) / half)),
          y = r ? R(0.75, 0.753) : R(0.731, 0.734);
        ARM.push({
          x,
          y,
          u: FH * (0.0075 + (y - 0.72) * 0.17),
          ph: R(0, PI2),
          wf: R(3, 6.5),
          both: Math.random() < 0.7,
          gear: Math.random() < 0.22 ? 1 : Math.random() < 0.4 ? 2 : 0,
          hu: R(0, 360),
          hs2: R(0, 1),
          ...A(),
        });
      }
    ARM.sort((a, b) => a.y - b.y);
    const nS = FW < 900 ? 7 : 11;
    STD = [];
    for (const side of [0, 1])
      for (let i = 0; i < nS; i++) {
        const x = (side ? 0.655 : 0.01) + ((i + 0.5) / nS + R(-0.025, 0.025)) * 0.335;
        STD.push({
          ...A(),
          x,
          y: R(0.885, 0.945),
          u: FH * R(0.029, 0.037),
          ph: R(0, PI2),
          wf: R(3.5, 7),
          hu: R(0, 360),
          dl: R(0, 1.1),
          j: R(0.7, 1.3),
          both: Math.random() < 0.8,
          gear: Math.random() < 0.3 ? 1 : Math.random() < 0.5 ? 2 : 0,
        });
      }
    STD.sort((a, b) => a.y - b.y);
  }

  function warp(L: CrowdLayer, tt: number, k: number, E: number) {
    const bh = (L.y1 - L.y0) * FH,
      mg = 0.03 * FH,
      th = bh + mg * 2,
      oy = L.y0 * FH - mg;
    const n = Math.min(340, Math.ceil(FW / Math.max(4, FW / 300))),
      wpx = FW / n,
      iw = base.naturalWidth,
      ih = base.naturalHeight;
    t2.globalCompositeOperation = "source-over";
    t2.globalAlpha = 1;
    t2.clearRect(0, 0, FW, th);
    const i0 = L.x0 ? Math.floor(L.x0 * n) : 0,
      i1 = L.x1 ? Math.ceil(L.x1 * n) : n;
    for (let i = i0; i < i1; i++) {
      const u = (i + 0.5) / n,
        h = hash(i + L.seed);
      const pf = L.plate ? 1 - smoothS(0.355, 0.395, u) * (1 - smoothS(0.605, 0.645, u)) : 1;
      const b = L.pulse
        ? k * (0.6 + 0.4 * Math.sin(u * 20 + tt * 3))
        : Math.abs(Math.sin(Math.PI * tt * L.rate + u * L.wv + h * L.jit));
      const up = L.amp * FH * (0.5 + 0.75 * k) * E * b * pf * (0.7 + 0.6 * hash(i * 3.7 + L.seed));
      const sw =
        (Math.sin(tt * (2 + h * 1.5) + u * 6) * 0.6 + Math.sin(tt * 7 + h * 9) * 0.4) *
        L.sway *
        FH *
        E *
        pf;
      if (L.x0 != null && L.x1 != null)
        t2.globalAlpha = smoothS(L.x0, L.x0 + 0.05, u) * (1 - smoothS(L.x1 - 0.05, L.x1, u));
      t2.drawImage(
        base,
        ((i * wpx) / FW) * iw,
        L.y0 * ih,
        (wpx / FW) * iw + 1,
        (L.y1 - L.y0) * ih,
        i * wpx + sw,
        mg - up,
        wpx + 1.2,
        bh + up
      );
    }
    t2.globalAlpha = 1;
    t2.globalCompositeOperation = "destination-in";
    const g = t2.createLinearGradient(0, 0, 0, th);
    g.addColorStop(mg / th, "rgba(0,0,0,0)");
    g.addColorStop(Math.min(0.999, (mg + L.fT * bh) / th), "rgba(0,0,0,1)");
    g.addColorStop(Math.max(0.001, (mg + bh * (1 - L.fB)) / th), "rgba(0,0,0,1)");
    g.addColorStop(L.fB ? (mg + bh) / th : 1, L.fB ? "rgba(0,0,0,0)" : "rgba(0,0,0,1)");
    t2.fillStyle = g;
    t2.fillRect(0, 0, FW, th);
    m.drawImage(tc, 0, 0, tc.width, Math.ceil(th * d), 0, oy, FW, th);
  }

  /* silhouette person: head, shoulders, raised waving arms, optional phone light / glow-stick */
  function person(
    p: ArmSilhouette | StandingSilhouette,
    t: number,
    k: number,
    E: number,
    jump: number,
    rimHue: number,
    rimA: number,
    col: string,
    hasLegs: boolean
  ) {
    const u = p.u;

    // Only apply the downward grounding offset if they have legs
    const groundOffset = hasLegs ? u * 4.0 : 0;

    const x =
        p.x * FW +
        (p.turn || 0) * p.u +
        Math.sin(t * 2.3 + p.x * 6 + p.ph * 0.25) * p.u * 0.4 * (1 + 0.5 * k),
      y = p.y * FH - jump + groundOffset,
      sides = p.both ? [-1, 1] : [(p.hs2 ?? p.hs) > 0.5 ? 1 : -1];
    const raise = Math.min(1, 0.3 + 0.7 * E) * (0.75 + 0.25 * Math.sin(t * 1.7 + p.ph)),
      L = u * (2.1 + 0.7 * k) * raise,
      sw = u * (p.w || 1),
      rx = u * 0.4 * (p.h || 1),
      ry = u * 0.5 * (p.h || 1),
      hs = p.hs || 0,
      bend = 1 - raise * 0.7,
      tilt = Math.sin(t * 2.2 + p.ph) * 0.16 * (0.4 + k),
      bob = Math.sin(t * 6 + p.ph) * u * 0.05 * k;
    for (const pass of [0, 1]) {
      const c = pass ? col : neon(rimHue, 62, rimA),
        o = pass ? 0 : -Math.max(1, u * 0.1),
        hy = y + bob + (pass ? 0 : o);
      m.globalCompositeOperation = pass ? "source-over" : "lighter";
      m.fillStyle = c;
      m.strokeStyle = c;
      m.lineCap = "round";
      m.lineJoin = "round";
      const X = x + (pass ? 0 : 0);
      for (const sd of sides) {
        const sx = X + sd * sw * 0.95,
          sy = y + u * 1.1 + (pass ? 0 : o),
          th =
            sd * 0.32 +
            Math.sin(t * (p.wf ?? 0) + p.ph + sd) * 0.55 * E +
            Math.sin(t * 1.3 + p.ph) * 0.12,
          hx = sx + Math.sin(th) * L,
          hy2 = sy - Math.cos(th) * L - k * u * 0.5 * E,
          ex = (sx + hx) / 2 + sd * u * 0.34 * bend,
          ey = (sy + hy2) / 2 + u * 0.25 * bend;
        m.lineWidth = u * 0.34;
        m.beginPath();
        m.moveTo(sx, sy);
        m.lineTo(ex, ey);
        m.stroke();
        m.lineWidth = u * 0.27;
        m.beginPath();
        m.moveTo(ex, ey);
        m.lineTo(hx, hy2);
        m.stroke();
        const dir = Math.atan2(hy2 - ey, hx - ex),
          wg = Math.sin(t * 7 + p.ph + sd * 2) * 0.12 * (0.4 + k);
        m.beginPath();
        m.ellipse(hx, hy2, u * 0.16, u * 0.19, dir + Math.PI / 2, 0, PI2);
        m.fill();
        if (p.hand === 0) {
          m.lineWidth = Math.max(0.8, u * 0.07);
          for (let f = -2; f <= 2; f++) {
            const a = dir + f * 0.34 + wg * f,
              fl = u * (0.28 - Math.abs(f) * 0.03);
            m.beginPath();
            m.moveTo(hx, hy2);
            m.lineTo(hx + Math.cos(a) * fl, hy2 + Math.sin(a) * fl);
            m.stroke();
          }
        }
        if (pass && p.gear) {
          const gl = m.createRadialGradient(hx, hy2, 0, hx, hy2, u * 1.6),
            hh = p.gear === 1 ? 40 : rimHue + 60;
          m.globalCompositeOperation = "lighter";
          gl.addColorStop(
            0,
            p.gear === 1 ? `rgba(255,246,220,${0.38 + 0.22 * k})` : neon(hh, 65, 0.4 + 0.25 * k)
          );
          gl.addColorStop(1, neon(hh, 60, 0));
          m.fillStyle = gl;
          m.fillRect(hx - u * 1.6, hy2 - u * 1.6, u * 3.2, u * 3.2);
          if (p.gear === 1) {
            m.fillStyle = "rgba(255,252,240,.95)";
            m.fillRect(hx - u * 0.14, hy2 - u * 0.45, u * 0.28, u * 0.4);
          } else {
            m.strokeStyle = neon(hh, 80, 0.95);
            m.lineWidth = Math.max(1.5, u * 0.22);
            m.beginPath();
            m.moveTo(hx, hy2);
            m.lineTo(hx + Math.sin(th) * u * 0.9, hy2 - Math.cos(th) * u * 0.9);
            m.stroke();
          }
          m.globalCompositeOperation = "source-over";
          m.strokeStyle = col;
          m.fillStyle = col;
        }
      }
      /* long hair behind shoulders */
      if (hs === 2) {
        const sw2 = Math.sin(t * 2 + p.ph) * u * 0.08 * (0.5 + k);
        m.beginPath();
        m.moveTo(X - rx * 0.9, hy - ry * 0.2);
        m.bezierCurveTo(
          X - rx * 1.5,
          hy + u * 0.5,
          X - rx * 1.6 + sw2,
          hy + u * 1.1,
          X - rx * 1.2 + sw2,
          hy + u * 1.5
        );
        m.lineTo(X + rx * 1.2 + sw2, hy + u * 1.5);
        m.bezierCurveTo(
          X + rx * 1.6 + sw2,
          hy + u * 1.1,
          X + rx * 1.5,
          hy + u * 0.5,
          X + rx * 0.9,
          hy - ry * 0.2
        );
        m.closePath();
        m.fill();
      }

      if (hasLegs) {
        /* torso: neck + sloped shoulders tapering into hips */
        const yN = y + u * 0.78 + (pass ? 0 : o),
          yS = y + u * 1.05 + (pass ? 0 : o),
          yHip = y + u * 4.1 + (pass ? 0 : o);

        m.beginPath();
        m.moveTo(X - sw * 0.9, yHip);
        m.bezierCurveTo(X - sw * 1.3, yS + u * 1.2, X - sw * 1.15, yS - u * 0.05, X - u * 0.34, yN);
        m.lineTo(X - u * 0.2, hy + ry * 0.7);
        m.lineTo(X + u * 0.2, hy + ry * 0.7);
        m.lineTo(X + u * 0.34, yN);
        m.bezierCurveTo(
          X + sw * 1.15,
          yS - u * 0.05,
          X + sw * 1.3,
          yS + u * 1.2,
          X + sw * 0.9,
          yHip
        );
        m.quadraticCurveTo(X, yHip + u * 0.2, X - sw * 0.9, yHip);
        m.closePath();
        m.fill();

        /* dancing legs */
        const legL = u * 3.0;
        const yKnee = yHip + legL * 0.45;
        const yFoot = yHip + legL;

        const dL = Math.sin(t * 5.5 + p.ph) * u * 1.1 * (0.3 + k);
        const dR = Math.sin(t * 5.5 + p.ph + Math.PI) * u * 1.1 * (0.3 + k);

        const liftL = Math.max(0, Math.sin(t * 5.5 + p.ph)) * u * 0.7 * (0.5 + k);
        const liftR = Math.max(0, Math.sin(t * 5.5 + p.ph + Math.PI)) * u * 0.7 * (0.5 + k);

        m.lineWidth = u * 0.45;
        // Left Leg
        m.beginPath();
        m.moveTo(X - sw * 0.45, yHip - u * 0.1);
        m.lineTo(X - sw * 0.55 + dL * 0.5, yKnee - liftL);
        m.lineTo(X - sw * 0.6 + dL, yFoot - liftL * 1.5);
        m.stroke();

        // Right Leg
        m.beginPath();
        m.moveTo(X + sw * 0.45, yHip - u * 0.1);
        m.lineTo(X + sw * 0.55 + dR * 0.5, yKnee - liftR);
        m.lineTo(X + sw * 0.6 + dR, yFoot - liftR * 1.5);
        m.stroke();
      } else {
        /* Original half-body torso (skirt style) */
        const yN = y + u * 0.78 + (pass ? 0 : o),
          yS = y + u * 1.05 + (pass ? 0 : o),
          yB = y + u * 3.6;
        m.beginPath();
        m.moveTo(X - sw * 1.35, yB);
        m.bezierCurveTo(X - sw * 1.4, yS + u * 0.6, X - sw * 1.05, yS - u * 0.05, X - u * 0.34, yN);
        m.lineTo(X - u * 0.2, hy + ry * 0.7);
        m.lineTo(X + u * 0.2, hy + ry * 0.7);
        m.lineTo(X + u * 0.34, yN);
        m.bezierCurveTo(
          X + sw * 1.05,
          yS - u * 0.05,
          X + sw * 1.4,
          yS + u * 0.6,
          X + sw * 1.35,
          yB
        );
        m.closePath();
        m.fill();
      }

      /* head + hair */
      m.beginPath();
      m.ellipse(X, hy, rx, ry, tilt, 0, PI2);
      m.fill();
      if (hs === 0) {
        m.beginPath();
        m.ellipse(X, hy - ry * 0.12, rx * 1.1, ry * 1.04, 0, 0, PI2);
        m.fill();
      } else if (hs === 1) {
        for (let q = 0; q < 9; q++) {
          const a = (q / 9) * PI2;
          m.beginPath();
          m.arc(X + Math.cos(a) * rx * 1.05, hy - ry * 0.1 + Math.sin(a) * ry, u * 0.2, 0, PI2);
          m.fill();
        }
      } else if (hs === 3) {
        m.beginPath();
        m.arc(X + u * 0.04, hy - ry * 1.15, u * 0.22, 0, PI2);
        m.fill();
      } else if (hs === 4) {
        m.beginPath();
        m.ellipse(X, hy - ry * 0.62, u * 0.66, u * 0.09, 0, 0, PI2);
        m.fill();
        m.beginPath();
        m.moveTo(X - u * 0.3, hy - ry * 0.6);
        m.quadraticCurveTo(X - u * 0.3, hy - ry * 1.3, X, hy - ry * 1.28);
        m.quadraticCurveTo(X + u * 0.3, hy - ry * 1.3, X + u * 0.3, hy - ry * 0.6);
        m.closePath();
        m.fill();
      } else if (hs === 5) {
        const sg = Math.sin(t * 3 + p.ph);
        m.lineWidth = u * 0.2;
        m.beginPath();
        m.moveTo(X + rx * 0.7, hy - ry * 0.5);
        m.quadraticCurveTo(
          X + rx * 1.9 + sg * u * 0.2,
          hy - ry * 0.1,
          X + rx * 1.5 + sg * u * 0.3,
          hy + u * 0.8
        );
        m.stroke();
        m.beginPath();
        m.ellipse(X, hy - ry * 0.12, rx * 1.08, ry * 1.03, 0, 0, PI2);
        m.fill();
      }
    }
  }

  function loop(now: number) {
    if (!ctx.alive) return;
    requestAnimationFrame(loop);
    if (!FW) return;
    if (!S.done) return;
    const t = now / 1000;
    if (!doneT) doneT = t;
    const k = ctx.shared.K ?? 0.25,
      tt = (ctx.shared.EL ?? t) / per;
    const surge = Math.exp(-(t - doneT) * 0.45),
      Ef = Math.min(1.5, 1 + 0.55 * surge);
    m.globalCompositeOperation = "source-over";
    m.globalAlpha = 1;
    m.clearRect(0, 0, FW, FH);
    for (const L of LAY) warp(L, tt, k, Ef);
    m.globalAlpha = 1;
    const hu0 = (t * 45) % 360;
    for (const p0 of ARM) {
      const cdv = Math.abs(p0.x - 0.5);
      const p = cdv < 0.2 ? { ...p0, y: p0.y + ((0.2 - cdv) / 0.2) * 0.02 } : p0; // gentle V toward the button
      const u = p.x,
        jump =
          Math.abs(Math.sin(Math.PI * tt + u * 11)) * LAY[0].amp * FH * (0.5 + 0.75 * k) * Ef * 0.9;
      // TRUE = They get the dancing legs
      person(p, t, k, Ef, jump, hu0 + p.x * 220, 0.35 + 0.5 * k, "#04050a", true);
    }
    // seated crowd STANDS UP and goes wild
    for (const p of STD) {
      const pe = smoothS(p.dl ?? 0, (p.dl ?? 0) + 1.6, t - doneT);
      if (pe <= 0) continue;
      const bounce = Math.abs(Math.sin(Math.PI * tt * 0.5 * (1 + (p.j > 1 ? 1 : 0)) + p.ph * 0.3)),
        jump = p.u * (0.45 + 0.7 * k) * bounce * p.j * Ef * 0.8,
        q = { ...p, y: p.y + (1 - pe) * 0.12 };
      m.globalAlpha = Math.min(1, pe * 1.4);
      // FALSE = They get the original half-bodies at the bottom edge
      person(q, t, k, Ef, jump, hu0 + p.x * 220 + 30, 0.4 + 0.5 * k, "#03040a", false);
    }
    m.globalAlpha = 1;
    m.globalCompositeOperation = "source-over";
  }
  const start = () => {
    size();
    requestAnimationFrame(loop);
  };
  if (base.complete && base.naturalWidth) start();
  else ctx.on(base, "load", start);
  let rz: ReturnType<typeof setTimeout> | undefined;
  ctx.on(window, "resize", () => {
    clearTimeout(rz);
    rz = setTimeout(size, 200);
  });
}
