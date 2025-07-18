import { css } from '@emotion/react';
import { colors } from '@repo/design-tokens/colors/index.ts';

export const textInputWrapperCss = {
  wrapper: css`
    display: flex;
    align-items: center;
    border-radius: 12px;
    border: 1px solid #dde1e6;
    background: #ffffff;
    padding: 0 20px;
    gap: 8px;
    height: 48px;

    svg {
      flex-shrink: 0;
    }
  `,

  clear: css`
    display: none;
    flex-shrink: 0;
  `,

  dirty: css`
    &:focus-within {
      button {
        display: flex;
      }
    }
  `,

  hoverFocus: css`
    &:hover,
    &:focus-within {
      border: 1px solid #a2a9b0;
    }
  `,

  disabled: css`
    border: 1px solid #dde1e6;
    background: #f2f4f8;
    cursor: not-allowed;
  `,

  error: css`
    border: 1px solid #ff6967;
  `,

  input: css`
    border: none;
    outline: none;
    font-size: 16px;
    font-style: normal;
    line-height: 22px; /* 137.5% */
    letter-spacing: -0.3px;
    font-weight: 400;
    background: transparent;
    width: 100%;
    height: 100%;
    color: #21272a;

    &::placeholder {
      color: #a2a9b0;
    }

    &:disabled {
      cursor: not-allowed;
      color: #a2a9b0;
    }
  `,

  button: css`
    display: flex;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0;

    &:focus-visible {
      outline: 1px solid ${colors.primary};
      outline-offset: 2px;
      border-radius: 4px;
    }
  `,
};
