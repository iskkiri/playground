import theme from '#src/theme/index';
import { css } from '@emotion/react';

export const radioCss = {
  label: css`
    display: flex;
    gap: 6px;
    align-items: center;
    cursor: pointer;

    color: ${theme.colors.coolGray800};
    ${theme.typography['P3/16r']}

    input[type='radio'] {
      --radio-border: ${theme.colors.coolGray200};
      --radio-checked: ${theme.colors.main500};
      --radio-disabled: ${theme.colors.coolGray100};

      position: relative;
      margin: 1px;

      width: 24px;
      height: 24px;
      vertical-align: middle;
      cursor: pointer;

      appearance: none;
      border: 2px solid var(--radio-border);
      border-radius: 50%;

      &:checked {
        border-color: var(--radio-checked);
      }

      &:checked::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--radio-checked);
      }

      &:focus-visible {
        outline: 2px solid #4e86ff;
        outline-offset: 2px;
        border-radius: 50%;
      }
    }
  `,

  disabled: css`
    cursor: not-allowed;
    color: ${theme.colors.coolGray300};

    input[type='radio'] {
      border-color: var(--radio-disabled);

      &:disabled {
        cursor: not-allowed;
      }

      &:checked {
        border-color: var(--radio-disabled);
      }

      &:checked::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--radio-disabled);
      }
    }
  `,
};
