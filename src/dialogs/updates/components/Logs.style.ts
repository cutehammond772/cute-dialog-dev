import { styled } from "@linaria/react";

export const Logs = styled.div`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 2rem;
  padding-bottom: 2rem;
`;

export const Fallback = styled.div`
  height: calc(100% - 2rem);
  border-radius: 2rem;
  padding: 2rem;
  font-size: 2rem;
  font-weight: bold;
  word-break: keep-all;
  text-align: center;
  background-color: #eee;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    padding: 1.5rem;
  }
`;
