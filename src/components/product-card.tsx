import Link from "next/link";
import { BullionVisual } from "@/components/bullion-visual";
import { formatOz, formatUsd, purityLabel } from "@/lib/format";
import type { PricedProduct } from "@/lib/types";

export function ProductCard({ product }: { product: PricedProduct }) {
  const inStock = product.stock_qty > 0;
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a8893a]"
    >
      <div className="overflow-hidden">
        <BullionVisual
          imageKey={product.image_key}
          className="transition duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-110"
        />
      </div>
      <div className="mt-5 space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-[family-name:var(--font-brand)] text-[0.9rem] font-semibold uppercase tracking-[0.08em] text-[#141414] transition group-hover:text-[#8a6f28]">
            {product.name}
          </h3>
          <span
            className={`shrink-0 text-[0.62rem] uppercase tracking-[0.16em] ${inStock ? "text-[#5a6f48]" : "text-[#9a4a3a]"}`}
          >
            {inStock ? "Available" : "Sold out"}
          </span>
        </div>
        <p className="text-[0.85rem] text-[#6a6a6a]">
          {formatOz(product.weight_oz)} · {purityLabel(product.purity)} · {product.form}
        </p>
        <p className="font-[family-name:var(--font-display)] text-[1.85rem] leading-none text-[#141414]">
          {formatUsd(product.unitPriceCents)}
        </p>
        <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[#a8893a]">
          Spot + ${product.premiumPerOz.toFixed(0)}/oz{" "}
          {product.pricingTier === "wholesale" ? "wholesale" : "retail"}
        </p>
      </div>
    </Link>
  );
}
