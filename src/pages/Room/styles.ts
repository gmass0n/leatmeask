import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.header`
  padding: 24px;
  border-bottom: 1px solid #e2e2e2;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: 1120px;
    margin: 0 auto;

    > img {
      max-height: 45px;
      margin-right: 48px;

      @media (max-width: 550px) {
        max-height: 38px;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 800px;
  padding: 24px;
  margin: 0 auto;

  > header {
    display: flex;
    align-items: center;

    margin-bottom: 24px;

    > div {
      flex: 1;
      margin-right: 24px;

      h1 {
        font-family: "Poppins", sans-serif;
        font-weight: 700;
        font-size: 24px;
        color: ${({ theme }) => theme.colors.dark};

        @media (max-width: 550px) {
          font-size: 20px;
        }
      }
    }

    span {
      margin-left: 16px;
      background: ${({ theme }) => theme.colors.secondary};
      border-radius: 9999px;
      padding: 8px 16px;
      color: ${({ theme }) => theme.colors.heading};
      font-weight: 500;
      font-size: 14px;

      @media (max-width: 550px) {
        font-size: 12px;
      }
    }
  }

  > form {
    textarea {
      width: 100%;
      border: 0;
      padding: 16px;
      border-radius: 8px;
      color: ${({ theme }) => theme.colors.dark};
      background: ${({ theme }) => theme.colors.shape};
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
      resize: vertical;
      min-height: 130px;

      &::placeholder {
        color: ${({ theme }) => theme.colors.gray};
      }
    }

    > footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin-top: 12px;

      > div {
        display: flex;
        align-items: center;

        flex: 1;
        margin-right: 24px;

        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        span {
          color: ${({ theme }) => theme.colors.dark};
          margin-left: 8px;
          font-weight: 500;
          font-size: 14px;

          max-width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      > span {
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.darkGray};

        button {
          background: none;
          border: none;
          color: ${({ theme }) => theme.colors.primary};
          text-decoration: underline;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;

          transition: filter 0.3s;

          &:hover {
            filter: brightness(0.8);
          }
        }
      }

      @media (max-width: 500px) {
        justify-content: flex-start;
        align-items: stretch;
        flex-direction: column-reverse;

        > div {
          margin-right: 0;

          img {
            width: 28px;
            height: 28px;
          }

          span {
            font-size: 14px;
          }
        }

        > button {
          margin-bottom: 12px;
        }
      }
    }
  }
`;
