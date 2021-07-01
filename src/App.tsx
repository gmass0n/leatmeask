import { ThemeProvider } from "styled-components";

import { NewRoom } from "./pages/NewRoom";

import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/theme";

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <NewRoom />
    </ThemeProvider>
  );
};
