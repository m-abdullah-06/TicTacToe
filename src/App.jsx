import { useGameLogic } from "./hooks/useGameLogic";
import Board from "./components/Board";
import GameStatus from "./components/GameStatus";
import ResetButton from "./components/ResetButton";

export default function App() {
  const { squares, currentPlayer, winner, isDraw, handlePlay, resetGame } =
    useGameLogic();

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 40,
        fontFamily: "sans-serif",
      }}
    >
      <article
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <header style={{ textAlign: "center" }}>
          <h1 style={{ color: "#6366f1", margin: "0 0 8px" }}>Tic Tac Toe</h1>
          <GameStatus
            winner={winner}
            isDraw={isDraw}
            currentPlayer={currentPlayer}
          />
        </header>
        <section aria-label="Game board">
          <Board squares={squares} onPlay={handlePlay} />
        </section>
        <footer>
          <ResetButton onReset={resetGame} />
        </footer>
      </article>
    </main>
  );
}
