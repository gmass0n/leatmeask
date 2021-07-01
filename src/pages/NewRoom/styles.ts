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

  padding: 120px 80px;

  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.heading};

  img {
    max-width: 320px;
  }

  strong {
    font: 700 36px "Poppins", sans-serif;
    line-height: 42px;
    margin-top: 16px;
  }

  p {
    font-size: 24px;
    line-height: 32px;
    margin-top: 36px;
    color: ${({ theme }) => theme.colors.subheading};
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
    }

    h2 {
      font-size: 24px;
      margin: 56px 0 24px;
      font-family: "Poppins", sans-serif;
      color: ${({ theme }) => theme.colors.dark};
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
      }

      button {
        width: 100%;
        margin-top: 16px;
      }
    }

    p {
      font-size: 14px;
      color: ${({ theme }) => theme.colors.darkGray};
      margin-top: 16px;

      a {
        color: ${({ theme }) => theme.colors.secondary};

        transition: filter 0.2s;

        &:hover {
          filter: brightness(0.8);
        }
      }
    }
  }
`;
