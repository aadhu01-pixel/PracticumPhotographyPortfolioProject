# Luma Photography

A website for a small photography studio, built while learning HTML, CSS, JavaScript, React and backend development.

**Live site:** https://practicum-photography-portfolio-pro.vercel.app
**API:** https://luma-server-20t4.onrender.com/api/health (free Render instance, so the first request after a while can take up to a minute)

## Status

- Week 1: static HTML/CSS landing page (`week1` folder)
- Week 2: rebuilt in React and Tailwind (`client` folder)
- Week 3: Express API, PostgreSQL database, authentication and deployment (`server` folder)

## Features

- Gallery and sessions are loaded from a PostgreSQL database through the API
- Sign up, sign in and sign out with email and password; the login survives page refreshes
- The header shows who is signed in
- A page for each session (`/sessions/portrait-session`) with its duration, deliverables and photos
- Filter sessions by category, and pick a session to book: the form opens with it already chosen
- Responsive layout

## Tech

- **Client:** React 19, Vite, Tailwind CSS 4, React Router
- **Server:** Node.js, Express 5
- **Database:** PostgreSQL on Neon, Drizzle ORM
- **Auth:** better-auth (email and password, sessions stored in the database, HttpOnly cookie)
- **Hosting:** Vercel (client), Render (server)

## How it fits together

```
Browser ──▶ Vercel (React app) ──/api/*──▶ Render (Express API) ──▶ Neon (PostgreSQL)
```

The browser only talks to the Vercel domain. Vercel forwards every `/api/*` request to the Express server on Render (`client/vercel.json`), and in development Vite does the same (`client/vite.config.js`). Because of this, the frontend uses plain URLs like `fetch('/api/sessions')` and the login cookie belongs to the site itself.

## Database

| Table | What it holds |
|---|---|
| `user` | One row per person: name, email |
| `account` | How a user logs in; for email/password it holds the **hashed** password |
| `session` | One row per logged-in browser: a random token and an expiry date |
| `verification` | Required by better-auth, not used yet |
| `photo_sessions` | The sessions clients can book: title, category, description, duration, deliverables, cover image |
| `photos` | Every photo on the site, in gallery order; `session_id` links a photo to a session (empty for gallery-only photos) |

`session`, `account` → `user` use `ON DELETE CASCADE`. `photos` → `photo_sessions` uses `ON DELETE SET NULL`, so a photo stays in the gallery if its session is removed.

The tables are defined in `server/src/db/schema.js`. The starting data, which used to be hardcoded in the React components, is in `server/src/db/sessions.data.js`, and `npm run db:seed` inserts it.

## API

| Method and path | Returns |
|---|---|
| `GET /api/health` | `{ ok: true }` when the server is running |
| `GET /api/sessions` | All photo sessions |
| `GET /api/sessions/:slug` | One session with its `photos`, or 404 |
| `GET /api/photos` | All gallery photos in order |
| `/api/auth/*` | Handled by better-auth: `sign-up/email`, `sign-in/email`, `sign-out`, `get-session` |

## Running it locally

You need Node 20+ and a free [Neon](https://neon.tech) database.

```bash
# 1. Server
cd server
npm install
cp .env.example .env      # then fill in DATABASE_URL and BETTER_AUTH_SECRET
npm run db:push           # create the tables
npm run db:seed           # add the sessions and photos
npm run dev               # http://localhost:3000

# 2. Client (in a second terminal)
cd client
npm install
npm run dev               # http://localhost:5173
```

`.env` is ignored by Git. `server/.env.example` lists the variables without real values.

## Deployment

- **Render** (server): root directory `server`, build `npm install`, start `npm start`, health check `/api/health`. Environment variables: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `NODE_ENV=production`, `NODE_VERSION=22`, and `CLIENT_URL` / `BETTER_AUTH_URL` set to the Vercel URL. Settings are recorded in `render.yaml`.
- **Vercel** (client): root directory `client`, Vite preset. `client/vercel.json` forwards `/api/*` to Render and sends every other path to `index.html`, so refreshing `/login` or `/sessions/...` works.

## Structure

```
week1/                      Week 1 static site
client/                     React app
  src/App.jsx               routes; Home loads the sessions and shares them
  src/components/           page sections, Login, SessionDetail
  src/lib/auth-client.js    better-auth client (signIn, signUp, signOut, useSession)
  vite.config.js            dev proxy /api → localhost:3000
  vercel.json               production rewrites
server/                     Express API
  src/index.js              middleware and routes
  src/auth.js               better-auth setup
  src/routes/               /api/sessions and /api/photos
  src/db/                   connection, schema, seed data and seed script
  drizzle.config.js         used by drizzle-kit (db:push, db:studio)
render.yaml                 Render deploy settings
```
