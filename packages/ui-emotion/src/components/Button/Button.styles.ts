import { css } from '@emotion/react';
import typography from '#src/theme/typography';
import colors from '#src/theme/colors';

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
    background: ${colors.main500};
    color: ${colors.white};

    &:hover {
      background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.12) 100%), ${colors.main500};
    }

    &:disabled {
      background: ${colors.coolGray100};
      color: ${colors.coolGray300};
    }
  `,

  linePrimary: css`
    border: 1px solid ${colors.main500};
    color: ${colors.main500};

    &:hover {
      border: 1px solid ${colors.mainHover};
      color: ${colors.mainHover};
    }

    &:disabled {
      border-color: ${colors.coolGray100};
      background: ${colors.coolGray50};
      color: ${colors.coolGray200};
    }
  `,

  gray: css`
    background: ${colors.coolGray50};
    color: ${colors.coolGray500};

    &:hover {
      background: ${colors.coolGray100};
    }

    &:disabled {
      background: ${colors.coolGray100};
      color: ${colors.coolGray300};
    }
  `,

  danger: css`
    background: ${colors.red500};
    color: ${colors.white};

    &:hover {
      background: ${colors.red500Hover};
    }

    &:disabled {
      background: ${colors.coolGray100};
      color: ${colors.coolGray300};
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
    color: ${colors.coolGray800};

    &:disabled {
      cursor: not-allowed;
    }
  `,
};
