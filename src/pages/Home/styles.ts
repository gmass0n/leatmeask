import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: stretch;

  height: 100vh;
`;

export const LeftBox = styled.aside`
  flex: 7;
  display: flex;
  flex-direction: column;
  justify-content: center;

  overflow: hidden;

  padding: 115px 80px;

  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.heading};

  img {
    max-width: 320px;
  }

  strong {
    font: 700 36px "Poppins", sans-serif;
    margin-top: 8px;
    line-height: 42px;
    color: ${({ theme }) => theme.colors.heading};
  }

  p {
    font-size: 24px;
    line-height: 32px;
    margin-top: 16px;
    color: ${({ theme }) => theme.colors.subheading};
  }

  @media (max-width: 1000px) {
    padding: 115px 40px;

    strong {
      font-size: 32px;
    }

    p {
      font-size: 20px;
    }
  }

  @media (max-width: 880px) {
    display: none;
  }
`;

export const RightBox = styled.main`
  flex: 8;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 32px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    width: 100%;
    max-width: 320px;

    text-align: center;

    > img {
      align-self: center;
      margin-bottom: 56px;
    }

    form {
      input {
        width: 100%;
        height: 50px;
        border-radius: 8px;
        padding: 0 16px;
        color: ${({ theme }) => theme.colors.dark};
        background: ${({ theme }) => theme.colors.shape};
        border: 1px solid ${({ theme }) => theme.colors.gray};

        &::placeholder {
          color: ${({ theme }) => theme.colors.gray};
        }
      }

      button {
        width: 100%;
        margin-top: 16px;
      }
    }
  }
`;

export const Separator = styled.div`
  display: flex;
  align-items: center;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray};

  margin: 32px 0;

  &::before {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.gray};
    margin-right: 16px;
  }

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.gray};
    margin-left: 16px;
  }
`;
