'use client';

import 'ckeditor5/ckeditor5.css';
import './styles/ck-editor.scss';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5';
import { editorConfig } from './configs/editorConfig';

type CKEditorProps = React.ComponentProps<typeof CKEditor>;
interface EditorProps extends Omit<CKEditorProps, 'editor'> {
  editorRef: React.RefObject<CKEditor<ClassicEditor> | null> | undefined;
  placeholder?: string;
  height?: number;
}

export default function Editor({ editorRef, placeholder, height, ...restProps }: EditorProps) {
  return (
    <div style={{ height }}>
      <CKEditor
        {...restProps}
        ref={editorRef}
        editor={ClassicEditor}
        config={{
          ...editorConfig,
          placeholder,
        }}
      />
    </div>
  );
}
