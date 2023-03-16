import { css } from "@linaria/core";

export const area = css`
  @import "https://fonts.googleapis.com/css2?family=Inter&display=swap";
  @import "https://fonts.googleapis.com/earlyaccess/notosanskr.css";

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  & * {
    pointer-events: initial;
  }

  :global() {
    html {
      box-sizing: border-box;
      font-family: Inter, "Noto Sans KR", sans-serif;
    }

    body {
      margin: 0;
      padding: 0;
      min-height: 100vh;
    }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  }
`;
