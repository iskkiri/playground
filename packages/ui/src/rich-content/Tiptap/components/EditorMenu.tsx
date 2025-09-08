import type { Editor } from '@tiptap/react';
import BlockTypeControls from './controls/BlockTypeControls';
import TextFormattingControls from './controls/TextFormattingControls';
import AlignmentControls from './controls/AlignmentControls';
import ListControls from './controls/ListControls';
import LinkControl from './controls/LinkControl';
import TextColorControls from './controls/TextColorControls';
import ImageUploadControl from './controls/ImageUploadControl';
import EmojiPickerControl from './controls/EmojiPickerControl';

interface EditorMenuProps {
  editor: Editor;
}

export default function EditorMenu({ editor }: EditorMenuProps) {
  return (
    <div className="z-100 sticky top-0 flex items-center gap-4 border border-gray-200 bg-white">
      {/* 블록 타입 컨트롤 (제목1 ~ 제목6, 문단) */}
      <BlockTypeControls editor={editor} />

      {/* 텍스트 포맷팅 컨트롤 (굵기, 이탤릭체, 취소선) */}
      <TextFormattingControls editor={editor} />

      {/* 링크 컨트롤 */}
      <LinkControl editor={editor} />

      {/* 정렬 컨트롤 */}
      <AlignmentControls editor={editor} />

      {/* 목록 컨트롤 */}
      <ListControls editor={editor} />

      {/* 텍스트 색상 컨트롤 */}
      <TextColorControls editor={editor} />

      {/* 이미지 업로드 컨트롤 */}
      <ImageUploadControl editor={editor} />

      {/* 이모지 피커 */}
      <EmojiPickerControl editor={editor} />
    </div>
  );
}
