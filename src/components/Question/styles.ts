import styled from "styled-components";

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

    > div {
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

    > ul {
    }
  }
`;
