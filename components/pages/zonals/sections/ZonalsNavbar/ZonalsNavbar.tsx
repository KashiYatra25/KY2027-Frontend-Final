"use client";

// ═══════════════════════════════════════════════════════════════════
// ZONALS NAVBAR — Art-Directed Festival Navigation
//
// A custom, underground-festival-styled navigation bar for the Zonals
// page. Features:
// - Compact brand lockup with animated starburst
// - Editorial navigation links with active-section tracking
// - Ticket-inspired acid-lime CTA
// - Dramatic full-screen mobile menu overlay
// - Smooth scroll-based state transitions
// ═══════════════════════════════════════════════════════════════════

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ArrowUpRight, Home } from "lucide-react";
import { COLORS, SHADOWS } from "@/components/pages/zonals/constants/palette";
import { AnimatedStarburst } from "./decor/AnimatedStarburst";
import { MiniEqualizer } from "./decor/MiniEqualizer";

// ───────────────────────────────────────────────────────────────────
// CONFIGURATION
// ───────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  targetId: string;
  number: string;
  /** Destination. May be a route ("/zonals/colleges") or a route+hash
   *  ("/zonals#zones"). THE VIBE points at the landing page top. */
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "THE VIBE", targetId: "zonals-hero", number: "01", href: "/zonals" },
  { label: "COLLEGES", targetId: "zonals-colleges", number: "02", href: "/zonals/colleges" },
  { label: "ABOUT", targetId: "zonals-about", number: "03", href: "/zonals/about" },
];

const SCROLL_THRESHOLD = 80;
const NAVBAR_HEIGHT = 72;

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function ZonalsNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(NAV_LINKS[0].targetId);
  const [hasEntered, setHasEntered] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();

  // Route-aware state. The sub-routes (COLLEGES, ABOUT) are their own pages
  // with NO scrollable sections — the navbar syncs active state from the
  // pathname there and skips the section observer. The landing page
  // ("/zonals") keeps the scroll-based observer.
  const LANDING_HREF = "/zonals";
  // Any /zonals sub-route (college pages, /colleges, /about) — NOT the
  // landing page. The "Select College" CTA is hidden on these.
  const isZonalsSubRoute = pathname !== LANDING_HREF && pathname.startsWith("/zonals/");
  // A routed sub-page (not the landing page) whose href path matches.
  const routedActiveTargetId = NAV_LINKS.find(
    (l) => l.href.split("#")[0] === pathname && l.href.split("#")[0] !== LANDING_HREF
  )?.targetId;
  const isRoutedPage = Boolean(routedActiveTargetId);

  // ── Initial entrance animation trigger ────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ── Scroll state tracking ─────────────────────────────────────────
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > SCROLL_THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Active section tracking via IntersectionObserver ──────────────
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    // On a routed nav page (colleges/about) there are no scrollable
    // sections — force that nav item active and skip observing.
    if (isRoutedPage && routedActiveTargetId) {
      setActiveId(routedActiveTargetId);
      return;
    }

    const sections = NAV_LINKS.map((link) => document.getElementById(link.targetId)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isRoutedPage, routedActiveTargetId]);

  // ── Lock body scroll while mobile menu is open ────────────────────
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ── Close menu on Escape key ──────────────────────────────────────
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  const handleNavClick = useCallback(
    (targetId: string) => {
      setMenuOpen(false);
      setActiveId(targetId);

      const link = NAV_LINKS.find((l) => l.targetId === targetId);
      if (!link) return;

      const [path, hash] = link.href.split("#");

      // Different route → navigate (Next will land at top; hash targets are
      // only on the landing page, handled below when already there).
      if (path !== pathname) {
        router.push(link.href);
        return;
      }

      // Same route, with a hash → smooth-scroll to that section.
      if (hash) {
        const el = document.getElementById(hash);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
          window.scrollTo({ top, behavior: "smooth" });
        }
        return;
      }

      // Same route, no hash (e.g. THE VIBE on the landing page) → scroll top.
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router, pathname]
  );

  // ── Animation variants ────────────────────────────────────────────
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
        animate={hasEntered ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-[300]"
      >
        {/* Background layer */}
        <motion.div
          className="absolute inset-0 border-b"
          initial={false}
          animate={{
            backgroundColor: scrolled ? "rgba(17,17,17,0.95)" : "rgba(17,17,17,0)",
            borderColor: scrolled ? `${COLORS.ACID_LIME}25` : "transparent",
          }}
          transition={{ duration: 0.3 }}
          style={{
            backdropFilter: scrolled ? "blur(16px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          }}
        />

        {/* Acid lime bottom accent line */}
        <motion.div
          className="absolute right-0 bottom-0 left-0 h-[1px]"
          initial={false}
          animate={{
            opacity: scrolled ? 1 : 0,
            scaleX: scrolled ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(90deg, transparent, ${COLORS.ACID_LIME}60, ${COLORS.ACID_LIME}, ${COLORS.ACID_LIME}60, transparent)`,
          }}
        />

        <div className="relative mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 2xl:max-w-[1600px]">
          {/* ═══════════════════════════════════════════════════════════
              LEFT: Brand Lockup
          ═══════════════════════════════════════════════════════════ */}
          <div className="flex items-center gap-4">
            {/* Home link */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={hasEntered ? "visible" : "hidden"}
            >
              <Link
                href="/"
                className="group flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF00]"
                style={{
                  borderColor: `${COLORS.PAPER_WHITE}20`,
                  backgroundColor: `${COLORS.PAPER_WHITE}05`,
                }}
                aria-label="Return to Kashiyatra home"
              >
                <Home
                  className="h-4 w-4 transition-colors"
                  style={{ color: `${COLORS.PAPER_WHITE}60` }}
                />
              </Link>
            </motion.div>

            {/* Divider */}
            <span
              className="hidden h-8 w-[1px] sm:block"
              style={{ backgroundColor: `${COLORS.PAPER_WHITE}15` }}
            />

            {/* Brand text */}
            <motion.button
              type="button"
              onClick={() => handleNavClick("zonals-hero")}
              className="group relative flex shrink-0 items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
              aria-label="Kashiyatra 2027 - back to top"
              variants={itemVariants}
              initial="hidden"
              animate={hasEntered ? "visible" : "hidden"}
            >
              {/* Animated Starburst */}
              <div className="relative">
                <AnimatedStarburst size={20} />
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    background: `radial-gradient(circle, ${COLORS.ACID_LIME}30 0%, transparent 70%)`,
                    filter: "blur(4px)",
                  }}
                />
              </div>

              {/* Brand text stack */}
              <div className="flex flex-col items-start leading-none">
                <span
                  className="font-mono text-xs font-bold tracking-[0.2em] uppercase"
                  style={{ color: COLORS.ACID_LIME }}
                >
                  KASHIYATRA
                </span>
                <span
                  className="font-mono text-[10px] tracking-[0.12em] uppercase"
                  style={{ color: `${COLORS.PAPER_WHITE}70` }}
                >
                  2027 / IIT (BHU)
                </span>
              </div>

              {/* PRESENTS ZONALS label */}
              <div className="hidden items-center gap-2 sm:flex">
                <span
                  className="h-5 w-[1px]"
                  style={{ backgroundColor: `${COLORS.PAPER_WHITE}30` }}
                />
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-[10px] tracking-[0.15em] uppercase"
                    style={{ color: `${COLORS.PAPER_WHITE}50` }}
                  >
                    PRESENTS
                  </span>
                  <span
                    className="font-mono text-sm font-black tracking-[0.12em] uppercase"
                    style={{ color: COLORS.PAPER_WHITE }}
                  >
                    ZONALS
                  </span>
                  <MiniEqualizer />
                </div>
              </div>
            </motion.button>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              CENTER: Navigation Links (Desktop)
          ═══════════════════════════════════════════════════════════ */}
          <motion.ul
            className="hidden items-center gap-1 lg:flex"
            variants={containerVariants}
            initial="hidden"
            animate={hasEntered ? "visible" : "hidden"}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.targetId;
              return (
                <motion.li key={link.targetId} variants={itemVariants}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.targetId)}
                    className="group relative flex items-center gap-1 rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF00]"
                  >
                    {/* Link text */}
                    <span
                      className="font-mono text-[13px] font-bold tracking-[0.15em] uppercase transition-all duration-200 group-hover:-translate-y-0.5"
                      style={{
                        color: isActive ? COLORS.ACID_LIME : `${COLORS.PAPER_WHITE}90`,
                      }}
                    >
                      {link.label}
                    </span>

                    {/* Hover arrow */}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 translate-x-0 -translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0 group-hover:opacity-100"
                      style={{ color: COLORS.ACID_LIME }}
                    />

                    {/* Active indicator - acid lime dot */}
                    {isActive && (
                      <motion.span
                        layoutId="zonals-active-dot"
                        className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                        style={{
                          backgroundColor: COLORS.ACID_LIME,
                          boxShadow: SHADOWS.LIME_GLOW,
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* ═══════════════════════════════════════════════════════════
              RIGHT: CTA + Metadata (Desktop)
          ═══════════════════════════════════════════════════════════ */}
          <motion.div
            className="hidden shrink-0 items-center gap-4 lg:flex"
            variants={itemVariants}
            initial="hidden"
            animate={hasEntered ? "visible" : "hidden"}
          >
            {/* Metadata annotation */}
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ color: `${COLORS.PAPER_WHITE}40` }}
            >
              KY / 2027
            </span>

            {/* Ticket-style CTA (hidden on all /zonals sub-routes) */}
            {!isZonalsSubRoute && (
              <Link href="/zonals/colleges">
                <motion.div
                  className="group relative cursor-pointer"
                  whileHover={{ y: -2, rotate: -0.5 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* Ticket perforation pattern (left edge) */}
                  <div
                    className="absolute top-1/2 -left-1 flex -translate-y-1/2 flex-col gap-[3px]"
                    aria-hidden
                  >
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: `${COLORS.ACID_LIME}40` }}
                      />
                    ))}
                  </div>

                  {/* Main button */}
                  <div
                    className="relative flex items-center gap-2 px-5 py-3 font-mono text-[13px] font-black tracking-[0.12em] uppercase transition-shadow duration-200"
                    style={{
                      backgroundColor: COLORS.ACID_LIME,
                      color: COLORS.DEEP_INK,
                      clipPath:
                        "polygon(4px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 4px)",
                      boxShadow: "3px 3px 0 rgba(0,0,0,0.3)",
                    }}
                  >
                    <span>SELECT COLLEGE</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  {/* Offset shadow accent */}
                  <div
                    className="absolute inset-0 -z-10 translate-x-1 translate-y-1"
                    style={{
                      backgroundColor: COLORS.HOT_PINK,
                      clipPath:
                        "polygon(4px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 4px)",
                      opacity: 0.5,
                    }}
                  />
                </motion.div>
              </Link>
            )}
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════
              MOBILE: Hamburger Toggle
          ═══════════════════════════════════════════════════════════ */}
          <motion.button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="relative z-[310] flex h-10 items-center gap-2 rounded px-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF00] lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            variants={itemVariants}
            initial="hidden"
            animate={hasEntered ? "visible" : "hidden"}
          >
            <span
              className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase"
              style={{ color: menuOpen ? COLORS.ACID_LIME : `${COLORS.PAPER_WHITE}70` }}
            >
              {menuOpen ? "CLOSE" : "MENU"}
            </span>
            <div className="flex h-6 w-6 flex-col items-center justify-center gap-[5px]">
              <motion.span
                className="block h-[2px] w-5 origin-center rounded-full"
                style={{ backgroundColor: COLORS.ACID_LIME }}
                animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="block h-[2px] w-5 rounded-full"
                style={{ backgroundColor: COLORS.ACID_LIME }}
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-[2px] w-5 origin-center rounded-full"
                style={{ backgroundColor: COLORS.ACID_LIME }}
                animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE: Full-Screen Menu Overlay
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="zonals-mobile-overlay"
            className="fixed inset-0 z-[305] flex flex-col lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ backgroundColor: "rgba(17,17,17,0.98)" }}
            />

            {/* Decorative elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              {/* Large ghost ZONALS text */}
              <div
                className="absolute top-1/4 -right-10 font-mono text-[20vw] leading-none font-black uppercase opacity-[0.03] select-none"
                style={{ color: COLORS.PAPER_WHITE }}
              >
                ZONALS
              </div>

              {/* Floating starbursts */}
              <motion.div
                className="absolute top-20 right-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <AnimatedStarburst size={40} />
              </motion.div>
              <motion.div
                className="absolute bottom-32 left-8"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <AnimatedStarburst size={24} />
              </motion.div>

              {/* Ticket graphic */}
              <div
                className="absolute right-6 bottom-20 h-16 w-32 opacity-10"
                style={{
                  border: `2px dashed ${COLORS.ACID_LIME}`,
                  borderRadius: "4px",
                }}
              />
            </div>

            {/* Content */}
            <div className="relative flex flex-1 flex-col items-center justify-center px-6 pt-20 pb-10">
              {/* Home link */}
              <motion.div
                className="mb-8"
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 },
                }}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center gap-3 rounded-lg border px-4 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF00]"
                  style={{
                    borderColor: `${COLORS.PAPER_WHITE}20`,
                  }}
                >
                  <Home className="h-5 w-5" style={{ color: `${COLORS.PAPER_WHITE}60` }} />
                  <span
                    className="font-mono text-sm tracking-[0.1em] uppercase"
                    style={{ color: `${COLORS.PAPER_WHITE}60` }}
                  >
                    Back to Home
                  </span>
                </Link>
              </motion.div>

              {/* Navigation links */}
              <motion.ul
                className="flex flex-col items-center gap-6"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                }}
              >
                {NAV_LINKS.map((link) => {
                  const isActive = activeId === link.targetId;
                  return (
                    <motion.li
                      key={link.targetId}
                      variants={{
                        open: { opacity: 1, y: 0, scale: 1 },
                        closed: { opacity: 0, y: 30, scale: 0.95 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        type="button"
                        onClick={() => handleNavClick(link.targetId)}
                        className="group flex items-center gap-4 rounded-lg px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF00]"
                      >
                        {/* Number */}
                        <span
                          className="font-mono text-sm tracking-wider"
                          style={{ color: `${COLORS.ACID_LIME}60` }}
                        >
                          {link.number}
                        </span>
                        <span
                          className="font-mono text-[10px]"
                          style={{ color: `${COLORS.PAPER_WHITE}30` }}
                        >
                          —
                        </span>
                        {/* Label */}
                        <span
                          className="font-mono text-2xl font-black tracking-[0.1em] uppercase transition-colors sm:text-3xl"
                          style={{
                            color: isActive ? COLORS.ACID_LIME : COLORS.PAPER_WHITE,
                          }}
                        >
                          {link.label}
                        </span>
                        {/* Active indicator */}
                        {isActive && (
                          <motion.span
                            layoutId="mobile-active"
                            className="h-2 w-2 rounded-full"
                            style={{
                              backgroundColor: COLORS.ACID_LIME,
                              boxShadow: SHADOWS.LIME_GLOW,
                            }}
                          />
                        )}
                      </button>
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* CTA */}
              <motion.div
                className="mt-10"
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 },
                }}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Link href="/zonals/colleges" onClick={() => setMenuOpen(false)}>
                  <motion.div className="relative" whileTap={{ scale: 0.95 }}>
                    <div
                      className="flex items-center gap-3 px-8 py-4 font-mono text-base font-black tracking-[0.15em] uppercase"
                      style={{
                        backgroundColor: COLORS.ACID_LIME,
                        color: COLORS.DEEP_INK,
                        clipPath:
                          "polygon(8px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 8px)",
                        boxShadow: `4px 4px 0 ${COLORS.HOT_PINK}80`,
                      }}
                    >
                      <span>SELECT COLLEGE</span>
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Footer metadata */}
              <motion.div
                className="absolute right-0 bottom-8 left-0 flex flex-col items-center gap-2"
                variants={{
                  open: { opacity: 1 },
                  closed: { opacity: 0 },
                }}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <span
                  className="font-mono text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: `${COLORS.PAPER_WHITE}40` }}
                >
                  KASHIYATRA 2027 / IIT (BHU)
                </span>
                <span
                  className="font-mono text-[9px] tracking-[0.2em] uppercase"
                  style={{ color: COLORS.ACID_LIME }}
                >
                  FIND YOUR SCENE
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ZonalsNavbar;
