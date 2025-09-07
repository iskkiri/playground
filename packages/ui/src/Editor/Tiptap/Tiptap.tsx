import './styles/tiptap.scss';
import './styles/tiptap-image-resizer.scss';

import { useEffect } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import { TextStyle, BackgroundColor } from '@tiptap/extension-text-style';
import { ImageExtension } from './extensions/ImageExtension';
import EditorMenu from './components/EditorMenu';
import BubbleMenu from './components/BubbleMenu';
import FileHandler from '@tiptap/extension-file-handler';
import { insertEditorImages } from './utils/image';

interface TiptapProps {
  ref?: React.RefObject<Editor | null>;
}

export default function Tiptap({ ref }: TiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      /**
       * 텍스트 스타일 (폰트 색상 설정 시 필수)
       */
      TextStyle,
      /**
       * 폰트 색상
       * https://tiptap.dev/docs/editor/extensions/functionality/color
       */
      Color,
      /**
       * 텍스트 배경색
       * https://tiptap.dev/docs/editor/extensions/functionality/background-color
       */
      BackgroundColor,
      /**
       * 텍스트 정렬
       * https://tiptap.dev/docs/editor/extensions/functionality/textalign
       */
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      /**
       * 이미지 리사이즈 (Third Party 라이브러리 사용)
       * https://tiptap-resizable-image.vercel.app/
       */
      ImageExtension.configure({
        defaultWidth: 300,
        withCaption: false,
      }),
      /**
       * 드래그 앤 드롭 또는 파일 붙여넣기 시 이미지 업로드
       * https://tiptap.dev/docs/editor/extensions/functionality/filehandler
       */
      FileHandler.configure({
        // allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: insertEditorImages,
        onPaste: insertEditorImages,
      }),
    ],
  });

  // 외부에서 에디터 인스턴스를 참조할 수 있도록 초기화
  useEffect(() => {
    // ref가 없다면 초기화하지 않음
    if (!ref) return;
    // 이미 초기화되었다면 초기화하지 않음
    if (ref.current) return;

    ref.current = editor;
  }, [editor, ref]);

  return (
    <>
      {/* 에디터 메뉴 */}
      <EditorMenu editor={editor} />
      {/* 에디터 컨텐츠 */}
      <EditorContent editor={editor} />
      {/* 버블 메뉴 */}
      <BubbleMenu editor={editor} />
    </>
  );
}
