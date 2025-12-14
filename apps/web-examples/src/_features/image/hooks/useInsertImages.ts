import { useCallback } from 'react';
import { type UseFieldArrayRemove, type FieldArrayMethodProps } from 'react-hook-form';
import type { ImageSchema } from '../schemas/image.schema';
import { validateFileSize } from '@repo/utils/validateFileSize';
import { useAlertModal } from '@/_hooks/useDialogModals';
import { readFileAsDataURL } from '@repo/utils/image';

interface UseInsertImagesParams {
  append: (value: ImageSchema | ImageSchema[], options?: FieldArrayMethodProps) => void;
  remove: UseFieldArrayRemove;
  fileSizeLimit?: number;
}

// React Hook Form을 이용하여 여러 장의 이미지를 업로드할 때 사용하는 Custom Hook
export default function useInsertImages({ append, remove, fileSizeLimit }: UseInsertImagesParams) {
  const { openAlertModal } = useAlertModal();

  // Multiple Upload (여러 장의 이미지가 업로드가 가능할 경우)
  const onInsertImages = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      if (!files) return;

      for (const file of files) {
        if (fileSizeLimit && !validateFileSize({ fileSize: file.size, fileSizeLimit })) {
          openAlertModal({
            title: '파일 크기 초과',
            content: `파일 크기는 ${fileSizeLimit}MB를 초과할 수 없습니다.`,
          });
          continue;
        }

        const base64Image = await readFileAsDataURL(file);

        append({ file, base64Image });
      }
    },
    [append, fileSizeLimit, openAlertModal]
  );

  const onRemoveImages = useCallback(
    (indexList: number[]) => () => {
      // 인덱스를 이용하여 삭제하므로 내림차순으로 정렬 후 삭제
      const descendingOrderIndexList = indexList.sort((a, b) => b - a);
      for (const index of descendingOrderIndexList) {
        remove(index);
      }
    },
    [remove]
  );

  return { onInsertImages, onRemoveImages };
}
