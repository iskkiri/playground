import { useCallback } from 'react';
import { useEditorState, type Editor } from '@tiptap/react';
import EditorMenuButton from '../EditorMenuButton';
import FeatherIcons from '@repo/icons/featherIcons';
import NumberListIcon from '../../assets/number_list.svg';

interface ListControlsProps {
  editor: Editor;
}

export default function ListControls({ editor }: ListControlsProps) {
  const { isOrderedList, isBulletList } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isOrderedList: editor.isActive('orderedList'),
      isBulletList: editor.isActive('bulletList'),
    }),
  });

  const onToggleOrderedList = useCallback(() => {
    editor.chain().focus().toggleOrderedList().run();
  }, [editor]);

  const onToggleBulletList = useCallback(() => {
    editor.chain().focus().toggleBulletList().run();
  }, [editor]);

  return (
    <>
      {/* 번호 목록 */}
      <EditorMenuButton isActive={isOrderedList} onClick={onToggleOrderedList}>
        <NumberListIcon className="size-20" />
      </EditorMenuButton>

      {/* 불릿 목록 */}
      <EditorMenuButton isActive={isBulletList} onClick={onToggleBulletList}>
        <FeatherIcons.List size={20} />
      </EditorMenuButton>
    </>
  );
}
