import { css } from '@emotion/react';
import theme from '../theme';

// 프로젝트의 헤더 높이, 푸터 높이에 따라 변경
const MOBILE_HEADER_HEIGHT = 60;
const MOBILE_FOOTER_HEIGHT = 320;
const PC_HEADER_HEIGHT = 160;
const PC_FOOTER_HEIGHT = 300;

export const commonCss = {
  fullPage: css`
    min-height: ${`calc(100dvh - ${MOBILE_HEADER_HEIGHT}px - ${MOBILE_FOOTER_HEIGHT}px)`};

    ${theme.media.pc} {
      min-height: ${`calc(100dvh - ${PC_HEADER_HEIGHT}px - ${PC_FOOTER_HEIGHT}px)`};
    }
  `,

  opacityZero: css`
    opacity: 0;
  `,

  scrollbar: css`
    /* 스크롤바 색상 변수 정의 */
    --scrollbar-thumb: #cecece; /* 스크롤바 핸들(드래그하는 부분) 색상 */
    --scrollbar-track-background: #fff; /* 스크롤바 트랙 배경 색상 */
    --scrollbar-track-shadow: #999; /* 스크롤바 트랙 그림자 색상 */
    --scrollbar-corner: #f4f4f4; /* 스크롤바 모서리 색상 (가로/세로 스크롤바가 만나는 부분) */

    /* 스크롤바 모서리 스타일링 (가로/세로 스크롤바 교차점) */
    &::-webkit-scrollbar-corner {
      background-color: var(--scrollbar-corner);
    }

    /* 스크롤바 전체 크기 설정 */
    &::-webkit-scrollbar {
      width: 10px; /* 세로 스크롤바 너비 */
      height: 10px; /* 가로 스크롤바 높이 */
    }

    /* 스크롤바 핸들(드래그하는 부분) 스타일링 */
    &::-webkit-scrollbar-thumb {
      background-color: var(--scrollbar-thumb);
      border: 2px solid transparent; /* 투명 테두리로 핸들과 트랙 사이 간격 생성 */
      border-radius: 10px; /* 둥근 모서리 */
      background-clip: padding-box; /* 배경이 테두리까지 확장되지 않도록 설정 */
    }

    /* 스크롤바 트랙(배경 레일) 스타일링 */
    &::-webkit-scrollbar-track {
      border-radius: 8px; /* 둥근 모서리 */
      background-color: var(--scrollbar-track-background);
      box-shadow: inset 0px 0px 4px var(--scrollbar-track-shadow); /* 내부 그림자로 깊이감 추가 */
    }
  `,

  observer: css`
    width: 0;
    height: 0;
    opacity: 0;
  `,

  onlyMobileVisible: css`
    ${theme.media.pc} {
      display: none;
    }
  `,

  onlyPcVisibleBlock: css`
    display: none;

    ${theme.media.pc} {
      display: block;
    }
  `,

  onlyPcVisibleFlex: css`
    display: none;

    ${theme.media.pc} {
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
