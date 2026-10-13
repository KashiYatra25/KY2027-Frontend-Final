// Torn edge SVG path for top
export const TornEdgeTop = ({ color }: { color: string }) => (
  <svg
    className="absolute -top-4 right-0 left-0 h-6 w-full"
    viewBox="0 0 400 24"
    preserveAspectRatio="none"
  >
    <path
      d="M0 24 L0 8 Q10 12 20 6 Q30 2 40 8 Q50 14 60 6 Q70 0 80 8 Q90 12 100 4 Q110 0 120 6 Q130 14 140 8 Q150 2 160 10 Q170 16 180 8 Q190 2 200 6 Q210 12 220 4 Q230 0 240 8 Q250 14 260 6 Q270 2 280 10 Q290 14 300 6 Q310 0 320 8 Q330 12 340 4 Q350 0 360 8 Q370 14 380 6 Q390 2 400 8 L400 24 Z"
      fill={color}
    />
  </svg>
);
