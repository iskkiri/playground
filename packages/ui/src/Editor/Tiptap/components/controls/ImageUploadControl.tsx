import type { Editor } from '@tiptap/react';
import ImageUploadIcon from '../../assets/image_upload.svg';
import { useCallback } from 'react';
import { insertEditorImages } from '../../utils/image';

interface ImageUploadControlProps {
  editor: Editor;
}

export default function ImageUploadControl({ editor }: ImageUploadControlProps) {
  const onInsertImages = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      await insertEditorImages(editor, [...files]);

      // 같은 파일을 다시 선택할 수 있도록 value 초기화
      event.target.value = '';
    },
    [editor]
  );

  return (
    <label className="rounded-4 flex h-32 cursor-pointer items-center justify-center bg-white px-8 hover:bg-gray-100">
      <div className="flex items-center gap-4">
        <ImageUploadIcon className="size-20" />
      </div>

      <input onChange={onInsertImages} type="file" multiple accept="image/*" className="sr-only" />
    </label>
  );
}
