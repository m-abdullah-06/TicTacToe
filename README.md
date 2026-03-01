<!-- PROJECT HEADER -->
<h1 align="center">🎮 Tic Tac Toe – Advanced React Edition</h1>

<p align="center">
  <b>A feature-rich, modern Tic Tac Toe game built with React.</b><br/>
  Clean architecture. Smart AI. Persistent state. Polished UI.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/State%20Management-React%20Hooks-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Storage-localStorage-success?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Made%20By-Muhammad%20Abdullah-purple?style=for-the-badge"/>
</p>

---

## 🚀 Live Demo

🔗 **Live Preview:** //
📂 **Repository:** [TicTacToe](https://github.com/m-abdullah-06/TicTacToe/)

---

## ✨ Features

### 🎯 Core Gameplay

- 🧑‍🤝‍🧑 Player vs Player Mode
- 🤖 Player vs AI Mode
- 🏆 Automatic Winner Detection
- 🤝 Draw Detection
- 🔄 Restart Game Anytime

---

### 🧠 AI Opponent

- Smart move selection
- Optimized decision logic
- Instant response gameplay

---

### 🕓 Move History System

- Full move tracking
- Jump to previous moves
- Undo functionality
- Time-travel gameplay logic

---

### 🏆 Persistent Scoreboard

- Tracks:
  - ❌ Player X Wins
  - ⭕ Player O Wins
  - 🤝 Draw Count
- Data stored using **localStorage**
- Survives page refresh

---

### 🎨 UI & Experience

- Clean centered layout
- Responsive design
- Interactive game feedback
- Modern visual styling

---

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

## 🛠️ Built With

- ⚛️ React
- 🧠 useState
- 🔄 useEffect
- 💾 localStorage API
- 🎨 CSS / Tailwind

## 📦 Installation

```bash
git clone https://github.com/your-username/TicTacToe.git
cd TicTacToe
npm install
npm run dev

```

🧠 What This Project Demonstrates

✔ Advanced React state management
✔ Derived state calculations
✔ Component-based architecture
✔ Clean folder structure
✔ Game logic separation
✔ Persistent storage handling
✔ AI logic implementation
✔ Scalable design patterns

🔮 Future Enhancements

🧠 Minimax AI upgrade

🔊 Sound effects

🎬 Win animations

🌍 Online multiplayer (Firebase / WebSockets)

👨‍💻 Author

Muhammad Abdullah
Frontend Developer | React Enthusiast

💼 Building modern web applications
🚀 Focused on performance, UI, and scalability

⭐ Support

If you like this project:

🌟 Star the repository
🍴 Fork it
📢 Share it

<p align="center"> Built with ❤️ and React </p>
