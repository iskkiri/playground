import { useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { PopupDetailData } from '../api/dtos/getPopupDetail.dto';
import type { PopupRegisterSchema } from '../schemas/popupRegister.schema';

interface UseInitialzePopUpParams {
  popUpDetail: PopupDetailData | undefined;
  reset: UseFormReturn<PopupRegisterSchema>['reset'];
}

export default function useInitialzePopupForm({
  popUpDetail,
  reset,
}: UseInitialzePopUpParams) {
  useEffect(() => {
    if (!popUpDetail) return;

    reset({
      title: popUpDetail.title,
      displayType: popUpDetail.displayType,
      pcPosition: popUpDetail.pcPosition,
      xCoordinate: popUpDetail.xCoordinate,
      yCoordinate: popUpDetail.yCoordinate,
      dateRange: {
        startDate: popUpDetail.startDate
          ? new Date(popUpDetail.startDate)
          : undefined,
        endDate: popUpDetail.endDate
          ? new Date(popUpDetail.endDate)
          : undefined,
      },
      popupImage: {
        storageImage: popUpDetail.imageUrl,
      },
      link: popUpDetail.link ?? '',
      popupWidthStatus: popUpDetail.popupWidthStatus,
      imageWidth: popUpDetail.imageWidth ?? 0,
    });
  }, [popUpDetail, reset]);
}
