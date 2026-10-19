import { ImageResponse } from "next/og";

/**
 * Dynamically-generated Open Graph / social-share image.
 *
 * Next.js App Router automatically wires this as <meta property="og:image">
 * for the site root, so link previews (WhatsApp, Twitter/X, LinkedIn,
 * Slack, etc.) show a branded Kashi Yatra card instead of a blank icon.
 *
 * 1200x630 is the standard OG image size.
 */

export const runtime = "edge";

export const alt = "Kashi Yatra 2027 — IIT (BHU) Varanasi's Biggest Cultural Festival";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0c0810 0%, #1a0a2e 35%, #2d0a18 70%, #0c0810 100%)",
        position: "relative",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 500,
          background:
            "radial-gradient(ellipse at center, rgba(255,215,0,0.18) 0%, rgba(255,140,0,0.06) 45%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Diya / lotus mark */}
      <div
        style={{
          fontSize: 64,
          display: "flex",
          marginBottom: 8,
        }}
      >
        ✦ 🪔 ✦
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 110,
          fontWeight: 900,
          letterSpacing: 4,
          display: "flex",
          background: "linear-gradient(180deg, #FFFAF0 0%, #FFD700 40%, #DAA520 75%, #B8860B 100%)",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        KASHIYATRA
      </div>

      {/* Divider + year */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginTop: 6,
        }}
      >
        <div style={{ width: 90, height: 2, background: "rgba(255,215,0,0.6)", display: "flex" }} />
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: 14,
            color: "#FFD700",
            display: "flex",
          }}
        >
          2027
        </div>
        <div style={{ width: 90, height: 2, background: "rgba(255,215,0,0.6)", display: "flex" }} />
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 28,
          fontSize: 30,
          fontStyle: "italic",
          color: "rgba(253,246,227,0.82)",
          display: "flex",
        }}
      >
        Where the sacred Ganga meets the rhythm of celebration
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 18,
          fontSize: 22,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "rgba(255,215,0,0.7)",
          display: "flex",
        }}
      >
        IIT (BHU) Varanasi · 14–17 January 2027
      </div>
    </div>,
    { ...size }
  );
}
