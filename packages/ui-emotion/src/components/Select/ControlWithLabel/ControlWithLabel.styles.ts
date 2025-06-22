import { css } from '@emotion/react';

export const controlWithLabelCss = {
  select: css`
    .react-select-container {
      .react-select__control {
        padding: 14px 20px;
        background-color: transparent;
        min-height: 60px;

        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 4px;
      }
    }
  `,

  label: css`
    color: var(--CoolGray-50, #70737c);
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  `,

  valueIndicator: css`
    .react-select__dropdown-indicator {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  `,
};
