"use client";

import { useState } from "react";
import Link from "next/link";
import { MapControls } from "./MapControls";
import {
  VENUES,
  LAMPS,
  SCHEDULED_EVENTS,
} from "@/components/pages/schedule/config/campusMap.config";
import { TONE_COLORS } from "@/components/pages/schedule/constants/palette";
import { DEFAULT_LAYERS } from "@/components/pages/schedule/constants/layers";
import type { Layer, MapLayers, Venue } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// CAMPUS MAP
// Animated IIT (BHU) map — day/night, twinkling lamps, drifting clouds,
// flying birds and clickable venue labels. Hovering a venue zooms the
// map towards it; clicking opens that venue's page.
// ═══════════════════════════════════════════════════════════════════

/** Deterministic pseudo-random in [min, max) so SSR and client markup match. */
function seeded(n: number, min: number, max: number) {
  let t = Math.imul(n + 1, 2654435761) >>> 0;
  t ^= t >>> 15;
  t = Math.imul(t, 2246822519) >>> 0;
  t ^= t >>> 13;
  return (min + ((t >>> 0) / 4294967296) * (max - min)).toFixed(2);
}

const CLOUDS: [number, number][] = [
  [2, 48],
  [18, 66],
  [34, 40],
  [52, 58],
  [68, 44],
  [82, 72],
];

const FLOCKS: [number, number, number][] = [
  [18, 26, -260],
  [52, 38, -320],
];

const FLOCK_SHAPE: [number, number][] = [
  [35, 40],
  [0, 0],
  [70, 0],
  [-35, -40],
  [105, -40],
  [140, -80],
];

const EVENT_COUNTS = SCHEDULED_EVENTS.reduce<Record<string, number>>(
  (acc, s) => ({ ...acc, [s.venue.slug]: (acc[s.venue.slug] ?? 0) + 1 }),
  {}
);

interface CampusMapProps {
  focusSlug?: string;
  hoverZoom?: boolean;
  showControls?: boolean;
  edgeFade?: boolean;
  fill?: boolean;
  layers?: MapLayers;
  onLayerToggle?: (key: Layer) => void;
  onSearchClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function CampusMap({
  focusSlug,
  hoverZoom = false,
  showControls = true,
  edgeFade = false,
  fill = false,
  layers: controlledLayers,
  onLayerToggle,
  onSearchClick,
  className = "",
  style,
}: CampusMapProps) {
  const [ownLayers, setLayers] = useState<MapLayers>(DEFAULT_LAYERS);
  const layers = controlledLayers ?? ownLayers;
  const [hovered, setHovered] = useState<Venue | null>(null);
  const isNight = layers.night;

  const focused = VENUES.find((v) => v.slug === focusSlug);

  const handleHover = (venue: Venue | null) => setHovered(venue);

  const clampTranslate = (pos: number, scale: number) => {
    const margin = 15;
    const visiblePercent = 100 / scale;
    const minCenter = visiblePercent / 2 - margin;
    const maxCenter = 100 - visiblePercent / 2 + margin;
    return 50 - Math.max(minCenter, Math.min(maxCenter, pos));
  };

  let transform = "none";
  let origin = "50% 50%";
  if (focused) {
    const [fx, fy] = focused.anchor ?? [focused.x, focused.y];
    origin = `${fx}% ${fy}%`;
    transform = `translate(${50 - fx}%, ${50 - fy}%) scale(2.2)`;
  } else if (hoverZoom && hovered) {
    const scale = 1.5;
    const tx = clampTranslate(hovered.x, scale);
    const ty = clampTranslate(hovered.y, scale);
    origin = "50% 50%";
    transform = `translate(${tx}%, ${ty}%) scale(${scale})`;
  }

  const toggle = (key: Layer) => {
    if (onLayerToggle) {
      onLayerToggle(key);
    } else {
      setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  // Label styles based on night/day mode
  const getLabelStyle = (v: Venue, isActive: boolean) => {
    const base: React.CSSProperties = {
      position: "absolute",
      left: `${v.x}%`,
      top: `${v.y}%`,
      translate: "-50% -50%",
      display: "flex",
      alignItems: "center",
      gap: "0.6cqw",
      padding: "0.4cqw 0.9cqw",
      borderRadius: "0.35cqw",
      fontFamily: "var(--font-cormorant), Georgia, serif",
      fontSize: v.large ? "2.1cqmin" : "1.8cqmin",
      fontWeight: 600,
      fontVariant: "small-caps",
      letterSpacing: "0.08em",
      lineHeight: 1.1,
      textAlign: "center",
      whiteSpace: "pre",
      pointerEvents: v.tone === "text" ? "none" : "auto",
      transition: "box-shadow 0.25s, scale 0.25s, background 0.25s, border-color 0.25s",
    };

    if (v.tone === "text") {
      return {
        ...base,
        border: "none",
        background: "none",
        boxShadow: "none",
        color: isNight ? "#efe4cc" : "#3d2815",
        rotate: "-8deg",
        textShadow: isNight
          ? "0 0 0.4cqw #000, 0 0.15cqw 0.3cqw rgba(0,0,0,0.8)"
          : "0 0 0.5cqw rgba(255,250,240,0.9), 0 0 1cqw rgba(255,245,230,0.6)",
      };
    }

    if (isNight) {
      return {
        ...base,
        border: isActive ? "1px solid rgba(240,181,74,0.8)" : "1px solid rgba(240,181,74,0.35)",
        background: isActive
          ? "linear-gradient(180deg, rgba(45,35,60,0.98) 0%, rgba(55,40,70,1) 100%)"
          : "linear-gradient(180deg, rgba(20,15,30,0.92) 0%, rgba(30,20,40,0.95) 100%)",
        color: "#f0e6d0",
        boxShadow: isActive
          ? "0 0 2.5cqw rgba(240,181,74,0.6), 0 0 4cqw rgba(240,181,74,0.3), 0 0.3cqw 1cqw rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)"
          : "0 0.3cqw 1cqw rgba(0,0,0,0.6), 0 0 1.5cqw rgba(240,181,74,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
        scale: isActive ? 1.08 : 1,
      };
    } else {
      return {
        ...base,
        border: isActive ? "1px solid rgba(255,200,120,0.7)" : "1px solid rgba(255,200,120,0.35)",
        background: isActive
          ? "linear-gradient(180deg, rgba(55,42,70,0.95) 0%, rgba(45,35,58,0.98) 100%)"
          : "linear-gradient(180deg, rgba(45,35,55,0.88) 0%, rgba(35,28,45,0.92) 100%)",
        color: "#f5ead8",
        boxShadow: isActive
          ? "0 0 2cqw rgba(255,180,100,0.4), 0 0 3.5cqw rgba(255,150,80,0.25), 0 0.3cqw 1cqw rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12)"
          : "0 0.3cqw 1cqw rgba(0,0,0,0.35), 0 0 1cqw rgba(255,180,100,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
        scale: isActive ? 1.08 : 1,
      };
    }
  };

  // Get glow gradient based on tone
  const getGlowGradient = (tone: Venue["tone"]) => {
    const colors: Record<string, string> = {
      green:
        "rgba(63,224,138,0.4), rgba(63,224,138,0.25) 25%, rgba(63,224,138,0.1) 50%, transparent 70%",
      red: "rgba(255,77,94,0.4), rgba(255,77,94,0.25) 25%, rgba(255,77,94,0.1) 50%, transparent 70%",
      blue: "rgba(139,147,255,0.4), rgba(139,147,255,0.25) 25%, rgba(139,147,255,0.1) 50%, transparent 70%",
      white:
        "rgba(243,234,214,0.4), rgba(243,234,214,0.25) 25%, rgba(243,234,214,0.1) 50%, transparent 70%",
    };
    return (
      colors[tone] ||
      "color-mix(in srgb, #f0b54a 35%, transparent), color-mix(in srgb, #f0b54a 20%, transparent) 25%, color-mix(in srgb, #f0b54a 8%, transparent) 50%, transparent 70%"
    );
  };

  return (
    <div
      className={`relative overflow-hidden bg-transparent font-sans ${fill ? "h-full w-full" : ""} ${edgeFade ? "campus-map-edge-fade" : ""} ${className}`}
      style={{
        aspectRatio: fill ? "auto" : "1332 / 1252",
        containerType: fill ? "size" : "inline-size",
        ...style,
      }}
      onMouseLeave={() => handleHover(null)}
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform,
          transformOrigin: origin,
          transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Day image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/scheduleMap/CampusDay.jpg"
          alt="Map of the IIT (BHU) campus"
          draggable={false}
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full select-none"
          style={{ WebkitUserDrag: "none" } as React.CSSProperties}
        />
        {/* Night image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/scheduleMap/CampusNight.jpg"
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full transition-opacity duration-1200 select-none"
          style={
            {
              opacity: isNight ? 1 : 0,
              WebkitUserDrag: "none",
            } as React.CSSProperties
          }
        />

        {/* Twinkling lamps */}
        <div className={`pointer-events-none absolute inset-0 ${layers.lights ? "" : "hidden"}`}>
          {LAMPS.map(([x, y], i) => (
            <i
              key={i}
              className="absolute rounded-full mix-blend-screen"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: "1.4%",
                aspectRatio: 1,
                translate: "-50% -50%",
                background: "radial-gradient(circle, #fff6d8 0 12%, #ffc25acc 30%, #ff9a2a00 70%)",
                scale: isNight ? 1.2 : 1,
                animation: `campusMapBlink ${seeded(i, 1.6, 4.8)}s linear -${seeded(i + 500, 0, 5)}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Drifting clouds */}
        <div className={`pointer-events-none absolute inset-0 ${layers.clouds ? "" : "hidden"}`}>
          {CLOUDS.map(([top, duration], i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={`/scheduleMap/Cloud${(i % 3) + 1}.png`}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute left-0 w-1/2 transition-[filter] duration-1200"
              style={{
                top: `${top}%`,
                opacity: 0.9,
                filter: isNight ? "brightness(0.45) saturate(0.7)" : "none",
                animation: `campusMapDrift ${duration}s linear -${seeded(i + 900, 0, duration)}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Birds */}
        <div className={`pointer-events-none absolute inset-0 ${layers.birds ? "" : "hidden"}`}>
          {FLOCKS.map(([top, duration, rise], i) => (
            <div
              key={i}
              className="absolute left-0 w-[14%]"
              style={{
                top: `${top}%`,
                animation: `campusMapFly ${duration}s linear -${i * 13}s infinite`,
                ["--rise" as string]: `${rise}%`,
              }}
            >
              {FLOCK_SHAPE.map(([x, y], j) => (
                <svg
                  key={j}
                  viewBox="0 0 24 12"
                  className="absolute w-[30%]"
                  style={{
                    left: `${x}%`,
                    top: `${y + 40}%`,
                    animation: `campusMapBob 2.6s ease-in-out -${seeded(i * 10 + j + 1200, 0, 1)}s infinite alternate`,
                    filter: isNight ? "drop-shadow(0 0 3px #b9c6ff99)" : "none",
                  }}
                >
                  <path
                    d="M0 7Q6 0 12 6Q18 0 24 7Q18 4 12 9Q6 4 0 7Z"
                    fill={isNight ? "#dfe4f5" : "#140f1e"}
                    style={{
                      transformOrigin: "50% 70%",
                      animation: `campusMapFlap 0.45s ease-in-out -${seeded(i * 10 + j + 1200, 0, 1)}s infinite alternate`,
                    }}
                  />
                </svg>
              ))}
            </div>
          ))}
        </div>

        {/* Venue labels */}
        <div className={`pointer-events-none absolute inset-0 ${layers.labels ? "" : "hidden"}`}>
          {/* Connection lines */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            {VENUES.map((v) =>
              v.anchor ? (
                <line
                  key={v.slug}
                  x1={v.x}
                  y1={v.y}
                  x2={v.anchor[0]}
                  y2={v.anchor[1]}
                  stroke="rgba(240,181,74,0.5)"
                  strokeOpacity="0.75"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ) : null
            )}
          </svg>

          {/* Building glow effect on hover */}
          {hovered && hovered.anchor && (
            <div
              className="pointer-events-none absolute rounded-full"
              style={{
                left: `${hovered.anchor[0]}%`,
                top: `${hovered.anchor[1]}%`,
                width: "18cqw",
                height: "18cqw",
                translate: "-50% -50%",
                background: `radial-gradient(circle, ${getGlowGradient(hovered.tone)})`,
                animation: "campusMapPulseGlow 2s ease-in-out infinite",
                zIndex: 0,
              }}
            />
          )}

          {/* Venue dots and labels */}
          {VENUES.map((v) => {
            const isActive = v.slug === focusSlug || v.slug === hovered?.slug;
            const count = EVENT_COUNTS[v.slug] ?? 0;
            const color = TONE_COLORS[v.tone];

            return (
              <span key={v.slug}>
                {/* Colored dot */}
                {v.anchor && (
                  <i
                    className="absolute rounded-full"
                    style={{
                      left: `${v.anchor[0]}%`,
                      top: `${v.anchor[1]}%`,
                      width: "1.1cqw",
                      aspectRatio: 1,
                      translate: "-50% -50%",
                      background: color,
                      border: `0.15cqw solid ${isNight ? "#1a1424" : "#2a2035"}`,
                      boxShadow: `0 0 0.9cqw ${color}`,
                    }}
                  />
                )}

                {/* Label */}
                {v.clickable === false ? (
                  <div style={getLabelStyle(v, isActive)}>{v.label}</div>
                ) : (
                  <Link
                    href={`/schedule/${v.slug}`}
                    style={getLabelStyle(v, isActive) as React.CSSProperties}
                    aria-label={`${v.name} — ${count} ${count === 1 ? "event" : "events"}`}
                    onMouseEnter={() => handleHover(v)}
                    onFocus={() => handleHover(v)}
                    onBlur={() => handleHover(null)}
                  >
                    {v.label}
                    {count > 0 && (
                      <span
                        style={{
                          paddingLeft: "0.6cqw",
                          borderLeft: "1px solid rgba(43,34,51,0.35)",
                          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                          fontSize: "0.8em",
                          fontVariant: "normal",
                          fontWeight: 600,
                          letterSpacing: 0,
                        }}
                      >
                        {count}
                      </span>
                    )}
                  </Link>
                )}
              </span>
            );
          })}
        </div>
      </div>

      {showControls && (
        <MapControls
          layers={layers}
          onToggle={toggle}
          onSearchClick={onSearchClick || (() => {})}
          isNight={isNight}
        />
      )}
    </div>
  );
}
