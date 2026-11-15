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
  const { spot, isSample, products } = await priceCatalog(accountType, { featured: true });
  const featured = products.slice(0, 4);

  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden">
        <div className="hero-grain absolute inset-0" />
        <div className="absolute inset-y-0 right-0 hidden w-[48%] lg:block">
          <BullionVisual imageKey="bar-1kg" large className="h-full w-full rounded-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b09] via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6">
          <p className="animate-rise font-[family-name:var(--font-display)] text-xl italic text-[#d4af37] sm:text-2xl">
            Africa&apos;s Mining Experts
          </p>
          <h1 className="animate-rise-delay mt-3 max-w-xl font-[family-name:var(--font-brand)] text-5xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-[#f5f2ea] sm:text-6xl md:text-7xl">
            Kananga
            <br />
            Mining Group
          </h1>
          <p className="animate-rise-delay-2 mt-6 max-w-md text-base leading-relaxed text-[#cfc6b4] sm:text-lg">
            Physical gold bullion priced from live spot — bars and coins, insured delivery, and
            approved wholesale accounts.
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="bg-[#d4af37] px-7 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[#111] transition hover:bg-[#f0d78c]"
            >
              Shop bullion
            </Link>
            <Link
              href="/dealer"
              className="border border-[#d4af37]/40 px-7 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[#f5f2ea] transition hover:border-[#d4af37] hover:text-[#d4af37]"
            >
              Dealer access
            </Link>
          </div>
          <div className="animate-rise-delay-2 mt-10 flex items-end gap-6">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[#8a7340]">Gold spot</p>
              <p className="font-[family-name:var(--font-display)] text-4xl text-[#f5f2ea]">
                {formatSpot(spot)}
                <span className="ml-2 text-base text-[#9a9386]">/oz</span>
              </p>
              {isSample && (
                <p className="mt-1 text-xs text-[#8a7340]">Sample spot data until API key is set</p>
              )}
            </div>
            <div className="pulse-rule mb-2 h-px w-24 bg-[#d4af37]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#8a7340]">Featured</p>
            <h2 className="mt-2 font-[family-name:var(--font-brand)] text-3xl font-bold uppercase tracking-wide text-[#161616]">
              Selected bullion
            </h2>
          </div>
          <Link
            href="/products"
            className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#8a7340] hover:text-[#161616]"
          >
            View full catalog →
          </Link>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="border-y border-black/8 bg-[#ecece8]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3">
          {[
            {
              title: "Spot + premium",
              body: "Every SKU prices from gold spot plus a published retail or wholesale premium — no opaque markups.",
            },
            {
              title: "Insured fulfillment",
              body: "Express and standard shipping with insurance workflows aligned to your vaulting and delivery policy.",
            },
            {
              title: "Dealer desks",
              body: "Approved wholesale accounts unlock tighter premiums and dedicated order handling.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-[family-name:var(--font-brand)] text-sm font-bold uppercase tracking-[0.16em] text-[#161616]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#555]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
