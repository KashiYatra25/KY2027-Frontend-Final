"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trash2, Loader2, Minus, Plus } from "lucide-react";
import { COLORS, GRADIENTS } from "@/components/pages/cart/constants/palette";
import type { CartItemWithDetails } from "@/lib/api/helper/types";

interface CartItemProps {
  item: CartItemWithDetails;
  onRemove: (passId: string) => void;
  onUpdateQuantity: (passId: string, quantity: number) => void;
  isRemoving?: boolean;
  isUpdatingQuantity?: boolean;
}

/**
 * Individual cart item display with pass details, quantity controls, 3D tilt effect, and remove action
 */
export function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
  isRemoving,
  isUpdatingQuantity,
}: CartItemProps) {
  const total = item.price * item.quantity;
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // 3D Tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleIncrement = () => {
    if (item.quantity < 50) {
      onUpdateQuantity(item.passId, item.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.passId, item.quantity - 1);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: 1,
        x: 0,
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: tilt.rotateX !== 0 || tilt.rotateY !== 0 ? 1.02 : 1,
      }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-2xl"
      style={{
        background: GRADIENTS.CARD_BG,
        border: `1px solid ${item.accentColor || COLORS.GOLD}30`,
        boxShadow: `0 4px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 ${COLORS.GOLD}10`,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease",
      }}
    >
      {/* Corner flourishes */}
      <div className="absolute top-0 left-0 h-8 w-8 opacity-30">
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M0 0 L12 0 L12 2 L2 2 L2 12 L0 12 Z" fill={item.accentColor || COLORS.GOLD} />
        </svg>
      </div>
      <div className="absolute right-0 bottom-0 h-8 w-8 rotate-180 opacity-30">
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M0 0 L12 0 L12 2 L2 2 L2 12 L0 12 Z" fill={item.accentColor || COLORS.GOLD} />
        </svg>
      </div>

      {/* Top accent gradient line */}
      <div
        className="absolute top-0 right-0 left-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent 10%, ${item.accentColor || COLORS.GOLD} 50%, transparent 90%)`,
        }}
      />

      {/* Hover glow effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at center, ${item.accentColor || COLORS.GOLD}08 0%, transparent 70%)`,
        }}
      />

      <div className="relative flex gap-4 p-5">
        {/* Pass image with decorative frame */}
        <div className="relative flex-shrink-0">
          {/* Decorative frame */}
          <div
            className="absolute -inset-1 rounded-xl opacity-50"
            style={{
              background: `linear-gradient(135deg, ${item.accentColor || COLORS.GOLD}40, transparent, ${item.accentColor || COLORS.GOLD}20)`,
            }}
          />
          <div
            className="relative h-28 w-24 overflow-hidden rounded-lg"
            style={{
              background: "linear-gradient(135deg, rgba(20, 10, 30, 0.9), rgba(30, 15, 40, 0.9))",
              border: `2px solid ${item.accentColor || COLORS.GOLD}40`,
              boxShadow: `0 0 20px ${item.accentColor || COLORS.GOLD}20`,
            }}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain p-2"
              sizes="96px"
            />
          </div>
        </div>

        {/* Pass details */}
        <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
          <div>
            <h3
              className="mb-1 truncate text-lg font-bold"
              style={{
                color: item.accentColor || COLORS.GOLD,
                textShadow: `0 0 20px ${item.accentColor || COLORS.GOLD}30`,
              }}
            >
              {item.name}
            </h3>
            <p className="line-clamp-2 text-sm text-gray-400">{item.tagline}</p>
          </div>

          {/* Quantity controls and price */}
          <div className="mt-3 flex items-end justify-between">
            {/* Quantity stepper */}
            <div
              className="flex items-center gap-1 rounded-full"
              style={{
                background: `${item.accentColor || COLORS.GOLD}10`,
                border: `1px solid ${item.accentColor || COLORS.GOLD}30`,
              }}
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDecrement();
                }}
                disabled={item.quantity <= 1 || isUpdatingQuantity}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus className="h-3.5 w-3.5 text-gray-300" />
              </motion.button>

              <div className="relative min-w-[40px] text-center">
                {isUpdatingQuantity ? (
                  <Loader2 className="mx-auto h-4 w-4 animate-spin text-amber-400" />
                ) : (
                  <span className="text-sm font-semibold text-white">{item.quantity}</span>
                )}
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncrement();
                }}
                disabled={item.quantity >= 50 || isUpdatingQuantity}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="h-3.5 w-3.5 text-gray-300" />
              </motion.button>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500">₹{item.price.toLocaleString()} each</div>
              <div
                className="text-xl font-bold"
                style={{
                  color: item.accentColor || COLORS.GOLD,
                  textShadow: `0 0 15px ${item.accentColor || COLORS.GOLD}40`,
                }}
              >
                ₹{total.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Remove button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(item.passId)}
          disabled={isRemoving}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-all hover:bg-red-500/20 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {isRemoving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </motion.button>
      </div>

      {/* Bottom decorative line */}
      <div
        className="absolute right-4 bottom-0 left-4 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${item.accentColor || COLORS.GOLD}20, transparent)`,
        }}
      />
    </motion.div>
  );
}
