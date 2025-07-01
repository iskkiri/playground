'use client';

import { useMemo } from 'react';
import useGoBack from '@/_hooks/useGoBack';
import GoBack from '@/_components/GoBack';
import PopupBasicField from '@/app/(admin)/_features/popup/components/PopupBasicField';
import PopupExposureFields from '@/app/(admin)/_features/popup/components/PopupExposureFields';
import PopupImageFields from '@/app/(admin)/_features/popup/components/PopupImageFields';
import usePopupForm from '@/app/(admin)/_features/popup/hooks/usePopupForm';
import usePopupImageUpload from '@/app/(admin)/_features/popup/hooks/usePopupImageUpload';
import usePopupSubmit from '@/app/(admin)/_features/popup/hooks/usePopupSubmit';
import Button from '@repo/ui-tailwind/Button/Button';

export default function AdminPopupCreatePage() {
  const { onGoBack } = useGoBack();

  // 팝업 폼
  const { control, register, watch, setValue, handleSubmit, isDirectPosition, isDirectImageWidth } =
    usePopupForm();

  // 이미지 업로드
  const { insertedImageObj, onInsertImage, onRemoveImage, uploadImageAsync, isUploadImagePending } =
    usePopupImageUpload({ watch, setValue });

  // 팝업 생성
  const { onSubmit, isCreatePopupPending, isUpdatePopupPending } = usePopupSubmit({
    uploadImageAsync,
  });

  // 버튼 비활성 여부
  const isSubmitDisabled = useMemo(() => {
    return isUploadImagePending || isCreatePopupPending || isUpdatePopupPending;
  }, [isCreatePopupPending, isUpdatePopupPending, isUploadImagePending]);

  return (
    <div className="flex flex-col gap-32 px-20 py-40">
      <div className="flex items-center gap-8">
        <GoBack />
        <h1 className="typography-h4-36b">팝업 생성</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-32">
        <div className="border border-gray-200">
          {/* 팝업명 */}
          <PopupBasicField register={register} />
          {/* 노출여부, PC 노출위치, 노출 기간 설정 */}
          <PopupExposureFields
            control={control}
            register={register}
            isDirectPosition={isDirectPosition}
          />
          {/* 이미지 등록, 이미지 너비 */}
          <PopupImageFields
            control={control}
            register={register}
            insertedImageObj={insertedImageObj}
            onInsertImage={onInsertImage}
            onRemoveImage={onRemoveImage}
            isDirectImageWidth={isDirectImageWidth}
          />
        </div>

        <div className="mx-auto grid grid-cols-[120px_120px] gap-16">
          <Button onClick={onGoBack} type="button" variant="gray">
            취소
          </Button>
          <Button type="submit" disabled={isSubmitDisabled} variant="primary">
            저장하기
          </Button>
        </div>
      </form>
    </div>
  );
}
