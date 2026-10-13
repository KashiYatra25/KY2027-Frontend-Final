// Static Equalizer (no animation)
export const StaticEqualizer = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 40" className={className}>
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <rect
        key={i}
        x={i * 8 + 2}
        y={10 + (i % 3) * 5}
        width="5"
        height={20 - (i % 3) * 3}
        rx="2"
        fill={i % 2 === 0 ? "#6366f1" : "#8b5cf6"}
      />
    ))}
  </svg>
);
