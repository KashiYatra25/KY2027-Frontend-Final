export function Vine() {
  return (
    <svg viewBox="0 0 100 290" fill="none" stroke="#f6ecdc" strokeWidth="1.1">
      <path d="M52,0 C8,48 96,96 52,144 C8,192 96,240 52,288" />
      {[34, 78, 122, 164, 206, 246].map((y, i) => (
        <path
          key={i}
          d="M0,0 C8,-9 22,-9 30,0 C22,9 8,9 0,0Z"
          transform={`translate(${i % 2 === 0 ? 36 : 66} ${y}) rotate(${i % 2 === 0 ? -35 : 215})`}
        />
      ))}
      <circle cx="52" cy="144" r="3" />
    </svg>
  );
}
