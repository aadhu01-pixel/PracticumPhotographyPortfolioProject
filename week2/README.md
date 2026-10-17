# Luma Photography (Week 2)

A landing page for a small photography studio. It's the Week 1 HTML/CSS site rebuilt in React and Tailwind.

## Features

- Responsive layout with a sticky header, hero, gallery, sessions, about section, booking form and footer
- Filter sessions by category (Portrait, Wedding, Event)
- Selecting a session scrolls to the booking form with that session already chosen, and the dropdown and the cards stay in sync

## Tech

React 19, Vite, Tailwind CSS 4

## Running it

```bash
cd week2
npm install
npm run dev
```

## Structure

- `src/App.jsx`: puts the page together and holds the selected session state
- `src/components/`: one component per page section, plus `SessionCard` and `SelectToggle`
- `src/data/sessions.js`: the session data, used by both the cards and the form
