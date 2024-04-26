import useTicTacToe from "../hooks/useTicTacToe";

const TicTacToe = ({ size }: { size: number }) => {
  const { board, resetGame, getStatusMessage, handleClick, calculateWinner } =
    useTicTacToe(size);
  const result = calculateWinner(board);
  const winningPattern = result?.winningPattern;
  return (
    <div style={{ maxWidth: `calc(${size} * 100px)` }} className="game">
      <div className="status">
        <span>{getStatusMessage()}</span>
        <button onClick={resetGame} className="reset-button">
          Reset Game
        </button>
      </div>
      <div
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
        className="board"
      >
        {board.map((b, index) => {
          if (!winningPattern)
            return (
              <button
                onClick={() => handleClick(index)}
                className="cell"
                key={index}
                disabled={b !== null}
              >
                {b}
              </button>
            );
          return (
            <button
              onClick={() => handleClick(index)}
              className={winningPattern.includes(index) ? "win-cell" : "cell"}
              key={index}
              disabled={b !== null}
            >
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TicTacToe;
