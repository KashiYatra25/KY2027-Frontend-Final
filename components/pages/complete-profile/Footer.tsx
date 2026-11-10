import React from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { COLORS } from "./constants/palette";

const Footer = () => {
  return (
    <>
      <div className="mt-10 flex items-center justify-center gap-4">
        <div
          className="h-px w-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}40)`,
          }}
        />
        <div className="relative h-7 w-7">
          <Image
            src={IMAGES.contact.floatingDiya}
            alt=""
            width={28}
            height={28}
            className="object-contain"
          />
        </div>
        <div
          className="h-px w-20"
          style={{
            background: `linear-gradient(90deg, ${COLORS.GOLD}40, transparent)`,
          }}
        />
      </div>
      <p
        className="mt-3 text-center text-xs tracking-widest uppercase"
        style={{ color: `${COLORS.GOLD}50` }}
      >
        Your data is secure and encrypted
      </p>

      {/* Security Badge - Secured by RTS */}
      <a
        href="https://rudrasec.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex flex-col items-center gap-2 transition-opacity hover:opacity-80"
      >
        <Image
          src="/security/RTSf_logo.png"
          alt="RTS Security"
          width={40}
          height={40}
          className="object-contain"
        />
        <span className="text-xs tracking-wider" style={{ color: `${COLORS.GOLD}50` }}>
          Secured by RTS
        </span>
      </a>
    </>
  );
};

export default Footer;
