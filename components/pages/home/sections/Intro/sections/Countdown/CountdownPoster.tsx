"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IMAGES } from "@/lib/images";
import { useIntro } from "@/components/pages/home/sections/Intro/context/IntroContext";
import { createIntro, type IntroEngine } from "./engine/engine";
import { CountdownTimer } from "./CountdownTimer";
import { CountdownEnterPlate } from "./CountdownEnterPlate";

/**
 * Title / subtitle / tagline regions of the poster, [x0, x1, y0, y1] in % of
 * the image. They're revealed one after another by fading in clipped
 * duplicates of the same image.
 */
const BANDS = [
  [31.5, 69, 9.3, 30.3],
  [31.5, 69, 30.3, 33.3],
  [31.5, 69, 36.4, 39.7],
] as const;
const K = 0.15; // overlap so no hairline shows between layers
const bandClip = ([x0, x1, y0, y1]: readonly number[]) =>
  `inset(${y0 - K}% ${100 - x1 - K}% ${100 - y1 - K}% ${x0 - K}%)`;
// the base photo has those same regions cut out of it (even-odd), so nothing double-draws
const baseClip =
  "polygon(evenodd,0 0,100% 0,100% 100%,0 100%,0 0," +
  BANDS.map(
    ([x0, x1, y0, y1]) =>
      `${x0}% ${y0}%,${x0}% ${y1}%,${x1}% ${y1}%,${x1}% ${y0}%,${x0}% ${y0}%,0 0`
  ).join(",") +
  ")";

const STAGE_SRC = IMAGES.intro.countdownStage;

/**
 * Countdown concert poster shown during the intro's `video` phase.
 * Ported from kashiyatra-countdown-clean.
 *
 *  - Shows only while `phase === "video"` (the phase reached after the blast).
 *  - The poster's "ENTER KASHIYATRA" plate + its hotspot button drive the
 *    existing `completeIntro()` so the rest of the site takes over.
 *  - `FirePot` renders on top during this phase.
 */
export function CountdownPoster() {
  const { phase, completeIntro } = useIntro();

  // ---- DOM nodes the canvas engine draws into ----
  const stageRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLImageElement>(null);
  const fxRef = useRef<HTMLCanvasElement>(null);
  const fx2Ref = useRef<HTMLCanvasElement>(null);
  const mvRef = useRef<HTMLCanvasElement>(null);
  const hxRef = useRef<HTMLCanvasElement>(null);
  const ppRef = useRef<HTMLCanvasElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<IntroEngine | null>(null);

  // ---- coarse phase state (per-frame work stays inside the engine) ----
  const [revealed, setRevealed] = useState<number[] | null>(null);
  const [ready, setReady] = useState(false);
  const [countdownShown, setCountdownShown] = useState(false);

  const enterMain = useCallback(() => {
    completeIntro();
  }, [completeIntro]);
  const enterMainRef = useRef(enterMain);

  // Keep the ref in sync with the latest callback
  useEffect(() => {
    enterMainRef.current = enterMain;
  }, [enterMain]);

  const isActive = phase === "video";

  // Boot the canvas engine once the poster is actually in the DOM (video phase).
  useEffect(() => {
    if (!isActive) return;
    if (
      !stageRef.current ||
      !baseRef.current ||
      !fxRef.current ||
      !fx2Ref.current ||
      !mvRef.current ||
      !hxRef.current ||
      !ppRef.current ||
      !flashRef.current
    ) {
      return;
    }

    const engine = createIntro(
      {
        stage: stageRef.current,
        base: baseRef.current,
        fx: fxRef.current,
        fx2: fx2Ref.current,
        mv: mvRef.current,
        hx: hxRef.current,
        pp: ppRef.current,
        flash: flashRef.current,
      },
      {
        onReveal: setRevealed,
        onReady: () => setReady(true),
        onEnterMain: () => enterMainRef.current(),
      }
    );
    engineRef.current = engine;

    return () => {
      engine.destroy();
      engineRef.current = null;
      setRevealed(null);
      setReady(false);
      setCountdownShown(false);
    };
  }, [isActive]);

  // countdown fades in after the title / subtitle / tagline have been revealed
  useEffect(() => {
    if (!revealed) return;
    const id = window.setTimeout(() => setCountdownShown(true), 1400);
    return () => window.clearTimeout(id);
  }, [revealed]);

  if (!isActive) return null;

  return (
    <motion.div
      className="absolute inset-0 z-0 overflow-hidden bg-[#03040a]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* ───────── Stage: the concert poster + everything locked to it ───────── */}
      <div
        ref={stageRef}
        className="ky-countdown-stage @container absolute top-1/2 left-1/2 aspect-[1672/941] bg-[#03040a] will-change-transform"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={baseRef}
          src={STAGE_SRC}
          alt="Kashiyatra concert at IIT (BHU)"
          draggable={false}
          fetchPriority="high"
          className="absolute inset-0 block h-full w-full select-none [-webkit-user-drag:none]"
          style={{ clipPath: baseClip }}
        />

        <CountdownTimer show={countdownShown} />

        {BANDS.map((b, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={STAGE_SRC}
            alt=""
            aria-hidden
            draggable={false}
            className={cn(
              "absolute inset-0 block h-full w-full select-none [-webkit-user-drag:none]",
              "transition-opacity duration-[2600ms] ease-[ease]",
              revealed ? "opacity-100" : "opacity-0"
            )}
            style={{
              clipPath: bandClip(b),
              transitionDelay: revealed ? `${revealed[i]}s` : undefined,
            }}
          />
        ))}

        <canvas ref={mvRef} className="pointer-events-none absolute inset-0 h-full w-full" />
        <canvas
          ref={fxRef}
          className="pointer-events-none absolute inset-0 h-full w-full opacity-0 mix-blend-screen transition-opacity duration-[2000ms] ease-[ease]"
        />
        <canvas
          ref={fx2Ref}
          className="pointer-events-none absolute inset-0 h-full w-full opacity-0 mix-blend-screen transition-opacity duration-[1200ms] ease-[ease]"
        />

        {/* click target that sits exactly on the poster's own ENTER button */}
        <button
          type="button"
          data-ui="hot"
          title="Enter Kashiyatra"
          aria-label="Enter Kashiyatra"
          disabled={!ready}
          onClick={() => engineRef.current?.enter()}
          className={cn(
            "absolute",
            ready ? "pointer-events-auto cursor-pointer" : "pointer-events-none"
          )}
          style={{ left: "38%", top: "76%", width: "24%", height: "10%" }}
        />
      </div>

      {/* ───────── Party-mode overlays ───────── */}
      <canvas
        ref={ppRef}
        className="pointer-events-none absolute bottom-0 left-0 z-[3] h-full w-full"
      />
      <canvas
        ref={hxRef}
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full mix-blend-screen"
      />
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 z-[8] bg-white opacity-0 mix-blend-screen"
      />

      <CountdownEnterPlate
        stageRef={stageRef}
        show={!!revealed}
        ready={ready}
        onActivate={() => engineRef.current?.enter()}
      />
    </motion.div>
  );
}
