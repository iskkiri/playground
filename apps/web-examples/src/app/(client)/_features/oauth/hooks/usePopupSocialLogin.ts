import { useCallback, useEffect, useRef } from 'react';
import oauthStorage from '../storages/oauthStorage';
import authStorage from '@/app/(client)/refresh-token-rotation/_storages/authStorage';
import type { SocialLoginMessage } from '../types/oauth.types';

interface UsePopupSocialLoginParams {
  verifyIdentityWithKGInisis: () => void;
}

export default function usePopupSocialLogin({
  verifyIdentityWithKGInisis,
}: UsePopupSocialLoginParams) {
  const activePopupRef = useRef<Window | null>(null);

  const onSocialLogin = useCallback(
    (provider: string) => () => {
      // 기존 팝업이 있다면 닫기
      if (activePopupRef.current && !activePopupRef.current.closed) {
        activePopupRef.current.close();
      }

      // 팝업창을 화면 중앙에 위치시키기 위한 계산
      const width = 500;
      const height = 500;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        `http://localhost:8080/oauth-passport/${provider}`,
        `${provider}Login`,
        `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=yes,status=no`
      );

      if (!popup) return;
      activePopupRef.current = popup;

      return popup;
    },
    []
  );

  // 전역 메시지 리스너 (한 번만 등록)
  useEffect(() => {
    const handleMessage = (event: MessageEvent<SocialLoginMessage>) => {
      if (event.origin !== 'http://localhost:8080') return;

      switch (event.data.type) {
        // 회원가입이 되어 있지 않은 경우 회원가입 프로세스 진행
        case 'REGISTRATION_REQUIRED': {
          const { socialId, provider } = event.data.payload;
          oauthStorage.setOauthInfo({ socialId, provider });
          verifyIdentityWithKGInisis();
          break;
        }
        // 이미 회원가입이 되어 있는 경우 로그인 처리
        case 'LOGIN_SUCCESS': {
          const { accessToken, refreshToken } = event.data.payload.tokens;
          authStorage.setAccessToken(accessToken);
          authStorage.setRefreshToken(refreshToken);
          break;
        }
        default:
          break;
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [verifyIdentityWithKGInisis]);

  return { onSocialLogin };
}
