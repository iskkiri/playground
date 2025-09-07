import { Editor, useEditorState } from '@tiptap/react';
import { useMemo } from 'react';

interface SelectedTextPosition {
  top: number;
  left: number;
  bottom: number;
  height: number;
}

export function useSelectedTextPosition(editor: Editor): SelectedTextPosition {
  // 에디터의 선택 상태와 뷰를 구독하여 상태 변경을 감지
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      selection: editor.state.selection,
      view: editor.view,
    }),
  });

  // 선택된 텍스트의 위치를 계산하여 Popover Trigger를 배치할 좌표 계산
  const position = useMemo(() => {
    if (!editorState.selection || !editorState.view) {
      return { top: 0, left: 0, bottom: 0, height: 0 };
    }

    const { from } = editorState.selection;

    // Tiptap의 coordsAtPos로 선택 위치의 정확한 좌표 가져오기
    const coordsAtPos = editorState.view.coordsAtPos(from);
    const domAtPos = editorState.view.domAtPos(from);

    // DOM 노드에서 실제 텍스트 요소 찾아서 높이 정보 가져오기
    let textElement: Element | null = null;
    if (domAtPos.node.nodeType === Node.TEXT_NODE) {
      textElement = domAtPos.node.parentElement;
    } else if (domAtPos.node.nodeType === Node.ELEMENT_NODE) {
      textElement = domAtPos.node as Element;
    }

    // 요소가 없으면 기본값 반환
    if (!textElement || !textElement.getBoundingClientRect) {
      return { top: 0, left: 0, bottom: 0, height: 0 };
    }

    // 텍스트 요소의 높이 정보만 가져오기
    const rect = textElement.getBoundingClientRect();

    return {
      top: coordsAtPos.top,
      left: coordsAtPos.left, // 선택된 위치의 정확한 left 좌표
      bottom: coordsAtPos.bottom, // 선택된 위치의 정확한 bottom 좌표
      height: rect.height,
    };
  }, [editorState.selection, editorState.view]);

  return position;
}