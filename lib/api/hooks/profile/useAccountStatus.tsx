"use client";

import { useSession } from "next-auth/react";
import { useMemo, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════
// ACCOUNT STATUS HOOK
// Provides account status information and suspension checking utilities
// ═══════════════════════════════════════════════════════════════════

export type AccountStatus = "ACTIVE" | "SUSPENDED";
export type UserRole = "MANAGER" | "OPERATOR" | "MASTER_ADMIN" | "USER";

export interface UseAccountStatusReturn {
  /** Current account status */
  accountStatus: AccountStatus;
  /** User's role */
  role: UserRole;
  /** Whether account is suspended */
  isSuspended: boolean;
  /** Whether account is active */
  isActive: boolean;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** Whether session is loading */
  isLoading: boolean;
  /** Check if user can perform an action (not suspended and authenticated) */
  canPerformAction: boolean;
  /** Check if user has admin privileges */
  isAdmin: boolean;
  /** Get a message explaining why action is blocked (or null if allowed) */
  getBlockedReason: () => string | null;
}

export function useAccountStatus(): UseAccountStatusReturn {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated" && !!session?.user;

  const accountStatus = useMemo<AccountStatus>(() => {
    return session?.user?.accountStatus ?? "ACTIVE";
  }, [session?.user?.accountStatus]);

  const role = useMemo<UserRole>(() => {
    return session?.user?.role ?? "USER";
  }, [session?.user?.role]);

  const isSuspended = accountStatus === "SUSPENDED";
  const isActive = accountStatus === "ACTIVE";
  const canPerformAction = isAuthenticated && isActive;

  const isAdmin = useMemo(() => {
    return ["MANAGER", "OPERATOR", "MASTER_ADMIN"].includes(role);
  }, [role]);

  const getBlockedReason = useCallback((): string | null => {
    if (!isAuthenticated) {
      return "Please sign in to continue";
    }
    if (isSuspended) {
      return "Your account has been suspended. Please contact support for assistance.";
    }
    return null;
  }, [isAuthenticated, isSuspended]);

  return {
    accountStatus,
    role,
    isSuspended,
    isActive,
    isAuthenticated,
    isLoading,
    canPerformAction,
    isAdmin,
    getBlockedReason,
  };
}

// ═══════════════════════════════════════════════════════════════════
// SUSPENDED ACCOUNT BANNER COMPONENT
// Can be used to show a banner when account is suspended
// ═══════════════════════════════════════════════════════════════════

export function SuspendedAccountBanner() {
  const { isSuspended, isAuthenticated } = useAccountStatus();

  if (!isAuthenticated || !isSuspended) {
    return null;
  }

  return (
    <div
      className="fixed top-16 right-0 left-0 z-[150] border-b px-4 py-3 text-center"
      style={{
        background: "linear-gradient(90deg, #7f1d1d 0%, #991b1b 50%, #7f1d1d 100%)",
        borderColor: "#dc2626",
        color: "#fecaca",
      }}
    >
      <p className="text-sm font-medium">
        ⚠️ Your account has been suspended. Some features are restricted.{" "}
        <a href="/contact" className="underline hover:text-white">
          Contact support
        </a>
      </p>
    </div>
  );
}
