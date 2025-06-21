import media from '#src/theme/media';
import { css } from '@emotion/react';

// 프로젝트의 헤더 높이, 푸터 높이에 따라 변경
const MOBILE_HEADER_HEIGHT = 60;
const MOBILE_FOOTER_HEIGHT = 320;
const PC_HEADER_HEIGHT = 160;
const PC_FOOTER_HEIGHT = 300;

export const commonCss = {
  fullPage: css`
    min-height: ${`calc(100dvh - ${MOBILE_HEADER_HEIGHT}px - ${MOBILE_FOOTER_HEIGHT}px)`};

    ${media.pc} {
      min-height: ${`calc(100dvh - ${PC_HEADER_HEIGHT}px - ${PC_FOOTER_HEIGHT}px)`};
    }
  `,

  opacityZero: css`
    opacity: 0;
  `,

  scrollbar: css`
    --scrollbar-thumb: #cecece;
    --scrollbar-track-background: #fff;
    --scrollbar-track-shadow: #999;

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--scrollbar-thumb);
      border: 2px solid transparent;
      border-radius: 8px;
      background-clip: padding-box;
    }
    &::-webkit-scrollbar-track {
      border-radius: 8px;
      background-color: var(--scrollbar-track-background);
      box-shadow: inset 0px 0px 4px var(--scrollbar-track-shadow);
    }
  `,

  observer: css`
    width: 0;
    height: 0;
    opacity: 0;
  `,

  onlyMobileVisible: css`
    ${media.pc} {
      display: none;
    }
  `,

  onlyPcVisibleBlock: css`
    display: none;

    ${media.pc} {
      display: block;
    }
  `,

  onlyPcVisibleFlex: css`
    display: none;

    ${media.pc} {
      display: flex;
    }
  `,

  lineClamp: (lines: number) => {
    if (lines === 1) {
      return css`
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      `;
    } else {
      return css`
        display: -webkit-box;
        -webkit-line-clamp: ${lines};
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      `;
    }
  },

  wfull: css`
    width: 100%;
  `,

  hfull: css`
    height: 100%;
  `,

  flexGrow: css`
    flex: 1;
  `,

  noScroll: css`
    ::-webkit-scrollbar {
      display: none;
    }
  `,

  imageScaleUpOnHover: css`
    img {
      transition: transform 0.5s;
    }

    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  `,

  srOnly: css`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  `,
};
