"use client";

// ── Photocopy / zine grain texture overlay ───────────────────────────
export function PhotocopyTexture() {
  // Subtle grain + diagonal "toner streak" overlay for the zine feel.
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `
          repeating-linear-gradient(115deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 5px),
          radial-gradient(circle at 20% 30%, rgba(0,0,0,0.10) 0, transparent 55%),
          radial-gradient(circle at 80% 70%, rgba(0,0,0,0.08) 0, transparent 50%)
        `,
        mixBlendMode: "multiply",
      }}
    />
  );
}
