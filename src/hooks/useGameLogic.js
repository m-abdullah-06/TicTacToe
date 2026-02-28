import { useState } from "react";
import { calculateWinner } from "../utils/calculateWinner";

export function useGameLogic() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);
  const currentPlayer = isXTurn ? "X" : "O";

  function handlePlay(index) {
    if (squares[index] || winner) return;
    const next = [...squares];
    next[index] = currentPlayer;
    setSquares(next);
    setIsXTurn(!isXTurn);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsXTurn(true);
  }

  return { squares, currentPlayer, winner, isDraw, handlePlay, resetGame };
}
