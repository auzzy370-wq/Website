import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { BullionVisual } from "@/components/bullion-visual";
import { getCurrentCustomer } from "@/lib/auth";
import { formatOz, formatSpot, formatUsd, purityLabel } from "@/lib/format";
import { getGoldSpot } from "@/lib/gold-price";
import { priceProduct } from "@/lib/pricing";
import { getProductBySlug } from "@/lib/products";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const customer = await getCurrentCustomer();
  const accountType =
    customer?.account_type === "wholesale" && customer.dealer_status === "approved"
      ? "wholesale"
      : "retail";
  const spot = await getGoldSpot();
  const priced = priceProduct(product, spot.usd_per_oz, accountType);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
      <BullionVisual imageKey={product.image_key} large className="w-full" />
      <div className="flex flex-col justify-center">
        <Link
          href="/products"
          className="text-[0.7rem] uppercase tracking-[0.16em] text-[#8a7340] hover:text-[#161616]"
        >
          ← Catalog
        </Link>
        <h1 className="mt-4 font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-wide text-[#161616]">
          {product.name}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#555]">{product.description}</p>

        <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-black/10 py-6 text-sm">
          <div>
            <dt className="text-[0.65rem] uppercase tracking-[0.14em] text-[#8a7340]">Weight</dt>
            <dd className="mt-1 text-[#161616]">{formatOz(product.weight_oz)}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem] uppercase tracking-[0.14em] text-[#8a7340]">Purity</dt>
            <dd className="mt-1 text-[#161616]">{purityLabel(product.purity)}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem] uppercase tracking-[0.14em] text-[#8a7340]">Form</dt>
            <dd className="mt-1 capitalize text-[#161616]">{product.form}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem] uppercase tracking-[0.14em] text-[#8a7340]">Stock</dt>
            <dd className="mt-1 text-[#161616]">{product.stock_qty} available</dd>
          </div>
        </dl>

        <div className="mt-6">
          <p className="font-[family-name:var(--font-display)] text-4xl text-[#161616]">
            {formatUsd(priced.unitPriceCents)}
          </p>
          <p className="mt-2 text-sm text-[#666]">
            Based on spot {formatSpot(spot.usd_per_oz)}/oz + ${priced.premiumPerOz.toFixed(0)}/oz{" "}
            {priced.pricingTier} premium
            {spot.is_sample ? " (sample spot)" : ""}.
          </p>
        </div>

        <div className="mt-8">
          <AddToCart
            productId={priced.id}
            slug={priced.slug}
            name={priced.name}
            weightOz={priced.weight_oz}
            unitPriceCents={priced.unitPriceCents}
            imageKey={priced.image_key}
            maxQty={priced.stock_qty}
          />
        </div>
      </div>
    </div>
  );
}
