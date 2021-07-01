import { ButtonHTMLAttributes } from "react";
import { Spinner } from "@chakra-ui/react";

import { Container } from "./styles";

export type ButtonVariant = "danger" | "primary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  ...props
}) => {
  return (
    <Container type="button" variant={variant} {...props}>
      {isLoading ? <Spinner /> : children}
    </Container>
  );
};
