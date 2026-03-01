import { calculateWinner } from "./calculateWinner";

function minimax(squares, isMaximizing, alpha = -Infinity, beta = Infinity) {
  const winner = calculateWinner(squares);
  if (winner === "O") return 10;
  if (winner === "X") return -10;
  if (squares.every(Boolean)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        const next = [...squares];
        next[i] = "O";
        best = Math.max(best, minimax(next, false, alpha, beta));
        alpha = Math.max(alpha, best);
        if (beta <= alpha) break;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        const next = [...squares];
        next[i] = "X";
        best = Math.min(best, minimax(next, true, alpha, beta));
        beta = Math.min(beta, best);
        if (beta <= alpha) break;
      }
    }
    return best;
  }
}

export function getBestMove(squares) {
  const emptyCells = squares
    .map((v, i) => (v ? null : i))
    .filter((i) => i !== null);

  if (Math.random() < 0.02) {
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  let bestScore = -Infinity;
  let bestMove = null;

  for (const i of emptyCells) {
    const next = [...squares];
    next[i] = "O";
    const score = minimax(next, false);
    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }

  return bestMove;
}
