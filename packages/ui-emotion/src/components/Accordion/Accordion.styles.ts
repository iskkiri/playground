import { css } from '@emotion/react';

export const accordionCss = {
  collapse: css`
    .rc-collapse-header {
      cursor: pointer;

      display: flex;
      flex-direction: row-reverse;
      justify-content: start;
      align-items: center;
    }

    .rc-collapse-title {
      flex: 1;
    }
  `,

  dropdown: css`
    transform: rotate(0deg);
    transition: transform 0.3s;
  `,

  dropdownActive: css`
    transform: rotate(180deg);
  `,
};
