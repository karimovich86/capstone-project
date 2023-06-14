import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* ... andere Stilregeln ... */

  body {
    background-color: black;
    color: gold;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 20px; /* Mehr Platz zwischen den Bildern */
    &:first-child {
      margin-top: 10px; /* Verschiebung des ersten Bildes nach unten */
    }
  }

  img {
    width: 150px; /* Größeres Bild */
    height: 150px; /* Größeres Bild */
    object-fit: cover;
    border: 4px solid gold; /* Größerer Rahmen */
    border-radius: 50%;
  }

  .info-box {
    border: 10px solid gold;
    padding: 10px;
    margin-top: 10px;
  }
`;

export default GlobalStyle;



