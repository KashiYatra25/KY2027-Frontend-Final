"use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { Cormorant_Garamond, Hind } from "next/font/google";
import { ThemedNavbar } from "@/components/navbar";
import { DEF, EVENTS } from "./events";
import { CLIPS, TEXTURES } from "./shapes";
import { replay, useViewport } from "./hooks";
import Backdrop from "./Backdrop";
import Glyphs, { type Hue } from "./Glyphs";
import Sparkles, { type SparklesHandle } from "./Sparkles";
import "./fest-events.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--fe-serif",
});
const sans = Hind({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--fe-sans" });

const SWAP_MS = 360;

export default function FestEvents() {
  const [cur, setCur] = useState(0);
  const [sub, setSub] = useState(0);
  const [shown, setShown] = useState({ cur: 0, sub: 0 });
  const [dh, setDh] = useState(0);
  const [rot, setRot] = useState(120);
  const [stage, setStage] = useState({ W: 0, H: 0 });
  const view = useViewport();

  const sel = useRef({ cur: 0, sub: 0 });
  const hue = useRef<Hue>({ h: 335, t: EVENTS[0].h });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const sparkles = useRef<SparklesHandle>(null);
  const stageEl = useRef<HTMLElement>(null);
  const rgw = useRef<HTMLDivElement>(null);
  const nodes = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const pat = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stageEl.current!;
    const ro = new ResizeObserver(() => setStage({ W: el.clientWidth, H: el.clientHeight }));
    ro.observe(el);
    return () => {
      ro.disconnect();
      clearTimeout(timer.current);
      clearTimeout(hoverTimer.current);
    };
  }, []);

  const pickMain = useCallback((i: number) => {
    if (i === sel.current.cur) return;
    sel.current = { cur: i, sub: 0 };
    setCur(i);
    setSub(0);
    setDh(0);
    setRot((r) => r + 120);
    hue.current.t = EVENTS[i].h;
    replay(rgw.current, "spinblur");
    replay(nodes.current, "swap");
    replay(panel.current, "swap");
    replay(pat.current, "fade");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShown({ cur: i, sub: 0 }), SWAP_MS);
  }, []);

  const pickSub = useCallback((i: number) => {
    const { cur: c, sub: s } = sel.current;
    if (i === s) return;
    sel.current.sub = i;
    setSub(i);
    setDh((i - (EVENTS[c].s.length - 1) / 2) * 16);
    setRot((r) => r + 45);
    replay(rgw.current, "spinblur");
    replay(panel.current, "swap");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShown({ cur: c, sub: i }), SWAP_MS);
  }, []);

  const hoverMain = (i: number) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => pickMain(i), 90);
  };

  const { W, H } = stage,
    nar = view.narrow;
  const D = nar ? 360 : Math.min(H * 0.92, 880);
  const Rn = nar ? 190 : Math.min(D / 2 + 40, W - 110);
  const cx = nar ? W / 2 : 0,
    cy = nar ? H + 30 : H / 2;
  const T = EVENTS[shown.cur],
    x = T.s[shown.sub],
    n = T.s.length;
  const step = Math.min(26, (nar ? 100 : 110) / (n - 1));
  const stageVars = {
    "--D": D + "px",
    "--NW": (nar ? 90 : 138) + "px",
    "--NH": (nar ? 62 : 90) + "px",
  } as CSSProperties;
  const glow = { stopColor: "hsl(calc(var(--h) + var(--dh)) 90% 55%)" };

  return (
    <div
      className={`fest ${serif.variable} ${sans.variable}`}
      style={{ "--h": EVENTS[cur].h, "--dh": dh } as CSSProperties}
    >
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="main" />
      </div>
      <div id="pat" ref={pat} data-t={cur} />
      <Backdrop cur={cur} view={view} />
      <Glyphs hue={hue} glyph={EVENTS[cur].g} motion={EVENTS[cur].mo} />
      <div id="lights" />
      <div id="app" style={TEXTURES as CSSProperties}>
        <nav id="side" aria-label="Main events">
          <h2>MAIN EVENTS</h2>
          <ul id="ml">
            {EVENTS.map((m, i) => (
              <li key={m.n}>
                <button
                  className={i === cur ? "mi on" : "mi"}
                  onMouseEnter={() => hoverMain(i)}
                  onMouseLeave={() => clearTimeout(hoverTimer.current)}
                  onFocus={() => pickMain(i)}
                  onClick={() => pickMain(i)}
                >
                  <b>{m.n}</b>
                  <small>{m.c}</small>
                </button>
              </li>
            ))}
          </ul>
          <svg className="diya" viewBox="0 0 60 40" aria-hidden="true">
            <path
              d="M4 18h52c0 12-10 20-26 20S4 30 4 18Z"
              fill="var(--c)"
              stroke="var(--b)"
              strokeWidth="2"
            />
            <path d="M30 16C20 8 28 4 30 0c2 4 10 8 0 16Z" fill="var(--b)" />
          </svg>
        </nav>
        <main id="stage" ref={stageEl} style={stageVars}>
          <svg id="arc" aria-hidden="true">
            <circle cx={cx} cy={cy} r={W ? Rn : 0} />
          </svg>
          <div id="rgw" ref={rgw} data-f={shown.sub % 3} style={{ left: cx, top: cy }}>
            <div id="rgf">
              <svg
                id="rg"
                viewBox="-320 -320 640 640"
                aria-hidden="true"
                style={{ transform: `rotate(${rot}deg)` }}
              >
                <g id="rgi">
                  <defs>
                    <radialGradient id="gw2">
                      <stop offset=".72" style={{ ...glow, stopOpacity: 0.4 }} />
                      <stop offset="1" style={{ ...glow, stopOpacity: 0 }} />
                    </radialGradient>
                  </defs>
                  <circle r="380" fill="url(#gw2)" />
                  <image href={T.rangoli} x="-320" y="-320" width="640" height="640" />
                </g>
              </svg>
            </div>
          </div>
          <div
            id="nodes"
            ref={nodes}
            role="group"
            aria-label="Sub-events"
            data-m={shown.cur}
            style={{ "--cp": `url(#c${shown.cur})` } as CSSProperties}
          >
            {W > 0 &&
              T.s.map((s, i) => {
                const a = (((nar ? -90 : 0) + (i - (n - 1) / 2) * step) * Math.PI) / 180;
                const on = shown.cur === cur ? i === sub : i === shown.sub;
                return (
                  <button
                    key={`${shown.cur}-${i}`}
                    className={on ? "node on" : "node"}
                    style={
                      {
                        left: cx + Rn * Math.cos(a),
                        top: cy + Rn * Math.sin(a),
                        "--rt": "-2deg",
                      } as CSSProperties
                    }
                    onClick={(e) => {
                      pickSub(i);
                      sparkles.current?.burst(e.currentTarget, 36);
                    }}
                    onMouseEnter={(e) => sparkles.current?.burst(e.currentTarget, 10)}
                  >
                    <span className="sh">
                      <i className="bk" />
                      <i className="rim" />
                    </span>
                    <b className="face">
                      <em>{s.n}</em>
                    </b>
                  </button>
                );
              })}
          </div>
        </main>
        <section id="panel" ref={panel} aria-live="polite">
          <h2>SUB-EVENT DETAILS</h2>
          <div className="orn">◆ ❖ ◆</div>
          <h3 id="sn">{x.n}</h3>
          <div id="st">{x.t}</div>
          <p id="sm">{`${T.n} · ${T.c} — ${T.t}`}</p>
          <p className="f">
            <b>Date &amp; Time:</b> <span>{x.dt || T.dt || DEF.dt}</span>
          </p>
          <p className="f">
            <b>Venue:</b> <span>{x.v || T.v || DEF.v}</span>
          </p>
          <p className="f">
            <b>Description:</b> <span>{`${x.k}. ${x.d}`}</span>
          </p>
          <p className="f">
            <b>Contact:</b> <span>{x.ct || T.ct || DEF.ct}</span>
          </p>
          <Link className="reg" href={`/events/${T.slug}`}>
            REGISTER NOW
          </Link>
        </section>
      </div>
      <Sparkles
        ref={sparkles}
        hue={hue}
        active={() => nodes.current?.querySelector(".node.on") ?? null}
      />
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          {CLIPS.map((d, i) => (
            <clipPath key={i} id={`c${i}`} clipPathUnits="objectBoundingBox">
              <path d={d} />
            </clipPath>
          ))}
        </defs>
      </svg>
    </div>
  );
}
