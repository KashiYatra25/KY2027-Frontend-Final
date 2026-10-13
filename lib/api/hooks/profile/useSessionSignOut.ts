"use client";

import { useState, useCallback } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UseSignOutOptions {
  redirectTo?: string;
}

/**
 * Hook for handling sign out with loading state.
 * Redirects to home page with URL params for centralized toast handling.
 */
export function useSignOut(options: UseSignOutOptions = {}) {
  const { redirectTo } = options;
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = useCallback(async () => {
    if (isSigningOut) return; // Prevent multiple clicks

    setIsSigningOut(true);

    try {
      await signOut({ redirect: false });
      // Redirect to home with success param (or custom redirectTo with param)
      const destination = redirectTo ?? "/?signout=success";
      router.push(
        destination.includes("?")
          ? `${destination}&signout=success`
          : destination === "/"
            ? "/?signout=success"
            : destination
      );
      router.refresh();
    } catch {
      router.push("/?signout=failure");
    } finally {
      setIsSigningOut(false);
    }
  }, [isSigningOut, redirectTo, router]);

  return {
    isSigningOut,
    handleSignOut,
  };
}
