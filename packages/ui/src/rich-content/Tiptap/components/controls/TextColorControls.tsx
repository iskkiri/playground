import { useCallback, useState } from 'react';
import { useEditorState, type Editor } from '@tiptap/react';
import { SketchPicker, type ColorResult } from 'react-color';
import Popover from '#src/overlay/Popover/Popover';
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

  // 팝오버 열릴 때 자동 포커스 방지 (선택한 텍스트 유지)
  const onOpenAutoFocus = useCallback((e: Event) => e.preventDefault(), []);
  // 색상 선택 시 editor.chain().focus()로 인해 팝오버 외부(에디터)에 포커스가 설정되어 팝오버가 닫히는 현상이 발생. 이를 방지하기 위해 사용
  const onFocusOutside = useCallback((e: Event) => e.preventDefault(), []);

  /**
   * 색상 피커 클릭 시 에디터 포커스 해제를 방지하는 핸들러
   *
   * 문제 상황:
   * - 색상 피커는 Portal을 통해 에디터 밖 DOM에 렌더링됨
   * - 색상 피커를 클릭하면 브라우저가 에디터의 포커스를 해제함
   * - 포커스 해제 시 ProseMirror-focused 클래스가 제거되어 에디터가 리렌더링됨
   * - 에디터 리렌더링으로 인해 BubbleMenu 위치가 재계산되어 튀는 현상 발생
   *
   * 해결 방법:
   * - onMouseDown 이벤트에서 e.preventDefault()를 호출
   * - 이렇게 하면 브라우저의 기본 포커스 변경 동작이 차단됨
   * - 에디터는 계속 포커스된 상태를 유지하고 텍스트 선택도 그대로 유지됨
   * - 결과적으로 BubbleMenu가 안정적으로 위치를 유지하며 색상 변경이 부드럽게 동작함
   *
   * 주의사항:
   * - useCallback으로 메모이제이션하여 불필요한 리렌더링 방지
   * - onClick이 아닌 onMouseDown을 사용하는 이유는 포커스 변경이 mousedown 시점에 발생하기 때문
   */
  const onMouseDown = useCallback((e: React.MouseEvent) => e.preventDefault(), []);

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

      <Popover open={isTextColorPickerOpen} onOpenChange={setIsTextColorPickerOpen}>
        <Popover.Trigger asChild>
          <EditorMenuButton isActive={isTextColorPickerOpen}>
            <TextColorIcon className="size-20" />
          </EditorMenuButton>
        </Popover.Trigger>

        {/* 버블 메뉴가 먼저 닫히는 경우 팝오버 UI가 순간적으로 튀는 현상 방지 */}
        <Popover.Content
          side="bottom"
          sideOffset={8}
          onMouseDown={onMouseDown}
          onOpenAutoFocus={onOpenAutoFocus}
          onFocusOutside={onFocusOutside}
          hideWhenDetached
          className="z-100"
        >
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
        open={isTextBackgroundColorPickerOpen}
        onOpenChange={setIsTextBackgroundColorPickerOpen}
      >
        <Popover.Trigger asChild>
          <EditorMenuButton isActive={isTextBackgroundColorPickerOpen}>
            <TextBackgroundIcon className="size-20" />
          </EditorMenuButton>
        </Popover.Trigger>

        {/* 버블 메뉴가 먼저 닫히는 경우 팝오버 UI가 순간적으로 튀는 현상 방지 */}
        <Popover.Content
          side="bottom"
          sideOffset={8}
          onMouseDown={onMouseDown}
          onOpenAutoFocus={onOpenAutoFocus}
          onFocusOutside={onFocusOutside}
          hideWhenDetached
          className="z-100"
        >
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
