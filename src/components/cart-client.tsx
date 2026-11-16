"use client";

import Link from "next/link";
import { BullionVisual } from "@/components/bullion-visual";
import { useCart } from "@/components/cart-provider";
import { formatUsd } from "@/lib/format";

export function CartClient() {
  const { items, subtotalCents, setQty, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-[family-name:var(--font-display)] text-3xl text-[#161616]">
          Your cart is empty
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block bg-[#111] px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white"
        >
          Browse bullion
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
      <ul className="divide-y divide-black/10 border-y border-black/10">
        {items.map((item) => (
          <li key={item.productId} className="flex gap-4 py-6">
            <div className="w-24 shrink-0">
              <BullionVisual imageKey={item.imageKey} />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row">
              <div>
                <Link
                  href={`/products/${item.slug}`}
                  className="font-[family-name:var(--font-brand)] text-sm font-semibold uppercase tracking-wide hover:text-[#8a7340]"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-[#666]">{formatUsd(item.unitPriceCents)} each</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => setQty(item.productId, Number(e.target.value) || 1)}
                  className="w-16 border border-black/15 px-2 py-1.5 text-center text-sm"
                />
                <p className="w-24 text-right font-[family-name:var(--font-display)] text-xl">
                  {formatUsd(item.unitPriceCents * item.quantity)}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="text-xs uppercase tracking-wider text-[#a14a3a]"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit border border-black/10 bg-white p-6">
        <h2 className="font-[family-name:var(--font-brand)] text-sm font-bold uppercase tracking-[0.16em]">
          Order summary
        </h2>
        <div className="mt-6 flex justify-between text-sm">
          <span className="text-[#666]">Subtotal</span>
          <span>{formatUsd(subtotalCents)}</span>
        </div>
        <p className="mt-2 text-xs text-[#888]">Shipping & insurance calculated at checkout.</p>
        <Link
          href="/checkout"
          className="mt-6 block bg-[#111] px-4 py-3 text-center text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#b8963e] hover:text-[#111]"
        >
          Checkout
        </Link>
      </aside>
    </div>
  );
}
