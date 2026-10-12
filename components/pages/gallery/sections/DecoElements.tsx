"use client";

// ═══════════════════════════════════════════════════════════════════
// DECORATIVE ELEMENTS - Cream-colored SVG line art scattered on page
// ═══════════════════════════════════════════════════════════════════

export function DecoElements() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-visible opacity-65"
      aria-hidden="true"
    >
      {/* Top left mandala */}
      <div
        className="absolute opacity-[0.37]"
        style={{
          top: -70,
          left: -120,
          width: "clamp(240px, 34vw, 420px)",
        }}
      >
        <MandalaLarge />
      </div>

      {/* Top right paisley */}
      <div
        className="absolute opacity-[0.48]"
        style={{
          top: "clamp(250px, 26vw, 330px)",
          left: "52%",
          width: "clamp(50px, 7vw, 90px)",
          transform: "rotate(24deg)",
        }}
      >
        <Paisley />
      </div>

      {/* Right side vine */}
      <div
        className="absolute opacity-[0.34]"
        style={{
          top: "clamp(120px, 12vw, 180px)",
          right: "clamp(34px, 5vw, 90px)",
          width: "clamp(40px, 6vw, 76px)",
          transform: "rotate(8deg)",
        }}
      >
        <Vine />
      </div>

      {/* Left swirl */}
      <div
        className="absolute opacity-[0.48]"
        style={{
          top: "clamp(300px, 34vw, 420px)",
          left: "3%",
          width: "clamp(90px, 13vw, 170px)",
        }}
      >
        <Swirl />
      </div>

      {/* Center sparkle */}
      <div
        className="absolute opacity-[0.62]"
        style={{
          top: "clamp(190px, 19vw, 250px)",
          left: "46%",
          width: 30,
        }}
      >
        <StarShape />
      </div>

      {/* Bottom lotus */}
      <div
        className="absolute opacity-[0.44]"
        style={{
          bottom: -10,
          right: "3%",
          width: "clamp(220px, 32vw, 400px)",
        }}
      >
        <Lotus />
      </div>

      {/* Bottom left mandala */}
      <div
        className="absolute opacity-[0.31]"
        style={{
          bottom: 30,
          left: -90,
          width: "clamp(200px, 26vw, 320px)",
          transform: "rotate(11deg)",
        }}
      >
        <MandalaLarge />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SVG COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function MandalaLarge() {
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

function Paisley() {
  return (
    <svg viewBox="-60 -110 120 125" fill="none" stroke="#f6ecdc" strokeWidth="1.1">
      <path d="M0,0 C-34,-10 -50,-52 -18,-84 C8,-108 48,-88 42,-52 C38,-28 12,-22 0,0Z" />
      <path d="M-2,-10 C-26,-18 -36,-48 -14,-72 C6,-90 34,-76 30,-52 C27,-34 8,-28 -2,-10Z" />
      <circle cx="4" cy="-52" r="9" />
      <circle cx="4" cy="-52" r="3.5" />
      <circle cx="-18" cy="-34" r="2" />
      <circle cx="-8" cy="-22" r="2" />
      <circle cx="14" cy="-26" r="2" />
    </svg>
  );
}

function Vine() {
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

function Swirl() {
  return (
    <svg viewBox="0 0 160 110" fill="none" stroke="#f6ecdc" strokeWidth="1.1">
      <path d="M2,6 C60,0 110,22 108,62 C106,92 66,96 62,70 C60,54 82,48 88,62" />
      <path d="M2,16 C54,12 98,30 98,62" />
      <circle cx="120" cy="22" r="2.4" />
      <circle cx="136" cy="40" r="1.8" />
      <circle cx="144" cy="62" r="1.4" />
    </svg>
  );
}

function StarShape() {
  return (
    <svg viewBox="-12 -12 24 24" fill="none" stroke="#f6ecdc" strokeWidth="1">
      <path d="M0,-11 L2.4,-2.4 L11,0 L2.4,2.4 L0,11 L-2.4,2.4 L-11,0 L-2.4,-2.4Z" />
    </svg>
  );
}

function Lotus() {
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
