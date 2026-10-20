"use client";

// ═══════════════════════════════════════════════════════════════════
// SPONSORS NAVBAR — Sleek Neon Navigation
// ═══════════════════════════════════════════════════════════════════

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ArrowUpRight,
  Home,
  CalendarDays,
  Images,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { PALETTE, GRADIENTS } from "@/components/pages/sponsors/constants/palette";
import { IMAGES } from "@/lib/images";

// ───────────────────────────────────────────────────────────────────
// CONFIGURATION
// ───────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Events", href: "/events", icon: CalendarDays },
  { label: "Gallery", href: "/gallery", icon: Images },
  { label: "Contact", href: "/contact", icon: Mail },
];

const SCROLL_THRESHOLD = 50;

// ───────────────────────────────────────────────────────────────────
// ANIMATED LOGO MARK
// ───────────────────────────────────────────────────────────────────

function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
        filter: `drop-shadow(0 0 8px ${PALETTE.ELECTRIC_VIOLET}55)`,
      }}
    >
      <Image
        src={IMAGES.navbar.main.badge}
        alt="Kashiyatra"
        fill
        sizes="40px"
        className="object-contain"
        priority
      />
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ───────────────────────────────────────────────────────────────────

export function SponsorsNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll tracking
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

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-[200]"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: scrolled
              ? `${PALETTE.DEEP_INK}ee`
              : `linear-gradient(180deg, ${PALETTE.DEEP_INK}cc 0%, transparent 100%)`,
            backdropFilter: scrolled ? "blur(20px)" : "blur(10px)",
          }}
        />

        {/* Bottom gradient line */}
        <div
          className="absolute inset-x-0 bottom-0 h-[2px] transition-opacity duration-300"
          style={{
            background: GRADIENTS.TITLE,
            backgroundSize: "200% auto",
            animation: "gradientShift 4s linear infinite",
            opacity: scrolled ? 1 : 0,
          }}
        />

        <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6 2xl:max-w-7xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <LogoMark size={36} />
            <div className="flex flex-col">
              <span
                className="text-sm font-bold tracking-wider uppercase sm:text-base"
                style={{ color: PALETTE.TEXT_PRIMARY }}
              >
                Kashiyatra
              </span>
              <span
                className="text-[10px] font-medium tracking-widest uppercase"
                style={{ color: PALETTE.TEXT_MUTED }}
              >
                Sponsors
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group relative flex items-center gap-2 px-4 py-2 text-sm font-medium tracking-wider uppercase transition-colors"
                  style={{ color: PALETTE.TEXT_SECONDARY }}
                >
                  <Icon
                    size={16}
                    className="relative z-10 transition-all duration-200 group-hover:scale-110 group-hover:text-white"
                    style={{ color: PALETTE.ELECTRIC_VIOLET }}
                  />
                  <span className="relative z-10 transition-colors group-hover:text-white">
                    {link.label}
                  </span>
                  {/* Hover pill background */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                    style={{ background: `${PALETTE.ELECTRIC_VIOLET}20` }}
                    layoutId="navHover"
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#collaboration-cta"
              className="group relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-bold tracking-wider uppercase transition-transform hover:scale-105"
              style={{
                background: GRADIENTS.CTA_PRIMARY,
                color: PALETTE.TEXT_PRIMARY,
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Partner With Us
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            style={{ background: `${PALETTE.ELECTRIC_VIOLET}20` }}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={20} style={{ color: PALETTE.TEXT_PRIMARY }} />
            ) : (
              <Menu size={20} style={{ color: PALETTE.TEXT_PRIMARY }} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[199] md:hidden"
            style={{ background: `${PALETTE.DEEP_INK}f5` }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-8 px-6">
              {NAV_LINKS.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center gap-3 text-2xl font-bold tracking-wider uppercase transition-colors"
                      style={{ color: PALETTE.TEXT_PRIMARY }}
                    >
                      <Icon size={24} style={{ color: PALETTE.ELECTRIC_VIOLET }} />
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: NAV_LINKS.length * 0.1 }}
                className="mt-8"
              >
                <a
                  href="#collaboration-cta"
                  onClick={closeMenu}
                  className="inline-block rounded-full px-8 py-4 text-lg font-bold tracking-wider uppercase"
                  style={{
                    background: GRADIENTS.CTA_PRIMARY,
                    color: PALETTE.TEXT_PRIMARY,
                  }}
                >
                  Partner With Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
