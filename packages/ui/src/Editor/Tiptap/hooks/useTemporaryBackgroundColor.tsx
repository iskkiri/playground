import { useEffect, useRef } from 'react';
import { Editor } from '@tiptap/react';

interface UseTemporaryBackgroundColorProps {
  editor: Editor;
  isActive: boolean;
  temporaryColor: string;
}

/**
 * 에디터에서 일시적으로 배경색을 적용하고 원래 색상으로 복원하는 훅
 * 
 * @param editor - Tiptap 에디터 인스턴스
 * @param isActive - 일시적 배경색 적용 여부
 * @param temporaryColor - 적용할 일시적 배경색
 */
export function useTemporaryBackgroundColor({
  editor,
  isActive,
  temporaryColor,
}: UseTemporaryBackgroundColorProps) {
  const originalBackgroundColor = useRef<string | null>(null);

  useEffect(() => {
    if (isActive) {
      // 현재 선택된 텍스트의 배경색 저장
      const currentBackground = editor.getAttributes('textStyle').backgroundColor;
      originalBackgroundColor.current = currentBackground || null;

      editor.chain().focus().setBackgroundColor(temporaryColor).run();
    } else {
      // 원래 배경색으로 복원 또는 제거
      if (originalBackgroundColor.current) {
        editor.chain().focus().setBackgroundColor(originalBackgroundColor.current).run();
      } else {
        editor.chain().focus().unsetBackgroundColor().run();
      }
      originalBackgroundColor.current = null;
    }
  }, [editor, isActive, temporaryColor]);
}