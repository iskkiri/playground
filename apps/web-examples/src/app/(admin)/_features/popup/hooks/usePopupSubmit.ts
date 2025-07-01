import type useUploadImage from '@/_features/image/hooks/react-query/useUploadImage';
import { useCreatePopup, useUpdatePopup } from './react-query/useAdminPopup';
import type { SubmitHandler } from 'react-hook-form';
import type { PopupRegisterSchema } from '../schemas/popupRegister.schema';
import { useCallback } from 'react';
import type { CreatePopupRequestDto } from '../api/dtos/createPopup.dto';

interface UsePopupSubmitParams {
  id?: string;
  uploadImageAsync: ReturnType<typeof useUploadImage>['mutateAsync'];
}

export default function usePopupSubmit({ id, uploadImageAsync }: UsePopupSubmitParams) {
  // 팝업 생성
  const { mutate: createPopup, isPending: isCreatePopupPending } = useCreatePopup();
  // 팝업 수정
  const { mutate: updatePopup, isPending: isUpdatePopupPending } = useUpdatePopup();

  // 팝업 생성 및 수정
  const onSubmit: SubmitHandler<PopupRegisterSchema> = useCallback(
    async (values) => {
      // 이미지 업로드
      let popupImage = values.popupImage?.storageImage ?? '';

      // insert된 이미지가 존재할 경우에만 스토리지에 이미지 업로드
      if (values.popupImage?.file) {
        const formData = new FormData();
        formData.append('file', values.popupImage.file);
        popupImage = await uploadImageAsync({ formData, category: 'popup' });
      }

      const payload = {
        title: values.title,
        displayType: values.displayType,
        pcPosition: values.pcPosition,
        xCoordinate: values.xCoordinate,
        yCoordinate: values.yCoordinate,
        startDate: values.dateRange?.startDate ?? null,
        endDate: values.dateRange?.endDate ?? null,
        imageUrl: popupImage,
        link: values.link ?? null,
        popupWidthStatus: values.popupWidthStatus,
        imageWidth: values.imageWidth,
      } satisfies CreatePopupRequestDto;

      if (id) {
        updatePopup({ id, ...payload });
      } else {
        createPopup(payload);
      }
    },
    [createPopup, id, updatePopup, uploadImageAsync]
  );

  return { onSubmit, isCreatePopupPending, isUpdatePopupPending };
}
