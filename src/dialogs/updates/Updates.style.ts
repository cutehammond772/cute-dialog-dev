import { styled } from "@linaria/react";

export const Body = styled.div`
  position: absolute;
  max-width: 768px;
  max-height: 80%;
  inset: 0;
  margin: auto;
  border-radius: 2rem;
  box-shadow: 0 0 25px darkgray;
  padding: 2rem;
  padding-bottom: 0;
  background-color: white;

  @media screen and (max-width: 768px) {
    margin-bottom: 0;
    border-radius: 2rem 2rem 0 0;
  }
`;

export const Area = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: flex-start;
  row-gap: 5rem;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 768px) {
    row-gap: 2.5rem;
  }
`;

export const Header = styled.div`
  position: sticky;
  top: 0;
  user-select: none;
  background-color: white;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr auto;
  row-gap: 1rem;
  padding-bottom: 1rem;
  align-items: flex-start;
  z-index: 1;

  /* TITLE */
  & > :nth-child(1) {
    grid-area: 1 / 1 / 2 / 2;
  }

  /* CLOSE */
  & > :nth-child(2) {
    grid-area: 1 / 3 / 2 / 4;
  }

  /* MENU */
  & > :nth-child(3) {
    grid-area: 2 / 1 / 3 / 4;
  }
`;

export const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Close = styled.button`
  appearance: none;
  font: inherit;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  background-color: navy;
  color: white;
`;
