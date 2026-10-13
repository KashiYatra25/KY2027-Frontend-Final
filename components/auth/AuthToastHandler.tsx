"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  AuthSuccessToast,
  AuthErrorToast,
  SignoutSuccessToast,
  SignoutErrorToast,
  AlreadyLoggedInToast,
} from "@/components/toast";

/**
 * Maps NextAuth error codes to user-friendly messages
 */
function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "OAuthSignin":
      return "Error starting authentication.";
    case "OAuthCallback":
      return "Error during authentication callback.";
    case "OAuthCreateAccount":
    case "EmailCreateAccount":
      return "Could not create account.";
    case "Callback":
      return "Authentication callback failed.";
    case "OAuthAccountNotLinked":
      return "Email already linked to another account.";
    case "AccessDenied":
      return "Access denied. You may not have permission.";
    case "NetworkError":
      return "Network error. Please check your connection.";
    case "unknown":
      return "An unexpected error occurred.";
    default:
      return "Something went wrong. Please try again.";
  }
}

// Toast IDs
const TOAST_IDS = {
  AUTH_SUCCESS: "auth-success",
  AUTH_ERROR: "auth-error",
  SIGNOUT_SUCCESS: "signout-success",
  SIGNOUT_ERROR: "signout-error",
  ALREADY_LOGGED_IN: "already-logged-in",
} as const;

/**
 * Auth toast handler - shows toasts and cleans URL params.
 *
 * Does NOT handle redirection. Redirection should be set via callbackUrl
 * when calling signIn(). This component just:
 * 1. Detects auth-related query params
 * 2. Shows appropriate toast
 * 3. Cleans URL (removes query params, stays on same page)
 *
 * Handles:
 * - ?auth=success → Sign-in success toast
 * - ?auth=<error> or ?error=<code> → Sign-in error toast  
 * - ?signout=success → Sign-out success toast
 * - ?signout=failure → Sign-out error toast
 * - ?info=already-logged-in → Already logged in toast
 *
 * Usage: Add to any page where auth callbacks might land.
 * Must be wrapped in Suspense.
 */
export function AuthToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Track which toasts have been shown to prevent duplicates
  const shownToasts = useRef<Set<string>>(new Set());

  // Clean URL - stay on current page, just remove query params
  const cleanUrl = () => {
    router.replace(pathname, { scroll: false });
    router.refresh();
  };

  // 1. Handle sign-in success
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

    cleanUrl();
  }, [searchParams, router, pathname]);

  // 2. Handle sign-in error (from ?auth=<error> or ?error=<code>)
  useEffect(() => {
    const auth = searchParams.get("auth");
    const error = searchParams.get("error");

    if (auth === "success" || (!auth && !error)) return;

    const errorCode = auth || error;
    if (!errorCode) return;
    if (shownToasts.current.has(TOAST_IDS.AUTH_ERROR)) return;

    shownToasts.current.add(TOAST_IDS.AUTH_ERROR);

    toast.custom(() => <AuthErrorToast message={getAuthErrorMessage(errorCode)} />, {
      duration: 5000,
      position: "bottom-right",
      id: TOAST_IDS.AUTH_ERROR,
    });

    cleanUrl();
  }, [searchParams, router, pathname]);

  // 3. Handle sign-out success
  useEffect(() => {
    const signout = searchParams.get("signout");
    if (signout !== "success") return;
    if (shownToasts.current.has(TOAST_IDS.SIGNOUT_SUCCESS)) return;

    shownToasts.current.add(TOAST_IDS.SIGNOUT_SUCCESS);

    toast.custom(() => <SignoutSuccessToast />, {
      duration: 4000,
      position: "bottom-right",
      id: TOAST_IDS.SIGNOUT_SUCCESS,
    });

    cleanUrl();
  }, [searchParams, router, pathname]);

  // 4. Handle sign-out error
  useEffect(() => {
    const signout = searchParams.get("signout");
    if (signout !== "failure") return;
    if (shownToasts.current.has(TOAST_IDS.SIGNOUT_ERROR)) return;

    shownToasts.current.add(TOAST_IDS.SIGNOUT_ERROR);

    toast.custom(() => <SignoutErrorToast />, {
      duration: 5000,
      position: "bottom-right",
      id: TOAST_IDS.SIGNOUT_ERROR,
    });

    cleanUrl();
  }, [searchParams, router, pathname]);

  // 5. Handle already logged in info
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

    cleanUrl();
  }, [searchParams, router, pathname]);

  return null;
}
