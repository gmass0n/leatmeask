import styled from "styled-components";

export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 64px;

  h1 {
    font-size: 24px;
    line-height: 34px;
    color: ${({ theme }) => theme.colors.dark};
    font-weight: 700;
    font-family: "Poppins", sans-serif;
    margin-top: 24px;
  }

  p {
    margin-top: 12px;
    color: ${({ theme }) => theme.colors.darkGray};
    line-height: 26px;
    font-family: "Roboto", sans-serif;
    text-align: center;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 8px;

    margin-top: 40px;

    button:first-child {
      background: ${({ theme }) => theme.colors.lightGray};
      color: ${({ theme }) => theme.colors.darkGray};
    }
  }
`;
