'use client';

import './styles/tiptap-editor-viewer.scss';

import DOMPurify from 'isomorphic-dompurify';
import { cn } from '@repo/utils/cn';

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
  className?: string;
}

export default function EditorViewer({ content, className }: EditorViewerProps) {
  return (
    <div
      className={cn('tiptap-editor-viewer', className)}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
    />
  );
}
