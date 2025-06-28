import { css } from '@emotion/react';
import { colors } from '@repo/design-tokens/colors/index.ts';

export const paginationWithFixedRangeCss = {
  block: css`
    --pagination-selected-background: ${colors.primary};
    --pagination-selected-color: ${colors.white};

    display: flex;
    gap: 6px;
    box-sizing: border-box;

    svg {
      stroke: #6f6f6f;
    }
  `,

  button: css`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #6f6f6f;
    cursor: pointer;
    background-color: transparent;

    width: 32px;
    height: 32px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 4px;
    font: 16px;

    &:hover {
      background: #f4f4f4;
      color: #000000;
    }

    &:disabled {
      cursor: not-allowed;
      border: 1px solid var(--pagination-selected);
      background: #f4f4f4;

      svg {
        stroke: #a8a8a8;
      }
    }
  `,

  active: css`
    border: 1px solid var(--pagination-selected-background);
    background-color: var(--pagination-selected-background);
    color: var(--pagination-selected-color);
    font-weight: 700;

    &:hover {
      background-color: var(--pagination-selected-background);
      color: var(--pagination-selected-color);
    }
  `,

  list: css`
    display: flex;
    gap: 6px;
    margin: 0;
    padding: 0;

    li {
      list-style: none;
    }
  `,
};
