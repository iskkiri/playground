import theme from '#src/theme/index';
import { css } from '@emotion/react';
import { colors } from '@repo/design-tokens/colors/index.ts';

export const dialogModalCss = {
  content: css`
    color: ${colors.gray700};
    ${theme.typography['P3/16r']}
    white-space: pre-wrap;
  `,
};
