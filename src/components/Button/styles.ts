import styled, { css } from "styled-components";

import { ButtonVariant } from ".";

interface ContainerProps {
  variant: ButtonVariant;
  isOutlined: boolean;
}

export const Container = styled.button<ContainerProps>`
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background: ${({ theme, variant }) => theme.colors[variant]};
  color: ${({ theme }) => theme.colors.heading};
  padding: 0 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  border: 0;

  transition: all 0.2s;

  ${({ isOutlined, theme, variant }) =>
    isOutlined &&
    css`
      background: ${theme.colors.shape};
      border: 1px solid ${theme.colors[variant]};
      color: ${theme.colors[variant]};
    `}

  img {
    margin-right: 8px;
    height: 22px;
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }
`;
