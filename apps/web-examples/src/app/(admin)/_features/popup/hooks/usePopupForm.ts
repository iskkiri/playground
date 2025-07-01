import useFormErrorAlert from '@/_hooks/useFormErrorAlert';
import { useForm } from 'react-hook-form';
import { popupRegisterSchema, type PopupRegisterSchema } from '../schemas/popupRegister.schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function usePopupForm() {
  // 팝업 폼
  const {
    control,
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<PopupRegisterSchema>({
    resolver: zodResolver(popupRegisterSchema),
    defaultValues: {
      title: '',
      displayType: 'ALL',
      pcPosition: 'CENTER',
      xCoordinate: 0,
      yCoordinate: 0,
      popupImage: undefined,
      link: '',
      popupWidthStatus: 'AUTO',
      imageWidth: 0,
    },
  });
  const isDirectPosition = watch('pcPosition') === 'CUSTOM';
  const isDirectImageWidth = watch('popupWidthStatus') === 'DIRECT';

  // 폼 에러 알림
  useFormErrorAlert({ errors, clearErrors });

  return {
    control,
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    isDirectPosition,
    isDirectImageWidth,
  };
}
