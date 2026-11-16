import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#0f0e0c] text-[#e8e4da]">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-brand)] text-sm font-bold uppercase tracking-[0.24em]">
            Kananga Mining Group
          </p>
          <p className="eyebrow mt-3 text-2xl">Africa&apos;s Mining Experts</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#a8a295]">
            Physical gold bullion for retail and wholesale clients — priced from live spot with
            transparent premiums, insured fulfillment, and dealer accounts.
          </p>
        </div>
        <div>
          <p className="section-label text-[#d4af37]">Explore</p>
          <ul className="mt-5 space-y-2.5 text-sm text-[#c7c0b2]">
            <li>
              <Link href="/products" className="transition hover:text-white">
                Bullion catalog
              </Link>
            </li>
            <li>
              <Link href="/dealer" className="transition hover:text-white">
                Dealer / wholesale
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="transition hover:text-white">
                Shipping & insurance
              </Link>
            </li>
            <li>
              <Link href="/faq" className="transition hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="section-label text-[#d4af37]">Desk</p>
          <ul className="mt-5 space-y-2.5 text-sm text-[#c7c0b2]">
            <li>
              <Link href="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <a
                href="mailto:desk@kanangamining.example"
                className="transition hover:text-white"
              >
                desk@kanangamining.example
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/8 px-4 py-5 text-center text-[0.7rem] tracking-wide text-[#7d786e]">
        © {new Date().getFullYear()} Kananga Mining Group. All rights reserved.
      </div>
    </footer>
  );
}
