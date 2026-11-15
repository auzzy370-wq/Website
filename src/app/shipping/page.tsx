import { SHIPPING_OPTIONS } from "@/lib/catalog";

export const metadata = { title: "Shipping & Insurance" };

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-wide">
        Shipping & insurance
      </h1>
      <p className="mt-4 text-[#555]">
        Fulfillment options below map to the checkout workflow. Live carrier APIs and insurance
        certificates activate once the preferred provider credentials are supplied.
      </p>
      <ul className="mt-10 space-y-4">
        {SHIPPING_OPTIONS.map((opt) => (
          <li key={opt.id} className="border border-black/10 p-5">
            <h2 className="font-[family-name:var(--font-brand)] text-sm font-bold uppercase tracking-[0.14em]">
              {opt.name}
            </h2>
            <p className="mt-2 text-sm text-[#555]">{opt.description}</p>
            <p className="mt-2 text-xs text-[#888]">
              Base ${(opt.baseCents / 100).toFixed(2)}
              {opt.perOzCents > 0 ? ` + $${(opt.perOzCents / 100).toFixed(2)}/oz` : ""}
              {opt.insuranceRate > 0
                ? ` · insurance ~${(opt.insuranceRate * 100).toFixed(1)}% of subtotal`
                : ""}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
