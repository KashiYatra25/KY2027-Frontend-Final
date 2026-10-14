"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useIntro } from "@/components/pages/home/sections/Intro/context/IntroContext";
import s from "./NeonStage.module.css";

// Scene geometry (matches /intro/NeonStage.webp at 1556x1011 viewBox units)
const W = 1556,
  H = 1011,
  HX = 779,
  HY = 526,
  HR = 130;
const HOLD_MS = 3500, // same hold time as the old Enter button
  DROP_MS = 700;
// Moving-head light fixtures along the top truss
const FIX: [number, number][] = [
  [94, 124],
  [296, 126],
  [476, 122],
  [632, 124],
  [780, 118],
  [931, 124],
  [1084, 120],
  [1269, 120],
  [1471, 124],
];
// Beam / lens colour per fixture, matching the lights in the photo
const COL = [
  "#ffb030",
  "#c040ff",
  "#ffc030",
  "#30a8ff",
  "#ff48d8",
  "#ffa030",
  "#a850ff",
  "#ffc040",
  "#ff9a40",
];

const rng = (seed: number) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

/**
 * Neon concert stage with hold-to-enter ring.
 * Drives the intro context: holding starts loading (music), the ring fills
 * while held and drains when released; full ring → startBlast().
 * The camera zooms into the stage during the blast phase.
 */
export function NeonStage() {
  const { phase, startLoading, cancelLoading, startBlast, setLoadProgress, skipIntro } = useIntro();
  const [p, setP] = useState(0);
  const [hr, setHr] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const hold = useRef(false);
  const prog = useRef(0);

  // Size and place the button on the hole in the stage art (image is cover-fitted)
  useEffect(() => {
    const fit = () => {
      const k = Math.max(innerWidth / W, innerHeight / H);
      setHr(HR * k);
      setPos({ x: innerWidth / 2 + (HX - W / 2) * k, y: innerHeight / 2 + (HY - H / 2) * k });
    };
    fit();
    addEventListener("resize", fit);
    return () => removeEventListener("resize", fit);
  }, []);

  const active = phase === "idle" || phase === "loading";

  useEffect(() => {
    if (!active) return;
    let raf = 0,
      last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(t - last, 100); // cap so a paused (hidden) tab cannot jump the ring
      last = t;
      const before = prog.current;
      const v = Math.min(1, Math.max(0, before + (hold.current ? dt / HOLD_MS : -dt / DROP_MS)));
      if (v !== before) {
        // first press starts the music; fully drained cancels it
        if (before === 0 && v > 0) startLoading();
        if (v === 0) cancelLoading();
        prog.current = v;
        setP(v);
        setLoadProgress(v * 100);
      }
      if (v >= 1) {
        startBlast();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const key = (down: boolean) => (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        hold.current = down;
      }
    };
    const kd = key(true),
      ku = key(false);
    addEventListener("keydown", kd);
    addEventListener("keyup", ku);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("keydown", kd);
      removeEventListener("keyup", ku);
    };
  }, [active, startLoading, cancelLoading, startBlast, setLoadProgress]);

  const twinkles = useMemo(() => {
    const r = rng(7),
      out: { x: number; y: number; d: number; l: number }[] = [];
    while (out.length < 70) {
      const x = r() * W,
        y = 440 + r() * 130;
      if (Math.hypot(x - HX, y - HY) > HR + 25) out.push({ x, y, d: 1.2 + r() * 2.6, l: r() * 4 });
    }
    return out;
  }, []);

  if (phase === "video" || phase === "complete") return null;

  const C = 2 * Math.PI * 0.95;
  const vars = {
    "--p": p,
    "--hr": hr + "px",
    "--hx": pos.x + "px",
    "--hy": pos.y + "px",
  } as CSSProperties;
  const release = () => (hold.current = false);

  return (
    <div
      className={s.intro}
      data-phase={phase}
      style={vars}
      onPointerDown={(e) => {
        if (!(e.target as Element).closest(`.${s.skip}`)) hold.current = true;
      }}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
    >
      <div className={s.cam}>
        <svg
          className={s.scene}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            {COL.map((col, i) => (
              <linearGradient key={i} id={`b${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={col} stopOpacity=".85" />
                <stop offset=".55" stopColor={col} stopOpacity=".25" />
                <stop offset="1" stopColor={col} stopOpacity="0" />
              </linearGradient>
            ))}
            {COL.map((col, i) => (
              <radialGradient key={i} id={`l${i}`}>
                <stop offset="0" stopColor="#fff" />
                <stop offset=".35" stopColor={col} stopOpacity=".8" />
                <stop offset="1" stopColor={col} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>
          <image href="/intro/NeonStage.webp" width={W} height={H} />
          <g className={s.beams}>
            {FIX.flatMap(([x, y], i) =>
              [-1, 1].map((side) => {
                const base = side * (14 + (i % 3) * 7),
                  k = i * 2 + (side > 0 ? 1 : 0);
                return (
                  <g
                    key={k}
                    className={s.beam}
                    style={
                      {
                        transformOrigin: `${x}px ${y}px`,
                        "--b": `${base}deg`,
                        "--d": `${3.2 + (k % 5) * 0.7}s`,
                        "--l": `${-(k % 7) * 0.6}s`,
                      } as CSSProperties
                    }
                  >
                    <polygon
                      points={`${x - 5},${y} ${x + 5},${y} ${x + 70},${y + 330} ${x - 70},${y + 330}`}
                      fill={`url(#b${i})`}
                      opacity=".4"
                    />
                    <polygon
                      points={`${x - 2},${y} ${x + 2},${y} ${x + 20},${y + 300} ${x - 20},${y + 300}`}
                      fill={`url(#b${i})`}
                      opacity=".7"
                    />
                  </g>
                );
              })
            )}
          </g>
          {FIX.map(([x, y], i) => (
            <circle
              key={i}
              className={s.lens}
              cx={x}
              cy={y - 4}
              r="24"
              fill={`url(#l${i})`}
              style={{ "--l": `${-i * 0.37}s` } as CSSProperties}
            />
          ))}
          {twinkles.map((t, i) => (
            <circle
              key={i}
              className={s.tw}
              cx={t.x}
              cy={t.y}
              r="1.8"
              style={{ "--d": `${t.d}s`, "--l": `${-t.l}s` } as CSSProperties}
            />
          ))}
        </svg>
      </div>
      <div className={s.vignette} />
      <div className={s.center}>
        {[0, 1, 2].map((i) => (
          <i key={i} className={s.ripple} style={{ "--l": `${-i * 1.2}s` } as CSSProperties} />
        ))}
        <div className={s.orbit}>
          {Array.from({ length: 8 }, (_, i) => (
            <i key={i} className={s.gem} style={{ "--i": i } as CSSProperties} />
          ))}
        </div>
        <svg className={s.ring} viewBox="-1 -1 2 2" aria-hidden="true">
          <circle r=".95" className={s.track} />
          <circle r=".95" className={s.fill} strokeDasharray={C} strokeDashoffset={C * (1 - p)} />
        </svg>
        <button className={s.btn} aria-label="Hold to enter" onKeyDown={(e) => e.preventDefault()}>
          <b>{p > 0 ? "HOLD" : "ENTER"}</b>
          {p > 0 && <small>{Math.round(p * 100)}%</small>}
        </button>
      </div>
      <p className={s.hint}>
        HOLD TO ENTER<span>↑</span>
      </p>
      <button className={s.skip} onClick={skipIntro}>
        SKIP INTRO <span style={{ marginLeft: "4px" }}>→</span>
      </button>
    </div>
  );
}
