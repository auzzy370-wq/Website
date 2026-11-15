export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-[family-name:var(--font-brand)] text-4xl font-bold uppercase tracking-wide">
        Contact
      </h1>
      <p className="mt-4 text-[#555]">
        Reach the bullion desk for allocations, dealer onboarding, or fulfillment questions.
      </p>
      <div className="mt-8 space-y-2 text-sm">
        <p>
          Email:{" "}
          <a className="text-[#8a7340]" href="mailto:desk@kanangamining.example">
            desk@kanangamining.example
          </a>
        </p>
        <p className="text-[#888]">Replace with production contact details at launch.</p>
      </div>
    </div>
  );
}
