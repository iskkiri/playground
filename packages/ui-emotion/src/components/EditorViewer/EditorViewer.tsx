import { useRef } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { editorViewerCss } from './EditorViewer.styles';

if (typeof window !== 'undefined') {
  DOMPurify.addHook('afterSanitizeAttributes', function (node) {
    if (node instanceof HTMLAnchorElement && 'target' in node) {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

interface EditorViewerProps {
  content: string;
}

export default function EditorViewer({ content }: EditorViewerProps) {
  const editorViewerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={editorViewerRef}
      css={editorViewerCss.tags}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
    />
  );
}
