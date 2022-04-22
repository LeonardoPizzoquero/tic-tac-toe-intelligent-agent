import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 3rem;
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
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    > strong {
      font-family: 'Roboto', sans-serif;
      font-size: 2rem;
      font-weight: bold;
      display: block;
      margin-top: 0.5rem;
      line-height: 1.5rem;
    }
  }
`;
