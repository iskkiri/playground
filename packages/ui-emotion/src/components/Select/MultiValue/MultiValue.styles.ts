import theme from '#src/theme/index';
import { css } from '@emotion/react';

export const multiValueCss = {
  selectedItem: css`
    padding: 4px 8px;
    border-radius: 100px;
    background-color: ${theme.colors.coolGray50};

    ${theme.typography['P4/14r']}
  `,

  moreCount: css`
    padding: 4px 8px;
    border-radius: 100px;
    background-color: ${theme.colors.coolGray50};

    ${theme.typography['P4/14r']}
  `,
};
