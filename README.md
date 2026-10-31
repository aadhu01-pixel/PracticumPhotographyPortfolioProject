# Luma Photography

A website for a small photography studio, built while learning HTML, CSS, JavaScript, React and backend development. Clients can browse the sessions, sign in, and book and pay for a session with Stripe Checkout (test mode).

**Live site:** https://practicum-photography-portfolio-pro.vercel.app
**API:** https://luma-server-20t4.onrender.com/api/health (free Render instance, so the first request after a while can take up to a minute)

## Status

- Week 1: static HTML/CSS landing page (`week1` folder)
- Week 2: rebuilt in React and Tailwind (`client` folder)
- Week 3: Express API, PostgreSQL database, authentication and deployment (`server` folder)
- Week 4: payments with Stripe Checkout in test mode: orders, checkout route, webhook and success page

## Features

- Gallery and sessions are loaded from a PostgreSQL database through the API
- Sign up, sign in and sign out with email and password; the login survives page refreshes
- The header shows who is signed in
- A page for each session (`/sessions/portrait-session`) with its duration, deliverables, price and photos
- **Book now** on a session page pays for it through Stripe's hosted checkout page (test mode, no real money)
- Signed-out visitors who click Book now are sent to sign in, then brought back to the same session
- A success page that shows the order's real status from the server, and a "you haven't been charged" note if checkout is canceled
- Filter sessions by category, and pick a session to send an enquiry: the form opens with it already chosen
- Responsive layout

## Tech

- **Client:** React 19, Vite, Tailwind CSS 4, React Router
- **Server:** Node.js, Express 5
- **Database:** PostgreSQL on Neon, Drizzle ORM
- **Auth:** better-auth (email and password, sessions stored in the database, HttpOnly cookie)
- **Payments:** Stripe Checkout and webhooks, test mode (`stripe` Node SDK)
- **Hosting:** Vercel (client), Render (server)

## How it fits together

```
Browser ──▶ Vercel (React app) ──/api/*──▶ Render (Express API) ──▶ Neon (PostgreSQL)
                                                  ▲
Stripe ──── webhook: POST /api/webhooks/stripe ───┘
```

The browser only talks to the Vercel domain. Vercel forwards every `/api/*` request to the Express server on Render (`client/vercel.json`), and in development Vite does the same (`client/vite.config.js`). Because of this, the frontend uses plain URLs like `fetch('/api/sessions')` and the login cookie belongs to the site itself. Stripe is a server, not a browser, so it calls the webhook on Render directly.

## Payments: how a booking works

Sessions are the "products": Portrait $250, Event $600, Wedding $2,500 (USD, stored in cents).

1. **Book now** sends only the session's id to `POST /api/checkout`.
2. The checkout route (`server/src/routes/checkout.js`):
    - requires a signed-in user (`requireAuth`)
    - reads the price from the database, never from the browser
    - saves an order as `pending` with its order item, in one transaction
    - creates a Stripe Checkout Session with the order id in `metadata`
    - returns the session's `url`
3. The browser goes to Stripe's hosted page, and the customer pays with the test card `4242 4242 4242 4242`.
4. Stripe calls `POST /api/webhooks/stripe` (`server/src/routes/webhooks.js`). The route:
    - checks Stripe's signature using the raw request body
    - on `checkout.session.completed`, marks that order `paid`

    This is the **only** place an order becomes paid. Only `pending` orders are updated, so a repeated event changes nothing.
5. Stripe sends the browser to `/checkout/success?order=<id>`. The page asks `GET /api/orders/:id` for the real status, up to 6 times 2 seconds apart, because the webhook can arrive just after the redirect.

If the customer cancels, Stripe sends them back to the session page with `?canceled=true`, and the order stays `pending`.

The webhook route is mounted before `express.json()` (`server/src/index.js`). The signature is checked against the exact bytes Stripe sent, and parsing the body as JSON first would break the check. better-auth is mounted early for the same reason.

## Database

| Table | What it holds |
|---|---|
| `user` | One row per person: name, email |
| `account` | How a user logs in; for email/password it holds the **hashed** password |
| `session` | One row per logged-in browser: a random token and an expiry date |
| `verification` | Required by better-auth, not used yet |
| `photo_sessions` | The sessions clients can book: title, category, description, duration, deliverables, `price_cents`, cover image |
| `photos` | Every photo on the site, in gallery order; `session_id` links a photo to a session (empty for gallery-only photos) |
| `orders` | One row per purchase: `user_id`, `status` (`pending` → `paid`), `total_cents`, `currency`, `stripe_session_id`, `created_at`, `paid_at` |
| `order_items` | What was bought in an order: `order_id`, `session_id`, and the `title` and `price_cents` copied at purchase time |

`session`, `account` → `user` use `ON DELETE CASCADE`. `photos` → `photo_sessions` uses `ON DELETE SET NULL`, so a photo stays in the gallery if its session is removed. `order_items` → `orders` cascades, and `order_items` → `photo_sessions` is set to null, so an order keeps its copied title and price even if the session is removed. Orders are never deleted with a user.

Prices are whole cents (25000 = $250.00), which is what Stripe expects and avoids rounding errors. `order_items` copies the price so old orders keep what the customer actually paid.

The tables are defined in `server/src/db/schema.js`. The starting data, which used to be hardcoded in the React components, is in `server/src/db/sessions.data.js`, and `npm run db:seed` inserts it.

## API

| Method and path | Sign-in | Returns |
|---|---|---|
| `GET /api/health` | | `{ ok: true }` when the server is running |
| `GET /api/sessions` | | All photo sessions, with prices |
| `GET /api/sessions/:slug` | | One session with its `photos`, or 404 |
| `GET /api/photos` | | All gallery photos in order |
| `POST /api/checkout` | required | Body `{ sessionId }`. Creates a pending order and returns `{ url }` of Stripe's checkout page |
| `GET /api/orders/:id` | required | One of **your** orders with its status and items; another user's order is a 404 |
| `POST /api/webhooks/stripe` | Stripe signature | Called by Stripe, not the browser. Marks the order paid on `checkout.session.completed` |
| `/api/auth/*` | | Handled by better-auth: `sign-up/email`, `sign-in/email`, `sign-out`, `get-session` |

Routes marked "required" use the `requireAuth` middleware (`server/src/middleware/requireAuth.js`). It returns 401 without a valid session cookie, and otherwise puts the user on `req.user`.

## Running it locally

You need Node 20+, a free [Neon](https://neon.tech) database, a free [Stripe](https://stripe.com) account in test mode and the [Stripe CLI](https://docs.stripe.com/stripe-cli).

```bash
# 1. Server
cd server
npm install
cp .env.example .env      # then fill in the values (see below)
npm run db:push           # create the tables
npm run db:seed           # add the sessions, prices and photos
npm run dev               # http://localhost:3000

# 2. Stripe webhooks (in a second terminal)
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# copy the whsec_... it prints into server/.env as STRIPE_WEBHOOK_SECRET, then restart the server

# 3. Client (in a third terminal)
cd client
npm install
npm run dev               # http://localhost:5173
```

To test a payment, sign in, open a session, click **Book now** and pay with `4242 4242 4242 4242`, any future date and any CVC. `npm run db:studio` shows the order changing from `pending` to `paid`.

`stripe listen` only forwards events while it is running; events from while it was stopped are not resent.

### Environment variables (`server/.env`)

| Variable | What it is |
|---|---|
| `DATABASE_URL` | Neon connection string (pooled) |
| `BETTER_AUTH_SECRET` | A long random string used to sign login sessions |
| `BETTER_AUTH_URL` | The server's URL, `http://localhost:3000` locally |
| `CLIENT_URL` | The React app's URL, used for CORS and Stripe's success/cancel links |
| `PORT` | `3000` locally |
| `STRIPE_SECRET_KEY` | Stripe **test** secret key, `sk_test_...` (Developers → API keys) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...`: from `stripe listen` locally, from the dashboard webhook endpoint in production |

`.env` is ignored by Git. `server/.env.example` lists the variables without real values. The Stripe secret key is only used on the server, never in the React app.

## Deployment

- **Render** (server): root directory `server`, build `npm install`, start `npm start`, health check `/api/health`. The settings are recorded in `render.yaml`, and the secrets are entered in the Render dashboard.
    - Environment variables: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NODE_ENV=production`, `NODE_VERSION=22`.
    - `CLIENT_URL` and `BETTER_AUTH_URL` are set to the Vercel URL.
- **Vercel** (client): root directory `client`, Vite preset. `client/vercel.json` forwards `/api/*` to Render and sends every other path to `index.html`, so refreshing `/login`, `/sessions/...` or `/checkout/success` works.
- **Stripe** (test mode): a webhook endpoint at `https://luma-server-20t4.onrender.com/api/webhooks/stripe` listens for `checkout.session.completed`.
    - Its signing secret is Render's `STRIPE_WEBHOOK_SECRET`. It's different from the `stripe listen` one.
    - If the server is down, Stripe retries the endpoint automatically.

## Structure

```
week1/                      Week 1 static site
client/                     React app
  src/App.jsx               routes; Home loads the sessions and shares them
  src/components/           page sections, Login, SessionDetail (Book now), CheckoutSuccess
  src/lib/auth-client.js    better-auth client (signIn, signUp, signOut, useSession)
  src/lib/format.js         formatPrice: cents → "$250"
  vite.config.js            dev proxy /api → localhost:3000
  vercel.json               production rewrites
server/                     Express API
  src/index.js              middleware and routes (auth and webhooks before express.json)
  src/auth.js               better-auth setup
  src/stripe.js             the Stripe client
  src/middleware/           requireAuth
  src/routes/               sessions, photos, checkout, webhooks, orders
  src/db/                   connection, schema, seed data and seed script
  drizzle.config.js         used by drizzle-kit (db:push, db:studio)
render.yaml                 Render deploy settings
```
