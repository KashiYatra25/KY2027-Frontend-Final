"use client";

import { useState } from "react";
import { LAYERS } from "@/components/pages/schedule/constants/layers";
import type { Layer, MapLayers } from "@/lib/api/helper/types";

/** Combined map controls: Search button + Layer toggles in a vertical stack */
export function MapControls({
  layers,
  onToggle,
  onSearchClick,
  isNight = true,
  className = "",
}: {
  layers: MapLayers;
  onToggle: (key: Layer) => void;
  onSearchClick: () => void;
  isNight?: boolean;
  className?: string;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const btnBase = isNight
    ? "bg-[rgba(20,25,45,0.85)] border-[rgba(100,120,180,0.3)] text-[rgba(180,195,230,0.9)] hover:bg-[rgba(30,40,70,0.9)] hover:border-[rgba(140,160,220,0.5)] hover:text-[rgba(210,220,250,1)]"
    : "bg-[rgba(35,28,45,0.9)] border-[rgba(255,180,100,0.3)] text-[rgba(255,220,180,0.85)] hover:bg-[rgba(45,35,58,0.95)] hover:border-[rgba(255,180,100,0.5)] hover:text-[rgba(255,230,200,1)]";

  const dropdownBase = isNight
    ? "bg-[rgba(20,25,45,0.95)] border-[rgba(100,120,180,0.3)]"
    : "bg-[rgba(35,28,45,0.95)] border-[rgba(255,180,100,0.3)]";

  const dropdownBtnBase = isNight
    ? "text-[rgba(160,175,210,0.8)] hover:bg-[rgba(80,100,160,0.25)] hover:text-[rgba(200,215,250,1)]"
    : "text-[rgba(255,220,180,0.75)] hover:bg-[rgba(255,180,100,0.15)] hover:text-[rgba(255,235,200,1)]";

  const dropdownBtnActive = isNight
    ? "bg-[rgba(80,110,180,0.35)] text-[rgba(220,230,255,1)] border-[rgba(120,150,220,0.4)]"
    : "bg-[rgba(255,180,100,0.2)] text-[rgba(255,240,210,1)] border-[rgba(255,180,100,0.35)]";

  return (
    <div
      className={`absolute top-4 right-4 z-[2] flex flex-col gap-2.5 sm:gap-3 ${className}`}
      style={{ animation: "campusMapControlsSlideIn 0.5s ease-out 0.1s backwards" }}
    >
      {/* Search button */}
      <button
        onClick={onSearchClick}
        aria-label="Search events"
        className={`flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-lg border backdrop-blur-md transition-all duration-300 sm:h-[42px] sm:w-[42px] sm:rounded-[10px] ${btnBase}`}
        style={{
          boxShadow: "0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <svg
          className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>

      {/* Layers dropdown - click on mobile, hover on desktop */}
      <nav
        className="group relative"
        aria-label="Map layers"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-lg border backdrop-blur-md transition-all duration-300 sm:h-[42px] sm:w-[42px] sm:rounded-[10px] ${isDropdownOpen ? "rounded-b-none" : ""} ${btnBase}`}
          style={{
            boxShadow: "0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
          aria-expanded={isDropdownOpen}
        >
          <svg
            className="h-[18px] w-[18px] sm:h-5 sm:w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </button>

        <div
          className={`absolute top-full right-0 flex flex-col gap-1 rounded-b-lg border border-t-0 p-1.5 backdrop-blur-xl transition-all duration-250 sm:rounded-b-[10px] sm:p-2 ${dropdownBase} ${
            isDropdownOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
          style={{
            boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(60,80,140,0.1)",
          }}
        >
          {LAYERS.map(({ key, label, icon }) => (
            <button
              key={key}
              type="button"
              aria-pressed={layers[key]}
              onClick={() => onToggle(key)}
              className={`flex min-w-[100px] cursor-pointer items-center gap-2.5 rounded-md border px-2.5 py-[7px] font-sans text-[11px] font-medium tracking-wide whitespace-nowrap transition-all duration-200 sm:min-w-[120px] sm:px-3 sm:py-2 sm:text-[12px] ${
                layers[key]
                  ? `${dropdownBtnActive} font-semibold`
                  : `${dropdownBtnBase} border-transparent`
              }`}
            >
              <span className="text-[12px] leading-none sm:text-[14px]">{icon}</span>
              <span className="flex-1">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
