"use client";

import { memo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORY_METADATA } from "@/lib/api/hooks";
import type { EventCategorySlug } from "@/lib/api/helper/types";
import { UserAvatarDropdown } from "@/components/navbar/common/UserAvatarDropdown";
import { NavbarProvider } from "@/components/navbar/config/NavbarContext";
import { Menu, X, Home, Calendar, Trophy, Users, Info, Sparkles, LogIn } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface EventsCategoryNavbarProps {
  activeCategory: EventCategorySlug;
}

// Category order for display
const CATEGORY_ORDER: EventCategorySlug[] = [
  "NATRAJ",
  "CROSSWINDZ",
  "BANDISH",
  "ABHINAY",
  "MIRAGE",
  "TOOLIKA",
  "ENQUIZTA",
  "SAMWAAD",
  "ZAIKA",
];

// Main navigation links
const MAIN_NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/events", label: "Events", icon: Sparkles },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/sponsors", label: "Sponsors", icon: Trophy },
  { href: "/passes", label: "Passes", icon: Users },
  { href: "/about", label: "About", icon: Info },
];

// Category slugs for URLs
const CATEGORY_SLUGS: Record<EventCategorySlug, string> = {
  NATRAJ: "natraj",
  CROSSWINDZ: "crosswindz",
  BANDISH: "bandish",
  ABHINAY: "abhinay",
  MIRAGE: "mirage",
  TOOLIKA: "toolika",
  ENQUIZTA: "enquizta",
  SAMWAAD: "samwaad",
  ZAIKA: "zaika",
};

// ═══════════════════════════════════════════════════════════════════
// DECORATIVE SVG ELEMENTS
// ═══════════════════════════════════════════════════════════════════

const OrnateCorner = memo(function OrnateCorner({
  color,
  flip = false,
}: {
  color: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={`h-8 w-8 ${flip ? "scale-x-[-1]" : ""}`}
      style={{ opacity: 0.6 }}
    >
      <path d="M0 0 C0 20 20 40 40 40 L40 35 C22 35 5 18 5 0 Z" fill={color} />
      <circle cx="8" cy="8" r="2" fill={color} opacity="0.8" />
      <circle cx="16" cy="16" r="1.5" fill={color} opacity="0.6" />
    </svg>
  );
});

const NavDivider = memo(function NavDivider({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 8 24" fill="none" className="h-6 w-2" style={{ opacity: 0.4 }}>
      <path d="M4 0 L4 24" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
});

// ═══════════════════════════════════════════════════════════════════
// EVENTS CATEGORY NAVBAR
// ═══════════════════════════════════════════════════════════════════

export const EventsCategoryNavbar = memo(function EventsCategoryNavbar({
  activeCategory,
}: EventsCategoryNavbarProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const activeMeta = CATEGORY_METADATA[activeCategory];
  const activeColor = activeMeta.color;

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const user = session?.user;

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-[200]"
      >
        {/* Background with category color */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: scrolled
              ? `linear-gradient(180deg, 
                  hsl(from ${activeColor} h 40% 8% / 0.98) 0%,
                  hsl(from ${activeColor} h 35% 5% / 0.95) 100%
                )`
              : `linear-gradient(180deg, 
                  hsl(from ${activeColor} h 30% 12% / 0.9) 0%,
                  hsl(from ${activeColor} h 25% 8% / 0.85) 100%
                )`,
            backdropFilter: "blur(12px)",
            borderBottom: `2px solid ${activeColor}40`,
            boxShadow: scrolled ? `0 4px 30px ${activeColor}20` : "none",
          }}
        />

        {/* Ornate top border */}
        <div
          className="absolute top-0 right-0 left-0 h-1"
          style={{
            background: `linear-gradient(90deg, transparent 5%, ${activeColor} 50%, transparent 95%)`,
          }}
        />

        {/* Desktop Navigation */}
        <div className="relative hidden lg:block">
          <div className="mx-auto max-w-7xl px-4">
            {/* Top row - Main navigation */}
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="relative flex items-center gap-3">
                <div
                  className="relative h-14 w-14 overflow-hidden rounded-full"
                  style={{
                    border: `2px solid ${activeColor}60`,
                    boxShadow: `0 0 20px ${activeColor}30`,
                  }}
                >
                  <Image
                    src="/images/kashi_yatra_logo.webp"
                    alt="Kashi Yatra"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </Link>

              {/* Main nav links */}
              <div className="flex items-center gap-1">
                {MAIN_NAV_LINKS.map((link, index) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href === "/events" && pathname?.startsWith("/events"));
                  const Icon = link.icon;

                  return (
                    <div key={link.href} className="flex items-center">
                      {index > 0 && <NavDivider color={activeColor} />}
                      <Link
                        href={link.href}
                        className="group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${activeColor}30 0%, ${activeColor}15 100%)`
                            : "transparent",
                          color: isActive ? activeColor : "rgba(255,255,255,0.8)",
                          border: isActive ? `1px solid ${activeColor}50` : "1px solid transparent",
                        }}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{link.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeMainNav"
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `${activeColor}10`,
                              boxShadow: `0 0 15px ${activeColor}30`,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* User avatar or Sign In */}
              {isLoading ? (
                <div
                  className="h-10 w-10 animate-pulse rounded-full"
                  style={{ background: `${activeColor}30` }}
                />
              ) : isAuthenticated && user ? (
                <NavbarProvider>
                  <UserAvatarDropdown user={user} />
                </NavbarProvider>
              ) : (
                <Link
                  href="/auth/signin"
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${activeColor}30 0%, ${activeColor}15 100%)`,
                    border: `1px solid ${activeColor}50`,
                    color: activeColor,
                  }}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>

            {/* Bottom row - Category navigation */}
            <div
              className="flex items-center justify-center gap-1 border-t py-2"
              style={{ borderColor: `${activeColor}20` }}
            >
              {/* Main Events label */}
              <span
                className="mr-4 text-xs font-bold tracking-widest uppercase"
                style={{ color: activeColor }}
              >
                Main Events
              </span>

              {/* Category links */}
              {CATEGORY_ORDER.map((category) => {
                const meta = CATEGORY_METADATA[category];
                const isActive = category === activeCategory;
                const slug = CATEGORY_SLUGS[category];

                return (
                  <Link
                    key={category}
                    href={`/events/${slug}`}
                    className="group relative px-3 py-1.5 text-center transition-all duration-300"
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryBg"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: `linear-gradient(135deg, ${meta.color}30 0%, ${meta.color}15 100%)`,
                          border: `1px solid ${meta.color}60`,
                          boxShadow: `0 0 20px ${meta.color}30`,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Category content */}
                    <div className="relative z-10">
                      {/* Name with decorative elements */}
                      <div className="flex items-center justify-center gap-1">
                        {isActive && <span style={{ color: meta.color, fontSize: "10px" }}>✦</span>}
                        <span
                          className="text-sm font-semibold transition-all duration-300"
                          style={{
                            fontFamily: "Georgia, serif",
                            fontStyle: "italic",
                            color: isActive ? meta.color : "rgba(255,255,255,0.7)",
                            textShadow: isActive ? `0 0 10px ${meta.color}50` : "none",
                          }}
                        >
                          {meta.name}
                        </span>
                        {isActive && <span style={{ color: meta.color, fontSize: "10px" }}>✦</span>}
                      </div>

                      {/* Tagline */}
                      <span
                        className="block text-[10px] transition-all duration-300"
                        style={{
                          color: isActive ? meta.color : "rgba(255,255,255,0.4)",
                          opacity: isActive ? 0.8 : 0.6,
                        }}
                      >
                        {meta.tagline.replace(" Events", "")}
                      </span>
                    </div>

                    {/* Hover effect */}
                    {!isActive && (
                      <div
                        className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background: `${meta.color}10`,
                          border: `1px solid ${meta.color}30`,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="relative lg:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            {/* Logo */}
            <Link href="/" className="relative flex items-center gap-2">
              <div
                className="relative h-12 w-12 overflow-hidden rounded-full"
                style={{
                  border: `2px solid ${activeColor}60`,
                  boxShadow: `0 0 15px ${activeColor}30`,
                }}
              >
                <Image
                  src="/images/kashi_yatra_logo.webp"
                  alt="Kashi Yatra"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Link>

            {/* Active category indicator */}
            <div className="flex items-center gap-2">
              <span className="text-lg">{activeMeta.icon}</span>
              <span
                className="text-sm font-semibold italic"
                style={{ color: activeColor, fontFamily: "Georgia, serif" }}
              >
                {activeMeta.name}
              </span>
            </div>

            {/* Menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
              style={{
                background: `${activeColor}20`,
                border: `1px solid ${activeColor}40`,
              }}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" style={{ color: activeColor }} />
              ) : (
                <Menu className="h-5 w-5" style={{ color: activeColor }} />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[199] lg:hidden"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-80 overflow-y-auto"
              style={{
                background: `linear-gradient(180deg, 
                  hsl(from ${activeColor} h 30% 10%) 0%,
                  hsl(from ${activeColor} h 25% 6%) 100%
                )`,
                borderLeft: `2px solid ${activeColor}40`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile menu header */}
              <div
                className="sticky top-0 border-b p-4"
                style={{
                  background: `hsl(from ${activeColor} h 30% 8%)`,
                  borderColor: `${activeColor}30`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: activeColor }}
                  >
                    Main Events
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-full p-1"
                    style={{ background: `${activeColor}20` }}
                  >
                    <X className="h-5 w-5" style={{ color: activeColor }} />
                  </button>
                </div>
              </div>

              {/* Category list */}
              <div className="p-4">
                {CATEGORY_ORDER.map((category) => {
                  const meta = CATEGORY_METADATA[category];
                  const isActive = category === activeCategory;
                  const slug = CATEGORY_SLUGS[category];

                  return (
                    <Link
                      key={category}
                      href={`/events/${slug}`}
                      className="mb-2 flex items-center gap-4 rounded-xl p-3 transition-all"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${meta.color}25 0%, ${meta.color}10 100%)`
                          : "transparent",
                        border: isActive ? `1px solid ${meta.color}50` : "1px solid transparent",
                      }}
                    >
                      {/* Icon */}
                      <span className="text-2xl">{meta.icon}</span>

                      {/* Text */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {isActive && (
                            <span style={{ color: meta.color, fontSize: "10px" }}>✦</span>
                          )}
                          <span
                            className="font-semibold"
                            style={{
                              fontFamily: "Georgia, serif",
                              fontStyle: "italic",
                              color: isActive ? meta.color : "rgba(255,255,255,0.85)",
                            }}
                          >
                            {meta.name}
                          </span>
                          {isActive && (
                            <span style={{ color: meta.color, fontSize: "10px" }}>✦</span>
                          )}
                        </div>
                        <span
                          className="text-xs"
                          style={{ color: isActive ? meta.color : "rgba(255,255,255,0.5)" }}
                        >
                          {meta.tagline}
                        </span>
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ background: meta.color, boxShadow: `0 0 8px ${meta.color}` }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div
                className="mx-4 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${activeColor}40, transparent)`,
                }}
              />

              {/* Main navigation links */}
              <div className="p-4">
                <span
                  className="mb-3 block text-xs font-bold tracking-widest uppercase"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Navigation
                </span>
                {MAIN_NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="mb-2 flex items-center gap-3 rounded-lg p-3 transition-all"
                      style={{
                        background: isActive ? `${activeColor}15` : "transparent",
                        color: isActive ? activeColor : "rgba(255,255,255,0.7)",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-[104px] lg:h-[120px]" />
    </>
  );
});
