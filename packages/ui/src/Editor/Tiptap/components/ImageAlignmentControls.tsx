import { useCallback } from 'react';
import type { Editor } from '@tiptap/react';
import FeatherIcons from '@repo/icons/featherIcons';

interface ImageAlignmentControlsProps {
  editor: Editor;
}

export default function ImageAlignmentControls({ editor }: ImageAlignmentControlsProps) {
  // 이미지 정렬
  const onChangeImageAlign = useCallback(
    (align: 'left' | 'center' | 'right') => () => {
      editor.chain().focus().setTextAlign(align).run();
    },
    [editor]
  );

  return (
    <>
      <button
        type="button"
        onClick={onChangeImageAlign('left')}
        className="rounded-4 flex items-center justify-center p-8 hover:bg-gray-100"
      >
        <FeatherIcons.AlignLeft size={20} />
      </button>

      <button
        type="button"
        onClick={onChangeImageAlign('center')}
        className="rounded-4 flex items-center justify-center p-8 hover:bg-gray-100"
      >
        <FeatherIcons.AlignCenter size={20} />
      </button>

      <button
        type="button"
        onClick={onChangeImageAlign('right')}
        className="rounded-4 flex items-center justify-center p-8 hover:bg-gray-100"
      >
        <FeatherIcons.AlignRight size={20} />
      </button>
    </>
  );
}
