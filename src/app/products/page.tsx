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
  const { spot, products } = await priceCatalog(accountType, {
    form: params.form,
    q: params.q,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-8 border-b border-black/8 pb-10">
        <div>
          <p className="section-label">Catalog</p>
          <h1 className="mt-3 font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-[0.04em] text-[#141414] sm:text-5xl">
            Gold bullion
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5c5c5c]">
            Bars and coins priced at {formatSpot(spot)}/oz spot plus published premiums
            {accountType === "wholesale" ? " · wholesale pricing active" : ""}.
          </p>
        </div>
        <form className="flex flex-wrap gap-2" action="/products" method="get">
          <input
            name="q"
            defaultValue={params.q}
            placeholder="Search products"
            className="field min-w-[200px]"
          />
          <select name="form" defaultValue={params.form ?? ""} className="field w-auto">
            <option value="">All forms</option>
            <option value="bar">Bars</option>
            <option value="coin">Coins</option>
          </select>
          <button type="submit" className="btn-primary">
            Filter
          </button>
        </form>
      </div>

      <div className="mt-6 flex gap-6 text-[0.72rem] font-semibold uppercase tracking-[0.16em]">
        <Link
          href="/products"
          className={!params.form ? "text-[#a8893a]" : "text-[#6a6a6a] hover:text-[#141414]"}
        >
          All
        </Link>
        <Link
          href="/products?form=bar"
          className={
            params.form === "bar" ? "text-[#a8893a]" : "text-[#6a6a6a] hover:text-[#141414]"
          }
        >
          Bars
        </Link>
        <Link
          href="/products?form=coin"
          className={
            params.form === "coin" ? "text-[#a8893a]" : "text-[#6a6a6a] hover:text-[#141414]"
          }
        >
          Coins
        </Link>
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="mt-20 text-center text-[#6a6a6a]">No products match your filters.</p>
      )}
    </div>
  );
}
