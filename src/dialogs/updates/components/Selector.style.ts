import { styled } from "@linaria/react";

export const Selector = styled.button`
  appearance: none;
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

  @media screen and (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }
`;
