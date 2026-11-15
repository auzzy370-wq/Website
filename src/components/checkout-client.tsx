"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { SHIPPING_OPTIONS } from "@/lib/catalog";
import { formatUsd } from "@/lib/format";

export function CheckoutClient({
  defaultEmail,
  defaultName,
}: {
  defaultEmail?: string;
  defaultName?: string;
}) {
  const { items, subtotalCents, clear } = useCart();
  const router = useRouter();
  const [methodId, setMethodId] = useState<string>(SHIPPING_OPTIONS[0].id);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalOz = useMemo(
    () => items.reduce((s, i) => s + i.weightOz * i.quantity, 0),
    [items],
  );
  const method = SHIPPING_OPTIONS.find((m) => m.id === methodId) ?? SHIPPING_OPTIONS[0];
  const shippingCents = Math.round(method.baseCents + method.perOzCents * totalOz);
  const insuranceCents = Math.round(subtotalCents * method.insuranceRate);
  const totalCents = subtotalCents + shippingCents + insuranceCents;

  if (items.length === 0) {
    return <p className="text-[#666]">Your cart is empty. Add bullion before checking out.</p>;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          fullName: form.get("fullName"),
          shippingMethodId: methodId,
          address: {
            line1: form.get("line1"),
            line2: form.get("line2") || undefined,
            city: form.get("city"),
            region: form.get("region"),
            postal: form.get("postal"),
            country: form.get("country"),
          },
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = (await res.json()) as { error?: string; orderNumber?: string };
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      clear();
      router.push(`/account/orders?placed=${data.orderNumber}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-4">
        <h2 className="font-[family-name:var(--font-brand)] text-sm font-bold uppercase tracking-[0.16em]">
          Contact & delivery
        </h2>
        <input
          name="fullName"
          required
          defaultValue={defaultName}
          placeholder="Full name"
          className="w-full border border-black/15 px-3 py-2.5"
        />
        <input
          name="email"
          type="email"
          required
          defaultValue={defaultEmail}
          placeholder="Email"
          className="w-full border border-black/15 px-3 py-2.5"
        />
        <input
          name="line1"
          required
          placeholder="Address line 1"
          className="w-full border border-black/15 px-3 py-2.5"
        />
        <input
          name="line2"
          placeholder="Address line 2"
          className="w-full border border-black/15 px-3 py-2.5"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            name="city"
            required
            placeholder="City"
            className="border border-black/15 px-3 py-2.5"
          />
          <input
            name="region"
            required
            placeholder="State / region"
            className="border border-black/15 px-3 py-2.5"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            name="postal"
            required
            placeholder="Postal code"
            className="border border-black/15 px-3 py-2.5"
          />
          <input
            name="country"
            required
            defaultValue="US"
            placeholder="Country"
            className="border border-black/15 px-3 py-2.5"
          />
        </div>

        <h2 className="pt-4 font-[family-name:var(--font-brand)] text-sm font-bold uppercase tracking-[0.16em]">
          Shipping & insurance
        </h2>
        <div className="space-y-2">
          {SHIPPING_OPTIONS.map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer gap-3 border p-3 ${methodId === opt.id ? "border-[#b8963e] bg-[#b8963e]/5" : "border-black/10"}`}
            >
              <input
                type="radio"
                name="shipping"
                checked={methodId === opt.id}
                onChange={() => setMethodId(opt.id)}
              />
              <span>
                <span className="block text-sm font-medium">{opt.name}</span>
                <span className="text-xs text-[#666]">{opt.description}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <aside className="h-fit border border-black/10 bg-white p-6">
        <h2 className="font-[family-name:var(--font-brand)] text-sm font-bold uppercase tracking-[0.16em]">
          Payment
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#666]">
          Checkout uses a mock payment provider until a bullion-approved merchant account is
          connected (Stripe or equivalent). No real charges are made.
        </p>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-[#666]">Subtotal</dt>
            <dd>{formatUsd(subtotalCents)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#666]">Shipping</dt>
            <dd>{formatUsd(shippingCents)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#666]">Insurance</dt>
            <dd>{formatUsd(insuranceCents)}</dd>
          </div>
          <div className="flex justify-between border-t border-black/10 pt-3 text-base font-semibold">
            <dt>Total</dt>
            <dd className="font-[family-name:var(--font-display)] text-2xl">
              {formatUsd(totalCents)}
            </dd>
          </div>
        </dl>
        {error && <p className="mt-4 text-sm text-[#a14a3a]">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full bg-[#111] px-4 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white disabled:opacity-60"
        >
          {busy ? "Placing order…" : "Place order"}
        </button>
      </aside>
    </form>
  );
}
