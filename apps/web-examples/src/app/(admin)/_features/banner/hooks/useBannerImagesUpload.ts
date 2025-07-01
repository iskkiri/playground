import useUploadImage from '@/_features/image/hooks/react-query/useUploadImage';
import useInsertImage from '@/_features/image/hooks/useInsertImage';
import type { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { BannerRegisterSchema } from '../schemas/bannerRegister.schema';

interface UseBannerImagesUploadParams {
  watch: UseFormWatch<BannerRegisterSchema>;
  setValue: UseFormSetValue<BannerRegisterSchema>;
  mobileStorageImage?: string;
  pcStorageImage?: string;
}

export default function useBannerImagesUpload({
  watch,
  setValue,
  mobileStorageImage,
  pcStorageImage,
}: UseBannerImagesUploadParams) {
  // 모바일 이미지 insert
  const {
    insertedImageObj: insertedMobileImageFile,
    onInsertImage: onInsertMobileImage,
    onRemoveImage: onRemoveMobileImage,
  } = useInsertImage({
    name: 'mobileImage',
    setValue,
    watch,
    storageImage: mobileStorageImage,
  });

  // PC 이미지 insert
  const {
    insertedImageObj: insertedPcImageFile,
    onInsertImage: onInsertPcImage,
    onRemoveImage: onRemovePcImage,
  } = useInsertImage({
    name: 'pcImage',
    setValue,
    watch,
    storageImage: pcStorageImage,
  });

  // 이미지 업로드
  const { mutateAsync: uploadImageAsync, isPending: isUploadImagePending } = useUploadImage();

  return {
    insertedMobileImageFile,
    onInsertMobileImage,
    onRemoveMobileImage,
    insertedPcImageFile,
    onInsertPcImage,
    onRemovePcImage,
    uploadImageAsync,
    isUploadImagePending,
  };
}
