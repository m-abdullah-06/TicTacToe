import { calculateWinner } from "./calculateWinner";

function minimax(squares, isMaximizing) {
  const winner = calculateWinner(squares);

  if (winner === "O") return 10;
  if (winner === "X") return -10;
  if (squares.every(Boolean)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    squares.forEach((cell, i) => {
      if (!cell) {
        const next = [...squares];
        next[i] = "O";
        best = Math.max(best, minimax(next, false));
      }
    });
    return best;
  } else {
    let best = Infinity;
    squares.forEach((cell, i) => {
      if (!cell) {
        const next = [...squares];
        next[i] = "X";
        best = Math.min(best, minimax(next, true));
      }
    });
    return best;
  }
}

export function getBestMove(squares) {
  let bestScore = -Infinity;
  let bestMove = null;

  squares.forEach((cell, i) => {
    if (!cell) {
      const next = [...squares];
      next[i] = "O";
      const score = minimax(next, false);
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  });

  return bestMove;
}
