import useFormErrorAlert from '@/_hooks/useFormErrorAlert';
import { useForm } from 'react-hook-form';
import { popupRegisterSchema, type PopupRegisterSchema } from '../schemas/popupRegister.schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function usePopupForm() {
  // 팝업 폼
  const form = useForm<PopupRegisterSchema>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit', // 재검증도 submit할 때만
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

  // 폼 에러 알림
  useFormErrorAlert({ errors: form.formState.errors, clearErrors: form.clearErrors });

  return form;
}
