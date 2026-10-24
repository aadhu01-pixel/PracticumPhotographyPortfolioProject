# Luma Photography: client

The React frontend. See the [main README](../README.md) for the whole project, the API and the database.

## Tech

React 19, Vite, Tailwind CSS 4, React Router, better-auth (client)

## Running it

Start the server first (see `../server`), then:

```bash
npm install
npm run dev
```

Vite forwards `/api` requests to the server on `http://localhost:3000`.

## Structure

- `src/App.jsx`: the routes (`/`, `/login`, `/signup`, `/sessions/:slug`); `Home` fetches the sessions and shares them with the cards and the booking form
- `src/components/`: one component per page section, plus `Login`, `SessionDetail`, `SessionCard` and `SelectToggle`
- `src/lib/auth-client.js`: the better-auth client used for sign up, sign in, sign out and `useSession`
- `vercel.json`: forwards `/api/*` to the Render server and serves `index.html` for every page
