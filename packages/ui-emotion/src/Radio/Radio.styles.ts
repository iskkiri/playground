import { css } from '@emotion/react';
import { colors } from '@repo/design-tokens/colors/index.ts';
import { typography } from '@repo/design-tokens/typography/index.ts';

export const radioCss = {
  label: css`
    display: flex;
    gap: 6px;
    align-items: center;
    cursor: pointer;

    color: ${colors.gray800};
    ${typography['P3/16r']}

    input[type='radio'] {
      --radio-border: ${colors.gray200};
      --radio-checked: ${colors.primary};
      --radio-disabled: ${colors.gray100};

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
        outline: 2px solid ${colors.primary};
        outline-offset: 2px;
        border-radius: 50%;
      }
    }
  `,

  disabled: css`
    cursor: not-allowed;
    color: ${colors.gray300};

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
