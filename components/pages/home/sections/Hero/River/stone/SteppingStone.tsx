"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import type { CSSProperties } from "react";
import { getAnimStyle } from "./helper/constant";
import { IMAGES } from "@/lib/images";

interface SteppingStoneProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  /** width/height in px */
  size?: number;
  /** phase offset so multiple stones bob out of sync */
  phase?: number;
  /** z-index for layering stones */
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
  /** Show loading spinner instead of label */
  loadingSpinner?: boolean;
}

export const SteppingStone = memo(function SteppingStone({
  label,
  href,
  onClick,
  size = 120,
  phase = 0,
  zIndex,
  className = "",
  style,
  loadingSpinner = false,
}: SteppingStoneProps) {
  const animStyle = getAnimStyle({
    phase,
    href,
    onClick,
    size,
    zIndex,
    style,
  });

  const stone = (
    <span style={animStyle} className={`stone-responsive ${className}`}>
      {/* Outer wrapper with padding for larger hover target area */}
      <span className="stone-interactive relative -m-3 inline-block p-3">
        {/* Ripple rings */}
        <span
          aria-hidden
          className="stone-ripple pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[50%]"
        />
        <span
          aria-hidden
          className="stone-ripple stone-ripple-2 pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[50%]"
        />
        {/* Water-contact glow */}
        <span
          aria-hidden
          className="stone-waterglow pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[50%]"
        />
        {/* Reflection */}
        <span
          aria-hidden
          className="stone-reflection pointer-events-none absolute left-1/2 overflow-hidden"
        >
          <Image
            src={IMAGES.hero.steppingStone}
            alt=""
            fill
            className="object-contain object-top select-none"
          />
        </span>
        {/* Stone image */}
        <Image
          src={IMAGES.hero.steppingStone}
          alt={label ? `${label} stone` : "stepping stone"}
          fill
          className="stone-img pointer-events-none relative object-contain select-none"
          style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.55))" }}
        />
        {/* Label or Loading Spinner */}
        {loadingSpinner ? (
          <span
            className="absolute inset-0 flex items-center justify-center"
            style={{ paddingBottom: "30%" }}
          >
            <Spinner
              className="size-4 text-amber-100 sm:size-5"
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.9))" }}
            />
          </span>
        ) : label ? (
          <span
            className="stone-label absolute inset-0 flex items-center justify-center text-center text-[7px] font-bold tracking-wide text-amber-100 uppercase sm:text-[12px]"
            style={{
              fontFamily: "var(--font-ethereal), serif",
              textShadow: "0 1px 4px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,0.9)",
              paddingBottom: "5%",
              left: "8px",
            }}
          >
            {label}
          </span>
        ) : null}
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        {stone}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} style={{ background: "none", border: "none", padding: 0 }}>
        {stone}
      </button>
    );
  }

  return stone;
});
