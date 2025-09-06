import { useCallback } from 'react';
import { useEditorState, type Editor } from '@tiptap/react';
import FeatherIcons from '@repo/icons/featherIcons';
import EditorMenuButton from '../EditorMenuButton';

interface AlignmentControlsProps {
  editor: Editor;
}

export default function AlignmentControls({ editor }: AlignmentControlsProps) {
  const { isTextAlignLeft, isTextAlignCenter, isTextAlignRight } = useEditorState({
    editor,
    selector: ({ editor }) => {
      const isTextAlignLeft = editor.isActive({ textAlign: 'left' });
      const isTextAlignCenter = editor.isActive({ textAlign: 'center' });
      const isTextAlignRight = editor.isActive({ textAlign: 'right' });

      return {
        isTextAlignLeft:
          isTextAlignLeft || (!isTextAlignLeft && !isTextAlignCenter && !isTextAlignRight),
        isTextAlignCenter,
        isTextAlignRight,
      };
    },
  });

  const onChangeAlignment = useCallback(
    (align: 'left' | 'center' | 'right') => () => {
      editor.chain().focus().setTextAlign(align).run();
    },
    [editor]
  );

  return (
    <>
      {/* 왼쪽 정렬 */}
      <EditorMenuButton isActive={isTextAlignLeft} onClick={onChangeAlignment('left')}>
        <FeatherIcons.AlignLeft size={20} />
      </EditorMenuButton>

      {/* 중앙 정렬 */}
      <EditorMenuButton isActive={isTextAlignCenter} onClick={onChangeAlignment('center')}>
        <FeatherIcons.AlignCenter size={20} />
      </EditorMenuButton>

      {/* 오른쪽 정렬 */}
      <EditorMenuButton isActive={isTextAlignRight} onClick={onChangeAlignment('right')}>
        <FeatherIcons.AlignRight size={20} />
      </EditorMenuButton>
    </>
  );
}
