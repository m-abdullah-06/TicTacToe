import { useEffect } from "react";
import { getBestMove } from "../utils/minimax";
import { calculateWinner } from "../utils/calculateWinner";

export function useAI({ isAIEnabled, squares, isXTurn, onPlay }) {
  useEffect(() => {
    if (!isAIEnabled) return;
    if (isXTurn) return;
    if (calculateWinner(squares) || squares.every(Boolean)) return;

    const timeout = setTimeout(() => {
      const bestMove = getBestMove(squares);
      if (bestMove !== null) onPlay(bestMove);
    }, 400);

    return () => clearTimeout(timeout);
  }, [isAIEnabled, squares, isXTurn, onPlay]);
}
