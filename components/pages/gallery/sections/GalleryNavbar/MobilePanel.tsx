"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner";
import { User, LogOut, Loader2, Ticket, Mail } from "lucide-react";
import { COLORS } from "@/components/pages/gallery/constants/palette";
import { CameraLensIcon } from "./CameraLensIcon";
import { PRIMARY_LINKS } from "./navLinks";

// ═══════════════════════════════════════════════════════════════════
// MOBILE PANEL
// ═══════════════════════════════════════════════════════════════════

export function MobilePanel({
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
