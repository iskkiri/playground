import useUploadImage from '@/_features/image/hooks/react-query/useUploadImage';
import useInsertImage from '@/_features/image/hooks/useInsertImage';
import type { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { NoticeRegisterSchema } from '../schemas/noticeRegister.schema';

interface UseNoticeThumbnailUploadParams {
  watch: UseFormWatch<NoticeRegisterSchema>;
  setValue: UseFormSetValue<NoticeRegisterSchema>;
  storageImage?: string;
}

export default function useNoticeThumbnailUpload({
  watch,
  setValue,
  storageImage,
}: UseNoticeThumbnailUploadParams) {
  // 단일 이미지 insert
  const { insertedImageObj, onInsertImage, onRemoveImage } = useInsertImage({
    name: 'thumbnail',
    setValue,
    watch,
    storageImage,
    fileSizeLimit: 5,
  });

  // 이미지 업로드
  const { mutateAsync: uploadImageAsync, isPending: isUploadImagePending } = useUploadImage();

  return {
    insertedImageObj,
    onInsertImage,
    onRemoveImage,
    uploadImageAsync,
    isUploadImagePending,
  };
}
