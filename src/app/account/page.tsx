import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentCustomer, logoutCustomer } from "@/lib/auth";
import { formatUsd } from "@/lib/format";
import { listOrdersForCustomer } from "@/lib/orders";

export const metadata = { title: "Account" };

async function logoutAction() {
  "use server";
  await logoutCustomer();
  redirect("/");
}

export default async function AccountPage() {
  const customer = await getCurrentCustomer();
  if (!customer) redirect("/login");
  const orders = await listOrdersForCustomer(customer.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-wide">
            Account
          </h1>
          <p className="mt-2 text-[#555]">
            {customer.full_name} · {customer.email}
          </p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="border border-black/15 px-4 py-2 text-[0.7rem] uppercase tracking-[0.14em]"
          >
            Sign out
          </button>
        </form>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="border border-black/10 p-5">
          <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[#8a7340]">Account type</p>
          <p className="mt-2 capitalize">{customer.account_type}</p>
        </div>
        <div className="border border-black/10 p-5">
          <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[#8a7340]">Dealer status</p>
          <p className="mt-2 capitalize">{customer.dealer_status}</p>
          {customer.dealer_status === "none" && (
            <Link href="/dealer" className="mt-2 inline-block text-sm text-[#8a7340]">
              Apply for wholesale →
            </Link>
          )}
        </div>
        <div className="border border-black/10 p-5">
          <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[#8a7340]">Company</p>
          <p className="mt-2">{customer.company_name || "—"}</p>
        </div>
      </div>

      <h2 className="mt-14 font-[family-name:var(--font-brand)] text-sm font-bold uppercase tracking-[0.16em]">
        Order history
      </h2>
      {orders.length === 0 ? (
        <p className="mt-4 text-[#666]">No orders yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-black/10 border-y border-black/10">
          {orders.map((o) => (
            <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 py-4 text-sm">
              <div>
                <p className="font-medium">{o.order_number}</p>
                <p className="text-[#666]">
                  {new Date(o.created_at).toLocaleString("en-US", {
                    timeZone: "America/New_York",
                  })}{" "}
                  ET · {o.status}
                  {o.tracking_number ? ` · ${o.tracking_number}` : ""}
                </p>
              </div>
              <p className="font-[family-name:var(--font-display)] text-xl">
                {formatUsd(Number(o.total_cents))}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
