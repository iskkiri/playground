import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@repo/utils/cn';
import Button from '@repo/ui/general/Button/Button';

interface IUploadImage {
  file: File;
  blobImage: string;
}

export default function ImageUploadDropzone() {
  const [uploadImages, setUploadImages] = useState<IUploadImage[]>([]);
  const blobUrlsRef = useRef<string[]>([]);

  const onDrop = useCallback((files: File[]) => {
    for (const file of files) {
      const blobImage = URL.createObjectURL(file);
      if (!blobImage) return;

      blobUrlsRef.current.push(blobImage);
      setUploadImages((prev) => [...prev, { file, blobImage }]);
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

  // 컴포넌트 언마운트 시 모든 blob URL 해제
  useEffect(() => {
    const blobUrls = blobUrlsRef.current;
    return () => {
      blobUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

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
            src={uploadImage.blobImage}
            alt=""
            className="h-full w-full object-cover"
          />
        ))}
      </div>
    </section>
  );
}
