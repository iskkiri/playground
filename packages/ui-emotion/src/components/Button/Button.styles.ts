import theme from '#src/theme/index';
import { css } from '@emotion/react';

export const buttonSize = {
  32: css`
    height: 32px;
    padding: 0px 12px;
    gap: 2px;
    border-radius: 8px;
    ${theme.typography['P5/12b']};
  `,
  40: css`
    height: 40px;
    padding: 0px 16px;
    gap: 4px;
    border-radius: 10px;
    ${theme.typography['P4/14b']};
  `,
  48: css`
    height: 48px;
    padding: 0px 20px;
    gap: 6px;
    border-radius: 12px;
    ${theme.typography['P3/16b']};
  `,
  56: css`
    height: 56px;
    padding: 0px 22px;
    gap: 8px;
    border-radius: 13px;
    ${theme.typography['P2/18b']};
  `,
  64: css`
    height: 64px;
    padding: 0px 24px;
    gap: 12px;
    border-radius: 14px;
    ${theme.typography['P1/20b']};
  `,
};

export const buttonTypeCss = {
  primary: css`
    background: ${theme.colors.main500};
    border: 1px solid ${theme.colors.main500};
    color: ${theme.colors.white};

    &:hover {
      background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.12) 100%),
        ${theme.colors.main500};
    }

    &:disabled {
      background: ${theme.colors.coolGray100};
      color: ${theme.colors.coolGray300};
    }
  `,

  linePrimary: css`
    border: 1px solid ${theme.colors.main500};
    background: transparent;
    color: ${theme.colors.main500};

    &:hover {
      border: 1px solid ${theme.colors.mainHover};
      color: ${theme.colors.mainHover};
    }

    &:disabled {
      border-color: ${theme.colors.coolGray100};
      background: ${theme.colors.coolGray50};
      color: ${theme.colors.coolGray200};
    }
  `,

  gray: css`
    background: ${theme.colors.coolGray50};
    border: 1px solid ${theme.colors.coolGray50};
    color: ${theme.colors.coolGray500};

    &:hover {
      background: ${theme.colors.coolGray100};
    }

    &:disabled {
      background: ${theme.colors.coolGray100};
      color: ${theme.colors.coolGray300};
    }
  `,

  danger: css`
    background: ${theme.colors.red500};
    border: 1px solid ${theme.colors.red500};
    color: ${theme.colors.white};

    &:hover {
      background: ${theme.colors.red500Hover};
    }

    &:disabled {
      background: ${theme.colors.coolGray100};
      color: ${theme.colors.coolGray300};
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
    color: ${theme.colors.coolGray800};

    &:disabled {
      cursor: not-allowed;
    }
  `,
};
