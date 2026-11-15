import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getCurrentCustomer } from "@/lib/auth";
import { formatSpot } from "@/lib/format";
import { priceCatalog } from "@/lib/products";

export const metadata = { title: "Bullion Catalog" };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string; q?: string }>;
}) {
  const params = await searchParams;
  const customer = await getCurrentCustomer();
  const accountType =
    customer?.account_type === "wholesale" && customer.dealer_status === "approved"
      ? "wholesale"
      : "retail";
  const { spot, isSample, products } = await priceCatalog(accountType, {
    form: params.form,
    q: params.q,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-black/10 pb-8">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#8a7340]">Catalog</p>
          <h1 className="mt-2 font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-wide text-[#161616]">
            Gold bullion
          </h1>
          <p className="mt-3 max-w-xl text-sm text-[#555]">
            Bars and coins priced at spot ({formatSpot(spot)}/oz
            {isSample ? ", sample" : ""}) plus published premiums
            {accountType === "wholesale" ? " · wholesale pricing active" : ""}.
          </p>
        </div>
        <form className="flex flex-wrap gap-2" action="/products" method="get">
          <input
            name="q"
            defaultValue={params.q}
            placeholder="Search products"
            className="min-w-[180px] border border-black/15 bg-white px-3 py-2 text-sm"
          />
          <select
            name="form"
            defaultValue={params.form ?? ""}
            className="border border-black/15 bg-white px-3 py-2 text-sm"
          >
            <option value="">All forms</option>
            <option value="bar">Bars</option>
            <option value="coin">Coins</option>
          </select>
          <button
            type="submit"
            className="bg-[#111] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white"
          >
            Filter
          </button>
        </form>
      </div>

      <div className="mt-4 flex gap-4 text-sm">
        <Link href="/products" className={!params.form ? "text-[#8a7340]" : "text-[#666]"}>
          All
        </Link>
        <Link
          href="/products?form=bar"
          className={params.form === "bar" ? "text-[#8a7340]" : "text-[#666]"}
        >
          Bars
        </Link>
        <Link
          href="/products?form=coin"
          className={params.form === "coin" ? "text-[#8a7340]" : "text-[#666]"}
        >
          Coins
        </Link>
      </div>

      <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="mt-16 text-center text-[#666]">No products match your filters.</p>
      )}
    </div>
  );
}
