"use client";

import { useEffect, useRef, type RefObject } from "react";
import { cn } from "@/lib/utils";
import { IMAGES } from "@/lib/images";

// Where the ENTER KASHIYATRA plate sits inside the 1672×941 poster (px)
const IMG_W = 1672;
const IMG_H = 941;
const X = 630;
const Y = 704;
const W = 414;
const H = 105;

interface Props {
  stageRef: RefObject<HTMLDivElement | null>;
  show: boolean;
  ready: boolean;
  onActivate: () => void;
}

/**
 * The "ENTER KASHIYATRA" plate.
 * Ported from kashiyatra-countdown-clean (components/intro/EnterPlate.tsx).
 *
 * It is lifted out of the stage (so it stays above the crowd and isn't hit by
 * the stage's filter / shake) and re-aligned to the poster every frame.
 */
export function CountdownEnterPlate({ stageRef, show, ready, onActivate }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // paint the artwork into the canvas (it is clipped to the badge outline in CSS)
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      c.getContext("2d")?.drawImage(img, 0, 0);
    };
    img.src = IMAGES.intro.countdownPlate;
  }, []);

  // follow the stage while it is visible
  useEffect(() => {
    if (!show) return;
    let raf = 0;
    const follow = () => {
      const stage = stageRef.current;
      const el = wrapRef.current;
      if (stage && el) {
        const r = stage.getBoundingClientRect();
        el.style.left = `${r.left + (r.width * X) / IMG_W}px`;
        el.style.top = `${r.top + (r.height * Y) / IMG_H}px`;
        el.style.width = `${(r.width * W) / IMG_W}px`;
        el.style.height = `${(r.height * H) / IMG_H}px`;
      }
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(raf);
  }, [show, stageRef]);

  return (
    <div
      ref={wrapRef}
      role="button"
      tabIndex={show && ready ? 0 : -1}
      aria-label="Enter Kashiyatra"
      data-show={show}
      data-ready={ready}
      onClick={() => ready && onActivate()}
      onKeyDown={(e) => ready && (e.key === "Enter" || e.key === " ") && onActivate()}
      className={cn(
        "ky-countdown-plate fixed top-0 left-0 z-[6] h-0 w-0",
        show ? "visible opacity-100" : "invisible opacity-0",
        show && ready ? "pointer-events-auto cursor-pointer" : "pointer-events-none"
      )}
    >
      <div className="ky-countdown-plate__halo" />
      <div className="ky-countdown-plate__pw">
        <canvas ref={canvasRef} className="ky-countdown-plate__canvas" />
      </div>
    </div>
  );
}
