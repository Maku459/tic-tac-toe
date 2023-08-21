import Board from "./Board";
import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  // 現在のcurrentMoveをレンダリングする
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: Array<string | null>) {
    // その時点までの履歴だけを保持する
    // [['x', null, null ... null],['x','o', null ... null]...]
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function sort(isAscending: boolean) {
    setIsAscending(!isAscending);
  }

  const moves = history.map((squares, move): JSX.Element => {
    let location = "";
    if (move > 0) {
      // 1つ前のhistoryを確認して、内容に差分があるindexを特定する
      const index = history[move - 1].findIndex((e, i) => e !== squares[i]);
      // indexから着手場所の位置を計算し，表示したい文字列でlocationを上書きする
      location =
        " (" + ((index % 3) + 1) + "," + (Math.floor(index / 3) + 1) + ")";
    }
    if (move === currentMove) {
      return (
        <li key={move}>
          <b>{"You are at move #" + move}</b>
        </li>
      );
    }
    const description =
      move > 0 ? "Go to move #" + move + location : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const reverseMoves = [...moves].reverse();

  return (
    <div className="text-black">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div className="mb-4">
          <button onClick={() => sort(isAscending)}>
            Sort: {isAscending ? "Ascending" : "Descending"}
          </button>
        </div>
        <ol>{isAscending ? moves : reverseMoves}</ol>
      </div>
    </div>
  );
}
