"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { COLORS, SHADOWS } from "@/components/pages/gallery/constants/palette";
import { TEAM_PHOTO, TEAM_GROUPS } from "@/components/pages/gallery/config/data.config";
import type { LightboxItem } from "@/components/pages/gallery/types";
import { MemberCard } from "./MemberCard";

type TeamSectionProps = {
  onPhotoClick: (items: LightboxItem[], index: number) => void;
};

// ═══════════════════════════════════════════════════════════════════
// TEAM SECTION
// Group photo + a side-panel of team categories with member cards.
// ═══════════════════════════════════════════════════════════════════

export function TeamSection({ onPhotoClick }: TeamSectionProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const hasPhoto = TEAM_PHOTO !== null;

  const [activeId, setActiveId] = useState<string>(TEAM_GROUPS[0]?.id ?? "");
  const activeGroup = TEAM_GROUPS.find((g) => g.id === activeId) ?? TEAM_GROUPS[0];

  const handleClick = useCallback(() => {
    if (hasPhoto && TEAM_PHOTO) {
      onPhotoClick(
        [{ type: "photo", src: TEAM_PHOTO.src, title: TEAM_PHOTO.title || "Kashi Yatra Team" }],
        0
      );
    }
  }, [hasPhoto, onPhotoClick]);

  return (
    <section ref={sectionRef} className="gallery-section relative z-10 mt-16 sm:mt-24" id="team">
      {/* Section header */}
      <motion.div
        className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 lg:px-16 2xl:max-w-[1400px]"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p
          className="mb-2.5 font-mono text-xs tracking-[0.18em] uppercase"
          style={{ color: COLORS.MARIGOLD }}
        >
          The people
        </p>
        <h2
          className="font-serif text-[clamp(38px,7vw,76px)] leading-none font-normal"
          style={{
            color: COLORS.PAPER,
            textShadow: SHADOWS.SECTION_TITLE,
            fontFamily: "var(--font-cinzel-decorative), var(--font-cinzel), Georgia, serif",
          }}
        >
          <span
            className="italic"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "0.8em",
              color: COLORS.MARIGOLD,
              textShadow: "none",
            }}
          >
            Meet
          </span>{" "}
          OUR TEAM
        </h2>
      </motion.div>

      {/* Team group photo */}
      {hasPhoto && TEAM_PHOTO && (
        <motion.div
          className="mx-auto mt-9 max-w-[1200px] px-4 sm:px-6 md:px-12 lg:px-16 2xl:max-w-[1400px]"
          initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
          animate={
            isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.9, rotate: 3 }
          }
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.button
            type="button"
            className="team-photo-frame group mx-auto block w-full max-w-[820px] -rotate-1 cursor-zoom-in overflow-hidden border-[10px]"
            style={{
              borderColor: COLORS.PAPER,
              background: "#e6d8bd",
              aspectRatio: TEAM_PHOTO.aspectRatio || 1.6,
              boxShadow: "0 30px 60px -26px rgba(0,0,0,0.85)",
            }}
            onClick={handleClick}
            aria-label={TEAM_PHOTO.title || "View team photo"}
            whileHover={{ scale: 1.02, rotate: 0 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={TEAM_PHOTO.src}
              alt={TEAM_PHOTO.title || "Kashi Yatra Team"}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 820px"
            />
          </motion.button>
        </motion.div>
      )}

      {/* Team photo placeholder — shown until the real team photo is added */}
      {!hasPhoto && (
        <motion.div
          className="mx-auto mt-9 max-w-[1200px] px-4 sm:px-6 md:px-12 lg:px-16 2xl:max-w-[1400px]"
          initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
          animate={
            isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.9, rotate: 3 }
          }
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="team-photo-frame mx-auto flex w-full max-w-[820px] -rotate-1 flex-col items-center justify-center gap-3 overflow-hidden border-[10px]"
            style={{
              borderColor: COLORS.PAPER,
              background: "linear-gradient(135deg, #2a1a30 0%, #1a0f24 100%)",
              aspectRatio: 1.6,
              boxShadow: "0 30px 60px -26px rgba(0,0,0,0.85)",
            }}
            aria-label="Team photo coming soon"
          >
            <span className="text-3xl opacity-60">📸</span>
            <span
              className="text-lg tracking-[0.25em] uppercase sm:text-xl"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                color: COLORS.MARIGOLD,
              }}
            >
              Coming Soon
            </span>
          </div>
        </motion.div>
      )}

      {/* Side panel + member cards */}
      {TEAM_GROUPS.length > 0 && activeGroup && (
        <motion.div
          className="mx-auto mt-20 max-w-[1200px] px-4 sm:mt-28 sm:px-6 md:px-12 lg:px-16 2xl:max-w-[1400px]"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
            {/* ── Left: category side panel ── */}
            <nav className="lg:w-72 lg:shrink-0" aria-label="Team categories">
              <div
                className="lg:sticky lg:top-28 lg:rounded-2xl lg:p-3"
                style={{
                  background: "transparent",
                }}
              >
                {/* Panel heading (desktop) */}
                <p
                  className="mb-3 hidden px-2 font-mono text-[10px] tracking-[0.28em] uppercase lg:block"
                  style={{ color: "rgba(246,236,220,0.4)" }}
                >
                  Departments
                </p>

                {/* Mobile: horizontal scroll tabs. Desktop: vertical list. */}
                <div className="flex [scrollbar-width:none] gap-2.5 overflow-x-auto pb-2 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
                  {TEAM_GROUPS.map((group, idx) => {
                    const active = group.id === activeId;
                    return (
                      <button
                        key={group.id}
                        type="button"
                        // Auto-select on hover/focus (desktop); click for touch.
                        onMouseEnter={() => setActiveId(group.id)}
                        onFocus={() => setActiveId(group.id)}
                        onClick={() => setActiveId(group.id)}
                        className="group/navbtn relative flex shrink-0 cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-4 py-3.5 text-left transition-all duration-300 lg:w-full"
                        style={{
                          background: active ? COLORS.PAPER : "rgba(246,236,220,0.035)",
                          border: active
                            ? `1px solid ${COLORS.MARIGOLD}`
                            : "1px solid rgba(246,236,220,0.08)",
                          boxShadow: active
                            ? `0 10px 30px -12px ${COLORS.MARIGOLD}66, 0 0 0 1px ${COLORS.MARIGOLD}22`
                            : "none",
                        }}
                      >
                        {/* Active accent bar (desktop) */}
                        <span
                          className="absolute top-1/2 left-0 hidden h-7 w-[3px] -translate-y-1/2 rounded-r transition-opacity duration-300 lg:block"
                          style={{ background: COLORS.RANI, opacity: active ? 1 : 0 }}
                        />

                        {/* Index number */}
                        <span
                          className="font-mono text-xs tabular-nums transition-colors duration-300"
                          style={{ color: active ? COLORS.RANI : "rgba(246,236,220,0.3)" }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>

                        {/* Label + count */}
                        <span className="flex min-w-0 flex-col">
                          <span
                            className="truncate text-sm font-bold tracking-wide uppercase transition-colors duration-300"
                            style={{
                              fontFamily: "var(--font-cinzel), Georgia, serif",
                              color: active ? COLORS.TEXT_DARK : COLORS.TEXT_DIM,
                            }}
                          >
                            {group.label}
                          </span>
                          <span
                            className="text-[10px] tracking-wider transition-colors duration-300"
                            style={{
                              color: active ? "rgba(27,15,36,0.55)" : "rgba(246,236,220,0.3)",
                            }}
                          >
                            {group.members.length}{" "}
                            {group.members.length === 1 ? "member" : "members"}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>

            {/* ── Right: member cards ── */}
            <div className="min-w-0 flex-1">
              {/* Column header */}
              <div
                className="mb-6 flex items-end justify-between border-b pb-3"
                style={{ borderColor: "rgba(246,236,220,0.1)" }}
              >
                <h3
                  className="text-[clamp(22px,3vw,32px)] leading-none font-normal"
                  style={{
                    color: COLORS.PAPER,
                    fontFamily: "var(--font-cinzel-decorative), var(--font-cinzel), Georgia, serif",
                  }}
                >
                  {activeGroup.label}
                </h3>
                <span
                  className="font-mono text-[11px] tracking-[0.2em] uppercase"
                  style={{ color: COLORS.MARIGOLD }}
                >
                  {activeGroup.members.length} /{" "}
                  {String(activeGroup.members.length).padStart(2, "0")}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGroup.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {activeGroup.members.map((member, i) => (
                    <MemberCard key={`${activeGroup.id}-${i}`} member={member} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
