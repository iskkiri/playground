import { css } from '@emotion/react';
import { colors } from '@repo/design-tokens/colors/index.ts';

export const switchCss = {
  label: css`
    --switch-background: ${colors.gray200};
    --switch-active-background: ${colors.primary};
    --switch-width: 36px;
    --switch-height: 20px;
    --circle-size: 16px;
    --circle-background: ${colors.white};

    display: block;
    cursor: pointer;
  `,

  switch: css`
    position: relative;
    display: inline-block;
    height: var(--switch-height);
    width: var(--switch-width);
    border-radius: 100px;
    vertical-align: middle;
    transition: background 0.3s;
    background: var(--switch-background);

    /* Switch Circle */
    &::after {
      content: '';
      position: absolute;
      left: calc((var(--switch-height) - var(--circle-size)) / 2);
      top: calc((var(--switch-height) - var(--circle-size)) / 2);

      display: block;
      height: var(--circle-size);
      width: var(--circle-size);
      border-radius: 50%;

      background: var(--circle-background);
      box-shadow: 0px 2px 4px 0px rgba(39, 39, 39, 0.1);
      transition: transform 0.3s;
    }
  `,

  active: css`
    background: var(--switch-active-background);

    &::after {
      transform: translate3d(100%, 0, 0);
    }
  `,
};
