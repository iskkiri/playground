import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import useSignUp from './react-query/useSignUp';
import { signUpSchema, type SignUpSchema } from '../schemas/signUp.schema';

export default function useSignUpForm() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const { handleSubmit } = form;

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
    ...form,
    onSubmit: handleSubmit(onSubmit),
  };
}
