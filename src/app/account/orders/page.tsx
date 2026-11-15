import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentCustomer } from "@/lib/auth";
import { formatUsd } from "@/lib/format";
import { listOrdersForCustomer } from "@/lib/orders";

export const metadata = { title: "Orders" };

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ placed?: string }>;
}) {
  const customer = await getCurrentCustomer();
  const params = await searchParams;

  if (!customer && !params.placed) redirect("/login");

  const orders = customer ? await listOrdersForCustomer(customer.id) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      {params.placed && (
        <div className="mb-8 border border-[#5a7a45]/30 bg-[#5a7a45]/8 p-5">
          <p className="font-[family-name:var(--font-brand)] text-sm font-bold uppercase tracking-[0.14em] text-[#3d5530]">
            Order confirmed
          </p>
          <p className="mt-2 text-[#3d5530]">
            Order <strong>{params.placed}</strong> is paid (mock provider). A confirmation email
            would be sent in production.
          </p>
          <Link href="/products" className="mt-3 inline-block text-sm text-[#3d5530] underline">
            Continue shopping
          </Link>
        </div>
      )}

      <h1 className="font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-wide">
        Orders
      </h1>

      {!customer ? (
        <p className="mt-6 text-[#666]">
          Guest checkout complete.{" "}
          <Link href="/register" className="text-[#8a7340]">
            Create an account
          </Link>{" "}
          to track future orders.
        </p>
      ) : orders.length === 0 ? (
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
