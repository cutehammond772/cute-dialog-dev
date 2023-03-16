import { styled } from "@linaria/react";

export const App = styled.div`
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr minmax(5rem, auto);
  grid-template-columns: minmax(10%, 1fr) minmax(calc(768px * 0.8), 1024px) minmax(10%, 1fr);
  row-gap: 2rem;

  /* MOBILE */
  @media screen and (max-width: 768px) {
    grid-template-columns: minmax(5%, 1fr) auto minmax(5%, 1fr);
    row-gap: 4rem;
  }
`;

export const Main = styled.main`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 2rem;
`;
