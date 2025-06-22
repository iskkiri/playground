import { commonCss } from '#src/styles/common.styles';
import { css } from '@emotion/react';
import { editorViewerCss } from '../EditorViewer/EditorViewer.styles';

export const editorCss = {
  editor: css`
    .ck-editor {
      ${editorViewerCss.tags}
      height: 100% !important;
      display: flex;
      flex-direction: column;

      .ck-editor__top {
        flex-shrink: 0;
      }

      .ck-editor__main {
        flex: 1;

        .ck-editor__editable {
          /* padding: 20px; */
          min-height: 100%;
          // hacky
          max-height: 0px;
          ${commonCss.scrollbar};
        }
      }

      /* 첫번째 자식 요소의 margin-top을 0으로 설정 */
      .ck.ck-editor__editable_inline > *:first-child {
        margin-top: 0;
      }
    }

    .ck.ck-sticky-panel .ck-sticky-panel__content_sticky {
      box-shadow: none;
      position: relative;
    }

    .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content {
      border: none;
    }

    .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content .ck-menu-bar {
      border-color: var(--CoolGray-15);
    }

    .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content .ck-toolbar {
      border-bottom: 1px solid var(--CoolGray-15);
    }

    .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
      border: none;
    }

    .ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable) {
      box-shadow: none;
      border: none;
    }
  `,

  label: css`
    .ck-powered-by-balloon {
      display: none !important;
    }

    .ck-powered-by {
      display: none;
    }
  `,
};
