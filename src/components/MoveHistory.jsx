export default function MoveHistory({ history, stepIndex, onJumpTo }) {
  return (
    <nav aria-label="Move history">
      <h2 style={{ fontSize: 14, margin: "0 0 8px", color: "#6b7280" }}>
        Move History
      </h2>
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {history.map((_, step) => (
          <li key={step}>
            <button
              onClick={() => onJumpTo(step)}
              aria-current={step === stepIndex ? "step" : undefined}
              style={{
                width: "100%",
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid #d1d5db",
                cursor: "pointer",
                background: step === stepIndex ? "#6366f1" : "transparent",
                color: step === stepIndex ? "#fff" : "inherit",
                fontSize: 13,
                textAlign: "left",
              }}
            >
              {step === 0 ? "Start" : `Move #${step}`}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
