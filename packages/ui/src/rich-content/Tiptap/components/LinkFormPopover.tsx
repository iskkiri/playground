import { useCallback } from 'react';
import Popover from '#src/overlay/Popover/Popover';
import { Editor, useEditorState } from '@tiptap/react';
import { useTiptapDispatchContext, useTiptapStateContext } from '../hooks/useTiptapContext';
import { useSelectedTextPosition } from '../hooks/useSelectedTextPosition';
import { useTemporaryBackgroundColor } from '../hooks/useTemporaryBackgroundColor';
import LinkFormControl from './controls/LinkFormControl';

interface LinkFormProps {
  editor: Editor;
}

export default function LinkFormPopover({ editor }: LinkFormProps) {
  const { isLinkFormOpen } = useTiptapStateContext();
  const { setIsLinkFormOpen } = useTiptapDispatchContext();

  // 링크 폼이 열릴 때만 위치 계산 (리렌더링 최적화)
  const position = useSelectedTextPosition({
    editor,
    shouldCalculate: isLinkFormOpen,
  });

  // 링크 폼이 열리면 선택된 텍스트에 배경색을 적용하여 시각적 피드백 제공
  // 링크 폼의 input에 포커스가 잡히면 텍스트 선택 영역이 해제되어 사용자가 어떤 텍스트를
  // 편집하고 있는지 알기 어려우므로 배경색으로 해당 텍스트를 강조표시
  useTemporaryBackgroundColor({
    editor,
    isActive: isLinkFormOpen,
    temporaryColor: 'rgba(135, 206, 235, 0.6)',
  });

  // 링크 폼이 열릴 때만 상태 계산 (리렌더링 최적화)
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) =>
      isLinkFormOpen
        ? {
            existingUrl: editor.getAttributes('link').href,
            isSelected: editor.state.selection.from !== editor.state.selection.to,
          }
        : null,
  });

  // 폼 닫기 함수
  const onCloseForm = useCallback(() => setIsLinkFormOpen(false), [setIsLinkFormOpen]);

  return (
    <Popover
      isOpen={isLinkFormOpen}
      onOpenChange={setIsLinkFormOpen}
      placement="bottom-start"
      offsetOptions={{ mainAxis: 8 }}
    >
      {/* 
        선택된 텍스트의 좌측 하단에 위치하는 가상 Trigger
        - position.bottom: 선택된 텍스트의 하단 Y 좌표
        - position.left: 선택된 텍스트의 좌측 X 좌표
        - sr-only: 스크린 리더용으로만 보이는 요소 (시각적으로는 숨김)
      */}
      <Popover.Trigger asChild>
        <div
          className="sr-only"
          style={{
            top: position.bottom,
            left: position.left,
          }}
        />
      </Popover.Trigger>

      <Popover.Content>
        <LinkFormControl
          url={editorState?.existingUrl || ''}
          editor={editor}
          isSelected={editorState?.isSelected || false}
          onCloseForm={onCloseForm}
        />
      </Popover.Content>
    </Popover>
  );
}
