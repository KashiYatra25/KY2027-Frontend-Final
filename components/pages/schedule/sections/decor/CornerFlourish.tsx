"use client";

// ═══════════════════════════════════════════════════════════════════
// CORNER FLOURISH
// Decorative SVG corner accent used in DecorativeElements
// ═══════════════════════════════════════════════════════════════════

interface CornerFlourishProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  mirror?: boolean;
  flipY?: boolean;
}

export function CornerFlourish({ position, mirror, flipY }: CornerFlourishProps) {
  const positionClasses = {
    "top-left": "top-20 left-4 lg:top-24 lg:left-8",
    "top-right": "top-20 right-4 lg:top-24 lg:right-8",
    "bottom-left": "bottom-4 left-4 lg:bottom-8 lg:left-8",
    "bottom-right": "bottom-4 right-4 lg:bottom-8 lg:right-8",
  };

  const scaleClass = `${mirror ? "-scale-x-100" : ""} ${flipY ? "-scale-y-100" : ""}`;

  return (
    <svg
      className={`absolute h-24 w-24 text-[#D4A853]/10 lg:h-32 lg:w-32 ${positionClasses[position]} ${scaleClass}`}
      viewBox="0 0 100 100"
      fill="none"
    >
      <path d="M5 95 Q5 5 95 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M15 95 Q15 15 95 15" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="5" cy="95" r="3" fill="currentColor" />
      <circle cx="95" cy="5" r="3" fill="currentColor" />
      <path
        d="M30 95 C30 60 60 30 95 30"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        strokeDasharray="4 4"
      />
    </svg>
  );
}
