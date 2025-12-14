import { useAlertModal } from '@/_hooks/useDialogModals';
import useOnErrorAlert from '@/_hooks/useOnErrorAlert';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { signUpAction } from '../../actions/user.action';

export default function useSignUp() {
  const router = useRouter();
  const { openAlertModal } = useAlertModal();
  const { onError } = useOnErrorAlert();

  const redirectToLoginPage = useCallback(() => {
    openAlertModal({
      title: '안내',
      content: '회원가입에 성공했습니다. 로그인을 진행해주세요.',
    }).then(() => {
      router.replace('/auth/sign-in');
    });
  }, [router, openAlertModal]);

  return useMutation({
    mutationFn: signUpAction,
    onSuccess: async (_data, { socialProvider }) => {
      // 1. 구글 로그인일 경우 로그인 페이지로 리다이렉트 (구글 로그인은 '계정 선택' 페이지로 이동하기 때문에 자동 로그인 처리가 부자연스러움)
      if (socialProvider === 'google') {
        redirectToLoginPage();
        return;
      }

      // 회원가입 성공 시 해당 소셜 공급자로 자동 로그인 처리
      await signIn(socialProvider, { redirectTo: '/' });
    },
    onError,
  });
}
