"use client";

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { COLORS } from "../constants/palette";
import type { LightboxItem } from "../types";

type LightboxProps = {
  items: LightboxItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
};

// ═══════════════════════════════════════════════════════════════════
// LIGHTBOX - Full-screen media viewer
// ═══════════════════════════════════════════════════════════════════

export function Lightbox({ items, currentIndex, onClose, onNavigate }: LightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const current = items[currentIndex];
  const isVideo = current?.type === "video";

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onNavigate("prev");
          break;
        case "ArrowRight":
          onNavigate("next");
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNavigate]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!current) return null;

  return (
    <div
      className="lightbox fixed inset-0 z-[300] grid grid-rows-[1fr_auto] p-4 sm:p-5"
      style={{
        background: "rgba(14,7,19,0.94)",
        paddingTop: "calc(20px + env(safe-area-inset-top, 0px))",
        paddingBottom: "calc(20px + env(safe-area-inset-bottom, 0px))",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        type="button"
        className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-xl transition-colors hover:bg-[#e5337c]"
        style={{
          background: "rgba(246,236,220,0.12)",
          color: COLORS.TEXT,
          top: "calc(14px + env(safe-area-inset-top, 0px))",
        }}
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Main stage with navigation */}
      <div className="flex min-h-0 items-center justify-center gap-3">
        {/* Previous button */}
        <NavButton direction="prev" onClick={() => onNavigate("prev")} />

        {/* Media content */}
        <div className="relative flex min-h-0 max-w-full min-w-0 flex-1 items-center justify-center">
          {isVideo ? (
            <video
              ref={videoRef}
              src={current.src}
              controls
              autoPlay
              playsInline
              className="lightbox-media max-h-full max-w-full bg-black"
              style={{
                border: `10px solid ${COLORS.PAPER}`,
                boxShadow: "0 30px 70px rgba(0,0,0,0.7)",
              }}
            />
          ) : (
            <div
              className="lightbox-media relative max-h-full max-w-full animate-[pop_0.3s_ease]"
              style={{
                border: `10px solid ${COLORS.PAPER}`,
                boxShadow: "0 30px 70px rgba(0,0,0,0.7)",
              }}
            >
              <Image
                src={current.src}
                alt={current.title || "Gallery image"}
                width={1200}
                height={800}
                className="block max-h-[70vh] w-auto object-contain"
                priority
              />
            </div>
          )}
        </div>

        {/* Next button */}
        <NavButton direction="next" onClick={() => onNavigate("next")} />
      </div>

      {/* Meta info */}
      <div className="min-h-5 pt-4 text-center">
        {current.title && (
          <b
            className="block text-[26px] font-normal"
            style={{
              fontFamily: "var(--font-cinzel-decorative), var(--font-cinzel), Georgia, serif",
              color: COLORS.PAPER,
            }}
          >
            {current.title}
          </b>
        )}
        {current.sub && (
          <span
            className="mt-1 block font-mono text-xs tracking-[0.14em] uppercase"
            style={{ color: COLORS.MARIGOLD }}
          >
            {current.sub}
          </span>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// NAV BUTTON - Previous/Next navigation
// ═══════════════════════════════════════════════════════════════════

function NavButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      className="flex h-11 w-11 flex-none items-center justify-center rounded-full text-xl transition-colors hover:bg-[#e5337c] sm:h-11 sm:w-11"
      style={{
        background: "rgba(246,236,220,0.12)",
        color: COLORS.TEXT,
      }}
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous" : "Next"}
    >
      {direction === "prev" ? "←" : "→"}
    </button>
  );
}
