"use client";

import { useState } from "react";
import { LAYERS } from "@/components/pages/schedule/constants";
import type { MapLayers, Layer } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// MOBILE CONTROLS
// Fixed search and layers buttons for mobile view
// ═══════════════════════════════════════════════════════════════════

interface MobileControlsProps {
  layers: MapLayers;
  onLayerToggle: (key: Layer) => void;
  onSearchClick: () => void;
}

export function MobileControls({ layers, onLayerToggle, onSearchClick }: MobileControlsProps) {
  const [layersOpen, setLayersOpen] = useState(false);

  const btnStyle = {
    background: "rgba(15, 10, 25, 0.98)",
    boxShadow:
      "0 4px 20px rgba(0,0,0,0.5), 0 0 25px rgba(184, 134, 11, 0.5), 0 0 50px rgba(212, 168, 83, 0.3)",
  };

  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2.5 lg:hidden">
      {/* Search button */}
      <button
        onClick={onSearchClick}
        aria-label="Search events"
        className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-xl border-2 border-[#B8860B] text-[#D4A853] backdrop-blur-md transition-all duration-300 hover:border-[#D4A853] hover:text-[#FFD700]"
        style={btnStyle}
      >
        <svg
          className="h-5 w-5"
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

      {/* Layers button */}
      <div className="relative">
        <button
          onClick={() => setLayersOpen(!layersOpen)}
          aria-label="Map layers"
          aria-expanded={layersOpen}
          className={`flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-xl border-2 border-[#B8860B] text-[#D4A853] backdrop-blur-md transition-all duration-300 hover:border-[#D4A853] hover:text-[#FFD700] ${layersOpen ? "rounded-b-none border-b-transparent" : ""}`}
          style={btnStyle}
        >
          <svg
            className="h-5 w-5"
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

        {/* Layers dropdown */}
        {layersOpen && (
          <div
            className="absolute top-full right-0 flex w-[42px] flex-col gap-1 rounded-b-xl border-2 border-t-0 border-[#B8860B] p-1.5 backdrop-blur-xl"
            style={{
              background: "rgba(15, 10, 25, 0.98)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 15px rgba(184, 134, 11, 0.2)",
            }}
          >
            {LAYERS.filter((l) => l.key !== "labels").map(({ key, label, icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => onLayerToggle(key)}
                title={label}
                className={`flex h-8 w-full items-center justify-center rounded-lg text-lg transition-all ${
                  layers[key]
                    ? "bg-[rgba(80,110,180,0.35)] text-[rgba(220,230,255,1)]"
                    : "text-[#D4A853]/80 hover:bg-[#D4A853]/20 hover:text-[#FFD700]"
                }`}
              >
                <span>{icon}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
