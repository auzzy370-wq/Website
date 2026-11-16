import Link from "next/link";
import { DealerForm } from "@/components/dealer-form";
import { getCurrentCustomer } from "@/lib/auth";

export const metadata = { title: "Dealer & Wholesale" };

export default async function DealerPage() {
  const customer = await getCurrentCustomer();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="section-label">B2B</p>
      <h1 className="mt-3 font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-[0.04em] sm:text-5xl">
        Dealer & wholesale
      </h1>
      <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-[#5c5c5c]">
        Approved dealer accounts unlock wholesale premiums on the same catalog. Applications are
        reviewed by the Kananga desk before pricing unlocks.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          "Separate retail and wholesale premium schedules",
          "Approval workflow before wholesale unlock",
          "Same insured shipping options with dealer volumes",
        ].map((t) => (
          <div key={t} className="surface-panel p-6 text-sm leading-relaxed text-[#5c5c5c]">
            {t}
          </div>
        ))}
      </div>

      {!customer ? (
        <p className="mt-12 text-[#5c5c5c]">
          <Link href="/register" className="text-[#a8893a] underline-offset-4 hover:underline">
            Create an account
          </Link>{" "}
          or{" "}
          <Link href="/login" className="text-[#a8893a] underline-offset-4 hover:underline">
            sign in
          </Link>{" "}
          to apply for dealer pricing.
        </p>
      ) : customer.dealer_status === "approved" ? (
        <div className="mt-12 border border-[#5a6f48]/25 bg-[#5a6f48]/8 p-6 text-[#3d5530]">
          Wholesale pricing is active on your account
          {customer.company_name ? ` (${customer.company_name})` : ""}.
        </div>
      ) : customer.dealer_status === "pending" ? (
        <div className="mt-12 border border-[#a8893a]/35 bg-[#a8893a]/8 p-6 text-[#6b5520]">
          Your dealer application is pending review.
        </div>
      ) : (
        <DealerForm />
      )}
    </div>
  );
}
