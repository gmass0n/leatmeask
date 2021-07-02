import { extendTheme } from "@chakra-ui/react";

// export const theme = {

// };

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    primary: "#835afd",
    secondary: "#e559f9",
    danger: "#ea4335",
    gray: "#a8a8b3",
    darkGray: "#737388",
    heading: "#fff",
    shape: "#fff",
    subheading: "#f8f8f8",
    background: "#f8f8f8",
    dark: "#29292e",
  },
});
