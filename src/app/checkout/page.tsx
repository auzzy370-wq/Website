import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckoutClient } from "@/components/checkout-client";
import { getCurrentCustomer } from "@/lib/auth";

export const metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  const customer = await getCurrentCustomer();
  if (!customer) {
    redirect("/login?next=/checkout");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-wide">
        Checkout
      </h1>
      <p className="mb-6 text-sm text-[#5c5c5c]">
        Signed in as {customer.email}.{" "}
        <Link href="/account" className="text-[#a8893a] underline-offset-4 hover:underline">
          Account
        </Link>
      </p>
      <CheckoutClient defaultEmail={customer.email} defaultName={customer.full_name} />
    </div>
  );
}
