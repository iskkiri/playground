import { useEffect } from 'react';
import type { BannerDetailData } from '../api/dtos/getBannerDetail.dto';
import type { BannerRegisterSchema } from '../schemas/bannerRegister.schema';
import type { UseFormReset } from 'react-hook-form';

interface UseInitializeBannerFormParams {
  bannerDetail: BannerDetailData | undefined;
  reset: UseFormReset<BannerRegisterSchema>;
}

export default function useInitializeBannerForm({
  bannerDetail,
  reset,
}: UseInitializeBannerFormParams) {
  useEffect(() => {
    if (!bannerDetail) return;

    reset({
      title: bannerDetail.title,
      mobileImage: {
        storageImage: bannerDetail.mobileImage,
      },
      mobileLink: bannerDetail.mobileLink,
      pcImage: {
        storageImage: bannerDetail.pcImage,
      },
      pcLink: bannerDetail.pcLink,
    });
  }, [bannerDetail, reset]);
}
