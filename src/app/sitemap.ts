import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await listProducts();
  const base = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";
  const staticRoutes = ["", "/products", "/about", "/shipping", "/dealer", "/faq", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    }),
  );
  return [
    ...staticRoutes,
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: new Date(),
    })),
  ];
}
