# Kananga Mining Group

Custom gold bullion e-commerce storefront for **Kananga Mining Group** — Africa's Mining Experts.

## Features

- Brand-aligned responsive storefront (homepage, catalog, PDP, cart, checkout)
- Spot-plus-premium pricing (GoldAPI when `GOLD_API_KEY` is set; otherwise labeled sample spot)
- Product catalog with weight, purity, stock, retail & wholesale premiums
- Customer accounts and order history (checkout requires sign-in)
- Pending-payment checkout until a payment provider is connected (no stock decrement)
- Shipping + insurance options (carrier API-ready)
- Dealer / wholesale applications pending desk approval
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
| `DEALER_ADMIN_SECRET` | Required to approve/reject dealer apps via `POST /api/dealer/approve` |
| `STRIPE_SECRET_KEY` | Reserved for live payment capture wiring |

## Dealer approval

Applications always stay **pending** until the desk approves them:

```bash
curl -X POST "$APP_URL/api/dealer/approve" \
  -H "content-type: application/json" \
  -H "x-dealer-admin-secret: $DEALER_ADMIN_SECRET" \
  -d '{"customerId":"...","decision":"approved"}'
```

## Scope notes

Payment, shipping carrier, and live spot integrations stay optional until the client funds and approves those third parties — matching the proposal exclusions.
