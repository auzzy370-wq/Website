import { NextResponse } from "next/server";
import { getGoldSpot } from "@/lib/gold-price";
import { ensureCatalog } from "@/lib/products";

export async function GET() {
  await ensureCatalog();
  const spot = await getGoldSpot();
  return NextResponse.json(spot, {
    headers: { "cache-control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
