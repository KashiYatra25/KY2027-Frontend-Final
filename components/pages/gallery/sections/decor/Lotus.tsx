export function Lotus() {
  return (
    <svg viewBox="-100 -96 200 130" fill="none" stroke="#f6ecdc" strokeWidth="1.1">
      {/* Outer petals */}
      {[-72, -36, 0, 36, 72].map((angle) => (
        <path
          key={`outer-${angle}`}
          d="M0,0 C-20,-22 -20,-56 0,-88 C20,-56 20,-22 0,0Z"
          transform={`rotate(${angle})`}
        />
      ))}
      {/* Inner petals */}
      {[-54, -18, 18, 54].map((angle) => (
        <path
          key={`inner-${angle}`}
          d="M0,0 C-15,-16 -15,-42 0,-66 C15,-42 15,-16 0,0Z"
          transform={`rotate(${angle})`}
        />
      ))}
      {/* Center petals */}
      {[-24, 0, 24].map((angle) => (
        <path
          key={`center-${angle}`}
          d="M0,0 C-10,-10 -10,-28 0,-44 C10,-28 10,-10 0,0Z"
          transform={`rotate(${angle})`}
        />
      ))}
      {/* Base curves */}
      <path d="M-70 10 Q0 30 70 10" />
      <path d="M-46 22 Q0 40 46 22" />
      <path d="M-22 34 Q0 42 22 34" />
      {/* Dots */}
      {[-60, -30, 0, 30, 60].map((x) => (
        <circle key={`dot-${x}`} cx={x} cy={-2} r={1.6} />
      ))}
    </svg>
  );
}
