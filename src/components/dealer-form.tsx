"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DealerForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/dealer/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          companyName: form.get("companyName"),
          taxId: form.get("taxId") || undefined,
          website: form.get("website") || undefined,
          notes: form.get("notes") || undefined,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Application failed");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Application failed");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 max-w-lg space-y-3">
      <input name="companyName" required placeholder="Company name" className="field" />
      <input name="taxId" placeholder="Tax / business ID" className="field" />
      <input name="website" placeholder="Website" className="field" />
      <textarea
        name="notes"
        rows={4}
        placeholder="Tell us about your bullion business"
        className="field"
      />
      {error && <p className="text-sm text-[#9a4a3a]">{error}</p>}
      <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">
        {busy ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
