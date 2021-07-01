import { ThemeProvider } from "styled-components";

import { Auth } from "./pages/Auth";

import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/theme";

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Auth />
    </ThemeProvider>
  );
};
