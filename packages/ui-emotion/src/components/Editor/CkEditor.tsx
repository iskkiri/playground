import 'ckeditor5/ckeditor5.css';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5';
import { editorConfig } from './configs/editorConfig';
import { editorCss } from './CkEditor.styles';
import { Global } from '@emotion/react';

type CKEditorProps = React.ComponentProps<typeof CKEditor>;
interface EditorProps extends Omit<CKEditorProps, 'editor'> {
  editorRef: React.MutableRefObject<CKEditor<ClassicEditor> | null> | undefined;
  placeholder?: string;
  height?: number;
}

export default function Editor({ editorRef, placeholder, height, ...restProps }: EditorProps) {
  return (
    <>
      <Global styles={editorCss.label} />

      <div css={[editorCss.editor, { height }]}>
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
    </>
  );
}
