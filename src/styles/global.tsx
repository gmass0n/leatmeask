import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body, #root {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.dark};
  }

  body, #root, input, button, textarea {
    font-size: 16px;
    font-family: "Roboto", sans-serif;
  }
`;
