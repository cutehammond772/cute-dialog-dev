import { styled } from "@linaria/react";

export const Footer = styled.footer`
  grid-area: 3 / 1 / 4 / 4;
  display: grid;
  grid-template-columns: inherit;
  background-color: black;
`;

export const Content = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  flex-flow: column;
  justify-content: center;
  row-gap: 1rem;
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: minmax(max-content, 10%) 1fr;
  justify-items: flex-start;
  align-items: center;
  column-gap: 0.5rem;

  & .title {
    justify-self: stretch;
    text-align: center;
    padding: 0.25rem;
    border-radius: 0.25rem;
    font-weight: bold;
    user-select: none;
    color: black;
    background-color: white;
  }

  & .content {
    font-size: 1.25rem;
    color: white;
  }

  @media screen and (max-width: 768px) {
    & .title {
      font-size: 0.75rem;
    }

    & .content {
      font-size: 1rem;
    }
  }
`;
