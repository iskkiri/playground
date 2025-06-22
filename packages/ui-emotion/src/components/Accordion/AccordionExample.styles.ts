import { css } from '@emotion/react';
import theme from '#src/theme';

export const accordionBasicExampleCss = {
  container: css`
    width: 600px;
  `,

  label: css`
    padding: 16px 20px;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  content: css`
    padding: 16px 24px;
    background: ${theme.colors.coolGray50};

    display: flex;
    align-items: center;
  `,

  customDropdown: css`
    transform: rotate(0deg);
    transition: transform 0.3s;
  `,

  customDropdownActive: css`
    transform: rotate(90deg);
  `,
};
