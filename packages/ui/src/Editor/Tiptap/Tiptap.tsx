import './styles/tiptap.scss';
import './styles/tiptap-image-resizer.scss';

import { useCallback, useEffect } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { ImageExtension } from './extensions/ImageExtension';
import EditorMenus from './components/EditorMenus';
import type { TiptapBubbleMenuProps } from './types/tiptap.types';

interface TiptapProps {
  ref?: React.RefObject<Editor | null>;
  height?: number;
}

export default function Tiptap({ ref, height }: TiptapProps) {
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
        /**
         * 드래그 앤 드롭 또는 파일 붙여넣기 시 이미지 업로드
         * https://tiptap-resizable-image.vercel.app/guides/pasting-and-dropping
         */
        async onUpload(file: File) {
          return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = (e) => {
              const src = e.target?.result as string;
              resolve({ src, 'data-keep-ratio': true });
            };

            reader.readAsDataURL(file);
          });
        },
      }),
    ],
    content: '<p>Hello World!</p>',
  });

  const shouldShowBubbleMenu = useCallback(({ editor, from, to }: TiptapBubbleMenuProps) => {
    // 이미지가 선택된 경우 버블 메뉴 숨김
    if (editor.isActive('image')) {
      return false;
    }

    // 텍스트가 실제로 선택(드래그해서 하이라이트)되었을 때만 버블 메뉴 표시 (from !== to)
    return from !== to;
  }, []);

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
      <EditorMenus editor={editor} />

      <EditorContent editor={editor} style={{ height }} />

      <BubbleMenu editor={editor} shouldShow={shouldShowBubbleMenu}>
        This is the bubble menu
      </BubbleMenu>
    </>
  );
}
