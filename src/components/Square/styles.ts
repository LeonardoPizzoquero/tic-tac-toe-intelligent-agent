import styled, { keyframes, css } from 'styled-components';

const winPosition = keyframes`
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
`;

type ContainerProps = {
  positionWon: boolean;
  gameOver: boolean;
};

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-size: 4rem;
  background: none;
  border: none;
  color: #2f136d;
  border-top: 4px solid #fff;
  border-left: 4px solid #fff;
  transition: all 0.3s;
  height: 100px;
  opacity: ${({ gameOver, positionWon }) =>
    gameOver && !positionWon ? 0.5 : 1};
  min-width: 100px;

  @media (min-width: 640px) {
    min-width: 198px;
    min-height: 200px;
    font-size: 8rem;
  }

  svg {
    ${({ gameOver, positionWon }) =>
      gameOver &&
      positionWon &&
      css`
        animation: ${winPosition} 0.8s linear infinite;
      `}
  }

  &:hover {
    background: #9264d2;
    color: #fff;
  }

  &:nth-child(-n + 2) {
    border-top: 4px solid #fff;
  }

  &:nth-child(odd) {
    border-left: 4px solid #fff;
  }

  &:nth-child(-n + 3) {
    border-top: none;
  }

  &:first-child,
  &:nth-child(3n + 1) {
    border-left: none;
  }
`;
