import { useEditorState, type Editor } from '@tiptap/react';
import FeatherIcons from '@repo/icons/featherIcons';
import EditorMenuButton from '../EditorMenuButton';
import { useCallback } from 'react';

interface LinkControlProps {
  editor: Editor;
}

// TODO: 링크 컨트롤
export default function LinkControl({ editor }: LinkControlProps) {
  const { isLink } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isLink: editor.isActive('link'),
    }),
  });

  const onSetLink = useCallback(() => {
    const url = window.prompt('URL');

    // cancelled
    if (url === null) return;

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  }, [editor]);

  return (
    <EditorMenuButton isActive={isLink} onClick={onSetLink}>
      <FeatherIcons.Link size={20} />
    </EditorMenuButton>
  );
}
