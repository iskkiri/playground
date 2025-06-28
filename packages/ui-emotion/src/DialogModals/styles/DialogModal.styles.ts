import { css } from '@emotion/react';
import { colors } from '@repo/design-tokens/colors/index.ts';
import { typography } from '@repo/design-tokens/typography/index.ts';

export const dialogModalCss = {
  content: css`
    color: ${colors.gray700};
    ${typography['P3/16r']}
    white-space: pre-wrap;
  `,
};
