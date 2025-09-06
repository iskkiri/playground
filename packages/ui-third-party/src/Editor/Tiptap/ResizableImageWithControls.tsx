import { useCallback, useState } from 'react';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import {
  ResizableImage,
  ResizableImageComponent,
  ResizableImageNodeViewRendererProps,
} from 'tiptap-extension-resizable-image';
import Popover from '../../FloatingUI/Popover/Popover';

const NodeView = (props: ResizableImageNodeViewRendererProps) => {
  const { editor, node, selected } = props;

  const [altText, setAltText] = useState(node.attrs.alt || '');
  const [isAltTextInputOpen, setIsAltTextInputOpen] = useState(false);

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

  const onCloseAltTextInput = useCallback(() => {
    setIsAltTextInputOpen(false);
  }, []);

  const onChangeAltText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAltText(e.target.value);
  }, []);

  const onChangeImageAlign = useCallback(
    (align: 'left' | 'center' | 'right') => {
      editor.chain().focus().setTextAlign(align).run();
    },
    [editor]
  );

  const onSubmitAltText = useCallback(() => {
    const { from } = editor.state.selection;

    // 에디터 체인으로 속성 업데이트와 선택 유지를 동시에 처리
    editor
      .chain()
      .updateAttributes(node.type, {
        alt: altText,
      })
      .setNodeSelection(from)
      .run();

    onCloseAltTextInput();
  }, [editor, node.type, altText, onCloseAltTextInput]);

  return (
    <NodeViewWrapper className="image-component" data-drag-handle>
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <Popover placement="bottom" isOpen={selected}>
          <Popover.Trigger asChild>
            <div style={{ display: 'inline-flex' }}>
              <ResizableImageComponent {...props} />
            </div>
          </Popover.Trigger>

          <Popover.Content>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                padding: '8px',
                background: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <button
                type="button"
                onClick={() => onChangeImageAlign('left')}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  background: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                ← 왼쪽 정렬
              </button>
              <button
                type="button"
                onClick={() => onChangeImageAlign('center')}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  background: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                ↔ 가운데 정렬
              </button>
              <button
                type="button"
                onClick={() => onChangeImageAlign('right')}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  background: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                → 오른쪽 정렬
              </button>

              <button
                type="button"
                onClick={() => setIsAltTextInputOpen(true)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  background: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Alt 텍스트
              </button>
            </div>
          </Popover.Content>
        </Popover>

        <Popover isOpen={isAltTextInputOpen} onOpenChange={setIsAltTextInputOpen}>
          {/* 가상 Trigger 생성 - 이미지 하단 중앙에 1x1px 투명한 트리거 */}
          <Popover.Trigger asChild>
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                width: 1,
                height: 1,
                transform: 'translateX(-50%)',
                pointerEvents: 'none',
              }}
            />
          </Popover.Trigger>

          <Popover.Content>
            <div
              style={{
                padding: '16px',
                background: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                minWidth: '300px',
              }}
            >
              <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 'bold' }}>
                Alt 텍스트 입력
              </div>
              <input
                type="text"
                value={altText}
                onChange={onChangeAltText}
                placeholder="이미지에 대한 설명을 입력하세요"
                style={{
                  minWidth: 0,
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px',
                  marginBottom: '12px',
                  outline: 'none',
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSubmitAltText();
                  }
                  if (e.key === 'Escape') {
                    onCloseAltTextInput();
                  }
                }}
                autoFocus
              />
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={onCloseAltTextInput}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    background: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={onSubmitAltText}
                  style={{
                    padding: '8px 12px',
                    border: 'none',
                    background: '#2563eb',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  저장
                </button>
              </div>
            </div>
          </Popover.Content>
        </Popover>
      </div>
    </NodeViewWrapper>
  );
};

export const ResizableImageWithControls = ResizableImage.extend({
  addNodeView() {
    return ReactNodeViewRenderer((props) => {
      return NodeView(props as unknown as ResizableImageNodeViewRendererProps);
    });
  },
});
