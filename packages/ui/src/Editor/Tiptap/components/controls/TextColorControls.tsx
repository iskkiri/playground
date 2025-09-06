import { useCallback, useState } from 'react';
import { useEditorState, type Editor } from '@tiptap/react';
import { SketchPicker, type ColorResult } from 'react-color';
import Popover from '#src/FloatingUI/Popover/Popover';
import { rgbToString } from '@repo/utils/color';
import TextColorIcon from '../../assets/text_color.svg';
import TextBackgroundIcon from '../../assets/text_background.svg';
import EditorMenuButton from '../EditorMenuButton';
import { presetColors } from '../../data/color.data';

interface TextColorControlsProps {
  editor: Editor;
}

export default function TextColorControls({ editor }: TextColorControlsProps) {
  const [isTextColorPickerOpen, setIsTextColorPickerOpen] = useState(false);
  const [isTextBackgroundColorPickerOpen, setIsTextBackgroundColorPickerOpen] = useState(false);

  const { textColor, textBackgroundColor } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      textColor: editor.getAttributes('textStyle').color || '#000000',
      textBackgroundColor: editor.getAttributes('textStyle').backgroundColor || '#000000',
    }),
  });

  const onChangeTextColor = useCallback(
    (color: ColorResult) => {
      if (editor) {
        const rgba = rgbToString(color.rgb);
        editor.chain().focus().setColor(rgba).run();
      }
    },
    [editor]
  );

  const onChangeTextBackgroundColor = useCallback(
    (color: ColorResult) => {
      if (editor) {
        const rgba = rgbToString(color.rgb);
        editor.chain().focus().setBackgroundColor(rgba).run();
      }
    },
    [editor]
  );

  return (
    <>
      {/* 텍스트 색상 */}
      <Popover
        placement="bottom"
        isFocusDisabled
        isOpen={isTextColorPickerOpen}
        onOpenChange={setIsTextColorPickerOpen}
        offsetOptions={{ mainAxis: 8 }}
      >
        <Popover.Trigger asChild>
          <EditorMenuButton isActive={isTextColorPickerOpen}>
            <TextColorIcon className="size-20" />
          </EditorMenuButton>
        </Popover.Trigger>

        <Popover.Content className="z-100 select-none">
          <SketchPicker
            color={textColor}
            onChange={onChangeTextColor}
            disableAlpha={false}
            presetColors={presetColors}
          />
        </Popover.Content>
      </Popover>

      {/* 텍스트 배경색 */}
      <Popover
        placement="bottom"
        isFocusDisabled
        isOpen={isTextBackgroundColorPickerOpen}
        onOpenChange={setIsTextBackgroundColorPickerOpen}
        offsetOptions={{ mainAxis: 8 }}
      >
        <Popover.Trigger asChild>
          <EditorMenuButton isActive={isTextBackgroundColorPickerOpen}>
            <TextBackgroundIcon className="size-20" />
          </EditorMenuButton>
        </Popover.Trigger>

        <Popover.Content className="z-100 select-none">
          <SketchPicker
            color={textBackgroundColor}
            onChange={onChangeTextBackgroundColor}
            disableAlpha={false}
            presetColors={presetColors}
          />
        </Popover.Content>
      </Popover>
    </>
  );
}
