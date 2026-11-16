import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="mb-8 text-center font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-wide">
        Sign in
      </h1>
      <Suspense fallback={<p className="text-center text-sm text-[#666]">Loading…</p>}>
        <AuthForm mode="login" />
      </Suspense>
    </div>
  );
}
