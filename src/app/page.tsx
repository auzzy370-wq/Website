import Link from "next/link";
import { BullionVisual } from "@/components/bullion-visual";
import { ProductCard } from "@/components/product-card";
import { getCurrentCustomer } from "@/lib/auth";
import { formatSpot } from "@/lib/format";
import { priceCatalog } from "@/lib/products";

export default async function HomePage() {
  const customer = await getCurrentCustomer();
  const accountType =
    customer?.account_type === "wholesale" && customer.dealer_status === "approved"
      ? "wholesale"
      : "retail";
  const { spot, products } = await priceCatalog(accountType, { featured: true });
  const featured = products.slice(0, 4);

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="hero-stage absolute inset-0" />
        <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
          <BullionVisual imageKey="bar-1kg" hero className="opacity-95" />
        </div>
        <div className="hero-scrim absolute inset-0" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:justify-center lg:pb-24">
          <p className="eyebrow animate-rise text-xl sm:text-2xl">Africa&apos;s Mining Experts</p>
          <h1 className="animate-rise-delay mt-3 max-w-xl font-[family-name:var(--font-brand)] text-[clamp(2.6rem,7vw,4.8rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.02em] text-[#f7f3ea]">
            Kananga
            <br />
            Mining Group
          </h1>
          <div className="rule-draw mt-6 h-px w-28 bg-[#d4af37]" />
          <p className="animate-rise-delay-2 mt-6 max-w-md text-[1.05rem] leading-relaxed text-[#d5cdb8]">
            Physical gold bullion priced from live spot — bars and coins, insured delivery, and
            approved wholesale accounts.
          </p>
          <div className="animate-rise-delay-2 mt-9 flex flex-wrap items-center gap-3">
            <Link href="/products" className="btn-gold">
              Shop bullion
            </Link>
            <Link href="/dealer" className="btn-ghost">
              Dealer access
            </Link>
          </div>
          <div className="animate-rise-delay-3 mt-12 flex items-end gap-8 border-t border-white/10 pt-6">
            <div>
              <p className="section-label text-[#e8d5a3]">Gold spot</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-4xl text-[#f7f3ea] sm:text-5xl">
                {formatSpot(spot)}
                <span className="ml-2 text-base text-[#9a9386]">/oz</span>
              </p>
            </div>
            <p className="mb-1 max-w-[14rem] text-xs leading-relaxed text-[#9a9386]">
              Transparent spot-plus-premium pricing on every SKU.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-label">Featured allocation</p>
            <h2 className="mt-3 font-[family-name:var(--font-brand)] text-3xl font-bold uppercase tracking-[0.04em] text-[#141414] sm:text-4xl">
              Selected bullion
            </h2>
          </div>
          <Link
            href="/products"
            className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#a8893a] transition hover:text-[#141414]"
          >
            View full catalog →
          </Link>
        </div>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="border-y border-black/6 bg-[#ebe9e4]/70">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-3 md:gap-10">
          {[
            {
              title: "Spot + premium",
              body: "Every SKU prices from gold spot plus a published retail or wholesale premium — clear, auditable markups.",
            },
            {
              title: "Insured fulfillment",
              body: "Express and standard shipping with insurance workflows aligned to vaulting and delivery policy.",
            },
            {
              title: "Dealer desks",
              body: "Approved wholesale accounts unlock tighter premiums and dedicated order handling.",
            },
          ].map((item, i) => (
            <div key={item.title} className="relative md:pl-0">
              <p className="font-[family-name:var(--font-display)] text-5xl text-[#a8893a]/25">
                0{i + 1}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-brand)] text-sm font-bold uppercase tracking-[0.18em] text-[#141414]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5c5c5c]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
