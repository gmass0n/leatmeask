import styled, { css } from "styled-components";

interface QuestionButtonProps {
  variant?: "like";
  isActive?: boolean;
}

export const Container = styled.li`
  background: ${({ theme }) => theme.colors.shape};
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

  list-style: none;

  & + & {
    margin-top: 8px;
  }

  p {
    color: ${({ theme }) => theme.colors.dark};
    line-height: 24px;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 24px;

    div:first-child {
      display: flex;
      align-items: center;

      flex: 1;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      span {
        color: ${({ theme }) => theme.colors.darkGray};
        margin-left: 8px;
        font-weight: 500;
        font-size: 14px;

        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      @media (max-width: 500px) {
        margin-right: 0;

        img {
          width: 28px;
          height: 28px;
        }
      }
    }
  }
`;

export const QuestionButton = styled.button.attrs({
  type: "button",
})<QuestionButtonProps>`
  border: 0;
  background: transparent;
  cursor: pointer;

  transition: all 0.3s;

  ${({ variant, theme, isActive }) =>
    variant === "like" &&
    css`
      display: flex;
      align-items: center;
      color: ${theme.colors.darkGray};

      span {
        margin-top: 8px;
      }

      svg {
        margin-left: 8px;
      }

      ${isActive &&
      css`
        color: ${theme.colors.primary};

        svg path {
          stroke: ${theme.colors.primary};
        }
      `}
    `}

  &:hover {
    filter: brightness(0.75);
  }
`;
