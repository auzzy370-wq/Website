"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { formatUsd } from "@/lib/format";

export function AddToCart({
  productId,
  slug,
  name,
  weightOz,
  unitPriceCents,
  imageKey,
  maxQty,
}: {
  productId: string;
  slug: string;
  name: string;
  weightOz: number;
  unitPriceCents: number;
  imageKey: string;
  maxQty: number;
}) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (maxQty < 1) {
    return (
      <p className="border border-[#9a4a3a]/25 bg-[#9a4a3a]/5 px-4 py-3 text-sm text-[#9a4a3a]">
        Currently unavailable. Contact the desk for the next allocation.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="flex items-center gap-2 text-sm text-[#5c5c5c]">
        Qty
        <input
          type="number"
          min={1}
          max={maxQty}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Math.min(maxQty, Number(e.target.value) || 1)))}
          className="field w-16 text-center"
        />
      </label>
      <button
        type="button"
        onClick={() => {
          addItem({ productId, slug, name, weightOz, unitPriceCents, imageKey }, qty);
          setAdded(true);
          window.setTimeout(() => setAdded(false), 1600);
        }}
        className="btn-primary min-w-[11rem]"
      >
        {added ? "Added" : `Add · ${formatUsd(unitPriceCents * qty)}`}
      </button>
    </div>
  );
}
