import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@repo/utils/cn';
import Button from '@repo/ui/general/Button/Button';
import { readFileAsDataURL } from '@repo/utils/image';

interface IUploadImage {
  file: File;
  base64Image: string;
}

export default function ImageUploadDropzone() {
  const [uploadImages, setUploadImages] = useState<IUploadImage[]>([]);

  const onDrop = useCallback(async (files: File[]) => {
    for (const file of files) {
      const base64Image = await readFileAsDataURL(file);

      setUploadImages((prev) => [...prev, { file, base64Image }]);
    }
  }, []);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      'image/*': [],
    },
  });

  const onOpenFileWindow = useCallback(() => open(), [open]);

  return (
    <section className="w-600 mx-auto mt-16 flex flex-col gap-8 border border-neutral-200 p-16">
      <div
        {...getRootProps()}
        className={cn(
          'h-160 flex flex-col items-center justify-center gap-8 border border-dashed border-neutral-200',
          isDragActive && 'border-primary-hover border-solid'
        )}
      >
        <input {...getInputProps()} />
        <p className="typography-p3-16r">사진을 끌어서 여기에 놓으세요.</p>
        <Button variant="primary" onClick={onOpenFileWindow}>
          파일 첨부
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {uploadImages.map((uploadImage) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={uploadImage.file.name}
            src={uploadImage.base64Image}
            alt=""
            className="h-full w-full object-cover"
          />
        ))}
      </div>
    </section>
  );
}
