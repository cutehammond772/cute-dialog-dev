import { styled } from "@linaria/react";

export const Selector = styled.button`
  font: inherit;
  cursor: pointer;
  border: none;
  background-color: lightgray;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: lightgreen;
  }

  &.selected {
    background-color: lightgreen;
  }
`;
