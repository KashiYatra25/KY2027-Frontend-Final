"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { SignoutSuccessToast, SignoutErrorToast } from "@/components/toast";

const TOAST_IDS = {
  SIGNOUT_SUCCESS: "signout-success",
  SIGNOUT_ERROR: "signout-error",
} as const;

/**
 * Handles signout toasts only.
 * Use on / (home) page.
 *
 * Handles:
 * - ?signout=success → Sign-out success toast
 * - ?signout=failure → Sign-out error toast
 *
 * Must be wrapped in Suspense.
 */
export function SignoutToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const shownToasts = useRef<Set<string>>(new Set());

  // Handle sign-out success
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

    router.replace(pathname, { scroll: false });
    router.refresh();
  }, [searchParams, router, pathname]);

  // Handle sign-out error
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

    router.replace(pathname, { scroll: false });
    router.refresh();
  }, [searchParams, router, pathname]);

  return null;
}
