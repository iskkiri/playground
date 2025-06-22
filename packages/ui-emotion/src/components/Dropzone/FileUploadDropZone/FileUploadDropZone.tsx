import { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { fileUploadDropZoneCss } from './FileUploadDropZone.styles';
import Button from '../../Button/Button';

export default function FileUploadDropzone() {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: setFiles,
    noClick: true,
  });
  const onOpenFileWindow = useCallback(() => open(), [open]);

  return (
    <section css={fileUploadDropZoneCss.section}>
      <div
        {...getRootProps()}
        css={[fileUploadDropZoneCss.dropZone, isDragActive && fileUploadDropZoneCss.dropZoneActive]}
      >
        <input {...getInputProps()} />
        <p>파일을 끌어서 여기에 놓으세요.</p>
        <Button buttonType="primary" onClick={onOpenFileWindow}>
          파일 첨부
        </Button>
      </div>

      <ul>
        {files.map((file) => (
          <li key={file.name}>
            {file.path} - {Math.round(file.size / 1024)}KB
          </li>
        ))}
      </ul>
    </section>
  );
}
