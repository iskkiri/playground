import { useCallback } from 'react';
import type { FieldPath, FieldValues, SetValueConfig, UseFormReturn } from 'react-hook-form';
import type { ImageSchema } from '../schemas/image.schema';
import { validateFileSize } from '@repo/utils/validateFileSize';
import { useAlertModal } from '@/_hooks/useDialogModals';
import { readFileAsDataURL } from '@repo/utils/image';

interface UseInsertImageParams<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  watch: UseFormReturn<TFieldValues>['watch'];
  setValue: (name: FieldPath<TFieldValues>, value: ImageSchema, options?: SetValueConfig) => void;
  storageImage?: string;
  fileSizeLimit?: number;
}

// React Hook Form을 이용하여 한 장의 이미지를 업로드할 때 사용하는 Custom Hook
export default function useInsertImage<TFieldValues extends FieldValues>({
  name,
  watch,
  setValue,
  storageImage,
  fileSizeLimit,
}: UseInsertImageParams<TFieldValues>) {
  const insertedImageObj: ImageSchema = watch(name);
  const { openAlertModal, closeAlertModal } = useAlertModal();

  const onInsertImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      if (!files) return;

      const file = files[0];
      if (fileSizeLimit && !validateFileSize({ fileSize: file.size, fileSizeLimit })) {
        openAlertModal({
          title: '파일 크기 초과',
          content: `파일 크기는 ${fileSizeLimit}MB를 초과할 수 없습니다.`,
          onClose: closeAlertModal,
        });
        return;
      }

      const base64Image = await readFileAsDataURL(file);

      setValue(name, { file, base64Image }, { shouldValidate: true });
    },
    [fileSizeLimit, name, setValue, openAlertModal, closeAlertModal]
  );

  const onRemoveImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      setValue(name, {
        file: undefined,
        base64Image: undefined,
        storageImage,
      });
    },
    [name, setValue, storageImage]
  );

  return {
    insertedImageObj,
    onInsertImage,
    onRemoveImage,
  };
}
