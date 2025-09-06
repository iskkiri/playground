import type { Editor } from '@tiptap/react';
import ImageUploadIcon from '../../assets/image_upload.svg';

interface ImageUploadControlProps {
  editor: Editor;
}

// TODO: 다중 이미지 업로드로 변경
export default function ImageUploadControl({ editor }: ImageUploadControlProps) {
  const onInsertImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) return;
    const file = files[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target) return;
      if (typeof e.target.result !== 'string') return;

      const src = e.target.result;

      editor
        .chain()
        .focus()
        .setResizableImage({
          src,
          'data-keep-ratio': true,
        })
        .run();
    };

    reader.readAsDataURL(file);

    // 같은 파일을 다시 선택할 수 있도록 value 초기화
    event.target.value = '';
  };

  return (
    <label className="rounded-4 flex h-32 cursor-pointer items-center justify-center bg-white px-8 hover:bg-gray-100">
      <div className="flex items-center gap-4">
        <ImageUploadIcon className="size-20" />
      </div>

      <input onChange={onInsertImage} type="file" accept="image/*" className="sr-only" />
    </label>
  );
}
