import { useCallback } from 'react';
import FeatherIcons from '@repo/icons/featherIcons';
import EditorMenuButton from '../EditorMenuButton';
import { useEditorState, type Editor } from '@tiptap/react';
import StrikethroughIcon from '../../assets/strike_through.svg';

interface TextFormattingControlsProps {
  editor: Editor;
}

export default function TextFormattingControls({ editor }: TextFormattingControlsProps) {
  const { isBold, isItalic, isStrike } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor.isActive('bold'),
      isItalic: editor.isActive('italic'),
      isStrike: editor.isActive('strike'),
    }),
  });

  const onToggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const onToggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const onToggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  return (
    <>
      {/* 굵기 */}
      <EditorMenuButton isActive={isBold} onClick={onToggleBold}>
        <FeatherIcons.Bold size={20} strokeWidth={3} />
      </EditorMenuButton>

      {/* 이탤릭체 */}
      <EditorMenuButton isActive={isItalic} onClick={onToggleItalic}>
        <FeatherIcons.Italic size={20} />
      </EditorMenuButton>

      {/* 취소선 */}
      <EditorMenuButton isActive={isStrike} onClick={onToggleStrike}>
        <StrikethroughIcon className="size-20" />
      </EditorMenuButton>
    </>
  );
}
