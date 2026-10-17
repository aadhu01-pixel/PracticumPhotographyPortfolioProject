# Luma Photography

A landing page for a small photography studio, built while learning HTML, CSS, JavaScript and React.

## Status

- Week 1: static HTML/CSS landing page (root folder)
- Week 2: rebuilt in React and Tailwind (`week2` folder)

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

- `week2/src/App.jsx`: puts the page together and holds the selected session state
- `week2/src/components/`: one component per page section, plus `SessionCard` and `SelectToggle`
- `week2/src/data/sessions.js`: the session data, used by both the cards and the form
