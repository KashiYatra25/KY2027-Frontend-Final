export function MandalaLarge() {
  return (
    <svg viewBox="-102 -102 204 204" fill="none" stroke="#f6ecdc" strokeWidth="1">
      <circle r="99" />
      <circle r="91" />
      <circle r="24" />
      {/* Petals - simplified */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <path
          key={angle}
          d="M0,-26 C15,-46 15,-72 0,-90 C-15,-72 -15,-46 0,-26Z"
          transform={`rotate(${angle})`}
        />
      ))}
      {/* Inner petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <path
          key={`inner-${angle}`}
          d="M0,-5 C6,-11 6,-18 0,-23 C-6,-18 -6,-11 0,-5Z"
          transform={`rotate(${angle})`}
        />
      ))}
      {/* Dots around edge */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        const x = Math.sin(rad) * 95;
        const y = -Math.cos(rad) * 95;
        return <circle key={`dot-${i}`} cx={x.toFixed(1)} cy={y.toFixed(1)} r="1.8" />;
      })}
    </svg>
  );
}
