import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`

  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 62.5%;
  }

  body {
    width: 100%;
    height: auto;
    font-size: 1.6rem; // -> "happy rems"
    font-family: "Montserrat", sans-serif;
    background-color: #F9F9F9;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
`;

export default GlobalStyle;