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

    form {
      input {
        width: 100%;
        height: 50px;
        border-radius: 8px;
        padding: 0 16px;
        color: ${({ theme }) => theme.colors.shape};
        border: 1px solid ${({ theme }) => theme.colors.grey};
      }

      button {
        width: 100%;
        margin-top: 16px;
      }
    }
  }
`;

export const CreateRoomButton = styled.button`
  margin-top: 64px;
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background: ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.heading};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  img {
    margin-right: 8px;
    height: 22px;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

export const Separator = styled.div`
  display: flex;
  align-items: center;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey};

  margin: 32px 0;

  &::before {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.grey};
    margin-right: 16px;
  }

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.grey};
    margin-left: 16px;
  }
`;
