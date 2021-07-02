import styled from "styled-components";

export const Container = styled.div`
  flex: 1;

  main {
    max-height: calc(100vh - 94px);
    overflow: auto;

    @media (max-width: 550px) {
      max-height: calc(100vh - 87px);
    }
  }
`;

export const Header = styled.header`
  padding: 24px;
  border-bottom: 1px solid #e2e2e2;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: 1120px;
    margin: 0 auto;

    > a {
      transition: all 0.4s;

      img {
        max-height: 45px;
        margin-right: 48px;

        @media (max-width: 550px) {
          max-height: 38px;
        }
      }

      &:hover {
        filter: brightness(0.8);
      }
    }

    div {
      display: flex;
      align-items: center;
      gap: 10px;

      button {
        height: 40px;

        &:last-child {
          img {
            height: 18px;
            display: none;
            margin: 0;
          }

          @media (max-width: 650px) {
            padding: 0 12px;

            img {
              display: unset;
            }

            span {
              display: none;
            }
          }
        }

        @media (max-width: 550px) {
          height: 35px;

          font-size: 12px;
        }
      }
    }
  }
`;

export const Content = styled.div`
  max-width: 800px;
  padding: 24px;
  margin: 0 auto;

  .loading-wrapper {
    display: flex;
    justify-content: center;

    margin-top: 64px;
  }

  > header {
    display: flex;
    align-items: center;

    margin-bottom: 24px;

    > div {
      margin-right: 16px;

      h1 {
        font-family: "Poppins", sans-serif;
        font-weight: 700;
        font-size: 24px;
        color: ${({ theme }) => theme.colors.dark};

        @media (max-width: 550px) {
          font-size: 20px;
        }
      }

      @media (max-width: 550px) {
        flex: 1;
      }
    }

    span {
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
        }

        > button {
          margin-bottom: 12px;
        }
      }
    }
  }

  > ul {
    margin-top: 32px;
  }
`;
