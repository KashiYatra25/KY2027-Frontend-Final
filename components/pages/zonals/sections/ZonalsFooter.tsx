"use client";

// ═══════════════════════════════════════════════════════════════════
// ZONALS FOOTER
//
// Underground-festival styled footer for the Zonals page. Carries the
// KASHIYATRA 2027 branding, the ZONALS tagline, IIT (BHU) VARANASI
// location, the same nav links as the navbar, social placeholders, a
// copyright line and a small animated decorative element (a rotating
// acid-lime star / sound-wave motif). Matches the acid-lime / ink
// identity.
// ═══════════════════════════════════════════════════════════════════

import { motion } from "framer-motion";

import { COLORS, SHADOWS } from "../constants/palette";

// ───────────────────────────────────────────────────────────────────
// Data (kept in-sync with the navbar's links)
// ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "ZONALS", targetId: "zonals-hero" },
  { label: "EXPLORE EVENTS", targetId: "zonals-events" },
  { label: "PASSES", targetId: "zonals-passes" },
] as const;

// Social placeholders — replace `href` with real URLs before launch.
const SOCIAL_LINKS = [
  { label: "Instagram", short: "IG", href: "#" }, // PLACEHOLDER
  { label: "YouTube", short: "YT", href: "#" }, // PLACEHOLDER
  { label: "X / Twitter", short: "X", href: "#" }, // PLACEHOLDER
  { label: "Spotify", short: "SP", href: "#" }, // PLACEHOLDER
] as const;

/** Smooth-scroll to a section by id, accounting for the fixed navbar. */
function scrollToSection(targetId: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(targetId);
  if (!el) return;
  const NAVBAR_OFFSET = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

// ───────────────────────────────────────────────────────────────────
// Decorative element: a rotating star built from stacked sound-wave
// bars that pulse. Pure CSS/SVG + framer-motion, no assets needed.
// ───────────────────────────────────────────────────────────────────

function RotatingStar() {
  return (
    <motion.div className="relative flex h-14 w-14 items-center justify-center" aria-hidden>
      {/* Rotating acid-lime star */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, ease: "linear", repeat: Infinity }}
        style={{ filter: `drop-shadow(0 0 8px ${COLORS.ACID_LIME}88)` }}
      >
        <path
          d="M50 2 L61 38 L98 38 L68 60 L79 96 L50 74 L21 96 L32 60 L2 38 L39 38 Z"
          fill="none"
          stroke={COLORS.ACID_LIME}
          strokeWidth={3}
          strokeLinejoin="round"
        />
      </motion.svg>

      {/* Pulsing sound-wave bars at the center */}
      <div className="flex items-end gap-[3px]">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="block w-[3px] rounded-full"
            style={{ backgroundColor: COLORS.ACID_LIME }}
            animate={{ height: ["6px", "16px", "6px"] }}
            transition={{
              duration: 0.9,
              ease: "easeInOut",
              repeat: Infinity,
              delay: i * 0.12,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function ZonalsFooter() {
  const year = 2027;

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{
        backgroundColor: COLORS.DEEP_INK,
        borderColor: `${COLORS.ACID_LIME}33`,
      }}
    >
      {/* Top accent strip */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${COLORS.ACID_LIME}, ${COLORS.ELECTRIC_BLUE}, ${COLORS.HOT_PINK}, ${COLORS.SIGNAL_ORANGE})`,
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 2xl:max-w-[1600px]">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* ── Branding ────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <RotatingStar />
              <div>
                <p
                  className="font-mono text-lg font-black tracking-[0.18em] uppercase"
                  style={{ color: COLORS.PAPER_WHITE }}
                >
                  KASHIYATRA 2027
                </p>
                <p
                  className="font-mono text-sm font-bold tracking-[0.3em] uppercase"
                  style={{ color: COLORS.ACID_LIME }}
                >
                  ZONALS
                </p>
              </div>
            </div>
            <p
              className="font-mono text-xs tracking-[0.2em] uppercase"
              style={{ color: `${COLORS.PAPER_WHITE}99` }}
            >
              IIT (BHU), VARANASI
            </p>
            <p
              className="max-w-xs text-sm leading-relaxed"
              style={{ color: `${COLORS.PAPER_WHITE}aa` }}
            >
              Your city. Your stage. The road to the main event starts in the zonals.
            </p>
          </div>

          {/* ── Navigation ──────────────────────────────────────── */}
          <nav aria-label="Footer navigation" className="flex flex-col gap-4">
            <p
              className="font-mono text-xs font-bold tracking-[0.25em] uppercase"
              style={{ color: `${COLORS.PAPER_WHITE}66` }}
            >
              Explore
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.targetId}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.targetId)}
                    className="group inline-flex items-center gap-2 font-mono text-sm font-bold tracking-[0.14em] uppercase transition-colors focus:outline-none"
                    style={{ color: `${COLORS.PAPER_WHITE}cc` }}
                  >
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rotate-45 opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ backgroundColor: COLORS.ACID_LIME }}
                    />
                    <span className="transition-colors group-hover:text-[#D7FF00]">
                      {link.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Social ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <p
              className="font-mono text-xs font-bold tracking-[0.25em] uppercase"
              style={{ color: `${COLORS.PAPER_WHITE}66` }}
            >
              Follow {/* PLACEHOLDER social links */}
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, rotate: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border font-mono text-xs font-black tracking-wider uppercase transition-colors"
                  style={{
                    color: COLORS.PAPER_WHITE,
                    borderColor: `${COLORS.ACID_LIME}55`,
                  }}
                >
                  {social.short}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────────────── */}
        <div className="mt-10 h-px w-full" style={{ backgroundColor: `${COLORS.PAPER_WHITE}1a` }} />

        {/* ── Bottom bar ────────────────────────────────────────── */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p
            className="text-center text-xs sm:text-left"
            style={{ color: `${COLORS.PAPER_WHITE}80` }}
          >
            © {year} Kashiyatra. All rights reserved.
          </p>
          <p
            className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: `${COLORS.ACID_LIME}aa`, textShadow: SHADOWS.LIME_GLOW }}
          >
            Made for the underground ◆
          </p>
        </div>
      </div>

      {/* Decorative oversized ghost wordmark in the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-0 w-full text-center font-mono text-[18vw] leading-none font-black tracking-tighter uppercase select-none"
        style={{ color: `${COLORS.PAPER_WHITE}05` }}
      >
        ZONALS
      </div>
    </footer>
  );
}

export default ZonalsFooter;
