# Tic Tac Toe

A polished, feature-rich Tic Tac Toe game built with React. Play against a Minimax-powered AI or challenge a friend locally — all in a clean dark/light themed UI.

---

## Features

- **AI Opponent** — Minimax algorithm with alpha-beta pruning. Set to moderate difficulty (90% optimal, 10% random blunder) so you actually have a fighting chance
- **2 Player Mode** — toggle between VS AI and local 2-player at any time
- **Persistent Scoreboard** — wins, losses, and draws saved to `localStorage` and survive page refreshes
- **Move History & Time Travel** — every move is logged; click any entry in the sidebar to jump back to that board state
- **Dark / Light Theme** — respects your OS preference by default, togglable via the header button
- **Animations** — pop-in on cell placement, pulse glow on winning cells

---

## Project Structure

```
src/
├── App.jsx                  # Main component, layout, and injected design system
├── hooks/
│   ├── useGameLogic.js      # Board state, turn tracking, win/draw detection
│   ├── useGameHistory.js    # Move history array and time-travel (jumpTo)
│   ├── useScoreboard.js     # Persistent scores via localStorage
│   ├── useTheme.js          # Dark/light theme with localStorage + OS preference
│   └── useai.js             # AI trigger hook (watches turn, fires after 400ms delay)
├── utils/
│   ├── calculateWinner.js   # Win-line checker
│   └── minimax.js           # Minimax + alpha-beta pruning + difficulty blunder
└── styles/
    └── theme.css            # CSS variables for light/dark theme (legacy, overridden by App.jsx)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## How the AI Works

The AI uses the **Minimax algorithm** — it recursively simulates every possible future game state and picks the move that leads to the best outcome, assuming the opponent also plays optimally.

**Scoring:**
| Outcome | Score |
|---------|-------|
| AI (O) wins | +10 |
| Player (X) wins | -10 |
| Draw | 0 |

**Alpha-Beta Pruning** is applied to skip branches that can't possibly affect the final decision, making the search significantly faster.

**Difficulty — Moderate (10% blunder rate):**  
Before calculating the best move, the AI rolls a 10% chance to play a completely random cell instead. This gives a skilled player a realistic (but slim) chance of winning.

To adjust difficulty, edit `src/utils/minimax.js`:

```js
// Line in getBestMove():
if (Math.random() < 0.10) { ... }
//                  ^^^^
//   0.05 = harder (~5% win chance)
//   0.10 = moderate (~10% win chance)  ← default
//   0.25 = easier (~25% win chance)
//   0.50 = random AI (easy)
```

---

## Hooks Overview

| Hook             | Responsibility                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| `useGameLogic`   | Owns the board array, whose turn it is, win/draw state, and `loadSquares` for time-travel           |
| `useGameHistory` | Stores the history stack and `stepIndex`; provides `pushMove` and `jumpTo`                          |
| `useScoreboard`  | Reads/writes `{ X, O, draws }` to `localStorage`                                                    |
| `useTheme`       | Toggles `data-theme` attribute on `<body>` and persists preference                                  |
| `useAI`          | Side-effect hook — watches `isXTurn` and fires `getBestMove` after a 400ms delay when it's O's turn |

---

## Tech Stack

- **React 18** — hooks-based, no class components
- **Vite** — dev server and bundler
- **Vanilla CSS** — injected via `<style>` tag in `App.jsx`, using CSS custom properties for theming
- **Google Fonts** — Bebas Neue (display) + DM Mono (body)
- No external UI libraries

---

## License

MIT
