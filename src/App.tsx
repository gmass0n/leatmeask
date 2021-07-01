import { ThemeProvider } from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "./hooks/auth";

import { Routes } from "./routes";

import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/theme";

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <AuthProvider>
          <GlobalStyle />

          <Routes />
        </AuthProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
};
