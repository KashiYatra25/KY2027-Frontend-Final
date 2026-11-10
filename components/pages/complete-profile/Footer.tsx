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
      <div className="mt-6 flex flex-col items-center gap-2">
        <a
          href="https://rudrasec.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row items-center justify-center gap-3 transition-opacity hover:opacity-80"
        >
          <Image
            src="/security/RTSf_logo.png"
            alt="RTS Security"
            width={28}
            height={28}
            className="object-contain"
          />
          <span
            className="flex items-center gap-2 text-xs tracking-wider"
            style={{ color: `${COLORS.GOLD}50` }}
          >
            <svg
              className="h-3.5 w-3.5 animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Secured by <span className="font-bold">RTS</span>
          </span>
        </a>
        <a
          href="https://rudrasec.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-wider underline underline-offset-2 transition-opacity hover:opacity-80"
          style={{ color: `${COLORS.GOLD}50` }}
        >
          rudrasec.in
        </a>
      </div>
    </>
  );
};

export default Footer;
