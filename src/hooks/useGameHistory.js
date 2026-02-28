import { useState } from "react";

export function useGameHistory() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepIndex, setStepIndex] = useState(0);

  const currentSquares = history[stepIndex];

  function pushMove(nextSquares) {
    const newHistory = history.slice(0, stepIndex + 1);
    setHistory([...newHistory, nextSquares]);
    setStepIndex(newHistory.length);
  }

  function jumpTo(step) {
    setStepIndex(step);
  }

  function resetHistory() {
    setHistory([Array(9).fill(null)]);
    setStepIndex(0);
  }

  return { history, stepIndex, currentSquares, pushMove, jumpTo, resetHistory };
}
