# MedCards 🩺

A medicine learning flashcard web app for students and medicine learners.

Learn medicine names, their usages, and categories through interactive
flashcards and quick tests — all in a clean, mobile-friendly dark-themed UI.

## ✨ Features

- **Start Page** — pick a topic (Medicine Usage / Medicine Category) and a
  theme (Flash Cards / Test)
- **Flash Cards** — 3D flip cards showing the medicine name on the front and
  its usage or category on the back, with:
  - Back / forward navigation
  - A **Play** mode that auto-flips each card (5s per side) and advances
  - 30 randomly picked cards per session with a progress counter
- **Test** — 30 random multiple-choice questions (medicine name), four options
  per question:
  - Only proceed on the correct answer; wrong answers show feedback and let
    you retry
  - Tracks failed attempts, successful attempts, and success rate
- **End Page** — shows a completion message (flash cards) or your results
  (test), with actions to retake the test or return home

## 🛠️ Tech Stack

- [React](https://react.dev) + [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org) — strict mode, full type safety
- [Tailwind CSS](https://tailwindcss.com)
- Local JSON data (`data.json`) — no backend or database required

## 📁 Project Structure

```
.
├── index.html
├── data.json                 # Medicine usage & category data
├── vite.config.ts
├── tsconfig.json             # Strict TypeScript config
├── src/
│   ├── main.tsx
│   ├── App.tsx               # Page routing & session state
│   ├── types.ts              # Shared domain types (Card, TestQuestion, …)
│   ├── data.ts               # Data helpers (shuffle, pick cards, build tests)
│   ├── vite-env.d.ts         # Vite client types
│   ├── index.css             # Tailwind + flip animation helpers
│   └── components/
│       ├── StartPage.tsx
│       ├── FlashcardPage.tsx
│       ├── TestPage.tsx
│       └── EndPage.tsx
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18 or later

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/maneeshgujar/MedCards.git
cd MedCards

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

### Type checking

```bash
npm run typecheck
```

## 🌐 Live Demo

Deployed with GitHub Pages:

**https://maneeshgujar.github.io/MedCards/**

## 📄 License

This project is for educational purposes. Not intended as medical advice.

## 🔀 Branches

- `main` — current version, written in **TypeScript**
- `js-version` — archived **JavaScript** version of the app
