import theme from '#src/theme/index';
import { css } from '@emotion/react';

export const editorViewerCss = {
  tags: css`
    /* headings */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      /* 들여쓰기를 위해 horizontal margin 은 설정하지 않음 */
      /* 기본 vertical margin만을 제거 */
      margin-top: 0;
      margin-bottom: 0;
    }

    h1 {
      ${theme.typography['H2/48b']}
    }

    h2 {
      ${theme.typography['H3/40b']}
    }

    h3 {
      ${theme.typography['H4/36b']}
    }

    h4 {
      ${theme.typography['H5/32b']}
    }

    h5 {
      ${theme.typography['H6/28b']}
    }

    h6 {
      ${theme.typography['H7/24b']}
    }

    /* paragraph */
    p {
      ${theme.typography['P3/16r']}

      ${theme.media.pc} {
        ${theme.typography['P2/18r']}
      }
    }

    /* strong */
    strong {
      font-weight: bold;
    }

    /* italic */
    i {
      font-style: italic;
    }

    /* strike */
    s {
      text-decoration: line-through;
    }

    /* underline */
    u {
      text-decoration: underline;
    }

    /* anchor (link) */
    a {
      color: #2196f3;
      text-decoration-line: underline;
    }

    /* list common */
    ul,
    ol {
      padding-left: 20px;

      li {
        margin: 12px 0;
      }
    }

    /* ordered list */
    ol {
      list-style-type: decimal;

      ol {
        list-style-type: lower-latin;

        ol {
          list-style-type: lower-roman;

          ol {
            list-style-type: upper-latin;

            ol {
              list-style-type: upper-roman;
            }
          }
        }
      }
    }

    /* unordered list */
    ul {
      list-style-type: disc;

      ul {
        list-style-type: circle;

        ul {
          list-style-type: square;

          ul {
            list-style-type: square;
          }
        }
      }
    }

    /* image */
    figure.image {
      width: fit-content;
      margin: 0 auto;

      &.image-style-block-align-left {
        margin-right: auto;
        margin-left: 0;
      }

      &.image-style-block-align-right {
        margin-right: 0;
        margin-left: auto;
      }
    }

    .ck-list-bogus-paragraph {
      font-style: normal;
    }

    span.ck-widget.html-object-embed {
      display: block;
    }
  `,
};
