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
        <span>JOGADOR (x)</span>
        <strong>{player}</strong>
      </div>

      <div>
        <span>EMPATES</span>
        <strong>{draw}</strong>
      </div>

      <div>
        <span>AGENTE (o)</span>
        <strong>{agent}</strong>
      </div>
    </Container>
  );
}
