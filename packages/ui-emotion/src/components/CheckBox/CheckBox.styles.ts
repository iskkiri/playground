import { css } from '@emotion/react';
import { colors } from '@repo/design-tokens/colors/index.ts';
import { typography } from '@repo/design-tokens/typography/index.ts';

export const checkBoxCss = {
  label: css`
    display: flex;
    gap: 6px;
    align-items: center;
    cursor: pointer;
    width: fit-content;

    ${typography['P3/16r']}
    color: ${colors.gray400};
  `,

  checked: css`
    color: ${colors.gray900};
  `,

  disabled: css`
    cursor: not-allowed;
    color: ${colors.gray300};
  `,

  icon: css`
    input:focus-visible + & {
      outline: 2px solid ${colors.primary};
      outline-offset: 2px;
      border-radius: 4px;
    }
  `,

  iconChecked: css`
    color: ${colors.primary};
  `,
};
