"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Expose the active Lenis instance so overlays/modals can pause smooth scroll
// (Lenis ignores `body { overflow: hidden }` because it drives its own virtual
// scroll from wheel/touch events — modals must call lenis.stop()/start()).
declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Don't initialize Lenis on mobile - native scroll is smoother
    if (window.innerWidth < 640) {
      return;
    }

    // Initialize Lenis only on desktop
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // ═══════════════════════════════════════════════════════════════
    // GSAP + Lenis Synchronization (Simple approach)
    //
    // - GSAP ticker drives Lenis RAF (single animation clock)
    // - ScrollTrigger.update() called on every Lenis scroll event
    // - No scroller proxy (keeps native IntersectionObserver working)
    // ═══════════════════════════════════════════════════════════════

    // Disable GSAP's lag smoothing for precise scroll sync
    gsap.ticker.lagSmoothing(0);

    // Let GSAP ticker drive Lenis's RAF
    // GSAP ticker provides time in seconds, Lenis expects milliseconds
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // Update ScrollTrigger whenever Lenis scrolls
    // This ensures ScrollTrigger animations stay in sync with smooth scroll
    const scrollCallback = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", scrollCallback);

    // ═══════════════════════════════════════════════════════════════
    // Smooth in-page anchor scrolling (e.g. "Partner With Us" -> #collaboration-cta)
    //
    // Lenis hijacks the scroll, so native hash-anchor jumps don't work.
    // Intercept clicks on same-page hash links and drive Lenis to the target.
    // ═══════════════════════════════════════════════════════════════
    const anchorClickCallback = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) {
        return;
      }
      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || !href.includes("#")) return;

      let url: URL;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }

      // Only handle same-page hash links with a real target id.
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) {
        return;
      }
      const id = url.hash.slice(1);
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target, { offset: -20, duration: 1.2 });
      // Keep the URL hash in sync without triggering a native jump.
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", anchorClickCallback);

    // Cleanup
    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.off("scroll", scrollCallback);
      document.removeEventListener("click", anchorClickCallback);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  // Reset scroll position on route change
  useEffect(() => {
    // Scroll to top with Lenis if available
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    // Always also reset native scroll (fallback and for mobile)
    window.scrollTo(0, 0);
    // Also refresh ScrollTrigger for new page content
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}
