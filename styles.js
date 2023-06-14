import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  /* ... andere Stilregeln ... */

  body {
    background-color: black;
    color: gold;
  }

  .search-bar {
    display: flex;
    align-items: center;
  }

  .search-button,
  .show-all-button {
    margin-left: 10px;
    background-color: gold;
    color: Black;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }

  
 
`;
