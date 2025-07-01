import type { SubmitHandler } from 'react-hook-form';
import type { BannerRegisterSchema } from '../schemas/bannerRegister.schema';
import { useCallback } from 'react';
import type useUploadImage from '@/_features/image/hooks/react-query/useUploadImage';
import { useCreateBanner, useUpdateBanner } from './react-query/useBanner';
import type { CreateBannerRequestDto } from '../api/dtos/createBanner.dto';

interface UseBannerSubmitParams {
  id?: string;
  uploadImageAsync: ReturnType<typeof useUploadImage>['mutateAsync'];
}

export default function useBannerSubmit({ id, uploadImageAsync }: UseBannerSubmitParams) {
  // 배너 생성
  const { mutate: createBanner, isPending: isCreateBannerPending } = useCreateBanner();
  // 배너 수정
  const { mutate: updateBanner, isPending: isUpdateBannerPending } = useUpdateBanner();

  // 배너 생성 및 수정
  const onSubmit: SubmitHandler<BannerRegisterSchema> = useCallback(
    async (values) => {
      // 이미지 업로드
      let mobileImage = values.mobileImage?.storageImage ?? '';
      let pcImage = values.pcImage?.storageImage ?? '';

      // insert된 이미지가 존재할 경우에만 스토리지에 이미지 업로드
      if (values.mobileImage?.file) {
        const formData = new FormData();
        formData.append('file', values.mobileImage.file);
        mobileImage = await uploadImageAsync({ formData, category: 'banner' });
      }
      if (values.pcImage?.file) {
        const formData = new FormData();
        formData.append('file', values.pcImage.file);
        pcImage = await uploadImageAsync({ formData, category: 'banner' });
      }

      const payload = {
        title: values.title,
        mobileImage,
        mobileLink: values.mobileLink,
        pcImage,
        pcLink: values.pcLink,
      } satisfies CreateBannerRequestDto;

      if (id) {
        updateBanner({ id, ...payload });
      } else {
        createBanner(payload);
      }
    },
    [createBanner, id, updateBanner, uploadImageAsync]
  );

  return { onSubmit, isCreateBannerPending, isUpdateBannerPending };
}
