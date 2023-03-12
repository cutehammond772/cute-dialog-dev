import { styled } from "@linaria/react";

export const Header = styled.header`
  grid-area: 1 / 1 / 2 / 4;
  display: grid;
  grid-template-columns: inherit;
`;

export const Content = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

export const Title = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  column-gap: 1rem;
  line-height: 100%;
  white-space: nowrap;
  user-select: none;

  & .main {
    font-weight: bold;
    font-size: 1.5rem;
  }

  & .version {
    font-weight: bold;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: bisque;
  }
`;

export const Menu = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  column-gap: 1rem;
  justify-content: flex-end;
  align-items: center;
  line-height: 100%;
  list-style-type: none;

  & a {
    text-decoration: none;
    color: black;
  }
`;

export const GitHub = styled.a`
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  color: white !important;
  background-color: navy;
`;
