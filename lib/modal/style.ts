import { css } from "@linaria/core";
import { styled } from "@linaria/react";

export const CLASS_MODAL_OPEN = css`
  @keyframes modal-open {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  & > * {
    animation: modal-open 0.2s ease forwards;
  }
`;

export const CLASS_MODAL_CLOSE = css`
  @keyframes modal-close {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  & > * {
    animation: modal-close 0.2s ease forwards;
  }
`;

export const CLASS_BACKDROP_OPEN = css`
  @keyframes backdrop-open {
    from {
      opacity: 0;
    }

    to {
      opacity: 0.5;
    }
  }

  &::before {
    animation: backdrop-open 0.2s ease forwards;
  }
`;

export const CLASS_BACKDROP_CLOSE = css`
  @keyframes backdrop-close {
    from {
      opacity: 0.5;
    }

    to {
      opacity: 0;
    }
  }

  &::before {
    animation: backdrop-close 0.2s ease forwards;
  }
`;

export const FADE_ALL = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: gray;
  }

  & > * {
    opacity: 0;
  }
`;

export const FADE_BACKDROP_ONLY = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: gray;
  }
`;

export const FADE_NONE = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: gray;
  }
`;
