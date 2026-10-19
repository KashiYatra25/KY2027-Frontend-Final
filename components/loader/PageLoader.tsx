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

  // Handle route change start
  const handleRouteChangeStart = useCallback(() => {
    setIsLoading(true);
    setIsVisible(true);
    // Lock scroll
    document.body.style.overflow = "hidden";
  }, []);

  // Handle route change complete
  const handleRouteChangeComplete = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false);
      // Unlock scroll
      document.body.style.overflow = "";
      setTimeout(() => {
        setIsVisible(false);
      }, 400);
    }, 200);
  }, []);

  // Listen for navigation events via click interception
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link) {
        const href = link.getAttribute("href");
        if (
          href &&
          href.startsWith("/") &&
          !href.startsWith("/#") &&
          href !== pathname &&
          !link.hasAttribute("download") &&
          link.target !== "_blank"
        ) {
          handleRouteChangeStart();
        }
      }
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
  }, [pathname, handleRouteChangeStart]);

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
