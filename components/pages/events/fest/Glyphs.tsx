"use client";
import { useEffect, useRef, type RefObject } from "react";
import type { Motion } from "./events";
import { reducedMotion } from "./hooks";

export type Hue = { h: number; t: number };

export default function Glyphs({
  hue,
  glyph,
  motion,
}: {
  hue: RefObject<Hue>;
  glyph: string;
  motion: Motion;
}) {
  const cv = useRef<HTMLCanvasElement>(null);
  const cfg = useRef({ glyph, motion });
  useEffect(() => {
    cfg.current = { glyph, motion };
  });

  useEffect(() => {
    const c = cv.current!,
      ctx = c.getContext("2d")!;
    const size = () => {
      c.width = innerWidth;
      c.height = innerHeight;
    };
    size();
    addEventListener("resize", size);
    if (reducedMotion()) return () => removeEventListener("resize", size);
    const P = Array.from({ length: 34 }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: 12 + Math.random() * 18,
      v: 0.25 + Math.random() * 0.6,
      ph: Math.random() * 6.28,
      o: (Math.random() - 0.5) * 60,
      r: 60 + Math.random() * 320,
    }));
    let raf = 0;
    const frame = (t: number) => {
      const hh = hue.current;
      hh.h += (hh.t - hh.h) * 0.04;
      const W = c.width,
        H = c.height,
        { glyph: gl, motion: mo } = cfg.current;
      ctx.clearRect(0, 0, W, H);
      ctx.textAlign = "center";
      for (const p of P) {
        let x = p.x * W,
          y = p.y * H,
          al = 0.35;
        if (mo === "up") {
          p.y -= (p.v / H) * 1.2;
          if (p.y < -0.03) p.y = 1.03;
          x += Math.sin(t / 900 + p.ph) * 14;
        } else if (mo === "down") {
          p.y += (p.v / H) * 1.2;
          if (p.y > 1.03) p.y = -0.03;
          x += Math.sin(t / 1100 + p.ph) * 10;
        } else if (mo === "drift") {
          p.x += (p.v / W) * 0.9;
          if (p.x > 1.03) p.x = -0.03;
          y += Math.sin(t / 1000 + p.ph) * 16;
        } else if (mo === "swirl") {
          const a = (t / 4000) * p.v + p.ph;
          x = W * 0.45 + Math.cos(a) * p.r * 1.8;
          y = H * 0.5 + Math.sin(a) * p.r * 1.1;
        } else al = 0.1 + 0.5 * Math.abs(Math.sin(t / 1200 + p.ph));
        ctx.globalAlpha = al;
        ctx.fillStyle = `hsl(${hh.h + p.o},85%,70%)`;
        ctx.font = p.s + "px serif";
        ctx.fillText(gl, x, y);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", size);
    };
  }, [hue]);

  return <canvas id="cv" ref={cv} />;
}
