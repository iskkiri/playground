import { useEditorState, type Editor } from '@tiptap/react';
import FeatherIcons from '@repo/icons/featherIcons';
import EditorMenuButton from '../EditorMenuButton';
import { useCallback } from 'react';
import { useTiptapDispatchContext } from '../../hooks/useTiptapContext';

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

  const { setIsLinkFormOpen } = useTiptapDispatchContext();

  const onOpenLinkForm = useCallback(() => {
    setIsLinkFormOpen(true);
  }, [setIsLinkFormOpen]);

  return (
    <EditorMenuButton isActive={isLink} onClick={onOpenLinkForm}>
      <FeatherIcons.Link size={20} />
    </EditorMenuButton>
  );
}
