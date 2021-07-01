import { ThemeProvider } from "styled-components";

import { Routes } from "./routes";

import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/theme";

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Routes />
    </ThemeProvider>
  );
};
