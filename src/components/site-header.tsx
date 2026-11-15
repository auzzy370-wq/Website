import Image from "next/image";
import Link from "next/link";
import { getCurrentCustomer } from "@/lib/auth";
import { formatSpot } from "@/lib/format";
import { getGoldSpot } from "@/lib/gold-price";
import { ensureCatalog } from "@/lib/products";

const NAV = [
  { href: "/products", label: "Bullion" },
  { href: "/about", label: "About" },
  { href: "/shipping", label: "Shipping" },
  { href: "/dealer", label: "Dealers" },
];

export async function SiteHeader() {
  await ensureCatalog();
  const [customer, spot] = await Promise.all([getCurrentCustomer(), getGoldSpot()]);

  return (
    <header className="relative z-40 border-b border-black/10 bg-[#f7f7f5]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <Image
            src="/brand/kananga-logo.jpg"
            alt="Kananga Mining Group"
            width={220}
            height={64}
            className="h-10 w-auto object-contain sm:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.8rem] font-medium uppercase tracking-[0.16em] text-[#1a1a1a]/75 transition hover:text-[#1a1a1a]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-[#8a7340]">Live spot</p>
            <p className="font-[family-name:var(--font-display)] text-lg leading-none text-[#1a1a1a]">
              {formatSpot(spot.usd_per_oz)}
              <span className="ml-1 text-xs tracking-normal text-[#6b6b6b]">/oz</span>
            </p>
          </div>
          <Link
            href="/cart"
            className="rounded-sm border border-black/15 px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a] transition hover:border-[#b8963e] hover:text-[#8a6f28]"
          >
            Cart
          </Link>
          <Link
            href={customer ? "/account" : "/login"}
            className="rounded-sm bg-[#111] px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#f5f2ea] transition hover:bg-[#b8963e] hover:text-[#111]"
          >
            {customer ? "Account" : "Sign in"}
          </Link>
        </div>
      </div>
      <div className="flex gap-5 overflow-x-auto border-t border-black/5 px-4 py-2 md:hidden">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[#1a1a1a]/70"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
