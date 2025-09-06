import { useCallback, useState } from 'react';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import {
  ResizableImage,
  ResizableImageComponent,
  ResizableImageNodeViewRendererProps,
} from 'tiptap-extension-resizable-image';
import Popover from '../../../FloatingUI/Popover/Popover';
import ImageAltIcon from '../assets/image_alt.svg';
import ImageAltTextControl from '../components/controls/ImageAltTextControl';
import AlignmentControls from '../components/controls/AlignmentControls';
import EditorMenuButton from '../components/EditorMenuButton';

const NodeView = (props: ResizableImageNodeViewRendererProps) => {
  const { editor, node, selected } = props;

  // 대체 문구 텍스트 인풋 오픈 상태
  const [isAltTextInputOpen, setIsAltTextInputOpen] = useState(false);
  const onOpenAltTextInput = useCallback(() => setIsAltTextInputOpen(true), []);
  const onCloseAltTextInput = useCallback(() => setIsAltTextInputOpen(false), []);

  // 에디터 바깥을 클릭했을 때 선택 해제 (필요 시 주석 해제하여 사용)
  // useEffect(() => {
  //   if (!selected) return;

  //   const handleClickOutside = (event: MouseEvent) => {
  //     const target = event.target as HTMLElement;
  //     const editorElement = editor.view.dom;

  //     // Popover 관련 요소인지 확인
  //     const isPopoverElement =
  //       target.closest('[data-floating-ui-portal]') ||
  //       target.closest('[role="tooltip"]') ||
  //       target.closest('[data-radix-popper-content-wrapper]');

  //     // 클릭한 요소가 에디터 내부도 아니고 팝오버도 아닌 경우에만 선택 해제
  //     if (!editorElement.contains(target) && !isPopoverElement) {
  //       editor.commands.focus();
  //       editor.commands.setTextSelection(editor.state.selection.to);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [selected, editor]);

  return (
    <NodeViewWrapper className="image-component" data-drag-handle>
      <Popover isOpen={selected} placement="bottom" offsetOptions={{ mainAxis: 12 }}>
        <Popover.Trigger asChild>
          <div style={{ display: 'inline-flex' }}>
            <ResizableImageComponent {...props} />
          </div>
        </Popover.Trigger>

        <Popover.Content>
          <div className="rounded-4 shadow-xs flex gap-8 border border-gray-200 bg-white p-4">
            {/* 대체 문구 폼 열기 버튼 */}
            <EditorMenuButton onClick={onOpenAltTextInput}>
              <ImageAltIcon />
            </EditorMenuButton>

            {/* 이미지 정렬 */}
            <AlignmentControls editor={editor} />
          </div>
        </Popover.Content>
      </Popover>

      <Popover isOpen={isAltTextInputOpen} onOpenChange={setIsAltTextInputOpen}>
        {/* 가상 Trigger 생성 - 이미지 하단 중앙에 1x1px 투명한 트리거 */}
        <Popover.Trigger asChild>
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2" />
        </Popover.Trigger>

        {/* 대체 문구 폼 */}
        <Popover.Content className="rounded-4 shadow-xs min-w-300 flex flex-col gap-8 border border-gray-200 bg-white p-16">
          <ImageAltTextControl
            editor={editor}
            node={node}
            onCloseAltTextInput={onCloseAltTextInput}
          />
        </Popover.Content>
      </Popover>
    </NodeViewWrapper>
  );
};

export const ImageExtension = ResizableImage.extend({
  addNodeView() {
    return ReactNodeViewRenderer((props) => {
      return NodeView(props as unknown as ResizableImageNodeViewRendererProps);
    });
  },
});
