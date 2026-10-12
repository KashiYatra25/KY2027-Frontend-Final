"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Countdown clock for the intro poster.
 * Ported from kashiyatra-countdown-clean (components/intro/Countdown.tsx).
 *
 * Target: 15 Jan 2027, 00:00 IST.
 * Must be rendered inside the `.ky-countdown-stage` element (an `@container`)
 * so the `cqw` units scale with the poster.
 */

/** 15 Jan 2027, 00:00 IST */
const TARGET = new Date("2027-01-15T00:00:00+05:30").getTime();
const pad = (n: number) => String(n).padStart(2, "0");

function remaining() {
  const total = TARGET - Date.now();
  let t = Math.max(0, total);
  const d = Math.floor(t / 864e5);
  t -= d * 864e5;
  const h = Math.floor(t / 36e5);
  t -= h * 36e5;
  const m = Math.floor(t / 6e4);
  t -= m * 6e4;
  const s = Math.floor(t / 1e3);
  return { d: d > 99 ? String(d) : pad(d), h: pad(h), m: pad(m), s: pad(s), over: total <= 0 };
}

const labelCls = "font-medium leading-none [text-shadow:0_0_6px_#000,0_0_14px_#000]";
const numCls =
  "font-medium leading-none text-[length:max(24px,3.5cqw)] tracking-[.04em] pl-[.04em] " +
  'lining-nums tabular-nums [font-feature-settings:"lnum","tnum"] ' +
  "bg-gradient-to-b from-[#fff4dd] via-[#ecc98a] to-[#c99a55] " +
  "bg-clip-text text-transparent [-webkit-text-fill-color:transparent] " +
  "[filter:drop-shadow(0_0_8px_rgba(255,190,100,.45))_drop-shadow(0_3px_6px_rgba(0,0,0,.8))]";

function Unit({ value, title, tick }: { value: string; title: string; tick?: boolean }) {
  return (
    <div className="flex min-w-[max(40px,4.6cqw)] flex-col items-center gap-[.7cqw]">
      <div className={cn(numCls, tick && "ky-countdown-tick")}>{value}</div>
      <div
        className={cn(
          labelCls,
          "pl-[.38em] text-[length:max(9px,.78cqw)] tracking-[.38em] text-[#ecc98a]"
        )}
      >
        {title}
      </div>
    </div>
  );
}

const Divider = () => (
  <i
    aria-hidden
    className="mt-[.35cqw] w-px self-stretch bg-gradient-to-b from-[rgba(217,180,106,0)] via-[rgba(217,180,106,.7)] to-[rgba(217,180,106,0)]"
  />
);

export function CountdownTimer({ show }: { show: boolean }) {
  const [t, setT] = useState({ d: "00", h: "00", m: "00", s: "00", over: false });

  useEffect(() => {
    const tick = () => setT(remaining());
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      role="timer"
      aria-label="Countdown to Kashiyatra 27, 15 January 2027"
      className={cn(
        "pointer-events-none absolute top-[48.6%] left-1/2 flex flex-col items-center gap-[1.1cqw] text-center whitespace-nowrap",
        "transition-[opacity,translate] duration-[2200ms] ease-[ease] motion-reduce:transition-none",
        // dark halo behind the numbers so they stay legible over the poster
        "before:absolute before:top-1/2 before:left-1/2 before:-z-10 before:h-[170%] before:w-[150%] before:[translate:-50%_-50%] before:content-['']",
        "before:bg-[radial-gradient(closest-side,rgba(3,4,10,.78),rgba(3,4,10,.42)_58%,rgba(3,4,10,0))]",
        show ? "[translate:-50%_-50%] opacity-100" : "[translate:-50%_calc(-50%_+_8px)] opacity-0"
      )}
    >
      <div
        className={cn(
          labelCls,
          "pl-[.42em] text-[length:max(9px,.82cqw)] tracking-[.42em] text-[#f1e6cf] opacity-90"
        )}
      >
        {t.over ? "THE CITY IS ALIVE" : "15 JANUARY 2027"}
      </div>
      <div className="flex items-start justify-center gap-[max(10px,1.9cqw)]">
        <Unit value={t.d} title="DAYS" />
        <Divider />
        <Unit value={t.h} title="HOURS" />
        <Divider />
        <Unit value={t.m} title="MINUTES" />
        <Divider />
        <Unit value={t.s} title="SECONDS" tick />
      </div>
    </div>
  );
}
