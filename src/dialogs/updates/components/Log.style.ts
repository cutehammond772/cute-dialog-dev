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
`;

export const Version = styled.div`
  font-size: 2rem;
  font-weight: bold;
  user-select: none;
`;

export const Content = styled.div`
  padding: 1rem;
  background-color: #fff4d9;
  border-radius: 1rem;

  & * {
    word-break: keep-all;
  }
`;
