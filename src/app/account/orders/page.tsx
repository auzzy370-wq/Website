import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentCustomer } from "@/lib/auth";
import { formatUsd } from "@/lib/format";
import { listOrdersForCustomer } from "@/lib/orders";

export const metadata = { title: "Orders" };

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ placed?: string; status?: string }>;
}) {
  const customer = await getCurrentCustomer();
  const params = await searchParams;

  if (!customer) redirect("/login?next=/account/orders");

  const orders = await listOrdersForCustomer(customer.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      {params.placed && (
        <div className="mb-8 border border-[#a8893a]/35 bg-[#a8893a]/8 p-5">
          <p className="font-[family-name:var(--font-brand)] text-sm font-bold uppercase tracking-[0.14em] text-[#6b5520]">
            Order received
          </p>
          <p className="mt-2 text-[#6b5520]">
            Order <strong>{params.placed}</strong> is{" "}
            <strong>{params.status ?? "pending_payment"}</strong>. Payment capture and inventory
            reservation wait until a payment provider is connected.
          </p>
          <Link href="/products" className="mt-3 inline-block text-sm text-[#6b5520] underline">
            Continue shopping
          </Link>
        </div>
      )}

      <h1 className="font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-wide">
        Orders
      </h1>

      {orders.length === 0 ? (
        <p className="mt-6 text-[#666]">No orders yet.</p>
      ) : (
        <ul className="mt-8 divide-y divide-black/10 border-y border-black/10">
          {orders.map((o) => (
            <li key={o.id} className="flex justify-between gap-4 py-4 text-sm">
              <div>
                <p className="font-medium">{o.order_number}</p>
                <p className="text-[#666]">
                  {o.status}
                  {o.tracking_number ? ` · Tracking ${o.tracking_number}` : ""}
                </p>
              </div>
              <p>{formatUsd(Number(o.total_cents))}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
