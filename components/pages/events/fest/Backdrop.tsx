"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { EVENTS } from "./events";
import type { Viewport } from "@/hooks/useViewport";

type Layer = { i: number; cls: "in" | "out" } | null;

function place(i: number, { vw, vh, narrow }: Viewport): CSSProperties {
  const { r, fx: f } = EVENTS[i];
  const Wd = Math.max(vw, vh * r),
    Hd = Wd / r;
  let tx = vw / 2,
    fx = 0.5;
  if (!narrow && f !== 0.5) {
    const zl = 250 + Math.min(vh * 0.92, 880) / 2 + 110,
      zr = vw - 430;
    tx = zr - zl >= 160 ? (zl + zr) / 2 : zr - 110;
    fx = f;
  }
  return {
    width: Wd,
    height: Hd,
    left: Math.min(0, Math.max(vw - Wd, tx - fx * Wd)),
    top: Math.min(0, Math.max(vh - Hd, vh * 0.5 - 0.6 * Hd)),
  };
}

export default function Backdrop({ cur, view }: { cur: number; view: Viewport }) {
  const [layers, setLayers] = useState<[Layer, Layer]>([null, { i: cur, cls: "in" }]);
  const front = useRef(1);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const f = front.current,
      n = (f ^ 1) as 0 | 1;
    front.current = n;
    setLayers((prev) => {
      const next: [Layer, Layer] = [...prev];
      next[n] = { i: cur, cls: "in" };
      if (prev[f]) next[f] = { i: prev[f]!.i, cls: "out" };
      return next;
    });
  }, [cur]);

  return (
    <>
      {layers.map((l, k) => (
        <div key={k} className={`bgl${l ? " " + l.cls : ""}`} id={`bg${k}`}>
          {l && view.vw > 0 && (
            <img className="pf" src={EVENTS[l.i].bg} alt="" style={place(l.i, view)} />
          )}
        </div>
      ))}
    </>
  );
}
