import { CartClient } from "@/components/cart-client";

export const metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-wide">
        Cart
      </h1>
      <CartClient />
    </div>
  );
}
