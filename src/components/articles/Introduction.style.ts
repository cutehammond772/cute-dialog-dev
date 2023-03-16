import { styled } from "@linaria/react";
import Article from "@dev/components/Article";

export const Introduction = styled(Article)`
  display: grid;
  grid-template-rows: 1fr 3rem;
  row-gap: 3rem;

  @media screen and (max-width: 768px) {
    grid-template-rows: 1fr 2.5rem;
  }
`;

export const Content = styled.div`
  font-size: inherit;
  font-weight: inherit;
`;

export const UpdateLog = styled.button`
  appearance: none;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font: inherit;
  font-size: 1.25rem;
  line-height: 100%;
  text-align: left;
  background-color: lightgreen;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;
