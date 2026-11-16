import { nanoid } from "nanoid";
import { sql } from "./db";
import type { SpotPrice } from "./types";

const SAMPLE_BASE = 2648.4;
const CACHE_MS = 5 * 60 * 1000;

function sampleSpot(): number {
  const hour = new Date().getUTCHours();
  const wobble = Math.sin(hour / 3) * 7.5 + Math.cos(hour) * 3.2;
  return Math.round((SAMPLE_BASE + wobble) * 100) / 100;
}

async function readCached(): Promise<SpotPrice | null> {
  const rows = await sql<{
    metal: string;
    usd_per_oz: string | number;
    source: string;
    fetched_at: string | Date;
  }>("select metal, usd_per_oz, source, fetched_at from spot_prices where metal = $1", ["gold"]);
  const row = rows[0];
  if (!row) return null;
  const fetchedAt = new Date(row.fetched_at).toISOString();
  const age = Date.now() - new Date(fetchedAt).getTime();
  if (age > CACHE_MS) return null;
  const source = row.source;
  return {
    metal: "gold",
    usd_per_oz: Number(row.usd_per_oz),
    source,
    fetched_at: fetchedAt,
    is_sample: source.startsWith("sample"),
  };
}

async function writeSpot(usd: number, source: string): Promise<SpotPrice> {
  const fetchedAt = new Date().toISOString();
  await sql(
    `insert into spot_prices (id, metal, usd_per_oz, source, fetched_at)
     values ($1, 'gold', $2, $3, $4)
     on conflict (metal) do update set usd_per_oz = excluded.usd_per_oz, source = excluded.source, fetched_at = excluded.fetched_at`,
    [nanoid(), usd, source, fetchedAt],
  );
  return {
    metal: "gold",
    usd_per_oz: usd,
    source,
    fetched_at: fetchedAt,
    is_sample: source.startsWith("sample"),
  };
}

async function fetchLive(): Promise<{ usd: number; source: string } | null> {
  const key = process.env.GOLD_API_KEY?.trim();
  if (!key) return null;
  try {
    const res = await fetch("https://www.goldapi.io/api/XAU/USD", {
      headers: { "x-access-token": key, "Content-Type": "application/json" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { price?: number };
    if (typeof data.price !== "number" || !Number.isFinite(data.price)) return null;
    return { usd: Math.round(data.price * 100) / 100, source: "goldapi.io" };
  } catch {
    return null;
  }
}

export async function getGoldSpot(): Promise<SpotPrice> {
  const cached = await readCached();
  if (cached) return cached;

  const live = await fetchLive();
  if (live) return writeSpot(live.usd, live.source);

  return writeSpot(sampleSpot(), "sample-spot");
}
