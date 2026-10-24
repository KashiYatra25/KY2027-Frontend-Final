"use client";

import { COLORS, COLORS_RGBA } from "@/components/pages/ca/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// PERKS SECTION
// Cards centered
// ═══════════════════════════════════════════════════════════════════

const PERKS = [
  {
    icon: "🎫",
    title: "Free Festival Pass",
    description:
      "Get complimentary access to all events, pro-nights, and exclusive backstage tours",
    color: "pink",
  },
  {
    icon: "📜",
    title: "Certificate & LOR",
    description:
      "Official certificate from IIT BHU and Letter of Recommendation for top performers",
    color: "cyan",
  },
  {
    icon: "🎁",
    title: "Exclusive Merch",
    description: "Limited edition CA kit with premium Kashi Yatra merchandise and goodies",
    color: "pink",
  },
  {
    icon: "🤝",
    title: "Networking",
    description: "Connect with 500+ student leaders from top colleges across India",
    color: "purple",
  },
  {
    icon: "⭐",
    title: "Leadership Skills",
    description: "Develop marketing, communication, and team management expertise",
    color: "cyan",
  },
];

const colorMap = {
  pink: {
    bg: COLORS_RGBA.PINK_30,
    border: COLORS_RGBA.PINK_30,
    glow: COLORS_RGBA.PINK_30,
    text: COLORS.PINK,
  },
  purple: {
    bg: COLORS_RGBA.PURPLE_30,
    border: COLORS_RGBA.PURPLE_30,
    glow: COLORS_RGBA.PURPLE_30,
    text: COLORS.PURPLE,
  },
  cyan: {
    bg: COLORS_RGBA.CYAN_30,
    border: COLORS_RGBA.CYAN_30,
    glow: COLORS_RGBA.CYAN_30,
    text: COLORS.CYAN,
  },
};

export function PerksSection() {
  return (
    <section className="relative min-h-[900px] overflow-hidden px-4 py-24">
      {/* Section header - CENTERED */}
      <div className="relative z-20 mx-auto mb-16 max-w-4xl text-center 2xl:max-w-5xl">
        <span className="perks-title mb-4 inline-block rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1 text-xs font-bold tracking-wider text-purple-400 uppercase">
          Why Join?
        </span>
        <h2 className="perks-title mb-4 text-4xl font-black text-white sm:text-5xl">
          Exclusive <span className="ca-gradient-text">Perks</span>
        </h2>
        <p className="perks-title mx-auto max-w-xl text-gray-400">
          Being a Campus Ambassador isn&apos;t just a title—it&apos;s a launchpad for unforgettable
          experiences
        </p>
      </div>

      {/* Perks grid - CENTERED */}
      <div className="perks-grid relative z-20 mx-auto grid max-w-4xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 2xl:max-w-5xl">
        {PERKS.map((perk, i) => {
          const colors = colorMap[perk.color as keyof typeof colorMap];
          return (
            <div
              key={i}
              className="perk-card group relative rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${colors.bg}, rgba(10, 6, 18, 0.6))`,
                border: `1px solid ${colors.border}`,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: colors.glow }}
              />

              {/* Icon */}
              <div className="mb-4 text-4xl">{perk.icon}</div>

              {/* Title */}
              <h3 className="mb-2 text-xl font-bold" style={{ color: colors.text }}>
                {perk.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-gray-400">{perk.description}</p>

              {/* Corner accent */}
              <div
                className="absolute top-4 right-4 h-2 w-2 rounded-full"
                style={{ background: colors.text }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
