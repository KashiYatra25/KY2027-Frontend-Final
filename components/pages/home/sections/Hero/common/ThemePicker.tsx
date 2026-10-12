"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IMAGES } from "@/lib/images";
import type { TimeOfDay } from "@/hooks/useTimeOfDay";

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

// Get background gradient for each theme
function getThemeBackground(theme: TimeOfDay | "auto"): string {
  switch (theme) {
    case "auto":
      return "linear-gradient(135deg, #4a90c2 0%, #ff7043 50%, #1e1e4a 100%)";
    case "night":
      return "linear-gradient(180deg, #1e1e4a 0%, #0d0d25 100%)";
    case "afternoon":
      return "linear-gradient(180deg, #ffd54f 0%, #f9a825 100%)";
    case "evening":
      return "linear-gradient(180deg, #ff7043 0%, #d84315 100%)";
    case "dawn":
      return "linear-gradient(180deg, #ffcc80 0%, #ff8a65 100%)";
    case "dusk":
      return "linear-gradient(180deg, #7e57c2 0%, #4a148c 100%)";
    case "morning":
      return "linear-gradient(180deg, #81d4fa 0%, #4fc3f7 100%)";
    default:
      return "linear-gradient(180deg, #1e1e4a 0%, #0d0d25 100%)";
  }
}

// Get SVG icon for each theme
function getThemeIcon(theme: TimeOfDay | "auto"): React.ReactNode {
  const size = "60%";

  switch (theme) {
    case "auto":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          {/* Clock/Auto icon */}
          <circle cx="12" cy="12" r="9" stroke="#fff8e1" strokeWidth="2" fill="none" />
          <path
            d="M12 6 L12 12 L16 14"
            stroke="#fff8e1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "night":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="#ffd54f"
            stroke="#fff8e1"
            strokeWidth="0.5"
          />
        </svg>
      );
    case "afternoon":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="5" fill="#fff8e1" />
          <g stroke="#fff8e1" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="2" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
            <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
            <line x1="2" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" />
            <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
          </g>
        </svg>
      );
    case "evening":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          {/* Sun setting behind horizon */}
          <circle cx="12" cy="14" r="5" fill="#ffcc80" />
          <rect x="2" y="14" width="20" height="10" fill="#d84315" />
          <path d="M2 14 L22 14" stroke="#ffab40" strokeWidth="1.5" />
        </svg>
      );
    case "dawn":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          {/* Sun rising with rays */}
          <circle cx="12" cy="16" r="4" fill="#fff8e1" />
          <g stroke="#ffcc80" strokeWidth="1.5" strokeLinecap="round">
            <line x1="12" y1="6" x2="12" y2="9" />
            <line x1="5.64" y1="9.64" x2="7.76" y2="11.76" />
            <line x1="18.36" y1="9.64" x2="16.24" y2="11.76" />
          </g>
          <path d="M4 20 L20 20" stroke="#ff8a65" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "dusk":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          {/* Moon with stars */}
          <path
            d="M18 12.79A7 7 0 1 1 10.21 5 5.5 5.5 0 0 0 18 12.79z"
            fill="#ce93d8"
            stroke="#e1bee7"
            strokeWidth="0.5"
          />
          <circle cx="18" cy="6" r="1" fill="#fff59d" />
          <circle cx="20" cy="10" r="0.6" fill="#fff59d" />
          <circle cx="15" cy="4" r="0.5" fill="#fff59d" />
        </svg>
      );
    case "morning":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          {/* Sun with clouds */}
          <circle cx="14" cy="10" r="4" fill="#fff9c4" />
          <ellipse cx="10" cy="16" rx="6" ry="3" fill="#e3f2fd" />
          <ellipse cx="16" cy="15" rx="4" ry="2.5" fill="#bbdefb" />
        </svg>
      );
    default:
      return null;
  }
}
