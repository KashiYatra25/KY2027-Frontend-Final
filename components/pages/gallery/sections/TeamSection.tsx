"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import { COLORS, SHADOWS } from "../constants/palette";
import { TEAM_PHOTO, TEAM_GROUPS } from "../config/data.config";
import type { LightboxItem, TeamMember } from "../types";

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

// ═══════════════════════════════════════════════════════════════════
// MEMBER CARD - stamp/polaroid-style card with placeholder support
// ═══════════════════════════════════════════════════════════════════

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const hasPhoto = !!member.photo;
  // Slight alternating tilt for the scrapbook feel.
  const tilt = index % 3 === 0 ? -1.5 : index % 3 === 1 ? 1.5 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.04, rotate: 0, y: -6, zIndex: 3 }}
      className="group relative flex flex-col"
      style={{
        rotate: `${tilt}deg`,
        background: COLORS.PAPER,
        padding: 7,
        borderRadius: 6,
        boxShadow: SHADOWS.CARD,
      }}
    >
      {/* Marigold glow on hover */}
      <span
        className="pointer-events-none absolute -inset-1 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 18px 50px -14px ${COLORS.MARIGOLD}88` }}
      />

      {/* Photo / placeholder */}
      <div
        className="relative w-full overflow-hidden rounded-[3px]"
        style={{ aspectRatio: "4 / 5" }}
      >
        {hasPhoto ? (
          <Image
            src={member.photo as string}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 45vw, 240px"
          />
        ) : (
          <div
            className="relative flex h-full w-full flex-col items-center justify-center gap-3"
            style={{
              background: `radial-gradient(circle at 50% 32%, ${COLORS.MAROON} 0%, ${COLORS.INK} 78%)`,
            }}
          >
            {/* subtle dotted texture */}
            <span
              className="pointer-events-none absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage: `radial-gradient(rgba(246,236,220,0.5) 0.5px, transparent 0.5px)`,
                backgroundSize: "10px 10px",
              }}
            />
            {/* glowing diya ring */}
            <span className="relative flex h-16 w-16 items-center justify-center">
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: `0 0 28px ${COLORS.MARIGOLD}55`,
                  background: `${COLORS.MARIGOLD}10`,
                }}
              />
              <span
                className="relative flex h-14 w-14 items-center justify-center rounded-full"
                style={{
                  background: "rgba(245,166,35,0.12)",
                  border: `1px solid ${COLORS.MARIGOLD}66`,
                }}
              >
                <User className="h-7 w-7" style={{ color: COLORS.MARIGOLD }} />
              </span>
            </span>
            <span
              className="relative font-mono text-[9px] tracking-[0.3em] uppercase"
              style={{ color: "rgba(246,236,220,0.45)" }}
            >
              Photo soon
            </span>
          </div>
        )}

        {/* inner frame line */}
        <span
          className="pointer-events-none absolute inset-0 rounded-[3px]"
          style={{ boxShadow: "inset 0 0 0 1px rgba(27,15,36,0.18)" }}
        />

        {/* corner flourishes */}
        {["left-1 top-1", "right-1 top-1", "left-1 bottom-1", "right-1 bottom-1"].map((pos, k) => (
          <span
            key={k}
            className={`pointer-events-none absolute ${pos} h-3 w-3`}
            style={{
              borderTop: pos.includes("top") ? `1.5px solid ${COLORS.MARIGOLD}` : "none",
              borderBottom: pos.includes("bottom") ? `1.5px solid ${COLORS.MARIGOLD}` : "none",
              borderLeft: pos.includes("left") ? `1.5px solid ${COLORS.MARIGOLD}` : "none",
              borderRight: pos.includes("right") ? `1.5px solid ${COLORS.MARIGOLD}` : "none",
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* Caption bar */}
      <div className="relative flex items-center justify-between gap-2 px-1.5 pt-2.5 pb-1">
        <div className="min-w-0">
          <p
            className="truncate text-[13px] leading-tight font-bold"
            style={{ color: COLORS.TEXT_DARK, fontFamily: "var(--font-cinzel), Georgia, serif" }}
          >
            {member.name}
          </p>
          <p
            className="truncate text-[10px] tracking-wide uppercase"
            style={{ color: COLORS.RANI }}
          >
            {member.role}
          </p>
        </div>
        {(member.instagram || member.linkedin) && (
          <div className="flex shrink-0 items-center gap-2">
            {member.instagram && (
              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on Instagram`}
                className="transition-opacity hover:opacity-60"
                style={{ color: COLORS.TEXT_DARK }}
              >
                <InstagramIcon />
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="transition-opacity hover:opacity-60"
                style={{ color: COLORS.TEXT_DARK }}
              >
                <LinkedinIcon />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Inline social icons (lucide v1 has no brand icons) ──────────────
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
