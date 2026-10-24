"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { COLORS, SHADOWS } from "@/components/pages/gallery/constants/palette";
import type { TeamMember } from "@/components/pages/gallery/types";
import { InstagramIcon } from "./InstagramIcon";
import { LinkedinIcon } from "./LinkedinIcon";

// ═══════════════════════════════════════════════════════════════════
// MEMBER CARD - stamp/polaroid-style card with placeholder support.
//
// Tier-aware styling so the hierarchy reads at a glance:
//   • lead        → large, gold ornate frame (the main one)
//   • developer   → medium, purple/maroon accent frame (core devs)
//   • contributor → clean paper card (helpers)
// Tier is derived from the role text.
// ═══════════════════════════════════════════════════════════════════

type MemberTier = "lead" | "developer" | "contributor";

function getTier(role: string): MemberTier {
  if (/lead/i.test(role)) return "lead";
  if (/developer/i.test(role)) return "developer";
  return "contributor";
}

export function MemberCard({
  member,
  index,
  featured = false,
}: {
  member: TeamMember;
  index: number;
  /** When true, render the larger "lead" treatment regardless of grid position. */
  featured?: boolean;
}) {
  const hasPhoto = !!member.photo;
  const tier = getTier(member.role);
  const isLead = tier === "lead" || featured;
  const isDeveloper = tier === "developer" && !featured;

  // Slight alternating tilt for the scrapbook feel (lead stays straight).
  const tilt = isLead ? 0 : index % 3 === 0 ? -1.5 : index % 3 === 1 ? 1.5 : 0;

  // Tier-specific accent colors
  const accentColor = isLead ? COLORS.BRIGHT_GOLD : isDeveloper ? COLORS.RANI : COLORS.MARIGOLD;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: isLead ? 1.03 : 1.04, rotate: 0, y: -6, zIndex: 3 }}
      className="group relative flex flex-col"
      style={{
        rotate: `${tilt}deg`,
        background: isLead
          ? `linear-gradient(135deg, ${COLORS.BRIGHT_GOLD} 0%, ${COLORS.PAPER} 22%, ${COLORS.PAPER} 78%, ${COLORS.GOLD} 100%)`
          : isDeveloper
            ? `linear-gradient(135deg, ${COLORS.RANI}44 0%, ${COLORS.PAPER} 18%, ${COLORS.PAPER} 82%, ${COLORS.PURPLE}44 100%)`
            : COLORS.PAPER,
        padding: isLead ? 10 : isDeveloper ? 8 : 7,
        borderRadius: isLead ? 10 : isDeveloper ? 8 : 6,
        border: isLead
          ? `2px solid ${COLORS.BRIGHT_GOLD}`
          : isDeveloper
            ? `1.5px solid ${COLORS.RANI}88`
            : "none",
        boxShadow: isLead
          ? `0 22px 60px -16px ${COLORS.MARIGOLD}, 0 0 0 1px ${COLORS.GOLD}66, 0 0 44px -8px ${COLORS.BRIGHT_GOLD}88`
          : isDeveloper
            ? `0 16px 40px -12px ${COLORS.RANI}66, 0 0 0 1px ${COLORS.PURPLE}44, 0 0 30px -6px ${COLORS.RANI}55`
            : SHADOWS.CARD,
      }}
    >
      {/* Glow on hover (gold for lead, rani for developer, marigold for contributor) */}
      <span
        className="pointer-events-none absolute -inset-1 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `0 18px 50px -14px ${accentColor}88`,
        }}
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
            sizes={isLead ? "(max-width: 640px) 70vw, 300px" : "(max-width: 640px) 45vw, 240px"}
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

        {/* inner frame line (tier-specific accent) */}
        <span
          className="pointer-events-none absolute inset-0 rounded-[3px]"
          style={{
            boxShadow: isLead
              ? `inset 0 0 0 2px ${COLORS.BRIGHT_GOLD}aa`
              : isDeveloper
                ? `inset 0 0 0 1.5px ${COLORS.RANI}77`
                : "inset 0 0 0 1px rgba(27,15,36,0.18)",
          }}
        />

        {/* corner flourishes */}
        {["left-1 top-1", "right-1 top-1", "left-1 bottom-1", "right-1 bottom-1"].map((pos, k) => (
          <span
            key={k}
            className={`pointer-events-none absolute ${pos} h-3 w-3`}
            style={{
              borderTop: pos.includes("top") ? `1.5px solid ${accentColor}` : "none",
              borderBottom: pos.includes("bottom") ? `1.5px solid ${accentColor}` : "none",
              borderLeft: pos.includes("left") ? `1.5px solid ${accentColor}` : "none",
              borderRight: pos.includes("right") ? `1.5px solid ${accentColor}` : "none",
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* Caption bar */}
      <div className="relative flex items-center justify-between gap-2 px-1.5 pt-2.5 pb-1">
        <div className="min-w-0">
          <p
            className={`truncate leading-tight font-bold ${isLead ? "text-[15px]" : isDeveloper ? "text-[14px]" : "text-[13px]"}`}
            style={{ color: COLORS.TEXT_DARK, fontFamily: "var(--font-cinzel), Georgia, serif" }}
          >
            {member.name}
          </p>
          <p
            className={`truncate font-semibold tracking-wide uppercase ${isLead ? "text-[11px]" : isDeveloper ? "text-[10px]" : "text-[10px]"}`}
            style={{ color: isLead ? COLORS.MAROON : isDeveloper ? COLORS.PURPLE : COLORS.RANI }}
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
