import {
  Essentials,
  AccessibilityHelp,
  FindAndReplace,
  TextTransformation,
  Autoformat,
  BalloonToolbar,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  Undo,
  // ---------------------------------------------------------------------------------------------------
  Heading,
  Paragraph,
  // ---------------------------------------------------------------------------------------------------
  Font,
  FontSize,
  FontColor,
  FontBackgroundColor,
  // ---------------------------------------------------------------------------------------------------
  Alignment,
  // ---------------------------------------------------------------------------------------------------
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  // ---------------------------------------------------------------------------------------------------
  HorizontalLine,
  Link,
  LinkImage,
  // ---------------------------------------------------------------------------------------------------
  Image,
  ImageToolbar,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageUpload,
  ImageInsert,
  ImageInsertViaUrl,
  ImageTextAlternative,
  MediaEmbed,
  // ---------------------------------------------------------------------------------------------------
  List,
  ListProperties,
  Indent,
  IndentBlock,
  // ---------------------------------------------------------------------------------------------------
  RemoveFormat,
  // ---------------------------------------------------------------------------------------------------
  BlockQuote,
  Code,
  CodeBlock,
  // ---------------------------------------------------------------------------------------------------
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  // ---------------------------------------------------------------------------------------------------
  HtmlEmbed,
  SelectAll,
  ShowBlocks,
  GeneralHtmlSupport,
  SourceEditing,
  Base64UploadAdapter,
} from 'ckeditor5';
import type { EditorConfig } from 'ckeditor5';
import translations from 'ckeditor5/translations/ko.js';
import DOMPurify from 'isomorphic-dompurify';
import { CustomUploadAdapterPlugin } from '../adaptars/uploadAdapter';

/**
 * 프로젝트 진행 시 필요한 기능만 사용합니다.
 * 사용하지 않는 기능은 제거 후 진행해주세요.
 */
export const editorConfig: EditorConfig = {
  translations: [translations],
  language: 'ko',
  // toolbar
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'findAndReplace',
      '|',
      'heading',
      '|',
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'code',
      'subscript',
      'superscript',
      '|',
      'link',
      'insertImage',
      'insertImageViaUrl',
      'mediaEmbed',
      '|',
      'blockQuote',
      'horizontalLine',
      '|',
      'alignment',
      '|',
      'bulletedList',
      'numberedList',
      'outdent',
      'indent',
      '|',
      'removeFormat',
      'htmlEmbed',
      'insertTable',
      '|',
      'specialCharacters',
      'sourceEditing',
      'showBlocks',
    ],
  },
  plugins: [
    Essentials, // 필수 기능
    AccessibilityHelp, // 메뉴 > 도움말 > 접근성
    FindAndReplace, // 검색 및 대체
    TextTransformation, // 텍스트 변환 (ex. before (c) -> © , 1/2 -> ½ , ...)
    Autoformat, // 자동 서식 (ex. #h1 -> <h1>)
    BalloonToolbar, // 선택을 하면 나타나는 추가적인 풍선형 툴바
    PasteFromMarkdownExperimental, // 붙여넣기 시 텍스트를 마크다운으로 변환
    PasteFromOffice, // 붙여넣기 시 Office App에서 복사한 텍스트를 붙여넣을 때, Office App에서 사용된 스타일을 유지하면서 붙여넣을 수 있도록 하는 기능
    // ---------------------------------------------------------------------------------------------------
    Undo, // 실행 취소 (= ctrl(cmd) + z 와 같은 기능)
    // ---------------------------------------------------------------------------------------------------
    Heading, // 제목
    Paragraph, // 문단
    // ---------------------------------------------------------------------------------------------------
    Font, // 글꼴
    FontSize, // 글꼴 크기
    FontColor, // 글꼴 색상
    FontBackgroundColor, // 글꼴 배경색
    // Highlight, // 텍스트 하이라이트 (배경색상과 동일하게 background-color 속성을 사용)
    // FontFamily,
    // ---------------------------------------------------------------------------------------------------
    Alignment, // 텍스트 정렬
    // ---------------------------------------------------------------------------------------------------
    Bold, // 볼드체
    Italic, // 이탤릭체
    Underline, // 밑줄
    Strikethrough, // 취소선
    Subscript, // 아래 첨자
    Superscript, // 위 첨자
    // ---------------------------------------------------------------------------------------------------
    HorizontalLine, // 수평선
    Link, // 링크
    LinkImage, // 링크 이미지
    // ---------------------------------------------------------------------------------------------------

    Image,
    ImageToolbar, // 이미지 툴바
    ImageCaption, // 이미지 캡션
    ImageResize, // 이미지 크기 조정
    ImageStyle, // 이미지 좌우 정렬 등 스타일
    ImageUpload, // 이미지 업로드
    ImageInsert, // 이미지 삽입
    ImageInsertViaUrl, // 이미지 URL로 삽입
    ImageTextAlternative, // 이미지 대체 텍스트

    /**
     * ********************************************** 중요 **********************************************
     * 커스텀 이미지 업로드 플러그인
     * 각 프로젝트마다 이미지 파일을 업로드하는 api로 변경해주어야 합니다.
     * CkEditor/adapters/uploadAdapter.ts 파일을 참고해주세요.
     * 해당 부분을 수정하지 않으면 이미지가 Base64 이미지로 업로드됩니다.
     * - Base64UploadAdapter 플러그인을 사용하면 이미지가 Base64 이미지로 업로드됩니다.
     * - CustomUploadAdapterPlugin 플러그인을 사용하면 이미지가 업로드된 이미지 url을 반환합니다.
     */
    Base64UploadAdapter, // 이미지 업로드 어댑터 (base64)
    CustomUploadAdapterPlugin,
    MediaEmbed, // 미디어 삽입
    // ---------------------------------------------------------------------------------------------------
    BlockQuote, // 블록 인용문
    Code, // 인라인 코드
    CodeBlock, // 코드 블록
    // ---------------------------------------------------------------------------------------------------
    List, // 불릿목록/번호목록
    ListProperties, // 메뉴 > 서식 > 불릿목록/번호목록
    Indent, // 들여쓰기
    IndentBlock, // 들여쓰기 블록
    // ---------------------------------------------------------------------------------------------------
    RemoveFormat, // 서식 제거
    HtmlEmbed, // HTML 삽입
    // ---------------------------------------------------------------------------------------------------
    Table, // 표
    TableCaption, // 표 캡션
    TableCellProperties, // 표 셀 속성
    TableColumnResize, // 표 열 크기 조절
    TableProperties, // 표 속성
    TableToolbar, // 표 툴바
    // ---------------------------------------------------------------------------------------------------
    SelectAll, // 모두 선택
    ShowBlocks, // 블록 표시
    GeneralHtmlSupport, // 일반 HTML 지원
    SourceEditing, // HTML 소스 편집
  ],
  balloonToolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    '|',
    'link',
    '|',
    'bulletedList',
    'numberedList',
    'outdent',
    'indent',
  ],
  fontFamily: {
    supportAllValues: true,
  },
  fontSize: {
    options: [10, 12, 14, 'default', 18, 20, 22],
    supportAllValues: true,
  },
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph',
      },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3',
      },
      {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4',
        class: 'ck-heading_heading4',
      },
      {
        model: 'heading5',
        view: 'h5',
        title: 'Heading 5',
        class: 'ck-heading_heading5',
      },
      {
        model: 'heading6',
        view: 'h6',
        title: 'Heading 6',
        class: 'ck-heading_heading6',
      },
    ],
  },
  htmlSupport: {
    allow: [
      {
        name: /^.*$/,
        styles: true,
        attributes: true,
        classes: true,
      },
    ],
  },
  image: {
    resizeOptions: [
      {
        name: 'resizeImage:original',
        label: 'Default image width',
        value: null,
      },
      {
        name: 'resizeImage:50',
        label: '50% page width',
        value: '50',
      },
      {
        name: 'resizeImage:75',
        label: '75% page width',
        value: '75',
      },
    ],
    toolbar: [
      'toggleImageCaption',
      'imageTextAlternative',
      '|',
      // 'imageStyle:inline', // 인라인 이미지 허용하지 않기 위해 주석 처리
      'imageStyle:wrapText',
      'imageStyle:breakText',
      '|',
      'resizeImage',
    ],
    // 업로드할 수 있는 이미지 MIME 유형을 정의
    // upload: {
    //   types: ['jpeg', 'png', 'gif', 'webp'],
    // }
  },

  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: 'https://',
    decorators: {
      toggleDownloadable: {
        mode: 'manual',
        label: 'Downloadable',
        attributes: {
          download: 'file',
        },
      },
    },
  },

  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },

  menuBar: {
    isVisible: true,
  },

  style: {
    definitions: [
      {
        name: 'Article category',
        element: 'h3',
        classes: ['category'],
      },
      {
        name: 'Title',
        element: 'h2',
        classes: ['document-title'],
      },
      {
        name: 'Subtitle',
        element: 'h3',
        classes: ['document-subtitle'],
      },
      {
        name: 'Info box',
        element: 'p',
        classes: ['info-box'],
      },
      {
        name: 'Side quote',
        element: 'blockquote',
        classes: ['side-quote'],
      },
      {
        name: 'Marker',
        element: 'span',
        classes: ['marker'],
      },
      {
        name: 'Spoiler',
        element: 'span',
        classes: ['spoiler'],
      },
      {
        name: 'Code (dark)',
        element: 'pre',
        classes: ['fancy-code', 'fancy-code-dark'],
      },
      {
        name: 'Code (bright)',
        element: 'pre',
        classes: ['fancy-code', 'fancy-code-bright'],
      },
    ],
  },

  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableProperties',
      'tableCellProperties',
    ],
  },

  fontColor: {
    colors: [
      {
        color: '#000000',
        label: 'Black',
      },
      {
        color: '#4d4d4d',
        label: 'Dim grey',
      },
      {
        color: '#999999',
        label: 'Grey',
      },
      {
        color: '#e6e6e6',
        label: 'Light grey',
      },
      {
        color: '#ffffff',
        label: 'White',
        hasBorder: true,
      },
      {
        color: '#f24747',
        label: 'Red',
      },
      {
        color: '#f29647',
        label: 'Orange',
      },
      {
        color: '#f2f247',
        label: 'Yellow',
      },
      {
        color: '#96f247',
        label: 'Light green',
      },
      {
        color: '#47f247',
        label: 'Green',
      },
      {
        color: '#47f296',
        label: 'Aquamarine',
      },
      {
        color: '#47f2f2',
        label: 'Turquoise',
      },
      {
        color: '#4796f2',
        label: 'Light blue',
      },
      {
        color: '#4747f2',
        label: 'Blue',
      },
      {
        color: '#9647f2',
        label: 'Purple',
      },
    ],
    colorPicker: {
      // Use 'hex' format for output instead of 'hsl'.
      format: 'hex',
    },
  },

  htmlEmbed: {
    showPreviews: true,
    sanitizeHtml: (inputHtml) => {
      // Strip unsafe elements and attributes, for example:
      // the `<script>` elements and `on*` attributes.
      const outputHtml = DOMPurify.sanitize(inputHtml);

      return {
        html: outputHtml,
        // true or false depending on whether the sanitizer stripped anything.
        hasChanged: true,
      };
    },
  },
};
