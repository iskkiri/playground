import Select from '#src/Select/Select';
import type { SelectOption } from '#src/Select/types/select.types';
import { useEditorState, type Editor } from '@tiptap/react';
import { useCallback } from 'react';
import { blockTypeOptions, type Level } from '../../data/blockType.data';

interface BlockTypeControlsProps {
  editor: Editor;
}

export default function BlockTypeControls({ editor }: BlockTypeControlsProps) {
  const currentBlockType = useEditorState({
    editor,
    selector: ({ editor }) => {
      // 문단(p) 확인
      if (editor.isActive('paragraph')) {
        return blockTypeOptions[0]; // { label: '문단', value: 0 }
      }

      // h1~h6 확인
      for (const option of blockTypeOptions) {
        if (option.value > 0 && editor.isActive('heading', { level: option.value })) {
          return option;
        }
      }

      // 기본값
      return null;
    },
  });

  const onChange = useCallback(
    (option: SelectOption<Level> | null) => {
      if (!option) return;

      if (option.value === 0) {
        editor.chain().focus().setParagraph().run();
      } else {
        editor.chain().focus().setHeading({ level: option.value }).run();
      }
    },
    [editor]
  );

  return (
    <Select
      classNames={{
        container: (_state) => 'w-120',
        control: (_state) => 'min-h-40! px-12! border-none!',
      }}
      options={blockTypeOptions}
      value={currentBlockType}
      onChange={onChange}
    />
  );
}
