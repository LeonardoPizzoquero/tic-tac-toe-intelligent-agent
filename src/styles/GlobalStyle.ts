import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    background: #000;
    color: #FFF;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    background-image: url('background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  button {
    cursor: pointer;
  }
`;
