import { css } from '@emotion/react';

export const fullPageLoadingCss = {
  page: css`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1000;

    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
