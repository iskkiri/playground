'use client';

import GoBack from '@/_components/GoBack';
import BannerForm from '@/app/(admin)/_features/banner/components/BannerForm';
import useGoBack from '@/_hooks/useGoBack';
import useBannerForm from '@/app/(admin)/_features/banner/hooks/useBannerForm';
import useBannerImagesUpload from '@/app/(admin)/_features/banner/hooks/useBannerImagesUpload';
import useBannerSubmit from '@/app/(admin)/_features/banner/hooks/useBannerSubmit';
import { useMemo } from 'react';
import { useGetBannerDetail } from '@/app/(admin)/_features/banner/hooks/react-query/useBanner';
import useInitializeBannerForm from '@/app/(admin)/_features/banner/hooks/useInitializeBannerForm';
import useGetIdParam from '@/_hooks/useGetIdParam';

export default function AdminBannerEditPage() {
  const id = useGetIdParam();
  const { onGoBack } = useGoBack();

  // 배너 폼
  const { register, watch, setValue, reset, handleSubmit } = useBannerForm();

  // 배너 상세 조회
  const { data: bannerDetail, isLoading: isGetBannerLoading } = useGetBannerDetail(id);
  // 배너 초기화
  useInitializeBannerForm({ bannerDetail, reset });

  // 이미지 업로드
  const {
    insertedMobileImageFile,
    onInsertMobileImage,
    onRemoveMobileImage,
    insertedPcImageFile,
    onInsertPcImage,
    onRemovePcImage,
    uploadImageAsync,
    isUploadImagePending,
  } = useBannerImagesUpload({
    watch,
    setValue,
    mobileStorageImage: bannerDetail?.mobileImage,
    pcStorageImage: bannerDetail?.pcImage,
  });

  // 배너 수정
  const { onSubmit, isCreateBannerPending, isUpdateBannerPending } = useBannerSubmit({
    id,
    uploadImageAsync,
  });

  // 버튼 비활성 여부
  const isSubmitDisabled = useMemo(() => {
    return isUploadImagePending || isCreateBannerPending || isUpdateBannerPending;
  }, [isCreateBannerPending, isUpdateBannerPending, isUploadImagePending]);

  return (
    <div className="flex flex-col gap-32 px-20 py-40">
      <div className="flex items-center gap-8">
        <GoBack />
        <h1 className="typography-h4-36b">배너 수정</h1>
      </div>

      {(() => {
        if (isGetBannerLoading) return null;

        return (
          <BannerForm
            //
            onGoBack={onGoBack}
            register={register}
            insertedMobileImageFile={insertedMobileImageFile}
            onInsertMobileImage={onInsertMobileImage}
            onRemoveMobileImage={onRemoveMobileImage}
            insertedPcImageFile={insertedPcImageFile}
            onInsertPcImage={onInsertPcImage}
            onRemovePcImage={onRemovePcImage}
            onSubmit={handleSubmit(onSubmit)}
            isSubmitDisabled={isSubmitDisabled}
          />
        );
      })()}
    </div>
  );
}
