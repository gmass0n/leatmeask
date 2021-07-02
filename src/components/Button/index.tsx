import { ButtonHTMLAttributes, FC } from "react";
import { Spinner } from "@chakra-ui/react";

import { Container } from "./styles";

export type ButtonVariant = "danger" | "primary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOutlined?: boolean;
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  isOutlined = false,
  ...props
}) => {
  return (
    <Container
      type="button"
      variant={variant}
      isOutlined={isOutlined}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </Container>
  );
};
