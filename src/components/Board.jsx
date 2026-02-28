import Square from "./Square";

export default function Board({ squares, onPlay }) {
  return (
    <ol
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 90px)",
        gap: 8,
        listStyle: "none",
        padding: 0,
        margin: 0,
      }}
    >
      {squares.map((val, i) => (
        <li key={i}>
          <Square value={val} onClick={() => onPlay(i)} />
        </li>
      ))}
    </ol>
  );
}
