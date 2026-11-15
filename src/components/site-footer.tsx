import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-[#111] text-[#e8e4da]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-brand)] text-sm font-bold uppercase tracking-[0.22em]">
            Kananga Mining Group
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-xl text-[#d4af37]">
            Africa&apos;s Mining Experts
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#b7b2a6]">
            Physical gold bullion for retail and wholesale clients — priced from live spot with
            transparent premiums, insured fulfillment, and dealer accounts.
          </p>
        </div>
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#d4af37]">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[#cfc9bc]">
            <li>
              <Link href="/products" className="hover:text-white">
                Bullion catalog
              </Link>
            </li>
            <li>
              <Link href="/dealer" className="hover:text-white">
                Dealer / wholesale
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-white">
                Shipping & insurance
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#d4af37]">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[#cfc9bc]">
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact desk
              </Link>
            </li>
            <li>
              <a href="mailto:desk@kanangamining.example" className="hover:text-white">
                desk@kanangamining.example
              </a>
            </li>
            <li className="pt-2 text-xs leading-relaxed text-[#8f8a7e]">
              Sample storefront — payment and live spot providers activate when client credentials
              are approved.
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-[#8f8a7e]">
        © {new Date().getFullYear()} Kananga Mining Group. All rights reserved.
      </div>
    </footer>
  );
}
