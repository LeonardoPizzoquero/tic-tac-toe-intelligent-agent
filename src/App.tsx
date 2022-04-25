import { Children, useCallback, useMemo, useState } from 'react';
import { minimax } from './utils/minimax';

import { patterns } from './utils/patterns';

import { Board } from './components/Board';
import { Score } from './components/Score';
import { Square } from './components/Square';

declare const pl: any;

function App() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [gameOver, setGameOver] = useState(false);
  const [pattern, setPattern] = useState<number[]>([]);
  const [results, setResults] = useState({
    X: 0,
    O: 0,
    draw: 0,
  });

  const session = useMemo(() => {
    return pl.create(100000);
  }, []);

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

  const hasWinner = useCallback(
    (currentBoard: string[]) => {
      const [won, player, winnerPattern] = checkWinner(currentBoard);

      if (won) {
        setResults(oldState =>
          player === 'x'
            ? { ...oldState, X: oldState.X + 1 }
            : { ...oldState, O: oldState.O + 1 },
        );

        setPattern(winnerPattern);

        setGameOver(true);
      }

      setBoard(currentBoard);

      return won;
    },
    [checkWinner],
  );

  const handleDraw = useCallback(
    (currentBoard: string[]) => {
      const tie = currentBoard.every(square => square !== '');
      const [won] = checkWinner(currentBoard);

      if (tie && !won) {
        setResults(oldState => ({ ...oldState, draw: oldState.draw + 1 }));

        setBoard(currentBoard);

        setGameOver(true);
      } else {
        return hasWinner(currentBoard);
      }

      return tie;
    },
    [checkWinner, hasWinner],
  );

  const handlePlay = useCallback(
    (index: number) => {
      if (board[index] !== '' || gameOver) return;

      const currentBoard = board.map((square, idx) =>
        index === idx ? 'x' : square,
      );

      const gameIsOver = handleDraw(currentBoard);

      if (gameIsOver) return;

      session.consult(minimax, {
        success() {
          session.query(
            `minimax([${currentBoard
              .map(position => (position === '' ? 'n' : position))
              .join()}], NextMove).`,
            {
              success() {
                session.answers((x: any) => {
                  if (!session.format_answer(x).split('=')[1]) return;

                  const nextMove = session
                    .format_answer(x)
                    .split('=')[1]
                    .replace('.', '')
                    .trim()
                    .replace('[', '')
                    .replace(']', '')
                    .split(',');

                  const newBoard = nextMove.map((position: string) =>
                    position === 'n' ? '' : position,
                  );

                  hasWinner(newBoard);
                });
              },
            },
          );
        },
      });
    },
    [board, gameOver, handleDraw, hasWinner, session],
  );

  return (
    <>
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
    </>
  );
}

export default App;
