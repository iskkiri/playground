import { useCallback, useEffect, useRef } from 'react';

export default function usePopupSocialLogin() {
  const activePopupRef = useRef<Window | null>(null);

  const onSocialLogin = useCallback(
    (provider: string) => () => {
      // 기존 팝업이 있다면 닫기
      if (activePopupRef.current && !activePopupRef.current.closed) {
        activePopupRef.current.close();
      }

      const popup = window.open(
        `http://localhost:8080/oauth-passport/${provider}`,
        `${provider}Login`,
        'width=500,height=500'
      );

      if (!popup) return;
      activePopupRef.current = popup;

      return popup;
    },
    []
  );

  // 전역 메시지 리스너 (한 번만 등록)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:8080') return;

      if (event.data.type === 'OAUTH_SUCCESS') {
        console.log('로그인 성공:', event.data.tokens);
        // 토큰 저장, 상태 업데이트 등

        if (activePopupRef.current) {
          activePopupRef.current.close();
          activePopupRef.current = null;
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return { onSocialLogin };
}
