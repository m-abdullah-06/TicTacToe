import { useEffect, useRef, useState } from "react";
import { useGameLogic } from "./hooks/useGameLogic";
import { useGameHistory } from "./hooks/useGameHistory";
import { useScoreboard } from "./hooks/Usescoreboard";
import { useTheme } from "./hooks/useTheme";
import { useAI } from "./hooks/useai";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0c0c11; --surface: #16161f; --surface2: #1e1e2a; --border: #2a2a3d;
    --accent: #e63946; --accent2: #4cc9f0; --text: #ececf4; --muted: #5a5a78;
    --win: #06d6a0; --radius: 14px; --tr: 0.22s cubic-bezier(0.4,0,0.2,1);
  }
  [data-theme="light"] {
    --bg: #f0f0f6; --surface: #ffffff; --surface2: #e8e8f2;
    --border: #d2d2e8; --text: #0c0c11; --muted: #9090b0;
  }
  body { background: var(--bg); color: var(--text); font-family: 'DM Mono', monospace; min-height: 100vh; transition: background .3s, color .3s; }

  .ttt-app { max-width: 980px; margin: 0 auto; padding: 28px 20px; display: flex; flex-direction: column; gap: 28px; }
  .ttt-header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 20px; border-bottom: 1px solid var(--border); }
  .ttt-logo { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 5vw, 3rem); letter-spacing: 5px; background: linear-gradient(130deg, var(--accent), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

  .ttt-main { display: grid; grid-template-columns: 1fr 280px; gap: 24px; align-items: start; }
  @media (max-width: 680px) { .ttt-main { grid-template-columns: 1fr; } }

  .ttt-left { display: flex; flex-direction: column; gap: 16px; }

  .ttt-status { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .ttt-status-text { font-size: 0.95rem; }
  .ttt-status-text .hl { color: var(--accent2); font-weight: 500; }
  .ttt-status-text.is-win .hl { color: var(--win); }
  .ttt-badge { font-size: 0.72rem; color: var(--muted); background: var(--surface2); border: 1px solid var(--border); border-radius: 20px; padding: 4px 12px; white-space: nowrap; }

  .ttt-board { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; aspect-ratio: 1; list-style: none; padding: 0; }
  .ttt-cell { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.4rem, 7vw, 4rem); cursor: pointer; transition: var(--tr); user-select: none; width: 100%; aspect-ratio: 1; }
  .ttt-cell:hover:not(.is-filled):not(.is-disabled) { background: var(--surface2); border-color: var(--accent2); transform: scale(1.04); }
  .ttt-cell.is-filled, .ttt-cell.is-disabled { cursor: default; }
  .ttt-cell.is-x { color: var(--accent); }
  .ttt-cell.is-o { color: var(--accent2); }
  .ttt-cell.is-win { background: color-mix(in srgb, var(--win) 12%, var(--surface)); border-color: var(--win); animation: winPulse .7s ease; }
  .ttt-cell.is-pop { animation: cellPop .28s cubic-bezier(0.34,1.56,0.64,1); }

  @keyframes cellPop { from { transform: scale(.55); opacity: .4; } to { transform: scale(1); opacity: 1; } }
  @keyframes winPulse { 0%,100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--win) 45%, transparent); } 50% { box-shadow: 0 0 0 10px color-mix(in srgb, var(--win) 0%, transparent); } }

  .ttt-controls { display: flex; gap: 10px; }
  .ttt-btn { flex: 1; padding: 12px 10px; border-radius: var(--radius); border: 1px solid var(--border); background: var(--surface); color: var(--text); font-family: 'DM Mono', monospace; font-size: 0.82rem; cursor: pointer; transition: var(--tr); letter-spacing: .5px; }
  .ttt-btn:hover { background: var(--surface2); border-color: var(--accent2); }
  .ttt-btn.is-primary { background: var(--accent); border-color: var(--accent); color: #fff; }
  .ttt-btn.is-primary:hover { opacity: .88; }
  .ttt-btn.is-active { background: color-mix(in srgb, var(--accent2) 18%, var(--surface)); border-color: var(--accent2); color: var(--accent2); }
  .ttt-btn.is-icon { flex: 0 0 auto; padding: 11px 15px; font-size: 1.05rem; }

  .ttt-sidebar { display: flex; flex-direction: column; gap: 16px; }
  .ttt-panel { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
  .ttt-panel-hd { padding: 10px 16px; background: var(--surface2); border-bottom: 1px solid var(--border); font-size: 0.68rem; letter-spacing: 2.5px; color: var(--muted); text-transform: uppercase; }

  .ttt-scores { display: grid; grid-template-columns: repeat(3, 1fr); }
  .ttt-score-col { padding: 18px 8px; text-align: center; border-right: 1px solid var(--border); }
  .ttt-score-col:last-child { border-right: none; }
  .ttt-score-lbl { font-size: .62rem; color: var(--muted); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; }
  .ttt-score-val { font-family: 'Bebas Neue', sans-serif; font-size: 2.2rem; line-height: 1; }
  .ttt-score-col.is-x .ttt-score-val { color: var(--accent); }
  .ttt-score-col.is-d .ttt-score-val { color: var(--muted); }
  .ttt-score-col.is-o .ttt-score-val { color: var(--accent2); }
  .ttt-score-reset { display: block; width: 100%; padding: 10px; background: transparent; border: none; border-top: 1px solid var(--border); color: var(--muted); font-family: 'DM Mono', monospace; font-size: .75rem; cursor: pointer; transition: var(--tr); letter-spacing: 1px; }
  .ttt-score-reset:hover { background: var(--surface2); color: var(--text); }

  .ttt-history { max-height: 300px; overflow-y: auto; }
  .ttt-history::-webkit-scrollbar { width: 4px; }
  .ttt-history::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
  .ttt-history-row { padding: 9px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; font-size: .78rem; cursor: pointer; transition: var(--tr); color: var(--muted); }
  .ttt-history-row:last-child { border-bottom: none; }
  .ttt-history-row:hover { background: var(--surface2); }
  .ttt-history-row.is-active { background: color-mix(in srgb, var(--accent2) 10%, var(--surface)); color: var(--text); }
  .ttt-history-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); flex-shrink: 0; }
  .ttt-history-row.is-active .ttt-history-dot { background: var(--accent2); }
  .ttt-empty { padding: 22px 16px; text-align: center; color: var(--muted); font-size: .8rem; }
`;

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function getWinLine(squares) {
  for (const [a, b, c] of WIN_LINES)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return [a, b, c];
  return [];
}

export default function App() {
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [popIdx, setPopIdx] = useState(null);

  const {
    squares,
    currentPlayer,
    winner,
    isDraw,
    isXTurn,
    handlePlay,
    resetGame,
    loadSquares,
  } = useGameLogic();
  const { history, stepIndex, pushMove, jumpTo, resetHistory } =
    useGameHistory();
  const { scores, recordResult, resetScores } = useScoreboard();
  const { isDark, toggleTheme } = useTheme();

  useAI({
    isAIEnabled,
    squares,
    isXTurn,
    onPlay: (i) => {
      setPopIdx(i);
      handlePlay(i);
    },
  });

  const recordedRef = useRef(false);
  useEffect(() => {
    if (!recordedRef.current && (winner || isDraw)) {
      recordResult(winner ?? null);
      recordedRef.current = true;
    }
  }, [winner, isDraw, recordResult]);

  useEffect(() => {
    if (!squares.every((s) => s === null)) pushMove([...squares]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squares]);

  function handleReset() {
    resetGame();
    resetHistory();
    recordedRef.current = false;
    setPopIdx(null);
  }

  function handleJumpTo(step) {
    jumpTo(step);
    loadSquares(history[step]);
    recordedRef.current = false;
  }

  function handleCellClick(i) {
    if (squares[i] || winner || isDraw || (!isXTurn && isAIEnabled)) return;
    setPopIdx(i);
    handlePlay(i);
  }

  const winLine = getWinLine(squares);

  let statusText,
    statusClass = "";
  if (winner) {
    statusClass = "is-win";
    statusText = (
      <>
        <span className="hl">{winner}</span> wins!
      </>
    );
  } else if (isDraw) {
    statusClass = "is-win";
    statusText = <span className="hl">Draw!</span>;
  } else if (isAIEnabled && !isXTurn) {
    statusText = (
      <>
        <span className="hl">AI</span> is thinking…
      </>
    );
  } else {
    statusText = (
      <>
        Turn: <span className="hl">{currentPlayer}</span>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>
      <div className="ttt-app">
        <header className="ttt-header">
          <div className="ttt-logo">Tic Tac Toe</div>
          <button
            className="ttt-btn ttt-btn is-icon"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {isDark ? "☀" : "☾"}
          </button>
        </header>

        <div className="ttt-main">
          <div className="ttt-left">
            {/* Status */}
            <div className="ttt-status">
              <span className={`ttt-status-text ${statusClass}`}>
                {statusText}
              </span>
              <span className="ttt-badge">
                {isAIEnabled ? "vs AI (Minimax)" : "2 Players"}
              </span>
            </div>

            {/* Board */}
            <ol className="ttt-board">
              {squares.map((val, i) => (
                <li key={i}>
                  <button
                    className={[
                      "ttt-cell",
                      val ? "is-filled" : "",
                      !isXTurn && isAIEnabled && !winner && !isDraw
                        ? "is-disabled"
                        : "",
                      val === "X" ? "is-x" : val === "O" ? "is-o" : "",
                      winLine.includes(i) ? "is-win" : "",
                      popIdx === i ? "is-pop" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => handleCellClick(i)}
                    aria-label={
                      val ? `Cell taken by ${val}` : `Empty cell ${i + 1}`
                    }
                  >
                    {val}
                  </button>
                </li>
              ))}
            </ol>

            {/* Controls */}
            <div className="ttt-controls">
              <button className="ttt-btn is-primary" onClick={handleReset}>
                New Game
              </button>
              <button
                className={`ttt-btn ${isAIEnabled ? "is-active" : ""}`}
                onClick={() => {
                  setIsAIEnabled((v) => !v);
                  handleReset();
                }}
              >
                {isAIEnabled ? "VS AI" : "2 Players"}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="ttt-sidebar">
            <div className="ttt-panel">
              <div className="ttt-panel-hd">Scoreboard</div>
              <div className="ttt-scores">
                <div className="ttt-score-col is-x">
                  <div className="ttt-score-lbl">Player X</div>
                  <div className="ttt-score-val">{scores.X ?? 0}</div>
                </div>
                <div className="ttt-score-col is-d">
                  <div className="ttt-score-lbl">Draws</div>
                  <div className="ttt-score-val">{scores.draws ?? 0}</div>
                </div>
                <div className="ttt-score-col is-o">
                  <div className="ttt-score-lbl">
                    {isAIEnabled ? "AI O" : "Player O"}
                  </div>
                  <div className="ttt-score-val">{scores.O ?? 0}</div>
                </div>
              </div>
              <button className="ttt-score-reset" onClick={resetScores}>
                ↺ Reset Scores
              </button>
            </div>

            <div className="ttt-panel">
              <div className="ttt-panel-hd">Move History</div>
              <div className="ttt-history">
                {history.length <= 1 ? (
                  <div className="ttt-empty">No moves yet</div>
                ) : (
                  history.map((_, step) => (
                    <div
                      key={step}
                      className={`ttt-history-row ${step === stepIndex ? "is-active" : ""}`}
                      onClick={() => handleJumpTo(step)}
                    >
                      <span>{step === 0 ? "Start" : `Move #${step}`}</span>
                      <span className="ttt-history-dot" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
