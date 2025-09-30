"use client"
import { useState } from "react";

function Square({
  square,
  squareClickFunction,
}: {
  square: string | null;
  squareClickFunction: () => void;
}) {
  return (
    <button type="button" className="square" onClick={squareClickFunction}>
      {square}
    </button>
  );
}

function Board({
  squares,
  isX,
  onPlay,
}: {
  squares: Array<string | null>;
  isX: boolean;
  onPlay: (nextSquares: Array<string | null>) => void;
}) {
  function handleClick(num: number) {
    if (squares[num] || searchTheWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[num] = isX ? "X" : "O";

    onPlay(nextSquares);
  }

  const winner = searchTheWinner(squares);
  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isX ? "X" : "O");
  }

  return (
    <>
      <h3>{status}</h3>
      <div className="board-row">
        <Square square={squares[0]} squareClickFunction={() => handleClick(0)} />
        <Square square={squares[1]} squareClickFunction={() => handleClick(1)} />
        <Square square={squares[2]} squareClickFunction={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square square={squares[3]} squareClickFunction={() => handleClick(3)} />
        <Square square={squares[4]} squareClickFunction={() => handleClick(4)} />
        <Square square={squares[5]} squareClickFunction={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square square={squares[6]} squareClickFunction={() => handleClick(6)} />
        <Square square={squares[7]} squareClickFunction={() => handleClick(7)} />
        <Square square={squares[8]} squareClickFunction={() => handleClick(8)} />
      </div>
    </>
  );
}

function searchTheWinner(
  squares: Array<string | null>
): "X" | "O" | null {
  const condition: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < condition.length; i++) {
    const [a, b, c] = condition[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] as "X" | "O";
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState<Array<Array<string | null>>>([
    Array(9).fill(null),
  ]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const isX = currentStep % 2 === 0;
  const currentSquare: Array<string | null> = history[currentStep];

  function onAction(nextSquares: Array<string | null>) {
    const nextStep = [...history.slice(0, currentStep + 1), nextSquares];
    setHistory(nextStep);
    setCurrentStep(nextStep.length - 1);
  }

  function jumpTo(move: number) {
    setCurrentStep(move);
  }

  const info = history.map((_his, move: number) => {
    const description = move > 0 ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button type="button" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquare} isX={isX} onPlay={onAction} />
      </div>
      <div className="game-info">
        <ol>{info}</ol>
      </div>
    </div>
  );
}
