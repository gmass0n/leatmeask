import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body, #root, html {
    display: flex;
    flex-direction: column;

    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.dark};
    width: 100%;
    height: 100%;
  }

  body, #root, html, input, button, textarea {
    font-size: 16px;
    font-family: "Roboto", sans-serif;
  }
`;
