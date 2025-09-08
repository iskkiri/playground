import { useCallback } from 'react';
import type { Editor } from '@tiptap/react';
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react/menus';
import type { TiptapBubbleMenuProps } from '../types/tiptap.types';
import BlockTypeControls from './controls/BlockTypeControls';
import TextFormattingControls from './controls/TextFormattingControls';
import LinkControl from './controls/LinkControl';
import TextColorControls from './controls/TextColorControls';

interface BubbleMenuProps {
  editor: Editor;
}

export default function BubbleMenu({ editor }: BubbleMenuProps) {
  // 버블 메뉴 표시 여부
  const shouldShowBubbleMenu = useCallback(({ editor, from, to }: TiptapBubbleMenuProps) => {
    // 이미지가 선택된 경우 버블 메뉴 숨김
    if (editor.isActive('image')) {
      return false;
    }

    // 텍스트가 실제로 선택(드래그해서 하이라이트)되었을 때만 버블 메뉴 표시 (from !== to)
    return from !== to;
  }, []);

  return (
    <TiptapBubbleMenu
      editor={editor}
      shouldShow={shouldShowBubbleMenu}
      options={{
        offset: { mainAxis: 8 },
        placement: 'top-start',
      }}
      className="z-100 rounded-4 relative flex items-center gap-4 border border-gray-100 bg-white px-8 shadow-sm"
    >
      {/* 블록 타입 컨트롤 (제목1 ~ 제목6, 문단) */}
      <BlockTypeControls editor={editor} />

      {/* 텍스트 포맷팅 컨트롤 (굵기, 이탤릭체, 취소선) */}
      <TextFormattingControls editor={editor} />

      {/* 링크 컨트롤 */}
      <LinkControl editor={editor} />

      {/* 텍스트 색상 컨트롤 */}
      <TextColorControls editor={editor} />
    </TiptapBubbleMenu>
  );
}
