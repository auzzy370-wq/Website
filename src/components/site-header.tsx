"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/products", label: "Bullion" },
  { href: "/about", label: "About" },
  { href: "/shipping", label: "Shipping" },
  { href: "/dealer", label: "Dealers" },
];

export function SiteHeader({
  spotLabel,
  accountHref,
  accountLabel,
}: {
  spotLabel: string;
  accountHref: string;
  accountLabel: string;
}) {
  const pathname = usePathname();
  const overHero = pathname === "/";

  return (
    <header
      className={cn(
        "z-40 w-full transition-colors",
        overHero
          ? "absolute inset-x-0 top-0 border-b border-white/10 bg-gradient-to-b from-black/55 to-transparent"
          : "relative border-b border-black/8 bg-[#f6f5f2]/92 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <Image
            src="/brand/kananga-logo.jpg"
            alt="Kananga Mining Group"
            width={220}
            height={64}
            className={cn(
              "h-9 w-auto object-contain sm:h-11",
              overHero && "rounded-sm bg-[#f7f3ea] p-1.5 ring-1 ring-white/20",
            )}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[0.72rem] font-medium uppercase tracking-[0.2em] transition",
                overHero
                  ? "text-white/90 hover:text-[#e8d5a3]"
                  : "text-[#1a1a1a]/70 hover:text-[#1a1a1a]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden text-right sm:block">
            <p
              className={cn(
                "text-[0.62rem] uppercase tracking-[0.2em]",
                overHero ? "text-[#e8d5a3]" : "text-[#a8893a]",
              )}
            >
              Live spot
            </p>
            <p
              className={cn(
                "font-[family-name:var(--font-display)] text-lg leading-none",
                overHero ? "text-white" : "text-[#141414]",
              )}
            >
              {spotLabel}
              <span
                className={cn(
                  "ml-1 text-xs tracking-normal",
                  overHero ? "text-white/55" : "text-[#6a6a6a]",
                )}
              >
                /oz
              </span>
            </p>
          </div>
          <Link
            href="/cart"
            className={cn(
              "px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition",
              overHero
                ? "border border-white/25 text-white hover:border-[#d4af37] hover:text-[#d4af37]"
                : "border border-black/12 text-[#141414] hover:border-[#a8893a] hover:text-[#8a6f28]",
            )}
          >
            Cart
          </Link>
          <Link
            href={accountHref}
            className={cn(
              "inline-flex min-w-[5.5rem] items-center justify-center whitespace-nowrap px-3.5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition",
              overHero
                ? "bg-[#f7f3ea] text-[#141414] hover:bg-[#d4af37]"
                : "bg-[#141414] text-[#f7f3ea] hover:bg-[#a8893a] hover:text-[#141414]",
            )}
          >
            {accountLabel}
          </Link>
        </div>
      </div>
      <div
        className={cn(
          "flex gap-5 overflow-x-auto px-4 py-2 md:hidden",
          overHero ? "border-t border-white/10" : "border-t border-black/5",
        )}
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "whitespace-nowrap text-[0.68rem] font-medium uppercase tracking-[0.16em]",
              overHero ? "text-white/70" : "text-[#1a1a1a]/65",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
