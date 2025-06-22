import theme from '#src/theme/index';
import { css } from '@emotion/react';

export const dialogModalCss = {
  title: css`
    text-align: center;
  `,

  content: css`
    color: ${theme.colors.coolGray700};
    ${theme.typography['P3/16r']}
    white-space: pre-wrap;
  `,
};
