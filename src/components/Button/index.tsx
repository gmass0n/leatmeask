import {
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";
import { Spinner } from "@chakra-ui/react";

import { Container } from "./styles";

export type ButtonVariant = "danger" | "primary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOutlined?: boolean;
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const ButtonComponent: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (
  {
    children,
    variant = "primary",
    isLoading = false,
    isOutlined = false,
    ...props
  },
  ref
) => {
  return (
    <Container
      type="button"
      variant={variant}
      isOutlined={isOutlined}
      ref={ref}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </Container>
  );
};

export const Button = forwardRef(ButtonComponent);
