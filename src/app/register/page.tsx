import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="mb-8 text-center font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-wide">
        Create account
      </h1>
      <AuthForm mode="register" />
    </div>
  );
}
