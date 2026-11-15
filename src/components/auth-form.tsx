"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload =
      mode === "login"
        ? { email: form.get("email"), password: form.get("password") }
        : {
            email: form.get("email"),
            password: form.get("password"),
            fullName: form.get("fullName"),
            phone: form.get("phone") || undefined,
          };
    try {
      const res = await fetch(mode === "login" ? "/api/auth/login" : "/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Request failed");
      router.push("/account");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-4">
      {mode === "register" && (
        <>
          <input
            name="fullName"
            required
            placeholder="Full name"
            className="w-full border border-black/15 px-3 py-2.5"
          />
          <input
            name="phone"
            placeholder="Phone (optional)"
            className="w-full border border-black/15 px-3 py-2.5"
          />
        </>
      )}
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="w-full border border-black/15 px-3 py-2.5"
      />
      <input
        name="password"
        type="password"
        required
        minLength={8}
        placeholder="Password"
        className="w-full border border-black/15 px-3 py-2.5"
      />
      {error && <p className="text-sm text-[#a14a3a]">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="w-full bg-[#111] px-4 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white disabled:opacity-60"
      >
        {busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
      </button>
      <p className="text-center text-sm text-[#666]">
        {mode === "login" ? (
          <>
            New here?{" "}
            <Link href="/register" className="text-[#8a7340]">
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-[#8a7340]">
              Sign in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
