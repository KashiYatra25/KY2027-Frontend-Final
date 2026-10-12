// @ts-nocheck — vendored canvas FX module ported verbatim from kashiyatra-countdown-clean.
// Kept as-is (it relied on noImplicitAny:false upstream); typing the dense per-frame math
// would risk altering behaviour. Scope is limited to this self-contained engine module.
import { smooth } from "./utils";
import type { IntroCtx } from "./types";

/** Party mode: beat-driven concert lights, tap-for-confetti chaos, the ENTER flash and the silhouette crowd. */
export function initPartyMode(ctx: IntroCtx) {
  const { S, RM, refs } = ctx;
  const { stage } = refs;

  if (RM) return;
  const hx = refs.hx,
    h = hx.getContext("2d")!,
    flash = refs.flash,
    f2 = refs.fx2,
    c = f2.getContext("2d")!;
  const R = (a, b) => a + Math.random() * (b - a),
    PI2 = Math.PI * 2,
    neon = (hu, l = 60, a = 1) => `hsla(${((hu % 360) + 360) % 360},100%,${l}%,${a})`;
  let HW,
    HH,
    hd,
    FW = 1,
    FH = 1,
    sc = 1,
    px = 1;
  function hs() {
    hd = Math.min(devicePixelRatio || 1, 1.5);
    HW = innerWidth;
    HH = innerHeight;
    hx.width = HW * hd;
    hx.height = HH * hd;
    h.setTransform(hd, 0, 0, hd, 0, 0);
  }
  hs();

  /* ---------- state ---------- */
  const HR: any[] = [],
    CF: any[] = [],
    GS: any[] = [],
    BK: any[] = [],
    PY: any[] = [],
    FT: any[] = [];
  let tT = performance.now(),
    run = false,
    bOrg = 0,
    lastBi = -1,
    dropShake = 0;
  function confetti(x, y, n, ang, spread, spd) {
    for (let i = 0; i < n && CF.length < 700; i++) {
      const a = ang + R(-spread, spread),
        v = spd * R(0.35, 1);
      CF.push({
        x,
        y,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v,
        rot: R(0, PI2),
        vr: R(-9, 9),
        w: R(6, 12),
        h: R(4, 8),
        hu: R(0, 360),
        ph: R(0, PI2),
        l: 0,
        m: R(3, 5.5),
      });
    }
  }
  const shock = (x, y, sp, hu, w) => HR.push({ x, y, r: 20, sp, hu, w });

  const _sf = ctx.startFx;
  ctx.startFx = function () {
    _sf && _sf();
    startCon();
  };

  /* ---------- CONCERT: wilder lights, lasers, pyro, glow-sticks, confetti, bass-pumped grade ---------- */
  function startCon() {
    if (run) return;
    run = true;
    csize();
    f2.style.opacity = "1";
    bOrg = performance.now();
  }
  function csize() {
    FW = stage.clientWidth;
    FH = stage.clientHeight;
    sc = FW / 1600;
    px = Math.max(0.75, sc);
    const d = Math.min(devicePixelRatio || 1, 1.5, Math.sqrt(2.2e6 / (FW * FH)));
    f2.width = (FW * d) | 0;
    f2.height = (FH * d) | 0;
    c.setTransform(d, 0, 0, d, 0, 0);
    c.lineCap = "round";
    GS.length = 0;
    const n = FW < 900 ? 45 : 80;
    for (let i = 0; i < n; i++) {
      const x = R(0.02, 0.98);
      let y = R(0.725, 0.8);
      if (x > 0.36 && x < 0.64 && y > 0.745) y = R(0.725, 0.745);
      GS.push({ x, y, hu: R(0, 360), ph: R(0, PI2), len: R(12, 22), sp: R(1.6, 3) });
    }
    BK.length = 0;
    for (let i = 0; i < 40; i++)
      BK.push({
        x: R(0, 1),
        y: R(0, 1),
        r: R(0.006, 0.022),
        hu: R(0, 360),
        sp: R(0.01, 0.05),
        ph: R(0, PI2),
      });
  }
  ctx.on(window, "resize", () => {
    hs();
    run && csize();
  });
  function fountains() {
    FT.push({ x: 0.495, y: 0.69, t: 0.9 }, { x: 0.79, y: 0.69, t: 0.9 });
  }
  function cannons() {
    const sp = HH * 1.2;
    confetti(0, HH * 0.95, 70, -1.05, 0.4, sp);
    confetti(HW, HH * 0.95, 70, -Math.PI + 1.05, 0.4, sp);
  }
  function onBeat(bi) {
    if (bi % 16 === 0 && bi > 0) cannons();
    if (bi % 8 === 0 || bi % 8 === 4) fountains();
  }
  function conFrame(now, dt) {
    const t = now / 1000,
      per = 60 / 124,
      el = (now - bOrg) / 1000,
      bi = Math.floor(el / per),
      ph = (((el % per) + per) % per) / per,
      k = Math.exp(-ph * 4.5) * (((bi % 8) + 8) % 8 === 0 ? 1.6 : 1),
      hu0 = (t * 45) % 360;
    curK = k;
    ctx.shared.K = k;
    ctx.shared.EL = el;
    if (bi !== lastBi) {
      lastBi = bi;
      onBeat(bi);
    }
    c.clearRect(0, 0, FW, FH);
    c.globalCompositeOperation = "lighter";
    c.fillStyle = neon(hu0, 50, 0.035 + 0.09 * k);
    c.fillRect(0, 0, FW, FH); // pulsing colour wash
    if (((bi % 8) + 8) % 8 === 0 && ph < 0.08) {
      c.fillStyle = `rgba(255,255,255,${0.14 * (1 - ph / 0.08)})`;
      c.fillRect(0, 0, FW, FH);
    } // soft downbeat strobe
    for (let i = 0; i < 14; i++) {
      // rainbow searchlights
      const ox = (0.53 + i * 0.0175) * FW,
        oy = 0.565 * FH,
        ang = (((i - 6.5) * 9 + 32 * Math.sin(t * (0.5 + i * 0.07) + i * 1.9)) * Math.PI) / 180,
        len = FH * (0.72 + 0.12 * Math.sin(t * 0.8 + i)),
        w = len * 0.06 * (1 + 0.3 * k),
        a = 0.2 + 0.22 * k,
        hh = hu0 + i * 26;
      c.save();
      c.translate(ox, oy);
      c.rotate(ang);
      let g = c.createLinearGradient(0, 0, 0, -len);
      g.addColorStop(0, neon(hh, 65, a));
      g.addColorStop(0.6, neon(hh, 60, a * 0.35));
      g.addColorStop(1, neon(hh, 60, 0));
      c.fillStyle = g;
      c.beginPath();
      c.moveTo(-3 * px, 0);
      c.lineTo(-w, -len);
      c.lineTo(w, -len);
      c.lineTo(3 * px, 0);
      c.fill();
      c.restore();
    }
    for (let j = 0; j < 2; j++)
      for (let i = 0; i < 6; i++) {
        // crossing lasers
        const ox = (j ? 0.76 : 0.5) * FW,
          oy = 0.58 * FH,
          ang =
            ((-90 +
              (i - 2.5) * (9 + 10 * Math.sin(t * 0.9 + j)) +
              (j ? -1 : 1) * 18 * Math.sin(t * 1.3 + i)) *
              Math.PI) /
            180,
          L = FH * 0.95,
          ex = ox + Math.cos(ang) * L,
          ey = oy + Math.sin(ang) * L,
          hh = hu0 + i * 40 + j * 120;
        c.strokeStyle = neon(hh, 60, 0.12 + 0.1 * k);
        c.lineWidth = 5 * px;
        c.beginPath();
        c.moveTo(ox, oy);
        c.lineTo(ex, ey);
        c.stroke();
        c.strokeStyle = neon(hh, 78, 0.45 + 0.4 * k);
        c.lineWidth = 1.2 * px;
        c.beginPath();
        c.moveTo(ox, oy);
        c.lineTo(ex, ey);
        c.stroke();
      }
    for (let i = 0; i < 3; i++) {
      const x = (0.5 + 0.4 * Math.sin(t * 0.4 + i * 2.1) * 0.9) * FW,
        y = 0.78 * FH,
        r = 0.2 * FW,
        g = c.createRadialGradient(x, y, 0, x, y, r); // floor wash over the crowd
      g.addColorStop(0, neon(hu0 + i * 110, 55, 0.1 + 0.16 * k));
      g.addColorStop(1, neon(hu0 + i * 110, 50, 0));
      c.fillStyle = g;
      c.fillRect(x - r, y - r, 2 * r, 2 * r);
    }
    for (const b of BK) {
      b.y -= b.sp * dt;
      if (b.y < -0.05) b.y = 1.05;
      const x = (b.x + 0.01 * Math.sin(t * 0.5 + b.ph)) * FW,
        y = b.y * FH,
        r = b.r * FW * (1 + 0.15 * k);
      c.fillStyle = neon(b.hu + t * 20, 60, 0.05 + 0.07 * k);
      c.beginPath();
      c.arc(x, y, r, 0, PI2);
      c.fill();
    }
    for (const g of GS) {
      const x = g.x * FW,
        y = g.y * FH - k * 8 * px * (0.5 + 0.5 * Math.sin(g.ph)),
        a = Math.sin(t * g.sp + g.ph) * 0.5 + k * 0.3,
        ex = x + Math.sin(a) * g.len * px,
        ey = y - Math.cos(a) * g.len * px,
        hh = g.hu + t * 30;
      c.strokeStyle = neon(hh, 60, 0.25 * (0.6 + 0.4 * k));
      c.lineWidth = 6 * px;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(ex, ey);
      c.stroke();
      c.strokeStyle = neon(hh, 82, 0.9 * (0.6 + 0.4 * k));
      c.lineWidth = 2 * px;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(ex, ey);
      c.stroke();
    }
    for (let i = FT.length - 1; i >= 0; i--) {
      const f = FT[i];
      f.t -= dt;
      if (f.t <= 0) {
        FT.splice(i, 1);
        continue;
      }
      for (let j = 0; j < 6; j++)
        PY.push({
          x: f.x * FW,
          y: f.y * FH,
          vx: R(-70, 70) * sc,
          vy: -R(260, 560) * sc,
          l: 0,
          m: R(0.7, 1.3),
          hu: R(15, 55),
        });
    } // pyro fountains
    for (let i = PY.length - 1; i >= 0; i--) {
      const p = PY[i];
      p.l += dt;
      if (p.l > p.m || PY.length > 900) {
        PY.splice(i, 1);
        continue;
      }
      p.vy += 720 * sc * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      const a = 1 - p.l / p.m;
      c.strokeStyle = neon(p.hu, 70, a);
      c.lineWidth = 1.8 * px;
      c.beginPath();
      c.moveTo(p.x - p.vx * 0.03, p.y - p.vy * 0.03);
      c.lineTo(p.x, p.y);
      c.stroke();
    }
    c.globalCompositeOperation = "destination-out";
    c.save();
    c.translate(0.5 * FW, 0.24 * FH);
    c.scale(1, 0.445);
    {
      const r = 0.24 * FW,
        g = c.createRadialGradient(0, 0, 0, 0, 0, r);
      g.addColorStop(0, "rgba(0,0,0,.85)");
      g.addColorStop(0.72, "rgba(0,0,0,.78)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      c.fillStyle = g;
      c.fillRect(-r, -r, 2 * r, 2 * r);
    }
    c.restore();
    dropShake *= Math.exp(-dt * 3);
    stage.style.filter = `saturate(${1.3 + 0.4 * k}) contrast(1.1) brightness(${1.02 + 0.1 * k})`;
    /* screen bounce (shake + beat zoom) removed: stage stays steady */
  }

  /* ---------- main viewport loop ---------- */
  function hloop(now) {
    if (!ctx.alive) return;
    const dt = Math.min(0.05, (now - tT) / 1000);
    tT = now;
    const t = now / 1000,
      MX = Math.max(HW, HH);
    h.clearRect(0, 0, HW, HH);
    h.globalCompositeOperation = "lighter";
    for (let i = HR.length - 1; i >= 0; i--) {
      const q = HR[i];
      q.r += q.sp * dt;
      const a = 1 - q.r / (MX * 0.8);
      if (a <= 0) {
        HR.splice(i, 1);
        continue;
      }
      h.strokeStyle = neon(q.hu, 60, a * 0.35);
      h.lineWidth = q.w * 3;
      h.beginPath();
      h.arc(q.x, q.y, q.r, 0, PI2);
      h.stroke();
      h.strokeStyle = neon(q.hu, 80, a * 0.9);
      h.lineWidth = q.w;
      h.beginPath();
      h.arc(q.x, q.y, q.r, 0, PI2);
      h.stroke();
    }
    h.globalCompositeOperation = "source-over";
    for (let i = CF.length - 1; i >= 0; i--) {
      const q = CF[i];
      q.l += dt;
      if (q.l > q.m || q.y > HH + 30) {
        CF.splice(i, 1);
        continue;
      }
      q.vy += 520 * dt;
      q.vx *= Math.exp(-1.2 * dt);
      q.vy *= Math.exp(-0.9 * dt);
      q.x += q.vx * dt;
      q.y += q.vy * dt;
      q.rot += q.vr * dt;
      h.save();
      h.translate(q.x, q.y);
      h.rotate(q.rot);
      h.scale(1, Math.cos(t * 8 + q.ph));
      h.fillStyle = neon(q.hu + t * 60, 60, Math.min(1, (q.m - q.l) * 2));
      h.fillRect(-q.w / 2, -q.h / 2, q.w, q.h);
      h.restore();
    }
    if (run) conFrame(now, dt);
    drawPeople(now);
    requestAnimationFrame(hloop);
  }

  /* ---------- tap anywhere in the concert / the ENTER plate = more chaos ---------- */
  ctx.on(document, "pointerdown", (e: PointerEvent) => {
    if (!run || (e.target as Element).closest("[data-ui]")) return;
    confetti(e.clientX, e.clientY, 45, -Math.PI / 2, 1.3, HH * 0.6);
    shock(e.clientX, e.clientY, 520, R(0, 360), 3);
    dropShake = Math.max(dropShake, 0.35);
    navigator.vibrate && navigator.vibrate(15);
  });
  ctx.enter = () => {
    if (S.enterGo) return;
    S.enterGo = true;
    flash.style.transition = "none";
    flash.style.opacity = "0.9";
    requestAnimationFrame(() => {
      flash.style.transition = "opacity 1s ease-out";
      flash.style.opacity = "0";
    });
    for (let i = 0; i < 5; i++) shock(HW / 2, HH * 0.8, 800 + i * 250, i * 70, 5);
    confetti(HW / 2, HH * 0.8, 220, -Math.PI / 2, 1.4, HH * 1.2);
    cannons();
    fountains();
    dropShake = 1;
    navigator.vibrate && navigator.vibrate([30, 20, 60]);
    ctx.timeout(() => ctx.enterMain(), 300);
  };

  /* ---------- PEOPLE: a living silhouette crowd in front of the stage (jumping, waving, mexican-wave, phone lights) ---------- */
  const pp = refs.pp,
    pc2 = pp.getContext("2d")!;
  let ROWS: any[] = [],
    doneAt = 0,
    curK = 0;
  function buildPeople() {
    pp.width = HW * hd;
    pp.height = HH * hd;
    pc2.setTransform(hd, 0, 0, hd, 0, 0);
    const mk = (n, u, yb, col, rim) => ({
      u,
      yb,
      col,
      rim,
      P: Array.from({ length: n }, (_, i) => ({
        x: (i + R(-0.12, 0.12) + 0.5) / n,
        s: R(0.94, 1.06),
        ph: R(0, PI2),
        arm: R(0.3, 1),
        phone: Math.random() < 0.2,
        hu: R(0, 360),
        j: R(0.85, 1.15),
        w: R(0.94, 1.1),
        h: R(0.95, 1.07),
        hs: (() => {
          const z = Math.random();
          return z < 0.26 ? 0 : z < 0.46 ? 1 : z < 0.68 ? 2 : z < 0.78 ? 3 : z < 0.88 ? 4 : 5;
        })(),
        hand: Math.random() < 0.72 ? 0 : 2,
        lean: R(-0.06, 0.06),
        hgt: R(-0.04, 0.1),
        sp: R(-0.12, 0.14),
        turn: R(-0.08, 0.08),
      })),
    });
    const n = HW < 700 ? 16 : HW < 1200 ? 26 : 38;
    ROWS = [
      mk(Math.round(n * 1.2), HH * 0.034, HH * 0.985, "#120f1e", 0.3),
      mk(n, HH * 0.049, HH * 1.03, "#06070f", 0.55),
      mk(Math.round(n * 0.78), HH * 0.068, HH * 1.1, "#020309", 0.8),
    ];
  }
  function drawPeople(now) {
    const t = now / 1000;
    pc2.clearRect(0, 0, HW, HH);
    if (!S.done) return;
    if (!doneAt) {
      doneAt = now;
      buildPeople();
    }
    const pe = smooth(0, 1, (now - doneAt) / 1800),
      k = curK,
      hu0 = (t * 45) % 360,
      exc = Math.min(1, dropShake);
    for (const row of ROWS)
      for (const q of row.P) {
        const u = row.u * q.s,
          cd = Math.abs(q.x - 0.5),
          x = q.x * HW + Math.sin(t * 2.3 + q.x * 6 + q.ph * 0.25) * u * 0.4 * (1 + 0.5 * k);
        let sink = u * 0.6 * Math.max(0, 1 - cd / 0.2); // same gentle V as before; only the few people right below the button sit a bit higher so their heads show
        const jump = (k * u * 0.55 + exc * u * 0.9) * q.j * (0.6 + 0.4 * Math.sin(t * 3 + q.ph)),
          yb = row.yb - jump - q.hgt * u + sink + (1 - pe) * HH * 0.22;
        const wave = 0.5 + 0.5 * Math.sin(q.x * 7 - t * 2.6),
          up = Math.min(1, (q.arm > 0.45 ? 0.6 : 0.15) + wave * 0.7 + k * 0.25 + exc * 0.4);
        const hh = hu0 + q.x * 180,
          rim = neon(hh, 62, row.rim * (0.35 + 0.65 * k));
        const arms = q.arm < 0.2 ? [] : q.arm < 0.6 ? [q.hs % 2 ? 1 : -1] : [-1, 1];
        const draw = (dy, col, pass) => {
          const sw = u * q.w,
            lean = Math.sin(t * 1.6 + q.ph) * u * (0.07 + 0.1 * k) + q.lean * u,
            by = yb + dy,
            hx0 = x + lean + q.turn * u,
            bob = Math.sin(t * 6 + q.ph) * u * 0.05 * k,
            hy0 = by - u * 2.62 + bob,
            rx = u * 0.4 * q.h,
            ry = u * 0.5 * q.h;
          pc2.fillStyle = col;
          pc2.strokeStyle = col;
          pc2.lineCap = "round";
          pc2.lineJoin = "round";
          for (const sd of arms) {
            const sx = x + sd * sw * 0.95,
              sy = by - u * 1.7,
              ang = 1.35 - (1.35 - 0.22) * up + q.sp * up + Math.sin(t * 4 + q.ph + sd) * 0.2 * up,
              L = u * 1.75;
            const hx2 = sx + Math.sin(ang) * L * sd,
              hy2 = sy - Math.cos(ang) * L,
              bend = 1 - up * 0.7;
            const ex = (sx + hx2) / 2 + sd * u * 0.4 * bend,
              ey = (sy + hy2) / 2 + u * 0.3 * bend;
            pc2.lineWidth = u * 0.38;
            pc2.beginPath();
            pc2.moveTo(sx, sy);
            pc2.lineTo(ex, ey);
            pc2.stroke();
            pc2.lineWidth = u * 0.3;
            pc2.beginPath();
            pc2.moveTo(ex, ey);
            pc2.lineTo(hx2, hy2);
            pc2.stroke();
            const dir = Math.atan2(hy2 - ey, hx2 - ex),
              wig = Math.sin(t * 7 + q.ph + sd * 2) * 0.12 * (0.4 + k);
            pc2.beginPath();
            pc2.ellipse(hx2, hy2, u * 0.17, u * 0.2, dir + Math.PI / 2, 0, PI2);
            pc2.fill();
            if (q.hand === 0) {
              pc2.lineWidth = u * 0.075;
              for (let f = -2; f <= 2; f++) {
                const a = dir + f * 0.34 + wig * f,
                  fl = u * (0.3 - Math.abs(f) * 0.03);
                pc2.beginPath();
                pc2.moveTo(hx2, hy2);
                pc2.lineTo(hx2 + Math.cos(a) * fl, hy2 + Math.sin(a) * fl);
                pc2.stroke();
              }
            }
            if (pass && q.phone && sd === arms[arms.length - 1]) {
              pc2.save();
              pc2.fillStyle = "rgba(255,250,235,.95)";
              pc2.fillRect(hx2 - u * 0.12, hy2 - u * 0.5, u * 0.24, u * 0.36);
              const g = pc2.createRadialGradient(
                hx2,
                hy2 - u * 0.3,
                0,
                hx2,
                hy2 - u * 0.3,
                u * 1.6
              );
              g.addColorStop(0, "rgba(255,245,220,.55)");
              g.addColorStop(1, "rgba(255,245,220,0)");
              pc2.globalCompositeOperation = "lighter";
              pc2.fillStyle = g;
              pc2.fillRect(hx2 - u * 1.6, hy2 - u * 1.9, u * 3.2, u * 3.2);
              pc2.restore();
              pc2.fillStyle = col;
            }
          }
          if (q.hs === 2) {
            const sw2 = Math.sin(t * 2 + q.ph) * u * 0.1 * (0.5 + k);
            pc2.beginPath();
            pc2.moveTo(hx0 - rx * 0.9, hy0 - ry * 0.2);
            pc2.bezierCurveTo(
              hx0 - rx * 1.5,
              hy0 + u * 0.5,
              hx0 - rx * 1.6 + sw2,
              hy0 + u * 1.05,
              hx0 - rx * 1.2 + sw2,
              hy0 + u * 1.35
            );
            pc2.lineTo(hx0 + rx * 1.2 + sw2, hy0 + u * 1.35);
            pc2.bezierCurveTo(
              hx0 + rx * 1.6 + sw2,
              hy0 + u * 1.05,
              hx0 + rx * 1.5,
              hy0 + u * 0.5,
              hx0 + rx * 0.9,
              hy0 - ry * 0.2
            );
            pc2.closePath();
            pc2.fill();
          }
          pc2.beginPath();
          pc2.moveTo(x - sw * 1.32, by + u * 0.7);
          pc2.bezierCurveTo(
            x - sw * 1.38,
            by - u * 1.1,
            x - sw * 1.05,
            by - u * 1.75,
            hx0 - u * 0.34,
            by - u * 1.98
          );
          pc2.lineTo(hx0 - u * 0.2, by - u * 2.2);
          pc2.lineTo(hx0 + u * 0.2, by - u * 2.2);
          pc2.lineTo(hx0 + u * 0.34, by - u * 1.98);
          pc2.bezierCurveTo(
            x + sw * 1.05,
            by - u * 1.75,
            x + sw * 1.38,
            by - u * 1.1,
            x + sw * 1.32,
            by + u * 0.7
          );
          pc2.closePath();
          pc2.fill();
          pc2.beginPath();
          pc2.ellipse(hx0, hy0, rx, ry, Math.sin(t * 2.2 + q.ph) * 0.16 * (0.4 + k), 0, PI2);
          pc2.fill();
          if (q.hs === 0) {
            pc2.beginPath();
            pc2.ellipse(hx0, hy0 - ry * 0.12, rx * 1.1, ry * 1.04, 0, 0, PI2);
            pc2.fill();
          } else if (q.hs === 1) {
            for (let c = 0; c < 9; c++) {
              const a = (c / 9) * PI2;
              pc2.beginPath();
              pc2.arc(
                hx0 + Math.cos(a) * rx * 1.05,
                hy0 - ry * 0.1 + Math.sin(a) * ry * 1.0,
                u * 0.2,
                0,
                PI2
              );
              pc2.fill();
            }
          } else if (q.hs === 3) {
            pc2.beginPath();
            pc2.arc(hx0 + u * 0.04, hy0 - ry * 1.15, u * 0.22, 0, PI2);
            pc2.fill();
          } else if (q.hs === 4) {
            pc2.beginPath();
            pc2.ellipse(hx0, hy0 - ry * 0.62, u * 0.66, u * 0.09, 0, 0, PI2);
            pc2.fill();
            pc2.beginPath();
            pc2.moveTo(hx0 - u * 0.3, hy0 - ry * 0.6);
            pc2.quadraticCurveTo(hx0 - u * 0.3, hy0 - ry * 1.3, hx0, hy0 - ry * 1.28);
            pc2.quadraticCurveTo(hx0 + u * 0.3, hy0 - ry * 1.3, hx0 + u * 0.3, hy0 - ry * 0.6);
            pc2.closePath();
            pc2.fill();
          } else if (q.hs === 5) {
            pc2.lineWidth = u * 0.2;
            pc2.beginPath();
            pc2.moveTo(hx0 + rx * 0.7, hy0 - ry * 0.5);
            pc2.quadraticCurveTo(
              hx0 + rx * 1.9 + Math.sin(t * 3 + q.ph) * u * 0.2,
              hy0 - ry * 0.1,
              hx0 + rx * 1.5 + Math.sin(t * 3 + q.ph) * u * 0.3,
              hy0 + u * 0.8
            );
            pc2.stroke();
            pc2.beginPath();
            pc2.ellipse(hx0, hy0 - ry * 0.12, rx * 1.08, ry * 1.03, 0, 0, PI2);
            pc2.fill();
          }
          if (pass) {
            const g = pc2.createLinearGradient(0, hy0 - u * 0.9, 0, by + u * 0.2);
            g.addColorStop(0, "rgba(255,170,90," + (0.07 * row.rim + 0.01) + ")");
            g.addColorStop(0.35, "rgba(255,140,80," + 0.015 * row.rim + ")");
            g.addColorStop(1, "rgba(0,0,0,.45)");
            pc2.save();
            pc2.fillStyle = g;
            pc2.beginPath();
            pc2.moveTo(x - sw * 1.32, by + u * 0.7);
            pc2.bezierCurveTo(
              x - sw * 1.38,
              by - u * 1.1,
              x - sw * 1.05,
              by - u * 1.75,
              hx0 - u * 0.34,
              by - u * 1.98
            );
            pc2.lineTo(hx0 + u * 0.34, by - u * 1.98);
            pc2.bezierCurveTo(
              x + sw * 1.05,
              by - u * 1.75,
              x + sw * 1.38,
              by - u * 1.1,
              x + sw * 1.32,
              by + u * 0.7
            );
            pc2.closePath();
            pc2.fill();
            pc2.beginPath();
            pc2.ellipse(hx0, hy0, rx, ry, 0, 0, PI2);
            pc2.fill();
            pc2.restore();
          }
        };
        draw(-Math.max(2, u * 0.07), rim, false);
        draw(0, row.col, true);
      }
  }
  function peopleResize() {
    if (doneAt) buildPeople();
  }
  ctx.on(window, "resize", () => ctx.timeout(peopleResize, 200));
  requestAnimationFrame(hloop);
}
