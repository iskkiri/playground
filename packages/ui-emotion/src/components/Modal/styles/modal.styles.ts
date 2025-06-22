import { css } from '@emotion/react';
import colors from '#src/theme/colors';
import media from '#src/theme/media';
import typography from '#src/theme/typography';

export const overlayStyle: ReactModal.Styles['overlay'] = {
  backgroundColor: 'transparent',
  zIndex: 1000,
};

export const overlayDimStyle: ReactModal.Styles['overlay'] = {
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
};

export const modalAnimationCss = {
  animation: ({ x, y }: { x: number | string; y: number | string }) => css`
    opacity: 0;
    transform: translate3d(
        ${typeof x === 'number' ? `${x}px` : x},
        ${typeof y === 'number' ? `${y}px` : y},
        0
      )
      scale(0.9);
    transition:
      transform 300ms ease-in-out,
      opacity 300ms ease-in-out;

    &.ReactModal__Content--after-open {
      opacity: 1;
      transform: translate3d(
          ${typeof x === 'number' ? `${x}px` : x},
          ${typeof y === 'number' ? `${y}px` : y},
          0
        )
        scale(1);
    }

    &.ReactModal__Content--before-close {
      opacity: 0;
      transform: translate3d(
          ${typeof x === 'number' ? `${x}px` : x},
          ${typeof y === 'number' ? `${y}px` : y},
          0
        )
        scale(0.9);
    }
  `,

  centerAnimation: css`
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.9);
    transition:
      transform 300ms ease-in-out,
      opacity 300ms ease-in-out;

    &.ReactModal__Content--after-open {
      opacity: 1;
      transform: translate3d(-50%, -50%, 0) scale(1);
    }

    &.ReactModal__Content--before-close {
      opacity: 0;
      transform: translate3d(-50%, -50%, 0) scale(0.9);
    }
  `,
};

export const modalCss = {
  modal: css`
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);

    ${modalAnimationCss.centerAnimation};

    width: calc(100% - 40px);
    max-width: 480px;

    border-radius: 16px;
    background: ${colors.white};
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.1);
  `,

  header: css`
    padding: 24px 20px 16px;

    ${media.pc} {
      padding: 24px 24px 16px;
    }
  `,

  title: css`
    ${typography['P2/18b']}
  `,

  body: css`
    padding: 0 20px;

    ${media.pc} {
      padding: 0 24px;
    }
  `,

  footer: css`
    padding: 24px 20px;

    display: flex;
    gap: 12px;

    ${media.pc} {
      padding: 24px;
    }
  `,

  closeTrigger: css`
    position: absolute;
    top: 27px;
    right: 24px;

    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
