import type { AccountType, PricedProduct, Product } from "./types";

export function priceProduct(
  product: Product,
  spotUsd: number,
  accountType: AccountType = "retail",
): PricedProduct {
  const wholesale = accountType === "wholesale";
  const premiumPerOz = wholesale
    ? Number(product.wholesale_premium_per_oz)
    : Number(product.retail_premium_per_oz);
  const weight = Number(product.weight_oz);
  const purity = Number(product.purity);
  const fineOz = weight * purity;
  const unitUsd = fineOz * spotUsd + weight * premiumPerOz;
  return {
    ...product,
    weight_oz: weight,
    purity,
    retail_premium_per_oz: Number(product.retail_premium_per_oz),
    wholesale_premium_per_oz: Number(product.wholesale_premium_per_oz),
    stock_qty: Number(product.stock_qty),
    unitPriceCents: Math.round(unitUsd * 100),
    premiumPerOz,
    spotUsed: spotUsd,
    pricingTier: wholesale ? "wholesale" : "retail",
  };
}

export function shippingQuote(
  method: { baseCents: number; perOzCents: number; insuranceRate: number },
  totalOz: number,
  subtotalCents: number,
) {
  const shippingCents = Math.round(method.baseCents + method.perOzCents * totalOz);
  const insuranceCents = Math.round(subtotalCents * method.insuranceRate);
  return { shippingCents, insuranceCents };
}
