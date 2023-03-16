import { styled } from "@linaria/react";

export const Article = styled.article`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 2rem;
`;

export const Section = styled.section`
  padding: 2rem;
  border-radius: 2rem;
  box-shadow: 0 0 20px lightgray;
  font-size: 1.5rem;
  word-break: keep-all;
  font-weight: bold;
  min-height: 20rem;
  transition: box-shadow 0.5s ease;

  &:hover {
    box-shadow: 0 0 40px lightgray;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const Title = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    font-size: 1.75rem;
  }
`;
