"use client";

import { CheckCircle } from "lucide-react";

interface AddToCartSuccessToastProps {
  passName?: string;
}

export function AddToCartSuccessToast({ passName }: AddToCartSuccessToastProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20">
        <CheckCircle className="h-5 w-5 text-green-400" />
      </div>
      <div>
        <p className="font-semibold text-white">Added to cart</p>
        <p className="text-sm text-neutral-400">
          {passName ? `${passName} pass added` : "Pass added successfully"}
        </p>
      </div>
    </div>
  );
}
