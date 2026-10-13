"use client";

import { useState } from "react";
import {
  CampusMap,
  EventSearchOverlay,
  WhatsOnSidebar,
  DecorativeElements,
  ScheduleLoader,
} from "./sections";
import { Navigation, MobileControls, MobileLogo } from "./components";
import { DEFAULT_LAYERS } from "./constants";
import { useSchedule } from "@/lib/api/hooks";
import type { MapLayers, Layer } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// SCHEDULE PAGE CONTENT
// Events map (Thomso-style): minimal floating menu, "What's On" feed on the
// left and the whole animated IIT (BHU) campus map filling the screen.
// Hovering a venue flies to it; clicking opens the venue's page.
// ═══════════════════════════════════════════════════════════════════

export function SchedulePageContent() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [layers, setLayers] = useState<MapLayers>(DEFAULT_LAYERS);

  // Fetch schedule data from backend
  const { scheduledEvents, venues, eventsByVenue, isLoading, isError, errorMessage } =
    useSchedule();

  const toggleLayer = (key: Layer) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Determine if we should show content or loader/error
  const showContent = !isLoading && !isError && venues.length > 0;

  return (
    <>
      {/* Desktop Navigation - always visible */}
      <Navigation isOpen={navOpen} onOpenChange={setNavOpen} />

      {/* Mobile Logo - always visible */}
      <MobileLogo />

      {/* Background - always visible */}
      <div className="fixed inset-0 -z-10" style={{ background: "#0c1220" }} />

      <main className="relative min-h-[100dvh] text-white lg:h-[100dvh] lg:overflow-hidden">
        {/* Decorative Elements - always visible */}
        <DecorativeElements />

        {/* Loading State - shown in content area */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center lg:left-[260px]">
            <ScheduleLoader />
          </div>
        )}

        {/* Error State - shown in content area */}
        {isError && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 lg:left-[260px]">
            <p className="text-xl text-red-400">Failed to load schedule</p>
            <p className="text-sm text-white/60">{errorMessage}</p>
          </div>
        )}

        {/* Main Content - only shown when data is ready */}
        {showContent && (
          <>
            {/* What's On Sidebar - blurs when nav is open (desktop only) */}
            <div
              className="fixed top-24 bottom-4 left-4 z-[200] hidden w-[240px] transition-all duration-300 lg:block"
              style={{
                filter: navOpen ? "blur(4px)" : "none",
                opacity: navOpen ? 0.5 : 1,
              }}
            >
              <WhatsOnSidebar className="h-full" scheduledEvents={scheduledEvents} />
            </div>

            {/* Map - zoomed in on mobile, scrollable */}
            <div className="absolute inset-0 [scrollbar-width:none] scrollbar-none overflow-auto [-ms-overflow-style:none] lg:left-[260px] lg:overflow-hidden [&::-webkit-scrollbar]:hidden">
              <div className="h-[150%] w-[150%] origin-top-left lg:h-full lg:w-full">
                <CampusMap
                  hoverZoom
                  edgeFade
                  fill
                  layers={layers}
                  venues={venues}
                  eventsByVenue={eventsByVenue}
                  onLayerToggle={toggleLayer}
                  onSearchClick={() => setSearchOpen(true)}
                  className="[&>div:last-child]:hidden [&>div:last-child]:lg:flex"
                />
              </div>
            </div>

            {/* Mobile Controls */}
            <MobileControls
              layers={layers}
              onLayerToggle={toggleLayer}
              onSearchClick={() => setSearchOpen(true)}
            />

            {/* Footer hint */}
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center font-[family-name:var(--font-cormorant)] text-[12px] font-semibold tracking-[0.2em] text-[#efe4cc]/50 uppercase lg:left-[calc(50%+130px)]">
              <span className="hidden sm:inline">
                Hover a venue to fly to it · Click to walk in
              </span>
              <span className="sm:hidden">Tap a venue to walk in</span>
            </p>
          </>
        )}
      </main>

      {/* Full-screen search overlay - only when content is ready */}
      {showContent && (
        <EventSearchOverlay
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          scheduledEvents={scheduledEvents}
        />
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.02);
          }
        }
      `}</style>
    </>
  );
}
