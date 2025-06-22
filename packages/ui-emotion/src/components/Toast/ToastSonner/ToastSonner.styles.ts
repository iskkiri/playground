import theme from '#src/theme/index';
import { css } from '@emotion/react';

export const toastSonnerCss = {
  global: css`
    .toast-sonner {
      padding: 10px 20px;

      display: flex;
      justify-content: center;
      gap: 4px;

      & > div[data-content] {
        ${theme.typography['P4/14r']}
      }
    }
  `,
};
