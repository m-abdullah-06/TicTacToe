export default function ResetButton({ onReset }) {
  return (
    <button
      onClick={onReset}
      style={{
        padding: "10px 24px",
        fontSize: 16,
        borderRadius: 8,
        border: "none",
        background: "#6366f1",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      Restart
    </button>
  );
}
