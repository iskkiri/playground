import { useForm } from 'react-hook-form';
import { bannerRegisterSchema, type BannerRegisterSchema } from '../schemas/bannerRegister.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import useFormErrorAlert from '@/_hooks/useFormErrorAlert';

export default function useBannerForm() {
  // 배너 폼
  const form = useForm<BannerRegisterSchema>({
    resolver: zodResolver(bannerRegisterSchema),
    defaultValues: {
      title: '',
      mobileLink: '',
      pcLink: '',
    },
  });

  // 폼 에러 알림
  useFormErrorAlert({ errors: form.formState.errors, clearErrors: form.clearErrors });

  return form;
}
