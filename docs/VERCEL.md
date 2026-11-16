# Deploy Kananga Mining on Vercel

The storefront is a Next.js App Router project. On Vercel you need a **hosted Postgres** database — in-memory PGlite is only for local demos and will not persist across serverless invocations.

## 1. Create a Neon Postgres database

1. Open [https://console.neon.tech](https://console.neon.tech) and create a project.
2. Copy the **pooled** connection string (`DATABASE_URL`, host usually contains `-pooler`).
3. Optionally copy the **direct** (non-pooled) URL as `DATABASE_URL_UNPOOLED` for migrations.

Append `?sslmode=require` if it is missing.

## 2. Import the GitHub repo in Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new).
2. Import `auzzy370-wq/Website` (or rename the repo to `kananga-mining` first).
3. Framework preset: **Next.js**.
4. Root directory: `.` (repo root).
5. Build command: `npm run vercel-build` (also set in `vercel.json`).

## 3. Environment variables

In the Vercel project → **Settings → Environment Variables**, add for Production (and Preview if desired):

| Name | Required | Notes |
|------|----------|-------|
| `DATABASE_URL` | Yes | Neon pooled URL — also enable for **Build** |
| `DATABASE_URL_UNPOOLED` | Recommended | Neon direct URL for `scripts/migrate.mjs` |
| `NEXT_PUBLIC_APP_URL` | Yes after first deploy | `https://<your-project>.vercel.app` |
| `GOLD_API_KEY` | Optional | Live XAU/USD from goldapi.io |
| `DEALER_ADMIN_SECRET` | Optional | Desk approval for wholesale accounts |
| `STRIPE_SECRET_KEY` | Optional | Reserved for live payment capture |

Redeploy after adding env vars so build-time migrations can run.

## 4. Deploy from CLI (optional)

```bash
npm i -g vercel
cd /path/to/Website
vercel login
vercel link
vercel env add DATABASE_URL
vercel env add DATABASE_URL_UNPOOLED
vercel env add NEXT_PUBLIC_APP_URL
vercel --prod
```

Or create a claimable temporary deployment (no login):

```bash
npx vercel deploy --temporary --yes
```

Claim the URL in the Vercel dashboard, then attach Neon env vars and redeploy.

## 5. Verify

```bash
curl https://YOUR_APP.vercel.app/api/gold-price
curl -I https://YOUR_APP.vercel.app/products
```

Catalog seed data is created on first request when tables are empty.

## 6. Deployment Protection

If the site returns **403 Forbidden** after claiming a temporary URL, disable **Deployment Protection** under Project → Settings (or allow Standard Protection for Preview only).

## Notes

- Checkout requires a signed-in customer; orders stay `pending_payment` until a payment provider is connected.
- Dealer applications stay pending until approved with `DEALER_ADMIN_SECRET` via `POST /api/dealer/approve`.
