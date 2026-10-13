"use client";

import { memo } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";

export const BanarasMaleDancer = memo(function BanarasMaleDancer() {
  return (
    <div className="pointer-events-none absolute bottom-[146px] left-[-1%] z-[35] hidden h-[650px] w-[450px] sm:block">
      <Image
        src={IMAGES.vibes.banarasMaleDancer}
        alt="Banarasi male dancer"
        fill
        className="object-contain object-bottom"
        style={{ filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.6))" }}
      />
    </div>
  );
});
