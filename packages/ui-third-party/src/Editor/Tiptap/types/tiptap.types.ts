import type { EditorState } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';
import type { Editor } from '@tiptap/react';

declare module '@tiptap/react' {
  interface NodeViewRendererProps {
    selected: boolean;
  }
}

export interface TiptapBubbleMenuProps {
  editor: Editor;
  element: HTMLElement;
  view: EditorView;
  state: EditorState;
  oldState?: EditorState;
  from: number;
  to: number;
}
