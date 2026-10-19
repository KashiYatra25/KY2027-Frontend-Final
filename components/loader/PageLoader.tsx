"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { DiyaSpinner } from "./DiyaSpinner";

/**
 * PageLoader - Minimal overlay loader with blur + scroll lock
 * Uses diya spinner for all routes
 */
export function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prevPathRef = useRef(pathname);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle route change complete
  const handleRouteChangeComplete = useCallback(() => {
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
    setTimeout(() => {
      setIsLoading(false);
      // Unlock scroll
      document.body.style.overflow = "";
      setTimeout(() => {
        setIsVisible(false);
      }, 400);
    }, 200);
  }, []);

  // Handle route change start
  const handleRouteChangeStart = useCallback(() => {
    setIsLoading(true);
    setIsVisible(true);
    // Lock scroll
    document.body.style.overflow = "hidden";

    // Safety net: if the route change never completes (e.g. navigation was
    // cancelled, or it resolved to the same path), force-clear after 5s so the
    // overlay can never get permanently stuck.
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    safetyTimerRef.current = setTimeout(() => {
      handleRouteChangeComplete();
    }, 5000);
  }, [handleRouteChangeComplete]);

  // Listen for navigation events via click interception
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Ignore modified clicks (new tab / download intent) and non-primary buttons
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (!link) return;

      // Skip new-tab / downloads / non-navigating links
      if (link.target === "_blank" || link.hasAttribute("download")) return;

      const rawHref = link.getAttribute("href");
      if (!rawHref) return;

      // Resolve against the current location so we compare real URLs, not raw strings.
      // This correctly handles "#hash", "/path#hash", "?q=1", relative paths, etc.
      let url: URL;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }

      // Only same-origin navigations can be client-side route changes.
      if (url.origin !== window.location.origin) return;

      // Pure in-page navigation (same pathname) — e.g. "#collaboration-cta" or
      // "/sponsors#cta" while already on /sponsors. The pathname never changes,
      // so the loader would get stuck. Never show the loader for these.
      if (url.pathname === window.location.pathname) return;

      handleRouteChangeStart();
    };

    // Listen for browser back/forward
    const handlePopState = () => {
      handleRouteChangeStart();
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [handleRouteChangeStart]);

  // Complete loading when pathname changes
  useEffect(() => {
    if (isLoading) {
      handleRouteChangeComplete();
    }
    prevPathRef.current = pathname;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  // Cleanup scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-400"
      style={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? "auto" : "none",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "rgba(10, 10, 18, 0.6)",
      }}
    >
      {/* Centered loader */}
      <DiyaSpinner />
    </div>
  );
}
