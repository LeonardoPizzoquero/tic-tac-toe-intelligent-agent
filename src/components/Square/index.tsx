import { ComponentPropsWithoutRef } from 'react';
import { FiCircle, FiX } from 'react-icons/fi';

import { Container } from './styles';

type SquareProps = {
  value: string;
  positionWon: boolean;
  gameOver: boolean;
} & ComponentPropsWithoutRef<'button'>;

export function Square({ value, positionWon, gameOver, ...rest }: SquareProps) {
  return (
    <Container
      type="button"
      positionWon={positionWon}
      gameOver={gameOver}
      {...rest}
    >
      {value === 'X' && <FiX />}
      {value === 'O' && <FiCircle />}
    </Container>
  );
}
