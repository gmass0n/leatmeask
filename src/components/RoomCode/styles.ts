import styled from "styled-components";

export const Container = styled.button`
  height: 40px;
  border-radius: 8px;

  background: ${({ theme }) => theme.colors.shape};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  overflow: hidden;

  display: flex;
  align-items: center;

  transition: filter 0.4s;

  &:hover {
    filter: brightness(0.9);
  }

  > div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background: ${({ theme }) => theme.colors.primary};
    padding: 0 12px;
  }

  span {
    flex: 1;

    display: block;
    align-self: center;

    padding: 0 12px;
    font-size: 14px;
    font-weight: 500;

    max-width: 245px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 550px) {
    height: 35px;

    > div {
      img {
        height: 18px;
      }
    }

    span {
      font-size: 12px;
    }
  }
`;
