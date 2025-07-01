import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useFormErrorAlert from '@/_hooks/useFormErrorAlert';
import { noticeRegisterSchema, type NoticeRegisterSchema } from '../schemas/noticeRegister.schema';

export default function useNoticeForm() {
  // 공지사항 폼
  const {
    control,
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<NoticeRegisterSchema>({
    resolver: zodResolver(noticeRegisterSchema),
    defaultValues: {
      isShow: true,
      title: '',
      attachedFiles: [],
      content: '',
    },
  });

  // 폼 에러 알림
  useFormErrorAlert({ errors, clearErrors });

  return {
    control,
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
  };
}
