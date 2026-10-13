"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Loader2, ShoppingCart, Mail, Receipt } from "lucide-react";
import { useSignOut } from "@/lib/api/hooks";
import { useNavbar } from "@/components/navbar/config/NavbarContext";
import { DROPDOWN_THEMES } from "@/components/navbar/config/dropdown.config";

interface UserAvatarDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function UserAvatarDropdown({ user }: UserAvatarDropdownProps) {
  const [imageError, setImageError] = useState(false);
  const { isSigningOut, handleSignOut } = useSignOut();
  const { theme } = useNavbar();
  const styles = DROPDOWN_THEMES[theme];

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  // Get slug from email (part before @) and truncate to 10 chars
  const slugName = user.email?.split("@")[0] || "user";
  const displaySlug = slugName.length > 10 ? `${slugName.slice(0, 10)}..` : slugName;

  const showImage = user.image && !imageError;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className="group flex items-center gap-3 rounded-full px-3 py-1.5 transition-all duration-300 hover:scale-105 focus:outline-none"
          style={styles.trigger}
        >
          {/* Glow ring around avatar */}
          <div
            className="relative"
            style={{
              padding: "2px",
              borderRadius: "50%",
              ...styles.avatarRing,
            }}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center overflow-hidden rounded-full ring-2 lg:h-9 lg:w-9 ${
                theme === "main"
                  ? "ring-[#1a0a05]"
                  : theme === "about"
                    ? "ring-[#1a0a2e]"
                    : "ring-[#052e05]"
              }`}
              style={{
                background: showImage ? "transparent" : styles.avatarBg,
              }}
            >
              {showImage ? (
                <Image
                  src={user.image!}
                  alt={user.name || "User"}
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-xs font-bold" style={{ color: styles.initialsColor }}>
                  {initials}
                </span>
              )}
            </div>
          </div>
          <span
            className="hidden text-xs font-bold tracking-wide uppercase lg:block"
            style={{
              color: styles.textColor,
              fontFamily: "var(--font-ethereal), serif",
              textShadow: styles.textShadow,
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
          ...styles.dropdown,
          borderRadius: "12px",
        }}
      >
        {/* User Info Header */}
        <div className="px-3 py-2">
          <p className="truncate text-sm font-semibold" style={{ color: styles.nameColor }}>
            {user.name}
          </p>
          <p className="truncate text-xs" style={{ color: styles.emailColor }}>
            {user.email}
          </p>
        </div>

        <DropdownMenuSeparator style={{ background: styles.separatorColor }} />

        {/* Profile Link */}
        <DropdownMenuItem
          asChild
          className="mx-1 rounded-md"
          style={{
            ["--dropdown-hover" as string]: styles.menuItemHover,
          }}
        >
          <Link
            href="/profile"
            className="flex cursor-pointer items-center gap-2 px-3 py-2 transition-colors hover:bg-[var(--dropdown-hover)]"
            style={{ color: styles.itemColor }}
          >
            <User className="h-4 w-4" style={{ color: styles.iconColor }} />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        {/* My Cart Link */}
        <DropdownMenuItem
          asChild
          className="mx-1 rounded-md"
          style={{
            ["--dropdown-hover" as string]: styles.menuItemHover,
          }}
        >
          <Link
            href="/cart"
            className="flex cursor-pointer items-center gap-2 px-3 py-2 transition-colors hover:bg-[var(--dropdown-hover)]"
            style={{ color: styles.itemColor }}
          >
            <ShoppingCart className="h-4 w-4" style={{ color: styles.iconColor }} />
            <span>My Cart</span>
          </Link>
        </DropdownMenuItem>

        {/* My Purchases Link */}
        <DropdownMenuItem
          asChild
          className="mx-1 rounded-md"
          style={{
            ["--dropdown-hover" as string]: styles.menuItemHover,
          }}
        >
          <Link
            href="/purchases"
            className="flex cursor-pointer items-center gap-2 px-3 py-2 transition-colors hover:bg-[var(--dropdown-hover)]"
            style={{ color: styles.itemColor }}
          >
            <Receipt className="h-4 w-4" style={{ color: styles.iconColor }} />
            <span>My Purchases</span>
          </Link>
        </DropdownMenuItem>

        {/* Contact Link */}
        <DropdownMenuItem
          asChild
          className="mx-1 rounded-md"
          style={{
            ["--dropdown-hover" as string]: styles.menuItemHover,
          }}
        >
          <Link
            href="/contact"
            className="flex cursor-pointer items-center gap-2 px-3 py-2 transition-colors hover:bg-[var(--dropdown-hover)]"
            style={{ color: styles.itemColor }}
          >
            <Mail className="h-4 w-4" style={{ color: styles.iconColor }} />
            <span>Contact</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator style={{ background: styles.separatorColor }} />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="mx-1 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors focus:bg-[rgba(255,100,100,0.1)] disabled:cursor-not-allowed disabled:opacity-50"
          style={{ color: "rgba(255,100,100,0.9)" }}
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
