import styled, { css } from "styled-components";

interface ContainerProps {
  isHighlighted: boolean;
  isAnswered: boolean;
}
interface QuestionButtonProps {
  variant?: "like";
  isActive?: boolean;
}

export const Container = styled.li<ContainerProps>`
  background: ${({ theme }) => theme.colors.shape};
  border: 1px solid ${({ theme }) => theme.colors.shape};
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

  list-style: none;

  transition: all 0.3s;

  ${({ theme, isHighlighted, isAnswered }) =>
    isHighlighted &&
    !isAnswered &&
    css`
      border-color: ${theme.colors.primary};
      background-color: ${theme.colors.lightPrimary};
    `}

  ${({ theme, isAnswered }) =>
    isAnswered &&
    css`
      border-color: ${theme.colors.lightGray};
      background-color: ${theme.colors.lightGray};
    `}

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

        ${({ isAnswered }) =>
          isAnswered &&
          css`
            filter: grayscale(1) opacity(0.6);
          `}
      }

      span {
        margin-left: 8px;
        font-weight: 500;
        font-size: 14px;

        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        color: ${({ theme, isHighlighted, isAnswered }) =>
          isHighlighted && !isAnswered
            ? theme.colors.dark
            : theme.colors.darkGray};
      }

      @media (max-width: 500px) {
        margin-right: 0;

        img {
          width: 28px;
          height: 28px;
        }
      }
    }

    div:last-child {
      display: flex;
      align-items: center;
    }
  }
`;

export const QuestionButton = styled.button.attrs({
  type: "button",
})<QuestionButtonProps>`
  display: flex;
  align-items: center;

  border: 0;
  background: transparent;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.darkGray};

  transition: all 0.3s;

  & + button {
    margin-left: 16px;
  }

  span {
    margin-top: 8px;
    margin-right: 8px;
  }

  ${({ isActive, theme }) =>
    isActive &&
    css`
      span {
        color: ${theme.colors.primary};
      }

      svg path {
        stroke: ${theme.colors.primary};
      }
    `}

  &:hover {
    filter: brightness(0.75);
  }
`;
