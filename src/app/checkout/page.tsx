import { CheckoutClient } from "@/components/checkout-client";
import { getCurrentCustomer } from "@/lib/auth";

export const metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  const customer = await getCurrentCustomer();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-wide">
        Checkout
      </h1>
      <CheckoutClient defaultEmail={customer?.email} defaultName={customer?.full_name} />
    </div>
  );
}
