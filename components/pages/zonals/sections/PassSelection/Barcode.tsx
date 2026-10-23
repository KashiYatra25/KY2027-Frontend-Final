"use client";

// Barcode rendered as a run of bars with pseudo-random widths. Static
// array keeps SSR/CSR output deterministic.
const BARCODE_BARS = [
  3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 1, 2, 4, 1, 2, 1, 3, 1, 1, 2, 2, 1, 4, 1, 1, 3, 1, 2, 1, 1, 3, 2, 1,
  4, 1, 2,
];

export function Barcode({ color }: { color: string }) {
  return (
    <div className="flex h-10 items-end gap-[2px]" role="img" aria-label="barcode graphic">
      {BARCODE_BARS.map((w, i) => (
        <span
          key={i}
          style={{
            width: `${w}px`,
            height: i % 7 === 0 ? "100%" : "80%",
            background: color,
          }}
        />
      ))}
    </div>
  );
}
