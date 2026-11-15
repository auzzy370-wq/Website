export function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function formatSpot(usd: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(usd);
}

export function formatOz(oz: number): string {
  if (oz >= 1) return `${oz.toFixed(oz % 1 === 0 ? 0 : 2)} oz`;
  const grams = oz * 31.1034768;
  if (Math.abs(grams - 1) < 0.01) return "1 g";
  if (Math.abs(grams - 10) < 0.05) return "10 g";
  return `${oz.toFixed(4)} oz`;
}

export function purityLabel(purity: number): string {
  const pct = purity * 100;
  if (Math.abs(pct - 99.99) < 0.01) return "999.9";
  if (Math.abs(pct - 99.9) < 0.05) return "999";
  return pct.toFixed(2);
}
