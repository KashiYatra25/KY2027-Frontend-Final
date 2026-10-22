"use client";

// ═══════════════════════════════════════════════════════════════════
// BEAM SVG - Single spotlight beam shape
// ═══════════════════════════════════════════════════════════════════

export function BeamSVG({
  className,
  color,
  swayStart,
  swayEnd,
  duration,
}: {
  className?: string;
  color: "gold" | "rani" | "purple";
  swayStart: number;
  swayEnd: number;
  duration: number;
}) {
  const colors = {
    gold: "#f5a623",
    rani: "#e5337c",
    purple: "#965aff",
  };

  return (
    <div
      className={`${className} h-[115%] w-[30vw] max-w-[420px] origin-top`}
      style={
        {
          "--sway-start": `${swayStart}deg`,
          "--sway-end": `${swayEnd}deg`,
          "--sway-duration": `${duration}s`,
        } as React.CSSProperties
      }
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id={`beam-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={colors[color]} stopOpacity="0.62" />
            <stop offset="0.88" stopColor={colors[color]} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="46,0 54,0 100,100 0,100" fill={`url(#beam-${color})`} />
      </svg>
    </div>
  );
}
