import { CATALOG_SEED } from "./catalog";
import { sql } from "./db";
import { getGoldSpot } from "./gold-price";
import { priceProduct } from "./pricing";
import type { AccountType, PricedProduct, Product } from "./types";

let seeded = false;

export async function ensureCatalog(): Promise<void> {
  if (seeded) return;
  const existing = await sql<{ count: string | number }>("select count(*)::int as count from products");
  const count = Number(existing[0]?.count ?? 0);
  if (count === 0) {
    for (const p of CATALOG_SEED) {
      await sql(
        `insert into products
         (id, slug, name, description, metal, form, weight_oz, purity, retail_premium_per_oz, wholesale_premium_per_oz, stock_qty, image_key, featured, active)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,true)
         on conflict (id) do nothing`,
        [
          p.id,
          p.slug,
          p.name,
          p.description,
          p.metal,
          p.form,
          p.weight_oz,
          p.purity,
          p.retail_premium_per_oz,
          p.wholesale_premium_per_oz,
          p.stock_qty,
          p.image_key,
          p.featured,
        ],
      );
    }
  }
  await getGoldSpot();
  seeded = true;
}

function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    description: String(row.description),
    metal: String(row.metal),
    form: String(row.form),
    weight_oz: Number(row.weight_oz),
    purity: Number(row.purity),
    retail_premium_per_oz: Number(row.retail_premium_per_oz),
    wholesale_premium_per_oz: Number(row.wholesale_premium_per_oz),
    stock_qty: Number(row.stock_qty),
    image_key: String(row.image_key),
    featured: Boolean(row.featured),
    active: Boolean(row.active),
  };
}

export async function listProducts(filters?: {
  form?: string;
  q?: string;
  featured?: boolean;
}): Promise<Product[]> {
  await ensureCatalog();
  const rows = await sql<Record<string, unknown>>(
    "select * from products where active = true order by weight_oz desc, name asc",
  );
  let products = rows.map(mapProduct);
  if (filters?.form) products = products.filter((p) => p.form === filters.form);
  if (filters?.featured) products = products.filter((p) => p.featured);
  if (filters?.q) {
    const q = filters.q.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.form.toLowerCase().includes(q),
    );
  }
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await ensureCatalog();
  const rows = await sql<Record<string, unknown>>(
    "select * from products where slug = $1 and active = true",
    [slug],
  );
  return rows[0] ? mapProduct(rows[0]) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  await ensureCatalog();
  const rows = await sql<Record<string, unknown>>("select * from products where id = $1", [id]);
  return rows[0] ? mapProduct(rows[0]) : null;
}

export async function priceCatalog(
  accountType: AccountType = "retail",
  filters?: { form?: string; q?: string; featured?: boolean },
): Promise<{ spot: number; source: string; isSample: boolean; products: PricedProduct[] }> {
  const spot = await getGoldSpot();
  const products = await listProducts(filters);
  return {
    spot: spot.usd_per_oz,
    source: spot.source,
    isSample: spot.is_sample,
    products: products.map((p) => priceProduct(p, spot.usd_per_oz, accountType)),
  };
}
