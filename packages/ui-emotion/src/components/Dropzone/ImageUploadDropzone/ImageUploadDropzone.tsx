import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { fileUploadDropZoneCss } from '../FileUploadDropZone/FileUploadDropZone.styles';
import Button from '../../Button/Button';

interface IUploadImage {
  file: File;
  cacheImage: string;
}

export default function ImageUploadDropzone() {
  const [uploadImages, setUploadImages] = useState<IUploadImage[]>([]);

  const onDrop = useCallback((files: File[]) => {
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onabort = () => alert('파일 읽기가 중단되었습니다.');
      reader.onerror = () => alert('파일을 읽어오는데 실패하였습니다.');
      reader.onloadend = () => {
        if (!reader.result || typeof reader.result !== 'string') return;

        const cacheImage = reader.result;
        setUploadImages((prev) => [...prev, { file, cacheImage }]);
      };
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
    <section css={fileUploadDropZoneCss.section}>
      <div
        {...getRootProps()}
        css={[fileUploadDropZoneCss.dropZone, isDragActive && fileUploadDropZoneCss.dropZoneActive]}
      >
        <input {...getInputProps()} />
        <p>사진을 끌어서 여기에 놓으세요.</p>
        <Button buttonType="primary" onClick={onOpenFileWindow}>
          파일 첨부
        </Button>
      </div>

      <div css={fileUploadDropZoneCss.grid}>
        {uploadImages.map((uploadImage) => (
          <img key={uploadImage.file.name} src={uploadImage.cacheImage} alt="" />
        ))}
      </div>
    </section>
  );
}
