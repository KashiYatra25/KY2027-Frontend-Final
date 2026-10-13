"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { SCHEDULED_EVENTS } from "@/components/pages/schedule/config/campusMap.config";

// ═══════════════════════════════════════════════════════════════════
// EVENT SEARCH OVERLAY
// Full-screen search overlay with auto-suggestions
// Opened via search button in the map controls
// ═══════════════════════════════════════════════════════════════════

interface EventSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EventSearchOverlay({ isOpen, onClose }: EventSearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const q = query.trim().toLowerCase();
  const results = q
    ? SCHEDULED_EVENTS.filter(({ event, category, venue }) =>
        [event.name, category.name, venue.name].some((s) => s.toLowerCase().includes(q))
      ).slice(0, 8)
    : [];

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
        setQuery("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset query when closed
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[400] flex flex-col"
      style={{
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      {/* Search container - slides up from bottom */}
      <div
        className="relative mt-auto flex w-full flex-col items-center px-4 pb-8"
        style={{
          animation: "slideUp 0.3s ease-out",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          aria-label="Close search"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Search input */}
        <div className="w-full max-w-2xl">
          <label className="flex items-center gap-4 rounded-2xl border-2 border-[#D4A853]/60 bg-gradient-to-r from-[#0d1124]/98 to-[#1a1530]/98 px-6 py-4 shadow-2xl backdrop-blur-md transition-all focus-within:border-[#D4A853] focus-within:shadow-[0_0_30px_rgba(212,168,83,0.3)]">
            <Search className="h-6 w-6 shrink-0 text-[#D4A853]" aria-hidden />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events, venues, categories..."
              aria-label="Search events"
              className="w-full bg-transparent text-lg text-[#f3e6c8] placeholder:text-[#D4A853]/40 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="text-[#D4A853]/60 transition-colors hover:text-[#D4A853]"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </label>

          {/* Auto-suggestions */}
          {q && (
            <div
              className="mt-3 max-h-[50vh] overflow-y-auto rounded-2xl border-2 border-[#D4A853]/30 bg-[#0d1124]/98 py-2 shadow-2xl backdrop-blur-md"
              data-lenis-prevent
            >
              {results.length === 0 ? (
                <div className="px-6 py-4 text-center text-white/50">
                  No events match &ldquo;{query}&rdquo;
                </div>
              ) : (
                results.map(({ event, venue, day, category }) => (
                  <Link
                    key={event.id}
                    href={`/schedule/${venue.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between gap-4 px-6 py-3 transition-colors hover:bg-[#D4A853]/10 focus:bg-[#D4A853]/10 focus:outline-none"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-base font-medium text-[#f3e6c8]">
                        {event.name}
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-sm text-white/50">
                        <span>{venue.name}</span>
                        <span className="text-[#D4A853]/50">•</span>
                        <span>{category.name}</span>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#D4A853]/20 px-3 py-1 text-xs font-semibold tracking-wider text-[#D4A853] uppercase">
                      Day {day}
                    </span>
                  </Link>
                ))
              )}
            </div>
          )}

          {/* Hint text */}
          {!q && (
            <p className="mt-4 text-center text-sm text-white/40">
              Start typing to search events, venues, or categories
            </p>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
