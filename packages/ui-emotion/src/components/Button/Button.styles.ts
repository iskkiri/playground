import { css } from '@emotion/react';
import { colors } from '@repo/design-tokens/colors/index.ts';
import { typography } from '@repo/design-tokens/typography/index.ts';

export const buttonSize = {
  32: css`
    height: 32px;
    padding: 0px 12px;
    gap: 2px;
    border-radius: 8px;
    ${typography['P5/12b']};
  `,
  40: css`
    height: 40px;
    padding: 0px 16px;
    gap: 4px;
    border-radius: 10px;
    ${typography['P4/14b']};
  `,
  48: css`
    height: 48px;
    padding: 0px 20px;
    gap: 6px;
    border-radius: 12px;
    ${typography['P3/16b']};
  `,
  56: css`
    height: 56px;
    padding: 0px 22px;
    gap: 8px;
    border-radius: 13px;
    ${typography['P2/18b']};
  `,
  64: css`
    height: 64px;
    padding: 0px 24px;
    gap: 12px;
    border-radius: 14px;
    ${typography['P1/20b']};
  `,
};

export const buttonTypeCss = {
  primary: css`
    background: ${colors.primary};
    border: 1px solid ${colors.primary};
    color: ${colors.white};

    &:hover {
      background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.12) 100%), ${colors.primary};
    }

    &:disabled {
      background: ${colors.gray100};
      color: ${colors.gray300};
    }
  `,

  linePrimary: css`
    border: 1px solid ${colors.primary};
    background: transparent;
    color: ${colors.primary};

    &:hover {
      border: 1px solid ${colors.primaryHover};
      color: ${colors.primaryHover};
    }

    &:disabled {
      border-color: ${colors.gray100};
      background: ${colors.gray50};
      color: ${colors.gray200};
    }
  `,

  gray: css`
    background: ${colors.gray50};
    border: 1px solid ${colors.gray50};
    color: ${colors.gray500};

    &:hover {
      background: ${colors.gray100};
    }

    &:disabled {
      background: ${colors.gray100};
      color: ${colors.gray300};
    }
  `,

  danger: css`
    background: ${colors.danger};
    border: 1px solid ${colors.danger};
    color: ${colors.white};

    &:hover {
      background: ${colors.dangerHover};
    }

    &:disabled {
      background: ${colors.gray100};
      color: ${colors.gray300};
    }
  `,

  none: css``,
};

export const buttonCss = {
  button: css`
    /* default size */
    ${buttonSize[48]}
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    color: ${colors.gray800};
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  `,
};
