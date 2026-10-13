"use client";

import { memo } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";

export const BanarasFemaleDancer = memo(function BanarasFemaleDancer() {
  return (
    <div className="pointer-events-none absolute right-[-0%] bottom-[148px] z-[35] hidden h-[600px] w-[400px] sm:block">
      <Image
        src={IMAGES.vibes.banarasFemaleDancer}
        alt="Banarasi female dancer"
        fill
        className="object-contain object-bottom"
        style={{ filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.6))" }}
      />
    </div>
  );
});
