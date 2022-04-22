import { Children, useCallback, useEffect, useState } from 'react';

import { Board } from './components/Board';
import { Score } from './components/Score';
import { Square } from './components/Square';
import { patterns } from './utils/patterns';

function App() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [gameOver, setGameOver] = useState(false);
  const [pattern, setPattern] = useState<number[]>([]);
  const [results, setResults] = useState({
    X: 0,
    O: 0,
    draw: 0,
  });

  const restartGame = useCallback(() => {
    setBoard(Array(9).fill(''));
    setGameOver(false);
    setPattern([]);
  }, []);

  const checkWinner = useCallback(
    (currentBoard: string[]): [boolean, string, number[]] => {
      let foundWinningPattern = true;
      let playerWon = '';
      let winningPattern: number[] = [];

      patterns.forEach(currPattern => {
        if (playerWon) return;

        const player = currentBoard[currPattern[0]];

        if (player === '') {
          foundWinningPattern = false;

          return;
        }

        foundWinningPattern = currPattern.every(
          idx => currentBoard[idx] === player,
        );

        if (foundWinningPattern) {
          winningPattern = currPattern;
          playerWon = player;
        }
      });

      return [foundWinningPattern, playerWon, winningPattern];
    },
    [],
  );

  const handlePlay = useCallback(
    (index: number) => {
      if (board[index] !== '' || gameOver) return;

      let currentBoard = board.map((square, idx) =>
        index === idx ? 'X' : square,
      );

      const notEmptySquares = currentBoard.reduce((previous, current, idx) => {
        if (current === '') return [...previous, idx];

        return previous;
      }, []);

      const [xWon, player, winnerPattern] = checkWinner(currentBoard);

      if (xWon) {
        setResults(oldState =>
          player === 'X'
            ? { ...oldState, X: oldState.X + 1 }
            : { ...oldState, O: oldState.O + 1 },
        );

        setBoard(currentBoard);

        setPattern(winnerPattern);

        setGameOver(true);

        return;
      }

      const randomMove =
        notEmptySquares[Math.floor(Math.random() * notEmptySquares.length)];

      currentBoard = currentBoard.map((square, idx) =>
        randomMove === idx ? 'O' : square,
      );

      const [hasWinner, winner, winningPattern] = checkWinner(currentBoard);

      if (hasWinner) {
        setResults(oldState =>
          winner === 'X'
            ? { ...oldState, X: oldState.X + 1 }
            : { ...oldState, O: oldState.O + 1 },
        );

        setGameOver(true);

        setPattern(winningPattern);
      }

      setBoard(currentBoard);
    },
    [board, checkWinner, gameOver],
  );

  useEffect(() => {
    if (!gameOver) {
      const tie = board.every(square => square !== '');

      if (tie) {
        setResults(oldState => ({ ...oldState, draw: oldState.draw + 1 }));

        setGameOver(true);
      }
    }
  }, [board, gameOver]);

  return (
    <div className="App">
      <Score agent={results.O} draw={results.draw} player={results.X} />

      <Board>
        {Children.toArray(
          board.map((value, index) => (
            <Square
              gameOver={gameOver}
              positionWon={pattern.includes(index)}
              onClick={() => (gameOver ? restartGame() : handlePlay(index))}
              value={value}
            />
          )),
        )}
      </Board>
    </div>
  );
}

export default App;
