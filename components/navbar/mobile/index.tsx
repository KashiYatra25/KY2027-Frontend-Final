"use client";

import { memo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { useNavbar } from "@/components/navbar/config/NavbarContext";
import type { NavbarTheme } from "@/components/navbar/types/navbar.types";
import { MOBILE_THEME_STYLES } from "@/components/navbar/config/mobile.config";

/**
 * Theme-aware Mobile Navbar
 * Visible on mobile (sm:hidden)
 */
export const NavbarMobile = memo(function NavbarMobile({
  theme = "main",
}: {
  theme?: NavbarTheme;
}) {
  const [open, setOpen] = useState(false);
  const { isActive, isSessionLoading, isAuthenticated, user, userInitials, allLinks } = useNavbar();
  const styles = MOBILE_THEME_STYLES[theme];

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      {/* Backdrop overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[5] bg-black/30"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Hamburger */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="absolute right-[2%] z-20 flex h-8 w-8 -translate-y-1/2 flex-col items-center justify-center gap-1.5"
        style={{ top: styles.hamburgerTop }}
      >
        <span
          className="block h-[3px] w-6 rounded-full transition-transform duration-300"
          style={{
            background: styles.hamburgerGradient,
            boxShadow: styles.hamburgerShadow,
            transform: open ? "translateY(7px) rotate(45deg)" : "none",
          }}
        />
        <span
          className="block h-[3px] w-6 rounded-full transition-opacity duration-300"
          style={{
            background: styles.hamburgerGradient,
            boxShadow: styles.hamburgerShadow,
            opacity: open ? 0 : 1,
          }}
        />
        <span
          className="block h-[3px] w-6 rounded-full transition-transform duration-300"
          style={{
            background: styles.hamburgerGradient,
            boxShadow: styles.hamburgerShadow,
            transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
          }}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`naksha-panel absolute top-[calc(100%+8px)] right-2 left-2 z-10 origin-top transition-all duration-300 ease-out ${
          open
            ? "pointer-events-auto scale-y-100 opacity-100"
            : "pointer-events-none scale-y-0 opacity-0"
        }`}
        style={{
          borderRadius: "14px",
          background: styles.panelBg,
          border: styles.panelBorder,
          boxShadow: styles.panelShadow,
          willChange: "transform, opacity",
        }}
      >
        {/* Mottled texture */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Faint mystical mandala watermark */}
        <span
          aria-hidden
          className="naksha-mandala pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite]"
          style={{
            width: "78%",
            aspectRatio: "1",
            opacity: 0.14,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='${styles.mandalaStroke}' stroke-width='1'%3E%3Ccircle cx='100' cy='100' r='96'/%3E%3Ccircle cx='100' cy='100' r='78'/%3E%3Ccircle cx='100' cy='100' r='54'/%3E%3Ccircle cx='100' cy='100' r='30'/%3E%3Cg%3E%3Cpath d='M100 4 L108 30 L100 22 L92 30 Z'/%3E%3C/g%3E%3Cg transform='rotate(45 100 100)'%3E%3Cpath d='M100 4 L108 30 L100 22 L92 30 Z'/%3E%3C/g%3E%3Cg transform='rotate(90 100 100)'%3E%3Cpath d='M100 4 L108 30 L100 22 L92 30 Z'/%3E%3C/g%3E%3Cg transform='rotate(135 100 100)'%3E%3Cpath d='M100 4 L108 30 L100 22 L92 30 Z'/%3E%3C/g%3E%3Cg transform='rotate(180 100 100)'%3E%3Cpath d='M100 4 L108 30 L100 22 L92 30 Z'/%3E%3C/g%3E%3Cg transform='rotate(225 100 100)'%3E%3Cpath d='M100 4 L108 30 L100 22 L92 30 Z'/%3E%3C/g%3E%3Cg transform='rotate(270 100 100)'%3E%3Cpath d='M100 4 L108 30 L100 22 L92 30 Z'/%3E%3C/g%3E%3Cg transform='rotate(315 100 100)'%3E%3Cpath d='M100 4 L108 30 L100 22 L92 30 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            willChange: "transform",
          }}
        />

        {/* Inner ornamental frame */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[6px] rounded-[10px]"
          style={{ border: `1px solid ${styles.dividerColor}50` }}
        />

        {/* Decorative corner diamonds */}
        {[
          "top-[10px] left-[10px]",
          "top-[10px] right-[10px]",
          "bottom-[10px] left-[10px]",
          "bottom-[10px] right-[10px]",
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={`absolute ${pos} pointer-events-none h-2 w-2 rotate-45`}
            style={{
              background: `linear-gradient(135deg, ${styles.accentGold}, ${styles.accentBronze})`,
              boxShadow: `0 0 6px ${styles.accentGold}70`,
            }}
          />
        ))}

        <nav
          className="relative flex flex-col gap-1 px-5 pt-3 pb-4"
          aria-label="Mobile"
          style={{ fontFamily: "var(--font-ethereal), serif" }}
        >
          {/* User info header when logged in */}
          {isAuthenticated && user ? (
            <div
              className="mb-2 flex items-center gap-3 border-b pb-3"
              style={{ borderColor: `${styles.dividerColor}30` }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2"
                style={{
                  borderColor: styles.accentGold,
                  background: user.image
                    ? "transparent"
                    : `linear-gradient(135deg, ${styles.accentGold} 0%, ${styles.accentBronze} 100%)`,
                }}
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span
                    className="text-sm font-bold"
                    style={{ color: theme === "main" ? "#1a0a05" : "#fff" }}
                  >
                    {userInitials}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold" style={{ color: styles.textColor }}>
                  {user.name}
                </p>
                <p className="truncate text-xs" style={{ color: styles.textColorSecondary }}>
                  {user.email}
                </p>
              </div>
            </div>
          ) : (
            /* Mystical header */
            <div className="flex flex-col items-center pb-2">
              <span
                className="text-[18px] leading-none"
                style={{
                  background: styles.headerGradient,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: `drop-shadow(0 0 4px ${styles.accentGold}60)`,
                }}
              >
                ✦
              </span>
              <span
                className="mt-1 text-[10px] tracking-[0.4em] uppercase"
                style={{ color: styles.textColorSecondary, fontWeight: 900 }}
              >
                Map
              </span>
              <span
                aria-hidden
                className="mt-1.5 flex w-full items-center justify-center gap-2 opacity-80"
                style={{ color: styles.dividerColor }}
              >
                <span
                  className="h-px flex-1"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${styles.dividerColor})`,
                  }}
                />
                <span className="text-[9px]">✦</span>
                <span
                  className="h-px flex-1"
                  style={{
                    background: `linear-gradient(90deg, ${styles.dividerColor}, transparent)`,
                  }}
                />
              </span>
            </div>
          )}

          {allLinks.map((link, i, arr) => {
            const active = isActive(link.href);
            const isLoginLink = link.label === "LOGIN";
            return (
              <div key={link.label} className="flex flex-col">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="naksha-link naksha-item flex items-center justify-center gap-2 rounded-md px-3 py-2 text-center text-[15px] tracking-[0.18em] uppercase transition-all duration-300"
                  style={{
                    fontWeight: 900,
                    color: active ? styles.textColor : styles.textColorInactive,
                    background: active ? styles.activeGradient : "transparent",
                    boxShadow: active ? styles.activeShadow : "none",
                    textShadow: active ? styles.activeTextShadow : styles.inactiveTextShadow,
                    border: active ? `1px solid ${styles.accentGold}90` : "1px solid transparent",
                    opacity: open ? 1 : 0,
                    transform: open
                      ? active
                        ? "translateY(0) scale(1.02)"
                        : "translateY(0)"
                      : "translateY(-8px)",
                    transitionDelay: open ? `${50 + i * 30}ms` : "0ms",
                  }}
                >
                  <span
                    aria-hidden
                    className="text-[9px]"
                    style={{
                      color: active ? styles.accentGold : styles.accentBronze,
                      filter: active ? `drop-shadow(0 0 4px ${styles.accentGold}90)` : "none",
                    }}
                  >
                    {active ? "✦" : "◆"}
                  </span>
                  {isLoginLink && isSessionLoading ? <Spinner className="size-4" /> : link.label}
                  <span
                    aria-hidden
                    className="text-[9px]"
                    style={{
                      color: active ? styles.accentGold : styles.accentBronze,
                      filter: active ? `drop-shadow(0 0 4px ${styles.accentGold}90)` : "none",
                    }}
                  >
                    {active ? "✦" : "◆"}
                  </span>
                </Link>
                {/* Divider between items */}
                {i < arr.length - 1 && (
                  <span
                    aria-hidden
                    className="flex items-center justify-center gap-2 py-0.5 opacity-60"
                    style={{ color: styles.dividerColor }}
                  >
                    <span
                      className="h-px w-8"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${styles.dividerColor})`,
                      }}
                    />
                    <span className="text-[9px]">✦</span>
                    <span
                      className="h-px w-8"
                      style={{
                        background: `linear-gradient(90deg, ${styles.dividerColor}, transparent)`,
                      }}
                    />
                  </span>
                )}
              </div>
            );
          })}

          {/* Profile link when logged in */}
          {isAuthenticated && (
            <>
              <span
                aria-hidden
                className="flex items-center justify-center gap-2 py-0.5 opacity-60"
                style={{ color: styles.dividerColor }}
              >
                <span
                  className="h-px w-8"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${styles.dividerColor})`,
                  }}
                />
                <span className="text-[9px]">✦</span>
                <span
                  className="h-px w-8"
                  style={{
                    background: `linear-gradient(90deg, ${styles.dividerColor}, transparent)`,
                  }}
                />
              </span>
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="naksha-link naksha-item flex items-center justify-center gap-2 rounded-md px-3 py-2 text-center text-[15px] tracking-[0.18em] uppercase transition-all duration-300"
                style={{
                  fontWeight: 900,
                  color: isActive("/profile") ? styles.textColor : styles.textColorInactive,
                  background: isActive("/profile") ? styles.activeGradient : "transparent",
                  boxShadow: isActive("/profile") ? styles.activeShadow : "none",
                  textShadow: isActive("/profile")
                    ? styles.activeTextShadow
                    : styles.inactiveTextShadow,
                  border: isActive("/profile")
                    ? `1px solid ${styles.accentGold}90`
                    : "1px solid transparent",
                  opacity: open ? 1 : 0,
                  transform: open
                    ? isActive("/profile")
                      ? "translateY(0) scale(1.02)"
                      : "translateY(0)"
                    : "translateY(-8px)",
                  transitionDelay: open ? `${50 + allLinks.length * 30}ms` : "0ms",
                }}
              >
                <span
                  aria-hidden
                  className="text-[9px]"
                  style={{
                    color: isActive("/profile") ? styles.accentGold : styles.accentBronze,
                    filter: isActive("/profile")
                      ? `drop-shadow(0 0 4px ${styles.accentGold}90)`
                      : "none",
                  }}
                >
                  {isActive("/profile") ? "✦" : "◆"}
                </span>
                PROFILE
                <span
                  aria-hidden
                  className="text-[9px]"
                  style={{
                    color: isActive("/profile") ? styles.accentGold : styles.accentBronze,
                    filter: isActive("/profile")
                      ? `drop-shadow(0 0 4px ${styles.accentGold}90)`
                      : "none",
                  }}
                >
                  {isActive("/profile") ? "✦" : "◆"}
                </span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
});
