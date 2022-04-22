import { ReactNode } from 'react';

import { Container } from './styles';

type BoardProps = {
  children: ReactNode;
};

export function Board({ children }: BoardProps) {
  return <Container>{children}</Container>;
}
