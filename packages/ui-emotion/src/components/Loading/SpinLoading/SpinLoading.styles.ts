import { css } from '@emotion/react';

export const spinLoadingCss = {
  block: css`
    border-radius: 50%;
    border-width: 5px;
    border: 5px solid #e5e7eb;
    border-bottom-color: #006ae6;
    animation: rotation 1s linear infinite; // animate-[rotation_1s_linear_infinite]

    /* Spin loading */
    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
};
