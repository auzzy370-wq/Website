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
- Postgres in production; PGlite locally when `DATABASE_URL` is unset

## Quick start (local)

```bash
cp .env.example .env
npm install
# Do not inherit another project's DATABASE_URL
env -u DATABASE_URL npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

Full guide: **[docs/VERCEL.md](docs/VERCEL.md)**.

You need a Neon (or other) Postgres `DATABASE_URL`, then:

```bash
vercel login && vercel link
vercel env add DATABASE_URL
vercel env add NEXT_PUBLIC_APP_URL
vercel --prod
```

Or import `auzzy370-wq/Website` from [vercel.com/new](https://vercel.com/new) and set the same env vars (enable `DATABASE_URL` for **Build** so migrations run).

## Environment

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Postgres (required on Vercel) |
| `DATABASE_URL_UNPOOLED` | Optional direct URL for migrations |
| `NEXT_PUBLIC_APP_URL` | Public site URL |
| `GOLD_API_KEY` | Optional live XAU/USD from goldapi.io |
| `DEALER_ADMIN_SECRET` | Approve/reject dealer apps via `POST /api/dealer/approve` |
| `STRIPE_SECRET_KEY` | Reserved for live payment capture wiring |

## Dealer approval

Applications stay **pending** until the desk approves them:

```bash
curl -X POST "$APP_URL/api/dealer/approve" \
  -H "content-type: application/json" \
  -H "x-dealer-admin-secret: $DEALER_ADMIN_SECRET" \
  -d '{"customerId":"...","decision":"approved"}'
```

## Scope notes

Payment, shipping carrier, and live spot integrations stay optional until the client funds and approves those third parties — matching the proposal exclusions.
