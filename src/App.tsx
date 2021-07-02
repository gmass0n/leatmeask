import { ThemeProvider } from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "./hooks/auth";

import { Routes } from "./routes";

import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/themes";
import { chakraTheme } from "./styles/themes/chakra";

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider theme={chakraTheme}>
        <AuthProvider>
          <GlobalStyle />

          <Routes />
        </AuthProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
};
