import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
    background-color: black;
  }

  h2 {
    color: gold;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  img {
    border: 2px solid gold;
    cursor: pointer;
  }

  div {
    color: gold;
  }

  p {
    color: gold;
  }
`;
