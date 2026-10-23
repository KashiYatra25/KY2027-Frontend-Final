"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IMAGES } from "@/lib/images";
import type { TimeOfDay } from "@/hooks/useTimeOfDay";
import { getThemeBackground, getThemeIcon } from "./themeVisuals";

// ═══════════════════════════════════════════════════════════════════
// THEME PICKER COMPONENT
// Ornate frame with theme options positioned inside
// ═══════════════════════════════════════════════════════════════════

interface ThemePickerProps {
  isOpen: boolean;
  currentTheme: TimeOfDay;
  isManualMode: boolean;
  onSelectTheme: (theme: TimeOfDay) => void;
  onSelectAuto: () => void;
  onClose: () => void;
}

// Theme configuration - using actual TimeOfDay values plus Auto
const THEMES: { id: TimeOfDay | "auto"; label: string }[] = [
  { id: "auto", label: "Auto" },
  { id: "night", label: "Night" },
  { id: "afternoon", label: "Day" },
  { id: "evening", label: "Evening" },
  { id: "dawn", label: "Dawn" },
  { id: "dusk", label: "Dusk" },
];

export function ThemePicker({
  isOpen,
  currentTheme,
  isManualMode,
  onSelectTheme,
  onSelectAuto,
  onClose,
}: ThemePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  // Handle close with fade out animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200); // Match animation duration
  };

  // Handle theme selection
  const handleSelect = (themeId: TimeOfDay | "auto") => {
    if (themeId === "auto") {
      onSelectAuto();
    } else {
      onSelectTheme(themeId);
    }
  };

  // Handle click outside to close
  useEffect(() => {
    if (!isOpen || isClosing) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, isClosing]);

  // Handle escape key to close
  useEffect(() => {
    if (!isOpen || isClosing) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, isClosing]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="absolute top-2 right-2 z-[100] sm:top-3 sm:right-3 md:top-4 md:right-4"
      style={{
        animation: isClosing
          ? "fadeOutScale 0.2s ease-out forwards"
          : "fadeInScale 0.15s ease-out forwards",
      }}
    >
      {/* Ornate Frame Background */}
      <div className="relative">
        <Image
          src={IMAGES.hero.themePickerBox}
          alt="Choose Theme"
          width={500}
          height={160}
          className="h-auto w-[280px] sm:w-[360px] md:w-[420px]"
          style={{
            filter:
              "drop-shadow(0 4px 20px rgba(0,0,0,0.5)) drop-shadow(0 0 30px rgba(255,215,0,0.3))",
          }}
          priority
        />

        {/* Theme Icons Container - Positioned in LOWER portion of frame, below the title */}
        <div
          className="absolute inset-x-0 flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4"
          style={{
            top: "62%",
            transform: "translateY(-50%)",
            padding: "0 8%",
          }}
        >
          {THEMES.map((theme) => {
            // Auto is selected when NOT in manual mode
            // Other themes are selected when in manual mode AND current theme matches
            const isSelected =
              theme.id === "auto" ? !isManualMode : isManualMode && currentTheme === theme.id;

            return (
              <button
                key={theme.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(theme.id);
                }}
                className="group flex flex-col items-center gap-0.5"
                aria-label={`Select ${theme.label} theme`}
              >
                {/* Icon Circle */}
                <div
                  className={`relative flex items-center justify-center rounded-full transition-transform duration-150 ${
                    isSelected ? "scale-110" : "hover:scale-105"
                  }`}
                  style={{
                    width: "clamp(24px, 4.5vw, 34px)",
                    height: "clamp(24px, 4.5vw, 34px)",
                    background: getThemeBackground(theme.id),
                    border: `1.5px solid ${isSelected ? "#ffd700" : "rgba(180,140,60,0.6)"}`,
                    boxShadow: isSelected
                      ? "0 0 10px rgba(255,215,0,0.7), 0 0 20px rgba(255,215,0,0.4)"
                      : "0 2px 6px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.1)",
                  }}
                >
                  {getThemeIcon(theme.id)}

                  {/* Selection ring */}
                  {isSelected && (
                    <div
                      className="absolute inset-[-2px] rounded-full border border-amber-400/70"
                      style={{ animation: "pulseRing 1.5s ease-in-out infinite" }}
                    />
                  )}
                </div>

                {/* Label - with dark background for visibility */}
                <span
                  className="rounded px-1 py-0.5 text-[6px] font-bold tracking-wide uppercase sm:text-[7px] md:text-[8px]"
                  style={{
                    fontFamily: "var(--font-cinzel), serif",
                    color: isSelected ? "#ffd700" : "#c9a227",
                    backgroundColor: "rgba(20, 15, 10, 0.85)",
                    textShadow: isSelected ? "0 0 8px rgba(255,215,0,0.8)" : "none",
                    border: isSelected
                      ? "1px solid rgba(255,215,0,0.5)"
                      : "1px solid rgba(180,140,60,0.3)",
                  }}
                >
                  {theme.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeOutScale {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }
        @keyframes pulseRing {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
