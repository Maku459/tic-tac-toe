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
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice(); //squaresのコピーの配列を作成
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
    console.log(squares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status text-black">{status}</div>
      <div className="grid grid-cols-3 w-[100px]">
        {squares.map((_elm, index: number) => {
          return (
            <Square
              value={squares[index]}
              onSquareClick={() => handleClick(index)}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
}

function calculateWinner(squares: Array<string | null>): string | null {
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
      return squares[a];
    }
  }
  return null;
}
