import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Syne } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeaderServer } from "@/components/site-header-server";
import "./globals.css";

const brand = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-brand",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Kananga Mining Group | Africa's Mining Experts",
    template: "%s | Kananga Mining Group",
  },
  description:
    "Premium physical gold bullion storefront — live spot pricing, insured shipping, and wholesale dealer accounts from Kananga Mining Group.",
  openGraph: {
    title: "Kananga Mining Group",
    description: "Africa's Mining Experts — gold bullion for retail and wholesale clients.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${brand.variable} ${display.variable} ${body.variable} antialiased`}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeaderServer />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
