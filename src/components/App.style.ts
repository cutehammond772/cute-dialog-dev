import { styled } from "@linaria/react";

export const App = styled.div`
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-rows: 5rem 1fr 10rem;
  grid-template-columns: 1fr minmax(auto, 1024px) 1fr;
  row-gap: 2rem;
`;

export const Main = styled.main`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 2rem;
`;
