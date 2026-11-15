import Link from "next/link";
import { BullionVisual } from "@/components/bullion-visual";
import { formatOz, formatUsd, purityLabel } from "@/lib/format";
import type { PricedProduct } from "@/lib/types";

export function ProductCard({ product }: { product: PricedProduct }) {
  const inStock = product.stock_qty > 0;
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b8963e]"
    >
      <BullionVisual
        imageKey={product.image_key}
        className="transition duration-500 group-hover:brightness-110"
      />
      <div className="mt-4 space-y-1.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-[family-name:var(--font-brand)] text-[0.95rem] font-semibold uppercase tracking-[0.06em] text-[#161616]">
            {product.name}
          </h3>
          <span
            className={`shrink-0 text-[0.65rem] uppercase tracking-[0.14em] ${inStock ? "text-[#5a7a45]" : "text-[#a14a3a]"}`}
          >
            {inStock ? "In stock" : "Sold out"}
          </span>
        </div>
        <p className="text-sm text-[#666]">
          {formatOz(product.weight_oz)} · {purityLabel(product.purity)} fine · {product.form}
        </p>
        <p className="font-[family-name:var(--font-display)] text-2xl text-[#161616]">
          {formatUsd(product.unitPriceCents)}
        </p>
        <p className="text-xs uppercase tracking-[0.12em] text-[#8a7340]">
          Spot + ${product.premiumPerOz.toFixed(0)}/oz{" "}
          {product.pricingTier === "wholesale" ? "wholesale" : "retail"} premium
        </p>
      </div>
    </Link>
  );
}
