export default function GameStatus({ winner, isDraw, currentPlayer }) {
  const message = winner
    ? `🎉 Player ${winner} wins!`
    : isDraw
      ? "🤝 It's a draw!"
      : `Player ${currentPlayer}'s turn`;

  return (
    <p
      role="status"
      aria-live="polite"
      style={{ fontSize: 18, fontWeight: "bold", margin: 0 }}
    >
      {message}
    </p>
  );
}
