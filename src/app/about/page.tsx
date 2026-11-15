export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="font-[family-name:var(--font-display)] text-xl italic text-[#8a7340]">
        Africa&apos;s Mining Experts
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-wide">
        Kananga Mining Group
      </h1>
      <div className="mt-8 space-y-5 text-base leading-relaxed text-[#444]">
        <p>
          Kananga Mining Group supplies physical gold bullion to individuals, advisors, and
          approved wholesale dealers. This storefront is built for transparent spot-plus-premium
          pricing, inventory visibility, and insured fulfillment.
        </p>
        <p>
          Product claims, tax treatment, and regulatory obligations remain the responsibility of
          the operating business. Third-party payment acceptance for bullion must be confirmed
          before live checkout is enabled.
        </p>
      </div>
    </div>
  );
}
