"use client";
import { useEffect, useImperativeHandle, useRef, type Ref, type RefObject } from "react";
import { reducedMotion } from "./hooks";
import type { Hue } from "./Glyphs";

export type SparklesHandle = { burst: (el: Element, n: number) => void };

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  g: number;
  s: number;
  l: number;
  d: number;
  o: number;
  k: number;
  rt: number;
  vr: number;
};

const center = (el: Element) => {
  const b = el.getBoundingClientRect();
  return [b.left + b.width / 2, b.top + b.height / 2];
};

export default function Sparkles({
  hue,
  active,
  ref,
}: {
  hue: RefObject<Hue>;
  active: () => Element | null;
  ref: Ref<SparklesHandle>;
}) {
  const cv = useRef<HTMLCanvasElement>(null);
  const SP = useRef<P[]>([]);
  const getActive = useRef(active);
  useEffect(() => {
    getActive.current = active;
  });

  useImperativeHandle(ref, () => ({
    burst(el, n) {
      const [x, y] = center(el);
      for (let i = 0; i < n; i++) {
        const a = Math.random() * 6.28,
          v = 2 + Math.random() * 5;
        SP.current.push({
          x,
          y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v - 2,
          g: 0.12,
          s: 2 + Math.random() * 4,
          l: 1,
          d: 0.011 + Math.random() * 0.012,
          o: (Math.random() - 0.5) * 110,
          k: i % 3,
          rt: Math.random() * 6,
          vr: (Math.random() - 0.5) * 0.3,
        });
      }
    },
  }));

  useEffect(() => {
    const c = cv.current!,
      fc = c.getContext("2d")!;
    const size = () => {
      c.width = innerWidth;
      c.height = innerHeight;
    };
    size();
    addEventListener("resize", size);
    if (reducedMotion()) return () => removeEventListener("resize", size);
    let raf = 0;
    const frame = () => {
      const sp = SP.current;
      fc.clearRect(0, 0, c.width, c.height);
      const on = getActive.current();
      if (on && Math.random() < 0.4) {
        const b = on.getBoundingClientRect(),
          a = Math.random() * 6.28;
        sp.push({
          x: b.left + b.width / 2 + Math.cos(a) * b.width * 0.55,
          y: b.top + b.height / 2 + Math.sin(a) * b.height * 0.55,
          vx: Math.cos(a) * 0.6,
          vy: Math.sin(a) * 0.6 - 0.5,
          g: -0.01,
          s: 1.5 + Math.random() * 2.5,
          l: 1,
          d: 0.02,
          o: (Math.random() - 0.5) * 60,
          k: 0,
          rt: 0,
          vr: 0,
        });
      }
      for (let i = sp.length - 1; i >= 0; i--) {
        const p = sp[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.g;
        p.vx *= 0.99;
        p.l -= p.d;
        p.rt += p.vr;
        if (p.l <= 0) {
          sp.splice(i, 1);
          continue;
        }
        fc.globalAlpha = p.l;
        fc.fillStyle = `hsl(${hue.current.h + p.o},95%,72%)`;
        fc.save();
        fc.translate(p.x, p.y);
        fc.rotate(p.rt);
        if (p.k === 1) {
          fc.beginPath();
          for (let j = 0; j < 8; j++) {
            const r = j % 2 ? p.s * 0.6 : p.s * 2.2,
              a = j * 0.785;
            fc.lineTo(Math.cos(a) * r, Math.sin(a) * r);
          }
          fc.fill();
        } else if (p.k === 2) fc.fillRect(-p.s, -p.s / 2, p.s * 2, p.s);
        else {
          fc.beginPath();
          fc.arc(0, 0, p.s * 0.7, 0, 6.28);
          fc.fill();
        }
        fc.restore();
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", size);
    };
  }, [hue]);

  return <canvas id="fx" ref={cv} />;
}
