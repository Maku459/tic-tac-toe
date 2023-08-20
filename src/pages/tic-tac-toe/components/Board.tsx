import Square from "./Square";

export default function Board({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: boolean;
  squares: Array<string | null>;
  onPlay: (nextSquares: any) => void;
}) {
  function handleClick(i: number) {
    const win = calculateWinner(squares);
    if (squares[i] || (win.winner != null && win.line != null)) {
      return;
    }
    const nextSquares = squares.slice(); //squaresのコピーの配列を作成
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const win = calculateWinner(squares);
  let line: number[] = [];
  let status;
  if (win.winner != null && win.line != null) {
    status = "Winner: " + win.winner;
    line = win.line;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="">{status}</div>
      <div className="grid grid-cols-3 w-[100px]">
        {squares.map((_elm, index: number) => {
          return (
            <Square
              value={squares[index]}
              onSquareClick={() => handleClick(index)}
              key={index}
              className={line.includes(index) ? "bg-red-300" : null}
            />
          );
        })}
      </div>
    </>
  );
}

function calculateWinner(squares: Array<string | null>): {
  winner: string | null;
  line: Array<number> | null;
} {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // 列の3箇所全ての記号が同じか比較
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // 記号を返す
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}
