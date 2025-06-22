import { css } from '@emotion/react';

export const paginationCss = {
  wrapper: css`
    display: flex;
    gap: 8px;
    width: fit-content;

    .pagination {
      --pagination-selected: #4e86ff;
      list-style: none;

      display: flex;
      gap: 8px;

      a {
        display: flex;
        width: 32px;
        height: 32px;
        padding: 4px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 8px;
        font-size: 16px;
        line-height: 24px;
        background: #ffffff;
        color: #878d96;
        cursor: pointer;

        &:hover {
          background: #f2f4f8;
        }

        svg {
          flex-shrink: 0;
        }
      }

      li.selected {
        a {
          border: 1px solid var(--pagination-selected);
          color: var(--pagination-selected);
          font-weight: 700;
        }
      }

      li.disabled {
        a {
          cursor: not-allowed;

          &:hover {
            background: #ffffff;
          }
        }
      }
    }
  `,
};
