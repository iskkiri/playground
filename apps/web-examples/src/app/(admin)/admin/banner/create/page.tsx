'use client';

import GoBack from '@/_components/GoBack';
import BannerForm from '@/app/(admin)/_features/banner/components/BannerForm';
import useGoBack from '@/_hooks/useGoBack';
import useBannerForm from '@/app/(admin)/_features/banner/hooks/useBannerForm';
import useBannerSubmit from '@/app/(admin)/_features/banner/hooks/useBannerSubmit';
import { useMemo } from 'react';
import useUploadImage from '@/_features/image/hooks/react-query/useUploadImage';

export default function AdminBannerCreatePage() {
  const { onGoBack } = useGoBack();

  // 배너 폼
  const form = useBannerForm();

  // 이미지 업로드
  const { mutateAsync: uploadImageAsync, isPending: isUploadImagePending } = useUploadImage();

  // 배너 생성
  const { onSubmit, isCreateBannerPending, isUpdateBannerPending } = useBannerSubmit({
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
        <h1 className="typography-h4-36b">배너 생성</h1>
      </div>

      <BannerForm
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
        isSubmitDisabled={isSubmitDisabled}
        onGoBack={onGoBack}
      />
    </div>
  );
}
