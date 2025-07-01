import type { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { PopupRegisterSchema } from '../schemas/popupRegister.schema';
import useInsertImage from '@/_features/image/hooks/useInsertImage';
import useUploadImage from '@/_features/image/hooks/react-query/useUploadImage';

interface UsePopupImageUploadParams {
  watch: UseFormWatch<PopupRegisterSchema>;
  setValue: UseFormSetValue<PopupRegisterSchema>;
  storageImage?: string;
}

export default function usePopupImageUpload({
  watch,
  setValue,
  storageImage,
}: UsePopupImageUploadParams) {
  // 단일 이미지 insert
  const { insertedImageObj, onInsertImage, onRemoveImage } = useInsertImage({
    name: 'popupImage',
    setValue,
    watch,
    storageImage,
  });

  // 이미지 업로드
  const { mutateAsync: uploadImageAsync, isPending: isUploadImagePending } =
    useUploadImage();

  return {
    insertedImageObj,
    onInsertImage,
    onRemoveImage,
    uploadImageAsync,
    isUploadImagePending,
  };
}
