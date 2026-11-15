import Link from "next/link";
import { DealerForm } from "@/components/dealer-form";
import { getCurrentCustomer } from "@/lib/auth";

export const metadata = { title: "Dealer & Wholesale" };

export default async function DealerPage() {
  const customer = await getCurrentCustomer();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#8a7340]">B2B</p>
      <h1 className="mt-2 font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-wide">
        Dealer & wholesale
      </h1>
      <p className="mt-4 max-w-2xl text-[#555]">
        Approved dealer accounts unlock wholesale premiums on the same catalog. Applications are
        reviewed by the Kananga desk before pricing unlocks.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          "Separate retail and wholesale premium schedules",
          "Approval workflow before wholesale unlock",
          "Same insured shipping options with dealer volumes",
        ].map((t) => (
          <div key={t} className="border border-black/10 p-5 text-sm leading-relaxed text-[#555]">
            {t}
          </div>
        ))}
      </div>

      {!customer ? (
        <p className="mt-10 text-[#555]">
          <Link href="/register" className="text-[#8a7340]">
            Create an account
          </Link>{" "}
          or{" "}
          <Link href="/login" className="text-[#8a7340]">
            sign in
          </Link>{" "}
          to apply for dealer pricing.
        </p>
      ) : customer.dealer_status === "approved" ? (
        <div className="mt-10 border border-[#5a7a45]/30 bg-[#5a7a45]/8 p-5 text-[#3d5530]">
          Wholesale pricing is active on your account
          {customer.company_name ? ` (${customer.company_name})` : ""}.
        </div>
      ) : customer.dealer_status === "pending" ? (
        <div className="mt-10 border border-[#b8963e]/40 bg-[#b8963e]/8 p-5 text-[#6b5520]">
          Your dealer application is pending review.
        </div>
      ) : (
        <DealerForm />
      )}
    </div>
  );
}
