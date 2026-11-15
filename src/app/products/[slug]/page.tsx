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
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16">
      <div className="overflow-hidden bg-[#14110e]">
        <BullionVisual imageKey={product.image_key} large className="w-full" />
      </div>
      <div className="flex flex-col justify-center lg:py-6">
        <Link
          href="/products"
          className="text-[0.68rem] uppercase tracking-[0.18em] text-[#a8893a] transition hover:text-[#141414]"
        >
          ← Catalog
        </Link>
        <h1 className="mt-5 font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-[0.04em] text-[#141414] sm:text-5xl">
          {product.name}
        </h1>
        <p className="mt-5 text-[1.02rem] leading-relaxed text-[#5c5c5c]">{product.description}</p>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-black/8 py-7 text-sm">
          <div>
            <dt className="section-label">Weight</dt>
            <dd className="mt-1.5 text-[#141414]">{formatOz(product.weight_oz)}</dd>
          </div>
          <div>
            <dt className="section-label">Purity</dt>
            <dd className="mt-1.5 text-[#141414]">{purityLabel(product.purity)}</dd>
          </div>
          <div>
            <dt className="section-label">Form</dt>
            <dd className="mt-1.5 capitalize text-[#141414]">{product.form}</dd>
          </div>
          <div>
            <dt className="section-label">Availability</dt>
            <dd className="mt-1.5 text-[#141414]">{product.stock_qty} in vault</dd>
          </div>
        </dl>

        <div className="mt-8">
          <p className="font-[family-name:var(--font-display)] text-5xl text-[#141414]">
            {formatUsd(priced.unitPriceCents)}
          </p>
          <p className="mt-3 text-sm text-[#6a6a6a]">
            Spot {formatSpot(spot.usd_per_oz)}/oz + ${priced.premiumPerOz.toFixed(0)}/oz{" "}
            {priced.pricingTier} premium
          </p>
        </div>

        <div className="mt-9">
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
