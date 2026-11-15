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
      <p className="rounded-sm border border-[#a14a3a]/30 bg-[#a14a3a]/5 px-4 py-3 text-sm text-[#a14a3a]">
        Currently out of stock. Check back soon or contact the desk for allocation.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="flex items-center gap-2 text-sm text-[#555]">
        Qty
        <input
          type="number"
          min={1}
          max={maxQty}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Math.min(maxQty, Number(e.target.value) || 1)))}
          className="w-16 border border-black/15 bg-white px-2 py-2 text-center text-[#111]"
        />
      </label>
      <button
        type="button"
        onClick={() => {
          addItem({ productId, slug, name, weightOz, unitPriceCents, imageKey }, qty);
          setAdded(true);
          window.setTimeout(() => setAdded(false), 1600);
        }}
        className="bg-[#111] px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#f5f2ea] transition hover:bg-[#b8963e] hover:text-[#111]"
      >
        {added ? "Added" : `Add · ${formatUsd(unitPriceCents * qty)}`}
      </button>
    </div>
  );
}
