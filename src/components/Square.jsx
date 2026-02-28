export default function Square({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={value ? `Cell taken by ${value}` : "Empty cell"}
      style={{
        width: 90,
        height: 90,
        fontSize: 36,
        fontWeight: "bold",
        cursor: "pointer",
        border: "2px solid #6366f1",
        borderRadius: 8,
        background:
          value === "X" ? "#dbeafe" : value === "O" ? "#fce7f3" : "#fff",
        color: value === "X" ? "#2563eb" : "#db2777",
      }}
    >
      {value}
    </button>
  );
}
