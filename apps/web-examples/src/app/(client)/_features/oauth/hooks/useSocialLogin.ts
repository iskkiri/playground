import { useCallback } from 'react';
import { appEnv } from '@/_schemas/env.schema';
import { createCsrfTokenAction } from '../actions/oauth.action';

export default function useSocialLogin() {
  // 네이버 로그인
  const onNaverLogin = useCallback(async () => {
    const csrfToken = await createCsrfTokenAction();

    const naverLoginParams = new URLSearchParams({
      response_type: 'code',
      client_id: appEnv.NEXT_PUBLIC_NAVER_CLIENT_ID,
      redirect_uri: `${window.location.origin}/oauth/callback/naver`,
      state: csrfToken,
    });

    window.location.href = `https://nid.naver.com/oauth2.0/authorize?${naverLoginParams}`;
  }, []);

  // 카카오 로그인
  const onKakaoLogin = useCallback(() => {
    const kakaoLoginParams = new URLSearchParams({
      response_type: 'code',
      client_id: appEnv.NEXT_PUBLIC_KAKAO_CLIENT_ID,
      redirect_uri: `${window.location.origin}/oauth/callback/kakao`,
    });

    window.location.href = `https://kauth.kakao.com/oauth/authorize?${kakaoLoginParams}`;
  }, []);

  // 구글 로그인
  const onGoogleLogin = useCallback(() => {
    const googleLoginParams = new URLSearchParams({
      response_type: 'code',
      client_id: appEnv.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      redirect_uri: `${window.location.origin}/oauth/callback/google`,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '),
      access_type: 'offline',
      prompt: 'consent',
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${googleLoginParams}`;
  }, []);

  // 페이코 로그인
  // https://developers.payco.com/guide/development/apply/web
  const onPaycoLogin = useCallback(async () => {
    const csrfToken = await createCsrfTokenAction();

    const paycoLoginParams = new URLSearchParams({
      response_type: 'code',
      client_id: appEnv.NEXT_PUBLIC_PAYCO_CLIENT_ID,
      redirect_uri: `${window.location.origin}/oauth/callback/payco`,
      state: csrfToken,
      serviceProviderCode: 'FRIENDS',
      userLocale: 'ko_KR',
    });

    window.location.href = `https://id.payco.com/oauth2.0/authorize?${paycoLoginParams}`;
  }, []);

  return {
    onNaverLogin,
    onKakaoLogin,
    onGoogleLogin,
    onPaycoLogin,
  };
}
