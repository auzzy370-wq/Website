const FAQS = [
  {
    q: "How is product pricing calculated?",
    a: "Each item uses live (or sample) gold spot × fine gold content, plus a published premium per ounce. Approved dealers see wholesale premiums.",
  },
  {
    q: "Is payment live?",
    a: "Checkout currently runs against a mock provider so the flow can be tested. A bullion-approved payment provider must accept the business before live charges are enabled.",
  },
  {
    q: "Can I get wholesale pricing?",
    a: "Register, then apply on the Dealers page. Pricing unlocks after desk approval.",
  },
  {
    q: "Do you insure shipments?",
    a: "Yes — insured express and standard options are available at checkout. Vault hold is offered when pickup is preferred.",
  },
];

export const metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-wide">
        FAQ
      </h1>
      <dl className="mt-10 space-y-8">
        {FAQS.map((item) => (
          <div key={item.q}>
            <dt className="font-[family-name:var(--font-brand)] text-sm font-bold uppercase tracking-[0.12em]">
              {item.q}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-[#555]">{item.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
