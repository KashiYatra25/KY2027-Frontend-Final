"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Package } from "lucide-react";
import { CartItem } from "@/components/pages/cart/components/CartItem";
import { COLORS } from "@/components/pages/cart/constants/palette";
import type { CartItemWithDetails } from "@/lib/api/helper/types";

interface CartSectionProps {
  items: CartItemWithDetails[];
  onRemove: (passId: string) => void;
  onUpdateQuantity: (passId: string, quantity: number) => void;
  removingId?: string | null;
  updatingQuantityId?: string | null;
}

export function CartSection({
  items,
  onRemove,
  onUpdateQuantity,
  removingId,
  updatingQuantityId,
}: CartSectionProps) {
  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD}15, ${COLORS.DARK_GOLD}25)`,
            border: `1px solid ${COLORS.GOLD}30`,
          }}
        >
          <Package className="h-5 w-5" style={{ color: COLORS.GOLD }} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Your Passes</h2>
          <p className="text-sm text-gray-400">
            {items.length} {items.length === 1 ? "pass" : "passes"} selected
          </p>
        </div>
      </div>

      {/* Cart items */}
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <motion.div
            key={item.passId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CartItem
              item={item}
              onRemove={onRemove}
              onUpdateQuantity={onUpdateQuantity}
              isRemoving={removingId === item.passId}
              isUpdatingQuantity={updatingQuantityId === item.passId}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
