import { css } from '@emotion/react';

export const commonCss = {
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
