import { useState } from "react";

const STORAGE_KEY = "tictactoe_scores";

function loadScores() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { X: 0, O: 0, draws: 0 };
  } catch {
    return { X: 0, O: 0, draws: 0 };
  }
}

function saveScores(scores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

export function useScoreboard() {
  const [scores, setScores] = useState(loadScores);

  function recordResult(winner) {
    setScores((prev) => {
      const updated = {
        ...prev,
        ...(winner
          ? { [winner]: prev[winner] + 1 }
          : { draws: prev.draws + 1 }),
      };
      saveScores(updated);
      return updated;
    });
  }

  function resetScores() {
    const fresh = { X: 0, O: 0, draws: 0 };
    saveScores(fresh);
    setScores(fresh);
  }

  return { scores, recordResult, resetScores };
}
