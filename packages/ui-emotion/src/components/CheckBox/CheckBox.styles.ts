import theme from '#src/theme/index';
import { css } from '@emotion/react';

export const checkBoxCss = {
  label: css`
    display: flex;
    gap: 6px;
    align-items: center;
    cursor: pointer;
    width: fit-content;

    ${theme.typography['P3/16r']}
    color: ${theme.colors.gray400};
  `,

  checked: css`
    color: ${theme.colors.gray900};
  `,

  disabled: css`
    cursor: not-allowed;
    color: ${theme.colors.gray300};
  `,

  icon: css`
    input:focus-visible + & {
      outline: 2px solid #4e86ff;
      outline-offset: 2px;
      border-radius: 4px;
    }
  `,

  iconChecked: css`
    color: ${theme.colors.primary};
  `,
};
