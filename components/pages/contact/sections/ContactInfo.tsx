"use client";

import Image from "next/image";
import { memo, type ReactNode } from "react";
import { IMAGES } from "@/lib/images";
import { COLORS, JAZZ_COLORS } from "@/components/pages/contact/constants/palette";
import { CornerOrnaments, EmailIcon, PhoneIcon, PinIcon } from "./decor";

const infoCards: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}[] = [
  {
    icon: <EmailIcon />,
    label: "Email",
    value: "contact@kashiyatra.org.in",
    href: "mailto:contact@kashiyatra.org.in",
  },
  {
    icon: <PhoneIcon />,
    label: "Call Us",
    value: "+91 79069 49235",
    href: "tel:+917906949235",
  },
  {
    icon: <PinIcon />,
    label: "Find Us",
    value: "IIT (BHU) Varanasi, Uttar Pradesh 221005",
    href: "https://maps.google.com/?q=IIT+BHU+Varanasi",
  },
];

// ═══════════════════════════════════════════════════════════════════
// CONTACT INFO SECTION
// ═══════════════════════════════════════════════════════════════════
export const ContactInfo = memo(function ContactInfo() {
  return (
    <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20">
      {/* Royal letter scroll - Desktop only, top-right flourish */}
      <div className="pointer-events-none absolute -top-10 -right-16 hidden h-[28rem] w-[28rem] rotate-6 opacity-75 lg:block lg:animate-[floatOm_7s_ease-in-out_infinite]">
        <Image
          src={IMAGES.contact.envelopeScroll}
          alt=""
          fill
          className="object-contain"
          style={{ filter: "drop-shadow(0 12px 36px rgba(0,0,0,0.45))" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl 2xl:max-w-6xl">
        <h2
          className="mb-10 text-center text-2xl font-bold sm:mb-12 sm:text-3xl md:text-4xl"
          style={{
            fontFamily: "Georgia, serif",
            color: COLORS.BRIGHT_GOLD,
            textShadow: "0 2px 20px rgba(255,215,0,0.3)",
          }}
        >
          Reach The Yatra
        </h2>

        {/* Info cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {infoCards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-1 sm:p-8"
              style={{
                background: `linear-gradient(160deg, ${JAZZ_COLORS.BG_ROYAL} 0%, ${JAZZ_COLORS.BG_WINE}80 100%)`,
                border: `2px solid ${COLORS.BRIGHT_GOLD}25`,
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
            >
              <CornerOrnaments />

              {/* Icon in a gold-ringed medallion */}
              <div className="mb-4 flex justify-center">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16"
                  style={{
                    background: `radial-gradient(circle, ${COLORS.DEEP_MAROON} 0%, ${COLORS.DARK_MAROON} 100%)`,
                    border: `1.5px solid ${COLORS.BRIGHT_GOLD}70`,
                    boxShadow: `inset 0 0 12px rgba(0,0,0,0.5), 0 0 16px ${COLORS.BRIGHT_GOLD}30`,
                  }}
                >
                  {card.icon}
                </div>
              </div>

              <h3
                className="mb-2 text-lg font-bold sm:text-xl"
                style={{
                  color: COLORS.BRIGHT_GOLD,
                  fontFamily: "Georgia, serif",
                }}
              >
                {card.label}
              </h3>
              <p
                className="text-sm leading-relaxed break-words"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                {card.value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});
