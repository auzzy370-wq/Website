export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <p className="eyebrow text-2xl">Africa&apos;s Mining Experts</p>
      <h1 className="mt-4 font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-[0.04em] sm:text-5xl">
        Kananga Mining Group
      </h1>
      <div className="rule-draw mt-6 h-px w-24 bg-[#a8893a]" />
      <div className="mt-10 space-y-5 text-[1.05rem] leading-relaxed text-[#4a4a4a]">
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
