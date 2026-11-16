import { getCurrentCustomer } from "@/lib/auth";
import { formatSpot } from "@/lib/format";
import { getGoldSpot } from "@/lib/gold-price";
import { ensureCatalog } from "@/lib/products";
import { SiteHeader } from "@/components/site-header";

export async function SiteHeaderServer() {
  try {
    await ensureCatalog();
    const [customer, spot] = await Promise.all([getCurrentCustomer(), getGoldSpot()]);
    return (
      <SiteHeader
        spotLabel={formatSpot(spot.usd_per_oz)}
        accountHref={customer ? "/account" : "/login"}
        accountLabel={customer ? "Account" : "Sign in"}
      />
    );
  } catch {
    return (
      <SiteHeader spotLabel="—" accountHref="/login" accountLabel="Sign in" />
    );
  }
}
