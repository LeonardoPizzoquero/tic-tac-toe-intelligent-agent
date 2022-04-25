import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 1rem;
  background-color: #2f136d;
  border-radius: 8px;
  padding: 1rem;
  border: 4px solid #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > span {
      font-family: 'Roboto', sans-serif;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    > strong {
      font-size: 1.5rem;
      font-weight: bold;
      display: block;
      margin-top: 0.5rem;
      line-height: 1.5rem;
    }
  }

  @media (min-width: 640px) {
    gap: 3rem;

    > div {
      > span {
        font-size: 1.25rem;
      }

      > strong {
        font-size: 2rem;
        line-height: 1.5rem;
      }
    }
  }
`;
