import { commonCss } from '#src/styles/common.styles';
import { css } from '@emotion/react';

export const textareaCss = {
  textarea: css`
    padding: 14px 20px;
    border-radius: 8px;
    border: 1px solid #dde1e6;
    outline: none;
    background: #ffffff;
    font-size: 16px;
    line-height: 24px;
    resize: none;
    width: 100%;
    height: 100%;
    color: #343a3f;
    ${commonCss.scrollbar}

    &::placeholder {
      color: #a2a9b0;
    }
  `,

  hoverFocus: css`
    &:hover,
    &:focus-within {
      border: 1px solid #c1c7cd;
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
};
