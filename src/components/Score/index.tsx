import { FiCircle, FiX } from 'react-icons/fi';

import { Container } from './styles';

type ScoreProps = {
  player: number;
  agent: number;
  draw: number;
};

export function Score({ agent, draw, player }: ScoreProps) {
  return (
    <Container>
      <div>
        <span>
          JOGADOR (<FiX size={20} />)
        </span>
        <strong>{player}</strong>
      </div>

      <div>
        <span>EMPATES</span>
        <strong>{draw}</strong>
      </div>

      <div>
        <span>
          COMPUTADOR (<FiCircle size={16} />)
        </span>
        <strong>{agent}</strong>
      </div>
    </Container>
  );
}
