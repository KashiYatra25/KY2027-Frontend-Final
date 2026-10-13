// ═══════════════════════════════════════════════════════════════════
// STATIC WAVEFORM - Non-animated waveform bars for mobile CTA
// ═══════════════════════════════════════════════════════════════════

const NEON = {
  CYAN: "#00FFFF",
  MAGENTA: "#FF00FF",
  LIME: "#39FF14",
};

export const StaticWaveform = ({
  width = 200,
  height = 40,
}: {
  width?: number;
  height?: number;
}) => {
  const bars = 24;
  const barWidth = (width - (bars - 1) * 2) / bars;
  const heights = [
    0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4,
    0.7, 0.5, 0.9, 0.6, 0.8,
  ];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="staticWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={NEON.CYAN} />
          <stop offset="50%" stopColor={NEON.MAGENTA} />
          <stop offset="100%" stopColor={NEON.LIME} />
        </linearGradient>
      </defs>
      {heights.map((h, i) => {
        const barHeight = h * height * 0.9;
        const x = i * (barWidth + 2);
        const y = (height - barHeight) / 2;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx={barWidth / 2}
            fill="url(#staticWaveGradient)"
            opacity={0.8}
          />
        );
      })}
    </svg>
  );
};
