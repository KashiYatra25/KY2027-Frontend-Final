// Decorative corner flourish
export const CornerFlourish = ({ position }: { position: "tl" | "tr" | "bl" | "br" }) => {
  const rotations = { tl: 0, tr: 90, bl: -90, br: 180 };
  const positions = {
    tl: "top-4 left-4",
    tr: "top-4 right-4",
    bl: "bottom-4 left-4",
    br: "bottom-4 right-4",
  };

  return (
    <svg
      className={`absolute ${positions[position]} h-12 w-12 opacity-60`}
      viewBox="0 0 50 50"
      style={{ transform: `rotate(${rotations[position]}deg)` }}
    >
      <path
        d="M5 5 Q5 25 25 25 M5 5 Q25 5 25 25"
        fill="none"
        stroke="#8B4513"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <circle cx="5" cy="5" r="3" fill="#8B4513" opacity="0.5" />
      <path d="M8 8 Q8 18 18 18" fill="none" stroke="#D4A853" strokeWidth="1" opacity="0.4" />
    </svg>
  );
};
