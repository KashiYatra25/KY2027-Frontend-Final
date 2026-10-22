"use client";

import { memo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { IMAGES } from "@/lib/images";
import { Spinner } from "@/components/ui/spinner";
import { COLORS } from "@/components/pages/gallery/constants/palette";
import { CameraLensIcon } from "./CameraLensIcon";
import { GalleryUserDropdown } from "./GalleryUserDropdown";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobilePanel } from "./MobilePanel";
import { PRIMARY_LINKS } from "./navLinks";

// ═══════════════════════════════════════════════════════════════════
// GALLERY NAVBAR - Custom cinematic film/camera themed navbar
// ═══════════════════════════════════════════════════════════════════

export const GalleryNavbar = memo(function GalleryNavbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isSessionLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[200] transition-all duration-500"
      style={{
        filter: scrolled
          ? "drop-shadow(0 8px 24px rgba(0,0,0,0.55))"
          : "drop-shadow(0 4px 16px rgba(0,0,0,0.35))",
      }}
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-3 pt-3 sm:px-4 2xl:max-w-[1600px]">
        {/* Main navbar bar */}
        <div
          className="relative flex h-14 items-center justify-between rounded-full px-4 sm:h-16 sm:px-6"
          style={{
            background: `linear-gradient(135deg, ${COLORS.INK} 0%, #2a1832 50%, ${COLORS.INK} 100%)`,
            border: `2px solid ${COLORS.MARIGOLD}40`,
            boxShadow: `
              inset 0 1px 0 rgba(245,166,35,0.15),
              inset 0 -1px 0 rgba(0,0,0,0.3),
              0 4px 20px rgba(0,0,0,0.4)
            `,
          }}
        >
          {/* Left: IIT BHU Badge - using the same badge image as main navbar */}
          <div className="flex items-center gap-3">
            <Link href="/" className="group flex items-center gap-2">
              <div
                className="relative h-12 w-12 sm:h-14 sm:w-14"
                style={{
                  filter: `drop-shadow(0 0 8px ${COLORS.MARIGOLD}50)`,
                }}
              >
                <Image
                  src={IMAGES.navbar.main.badge}
                  alt="IIT BHU"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Center: Primary navigation (desktop) */}
          <nav
            className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 md:flex lg:gap-2"
            aria-label="Primary"
          >
            {PRIMARY_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="nav-pill-gallery group flex items-center gap-1.5 rounded-full px-2.5 py-1 tracking-[0.12em] whitespace-nowrap uppercase transition-all duration-300 hover:scale-[1.05] lg:px-3 lg:py-1.5"
                  style={{
                    fontFamily: "var(--font-cinzel), Georgia, serif",
                    fontWeight: 600,
                    fontSize: "clamp(9px, 0.75vw, 11px)",
                    color: active ? COLORS.INK : COLORS.PAPER,
                    background: active
                      ? `linear-gradient(135deg, ${COLORS.MARIGOLD} 0%, #e8a020 100%)`
                      : "rgba(246,236,220,0.08)",
                    border: active
                      ? `1px solid ${COLORS.MARIGOLD}`
                      : "1px solid rgba(246,236,220,0.15)",
                    boxShadow: active
                      ? `0 0 12px ${COLORS.MARIGOLD}60, inset 0 1px 0 rgba(255,255,255,0.3)`
                      : "none",
                    textShadow: active ? "none" : `0 1px 2px rgba(0,0,0,0.5)`,
                  }}
                >
                  {/* Film sprocket dot */}
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                    style={{
                      background: active ? COLORS.INK : COLORS.MARIGOLD,
                      boxShadow: active ? "none" : `0 0 4px ${COLORS.MARIGOLD}`,
                    }}
                  />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Login/User avatar (desktop) */}
          <div className="hidden items-center gap-3 md:flex">
            {isSessionLoading ? (
              <Spinner className="h-4 w-4" />
            ) : isAuthenticated && user ? (
              <GalleryUserDropdown user={user} />
            ) : (
              <Link
                href="/login"
                className="group flex items-center gap-2 rounded-full px-4 py-1.5 transition-all duration-300 hover:scale-[1.05]"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.RANI} 0%, #c42a6a 100%)`,
                  border: `1px solid ${COLORS.RANI}`,
                  boxShadow: `0 0 12px ${COLORS.RANI}40`,
                }}
              >
                {/* Camera lens icon */}
                <CameraLensIcon />
                <span
                  className="text-[11px] font-semibold tracking-[0.12em] uppercase"
                  style={{
                    color: COLORS.PAPER,
                    fontFamily: "var(--font-cinzel), Georgia, serif",
                  }}
                >
                  Login
                </span>
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <MobileMenuButton open={mobileOpen} onToggle={() => setMobileOpen((v) => !v)} />
        </div>

        {/* Mobile dropdown panel */}
        <MobilePanel
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          isActive={isActive}
          isAuthenticated={isAuthenticated}
          isSessionLoading={isSessionLoading}
          user={user}
        />
      </div>
    </header>
  );
});
