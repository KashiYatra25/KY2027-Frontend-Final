"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { AuthSuccessToast, AlreadyLoggedInToast } from "@/components/toast";

const TOAST_IDS = {
  AUTH_SUCCESS: "auth-success",
  ALREADY_LOGGED_IN: "already-logged-in",
} as const;

/**
 * Handles auth success and already-logged-in toasts.
 * Use on /profile page.
 *
 * Handles:
 * - ?auth=success → Sign-in success toast
 * - ?info=already-logged-in → Already logged in toast
 *
 * Must be wrapped in Suspense.
 */
export function AuthSuccessToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const shownToasts = useRef<Set<string>>(new Set());

  // Handle sign-in success
  useEffect(() => {
    const auth = searchParams.get("auth");
    if (auth !== "success") return;
    if (shownToasts.current.has(TOAST_IDS.AUTH_SUCCESS)) return;

    shownToasts.current.add(TOAST_IDS.AUTH_SUCCESS);

    toast.custom(() => <AuthSuccessToast />, {
      duration: 4000,
      position: "bottom-right",
      id: TOAST_IDS.AUTH_SUCCESS,
    });

    router.replace(pathname, { scroll: false });
    router.refresh();
  }, [searchParams, router, pathname]);

  // Handle already logged in
  useEffect(() => {
    const info = searchParams.get("info");
    if (info !== "already-logged-in") return;
    if (shownToasts.current.has(TOAST_IDS.ALREADY_LOGGED_IN)) return;

    shownToasts.current.add(TOAST_IDS.ALREADY_LOGGED_IN);

    toast.custom(() => <AlreadyLoggedInToast />, {
      duration: 4000,
      position: "bottom-right",
      id: TOAST_IDS.ALREADY_LOGGED_IN,
    });

    router.replace(pathname, { scroll: false });
    router.refresh();
  }, [searchParams, router, pathname]);

  return null;
}
