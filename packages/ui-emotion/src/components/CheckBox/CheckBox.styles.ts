import { css } from '@emotion/react';

export const checkBoxCss = {
  label: css`
    display: flex;
    gap: 6px;
    align-items: center;
    cursor: pointer;
    width: fit-content;

    color: #21272a;
    font-size: 16px;
    font-style: normal;
    line-height: 22px; /* 137.5% */
    letter-spacing: -0.3px;
    font-weight: 400;
  `,

  icon: css`
    input:focus-visible + & {
      outline: 2px solid #4e86ff;
      outline-offset: 2px;
      border-radius: 4px;
    }
  `,
};
