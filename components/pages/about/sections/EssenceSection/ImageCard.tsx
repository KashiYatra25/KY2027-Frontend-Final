import Image from "next/image";

// ═══════════════════════════════════════════════════════════════════
// IMAGE CARD - Single marquee image card (mobile)
// ═══════════════════════════════════════════════════════════════════

export const ImageCard = ({ src, alt }: { src: string; alt: string }) => (
  <div
    className="relative h-36 w-56 flex-shrink-0 overflow-hidden rounded-2xl sm:h-56 sm:w-80"
    style={{
      background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)",
      border: "2px solid rgba(99, 102, 241, 0.2)",
    }}
  >
    <Image src={src} alt={alt} fill className="object-cover object-top" />
  </div>
);
