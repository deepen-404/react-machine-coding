import { useState } from "react";

const initialBoard = (size: number) => Array(size * size).fill(null);
const useTicTacToe = (size: number) => {
  const [board, setBoard] = useState(initialBoard(size));
  const [isXNext, setIsXNext] = useState(true);

  const generateWinningPatterns = (size: number) => {
    const patterns = [];

    // Generate row patterns
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(i * size + j);
      }
      patterns.push(row);
    }

    // Generate column patterns
    for (let i = 0; i < size; i++) {
      const col = [];
      for (let j = 0; j < size; j++) {
        col.push(j * size + i);
      }
      patterns.push(col);
    }

    // Generate diagonal patterns
    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < size; i++) {
      diag1.push(i * size + i);
      diag2.push(i * size + (size - i - 1));
    }
    patterns.push(diag1, diag2);

    return patterns;
  };

  const WINNING_PATTERNS = generateWinningPatterns(size);

  const calculateWinner = (currentBoard: number[][]) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const singlePattern = WINNING_PATTERNS[i];
      const firstCell = currentBoard[singlePattern[0]];
      if (
        firstCell &&
        singlePattern.every((index) => currentBoard[index] === firstCell)
      ) {
        return { winner: firstCell, winningPattern: singlePattern };
      }
    }
    return null;
  };

  const result = calculateWinner(board);
  const winner = result?.winner;

  const handleClick = (index: number) => {
    if (winner || board[index]) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "0";
    setBoard(newBoard);
    setIsXNext((prev) => !prev);
  };

  const getStatusMessage = () => {
    if (winner) return `Player ${winner} wins!!`;
    if (!board.includes(null)) return "It's a draw!";
    return isXNext ? "Player X Turn" : "Player 0 Turn";
  };

  const resetGame = () => setBoard(initialBoard(size));

  return { board, handleClick, getStatusMessage, resetGame, calculateWinner };
};
export default useTicTacToe;
