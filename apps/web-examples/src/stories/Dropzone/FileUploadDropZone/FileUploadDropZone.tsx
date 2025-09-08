import { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { cn } from '@repo/utils/cn';
import Button from '@repo/ui/general/Button/Button';

export default function FileUploadDropzone() {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: setFiles,
    noClick: true,
  });
  const onOpenFileWindow = useCallback(() => open(), [open]);

  return (
    <section className="w-600 mx-auto mt-16 flex flex-col gap-8 border border-neutral-200 p-16">
      <div
        {...getRootProps()}
        className={cn(
          'h-160 flex flex-col items-center justify-center gap-8 border border-dashed border-neutral-200',
          isDragActive && 'border-primary border-solid'
        )}
      >
        <input {...getInputProps()} />
        <p className="typography-p3-16r">파일을 끌어서 여기에 놓으세요.</p>
        <Button variant="primary" onClick={onOpenFileWindow}>
          파일 첨부
        </Button>
      </div>

      <ul className="grid grid-cols-2 gap-8">
        {files.map((file) => (
          <li key={file.name} className="typography-p4-14r">
            {file.path} - {(file.size / 1024).toFixed(2)}KB
          </li>
        ))}
      </ul>
    </section>
  );
}
