"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Loader2, Ticket, Mail } from "lucide-react";
import { COLORS } from "@/components/pages/gallery/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// USER DROPDOWN (Gallery themed)
// ═══════════════════════════════════════════════════════════════════

export function GalleryUserDropdown({
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
