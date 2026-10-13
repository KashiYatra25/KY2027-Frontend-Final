"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { primaryLinks, secondaryLinks } from "./links.config";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export type NavbarTheme = "main" | "about" | "sponsor";

// Link types derived from the config structure
type PrimaryLink = { label: string; href: string };
type SecondaryLink = { label: string; href: string; icon: "lotus" };
type AllLink = PrimaryLink | SecondaryLink;

interface NavbarContextValue {
  // Theme
  theme: NavbarTheme;

  // Navigation state
  pathname: string;
  isActive: (href: string) => boolean;

  // Auth state
  session: ReturnType<typeof useSession>["data"];
  isSessionLoading: boolean;
  isAuthenticated: boolean;

  // User info (when authenticated)
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  userInitials: string;

  // Filtered links based on auth state
  primaryLinks: PrimaryLink[];
  secondaryLinks: SecondaryLink[];
  allLinks: AllLink[];
}

// ═══════════════════════════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════════════════════════

const NavbarContext = createContext<NavbarContextValue | null>(null);

// ═══════════════════════════════════════════════════════════════════
// PROVIDER
// ═══════════════════════════════════════════════════════════════════

interface NavbarProviderProps {
  children: ReactNode;
  theme?: NavbarTheme;
}

export function NavbarProvider({ children, theme = "main" }: NavbarProviderProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const value = useMemo<NavbarContextValue>(() => {
    const isSessionLoading = status === "loading";
    const isAuthenticated = !!session?.user;
    const user = session?.user ?? null;

    // Check if a link is active
    const isActive = (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    };

    // User initials for avatar fallback
    const userInitials =
      user?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U";

    // Filter links based on auth state
    // When authenticated: remove LOGIN (avatar dropdown handles profile)
    // When not authenticated: show all links including LOGIN
    // When loading: show all links (including LOGIN) - will update once loaded
    const filteredSecondaryLinks = isAuthenticated
      ? secondaryLinks.filter((link) => link.label !== "LOGIN")
      : secondaryLinks;

    return {
      theme,
      pathname,
      isActive,
      session,
      isSessionLoading,
      isAuthenticated,
      user,
      userInitials,
      primaryLinks,
      secondaryLinks: filteredSecondaryLinks,
      allLinks: [...primaryLinks, ...filteredSecondaryLinks],
    };
  }, [pathname, session, status, theme]);

  return <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>;
}

// ═══════════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════════

export function useNavbar() {
  const context = useContext(NavbarContext);

  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }

  return context;
}
