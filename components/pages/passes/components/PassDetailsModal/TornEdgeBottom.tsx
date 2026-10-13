// Torn edge SVG path for bottom
export const TornEdgeBottom = ({ color }: { color: string }) => (
  <svg
    className="absolute right-0 -bottom-4 left-0 h-6 w-full"
    viewBox="0 0 400 24"
    preserveAspectRatio="none"
  >
    <path
      d="M0 0 L0 16 Q10 12 20 18 Q30 22 40 16 Q50 10 60 18 Q70 24 80 16 Q90 12 100 20 Q110 24 120 18 Q130 10 140 16 Q150 22 160 14 Q170 8 180 16 Q190 22 200 18 Q210 12 220 20 Q230 24 240 16 Q250 10 260 18 Q270 22 280 14 Q290 10 300 18 Q310 24 320 16 Q330 12 340 20 Q350 24 360 16 Q370 10 380 18 Q390 22 400 16 L400 0 Z"
      fill={color}
    />
  </svg>
);
