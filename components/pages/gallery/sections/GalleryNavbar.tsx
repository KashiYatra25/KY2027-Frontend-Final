"use client";

import { memo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { IMAGES } from "@/lib/images";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { User, LogOut, Loader2, Ticket, Mail } from "lucide-react";
import { COLORS } from "../constants/palette";

// ═══════════════════════════════════════════════════════════════════
// GALLERY NAVBAR - Custom cinematic film/camera themed navbar
// ═══════════════════════════════════════════════════════════════════

const PRIMARY_LINKS = [
  { label: "HOME", href: "/" },
  { label: "EVENTS", href: "/events" },
  { label: "ZONALS", href: "/zonals" },
  { label: "SCHEDULE", href: "/schedule" },
  { label: "SPONSORS", href: "/sponsors" },
  { label: "PASSES", href: "/passes" },
  { label: "CA", href: "/campus-ambassador" },
  { label: "ABOUT", href: "/about" },
];

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

// ═══════════════════════════════════════════════════════════════════
// CAMERA LENS ICON
// ═══════════════════════════════════════════════════════════════════

function CameraLensIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={COLORS.PAPER} strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill={COLORS.PAPER} />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════
// USER DROPDOWN (Gallery themed)
// ═══════════════════════════════════════════════════════════════════

function GalleryUserDropdown({
  user,
}: {
  user: { name?: string | null; email?: string | null; image?: string | null };
}) {
  const [imageError, setImageError] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const slugName = user.email?.split("@")[0] || "user";
  const displaySlug = slugName.length > 10 ? `${slugName.slice(0, 10)}..` : slugName;
  const showImage = user.image && !imageError;

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch {
      setIsSigningOut(false);
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className="group flex items-center gap-2 rounded-full px-2 py-1 transition-all duration-300 hover:scale-105 focus:outline-none"
          style={{
            background: "rgba(246,236,220,0.08)",
            border: `1px solid ${COLORS.MARIGOLD}50`,
          }}
        >
          {/* Avatar with lens-style ring */}
          <div
            className="relative rounded-full p-[2px]"
            style={{
              background: `conic-gradient(${COLORS.MARIGOLD}, ${COLORS.RANI}, ${COLORS.MARIGOLD})`,
            }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full"
              style={{
                background: showImage
                  ? "transparent"
                  : `linear-gradient(135deg, ${COLORS.MARIGOLD} 0%, #c8842a 100%)`,
              }}
            >
              {showImage ? (
                <Image
                  src={user.image!}
                  alt={user.name || "User"}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-xs font-bold" style={{ color: COLORS.INK }}>
                  {initials}
                </span>
              )}
            </div>
          </div>
          <span
            className="hidden text-[10px] font-semibold tracking-wide uppercase lg:block"
            style={{
              color: COLORS.PAPER,
              fontFamily: "var(--font-cinzel), Georgia, serif",
            }}
          >
            {displaySlug}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="dropdown-animate z-[300] w-56"
        style={{
          background: `linear-gradient(135deg, ${COLORS.INK} 0%, #2a1832 100%)`,
          border: `1px solid ${COLORS.MARIGOLD}40`,
          borderRadius: "12px",
          boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${COLORS.MARIGOLD}20`,
        }}
      >
        {/* User Info Header */}
        <div className="px-3 py-2">
          <p className="truncate text-sm font-semibold" style={{ color: COLORS.PAPER }}>
            {user.name}
          </p>
          <p className="truncate text-xs" style={{ color: COLORS.TEXT_DIM }}>
            {user.email}
          </p>
        </div>

        <DropdownMenuSeparator style={{ background: `${COLORS.MARIGOLD}30` }} />

        <DropdownMenuItem asChild className="mx-1 rounded-md hover:bg-[rgba(245,166,35,0.15)]">
          <Link
            href="/profile"
            className="flex cursor-pointer items-center gap-2 px-3 py-2"
            style={{ color: COLORS.PAPER }}
          >
            <User className="h-4 w-4" style={{ color: COLORS.MARIGOLD }} />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="mx-1 rounded-md hover:bg-[rgba(245,166,35,0.15)]">
          <Link
            href="/cart"
            className="flex cursor-pointer items-center gap-2 px-3 py-2"
            style={{ color: COLORS.PAPER }}
          >
            <Ticket className="h-4 w-4" style={{ color: COLORS.MARIGOLD }} />
            <span>Buy Passes</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="mx-1 rounded-md hover:bg-[rgba(245,166,35,0.15)]">
          <Link
            href="/contact"
            className="flex cursor-pointer items-center gap-2 px-3 py-2"
            style={{ color: COLORS.PAPER }}
          >
            <Mail className="h-4 w-4" style={{ color: COLORS.MARIGOLD }} />
            <span>Contact</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator style={{ background: `${COLORS.MARIGOLD}30` }} />

        <DropdownMenuItem
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="mx-1 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 hover:bg-[rgba(229,51,124,0.15)] disabled:cursor-not-allowed disabled:opacity-50"
          style={{ color: COLORS.RANI }}
        >
          {isSigningOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          <span>{isSigningOut ? "Signing out..." : "Logout"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MOBILE MENU BUTTON
// ═══════════════════════════════════════════════════════════════════

function MobileMenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onToggle}
      className="relative z-20 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block h-[2px] w-5 rounded-full transition-all duration-300"
          style={{
            background: `linear-gradient(90deg, ${COLORS.MARIGOLD}, ${COLORS.RANI})`,
            boxShadow: `0 0 4px ${COLORS.MARIGOLD}60`,
            transform:
              i === 0
                ? open
                  ? "translateY(7px) rotate(45deg)"
                  : "none"
                : i === 2
                  ? open
                    ? "translateY(-7px) rotate(-45deg)"
                    : "none"
                  : "none",
            opacity: i === 1 && open ? 0 : 1,
          }}
        />
      ))}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MOBILE PANEL
// ═══════════════════════════════════════════════════════════════════

function MobilePanel({
  open,
  onClose,
  isActive,
  isAuthenticated,
  isSessionLoading,
  user,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
  isAuthenticated: boolean;
  isSessionLoading: boolean;
  user?: { name?: string | null; email?: string | null; image?: string | null } | null;
}) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [imageError, setImageError] = useState(false);

  const userInitials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const showImage = user?.image && !imageError;

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch {
      setIsSigningOut(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[5] bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        className={`absolute top-[calc(100%+8px)] right-2 left-2 z-10 origin-top transition-all duration-300 ease-out md:hidden ${
          open
            ? "pointer-events-auto scale-y-100 opacity-100"
            : "pointer-events-none scale-y-0 opacity-0"
        }`}
        style={{
          borderRadius: "16px",
          background: `linear-gradient(180deg, ${COLORS.INK} 0%, #2a1832 100%)`,
          border: `2px solid ${COLORS.MARIGOLD}40`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${COLORS.MARIGOLD}15`,
        }}
      >
        {/* Film strip texture */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-3 overflow-hidden rounded-t-[14px]"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 12px,
              ${COLORS.MARIGOLD}30 12px,
              ${COLORS.MARIGOLD}30 18px
            )`,
          }}
          aria-hidden="true"
        />

        <nav
          className="relative flex flex-col gap-1 px-4 pt-5 pb-4"
          style={{ fontFamily: "var(--font-cinzel), Georgia, serif" }}
        >
          {/* User info when logged in */}
          {isAuthenticated && user && (
            <div
              className="mb-3 flex items-center gap-3 border-b pb-3"
              style={{ borderColor: `${COLORS.MARIGOLD}30` }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full"
                style={{
                  background: showImage
                    ? "transparent"
                    : `linear-gradient(135deg, ${COLORS.MARIGOLD} 0%, #c8842a 100%)`,
                  border: `2px solid ${COLORS.MARIGOLD}`,
                }}
              >
                {showImage ? (
                  <Image
                    src={user.image!}
                    alt={user.name || "User"}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                    onError={() => setImageError(true)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-sm font-bold" style={{ color: COLORS.INK }}>
                    {userInitials}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold" style={{ color: COLORS.PAPER }}>
                  {user.name}
                </p>
                <p className="truncate text-xs" style={{ color: COLORS.TEXT_DIM }}>
                  {user.email}
                </p>
              </div>
            </div>
          )}

          {/* Navigation links */}
          {PRIMARY_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200"
                style={{
                  background: active ? `${COLORS.MARIGOLD}20` : "transparent",
                  color: active ? COLORS.MARIGOLD : COLORS.PAPER,
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: active ? COLORS.MARIGOLD : `${COLORS.MARIGOLD}50`,
                    boxShadow: active ? `0 0 6px ${COLORS.MARIGOLD}` : "none",
                  }}
                />
                <span className="text-sm font-semibold tracking-wider uppercase">{link.label}</span>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="my-2 h-px" style={{ background: `${COLORS.MARIGOLD}30` }} />

          {/* Auth section */}
          {isSessionLoading ? (
            <div className="flex justify-center py-2">
              <Spinner className="h-5 w-5" />
            </div>
          ) : isAuthenticated ? (
            <>
              <Link
                href="/profile"
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                style={{ color: COLORS.PAPER }}
              >
                <User className="h-4 w-4" style={{ color: COLORS.MARIGOLD }} />
                <span className="text-sm font-semibold tracking-wider uppercase">Profile</span>
              </Link>
              <Link
                href="/cart"
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                style={{ color: COLORS.PAPER }}
              >
                <Ticket className="h-4 w-4" style={{ color: COLORS.MARIGOLD }} />
                <span className="text-sm font-semibold tracking-wider uppercase">Buy Passes</span>
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                style={{ color: COLORS.PAPER }}
              >
                <Mail className="h-4 w-4" style={{ color: COLORS.MARIGOLD }} />
                <span className="text-sm font-semibold tracking-wider uppercase">Contact</span>
              </Link>
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 disabled:opacity-50"
                style={{ color: COLORS.RANI }}
              >
                {isSigningOut ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
                <span className="text-sm font-semibold tracking-wider uppercase">
                  {isSigningOut ? "Signing out..." : "Logout"}
                </span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="mt-1 flex items-center justify-center gap-2 rounded-full py-2.5"
              style={{
                background: `linear-gradient(135deg, ${COLORS.RANI} 0%, #c42a6a 100%)`,
                boxShadow: `0 0 12px ${COLORS.RANI}40`,
              }}
            >
              <CameraLensIcon />
              <span
                className="text-sm font-semibold tracking-wider uppercase"
                style={{ color: COLORS.PAPER }}
              >
                Login
              </span>
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}
