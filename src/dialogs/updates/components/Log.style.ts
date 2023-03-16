import { styled } from "@linaria/react";

export const Log = styled.div`
  font-size: 1.5rem;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 1rem;
  animation: log 0.5s ease forwards;

  @keyframes log {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Version = styled.div`
  font-size: 2rem;
  font-weight: bold;
  user-select: none;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Content = styled.div`
  padding: 1rem;
  background-color: #fff4d9;
  border-radius: 1rem;

  & * {
    word-break: keep-all;
  }

  @media screen and (max-width: 768px) {
    padding: 0.5rem;
  }
`;
