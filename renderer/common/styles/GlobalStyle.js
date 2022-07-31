import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --main: #DDD6FE;
    --darkmain: #BBC4EF;
    --white: #FFFFFF;
    --black: #000000;
    --bggray: #FAFAF9;
    --gray: #E7E5E4;
  }

  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400&display=swap');

  * {
    box-sizing: border-box;
    &:focus, &:active {
      outline: none;
    }
  }

  html {
    margin: 0;
    padding: 0;
    /* font-size: 62.5%; */
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
  }

  div,
  h1,
  h2,
  span,
  p,
  button,
  img,
  main,
  section {
    margin: 0;
    padding: 0;
    border: 0;
  }
  
  a:link, a:visited { 
    color: var(--black);
    text-decoration: none;
  }
`;

export default GlobalStyle;
