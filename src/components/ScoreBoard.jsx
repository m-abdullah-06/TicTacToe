export default function Scoreboard({ scores, onReset }) {
  return (
    <aside
      aria-label="Scoreboard"
      style={{ display: "flex", gap: 24, alignItems: "center" }}
    >
      <ScoreItem label="X" value={scores.X} color="#2563eb" />
      <ScoreItem label="Draws" value={scores.draws} color="#6b7280" />
      <ScoreItem label="O" value={scores.O} color="#db2777" />
      <button
        onClick={onReset}
        aria-label="Reset scoreboard"
        style={{
          fontSize: 12,
          padding: "4px 10px",
          borderRadius: 6,
          border: "1px solid #d1d5db",
          cursor: "pointer",
          background: "transparent",
        }}
      >
        Reset
      </button>
    </aside>
  );
}

function ScoreItem({ label, value, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ margin: 0, fontWeight: "bold", color, fontSize: 22 }}>
        {value}
      </p>
      <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{label}</p>
    </div>
  );
}
