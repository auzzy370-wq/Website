# Kananga Mining Group

Custom gold bullion e-commerce storefront for **Kananga Mining Group** — Africa's Mining Experts.

## Features

- Brand-aligned responsive storefront (homepage, catalog, PDP, cart, checkout)
- Spot-plus-premium pricing (GoldAPI when `GOLD_API_KEY` is set; otherwise labeled sample spot)
- Product catalog with weight, purity, stock, retail & wholesale premiums
- Customer accounts, order history, mock payment checkout
- Shipping + insurance options (carrier API-ready)
- Dealer / wholesale application with separate pricing tiers
- Postgres in production (`cursor-app.json`); PGlite locally when `DATABASE_URL` is unset

## Quick start

```bash
npm install
# Important: do not inherit another project's DATABASE_URL
env -u DATABASE_URL npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Postgres (set automatically on Cursor publish) |
| `GOLD_API_KEY` | Optional live XAU/USD from goldapi.io |
| `DEALER_REQUIRE_REVIEW` | Set `true` to keep dealer apps pending (default demo auto-approves) |
| `STRIPE_SECRET_KEY` | Reserved for live payment provider wiring |

## Scope notes

Payment, shipping carrier, and live spot integrations stay mocked or optional until the client funds and approves those third parties — matching the proposal exclusions.
