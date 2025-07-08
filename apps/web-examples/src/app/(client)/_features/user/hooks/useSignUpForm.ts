import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import useFormErrorAlert from '@/_hooks/useFormErrorAlert';
import useSignUp from './react-query/useSignUp';
import { signUpSchema, type SignUpSchema } from '../schemas/signUp.schema';

export default function useSignUpForm() {
  const formMethods = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const {
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = formMethods;

  // 폼 에러 처리
  useFormErrorAlert({ errors, clearErrors });

  const { mutate: signUp } = useSignUp();
  const onSubmit: SubmitHandler<SignUpSchema> = useCallback(
    (values) => {
      signUp({
        socialProvider: values.socialProvider,
        socialId: values.socialId,
        email: values.email,
        nickname: values.nickname,
        gender: values.gender,
        birthDate: values.birthDate,
      });
    },
    [signUp]
  );

  return {
    ...formMethods,
    onSubmit: handleSubmit(onSubmit),
  };
}
