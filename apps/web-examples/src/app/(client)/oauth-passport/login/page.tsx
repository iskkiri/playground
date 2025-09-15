'use client';

import { useCallback } from 'react';
import NaverLogoIcon from '@/assets/icons/naver-logo.svg';
import KakaoLogoIcon from '@/assets/icons/kakao-talk-logo.svg';
import GoogleLogoIcon from '@/assets/icons/google-logo.svg';

export default function LoginPage() {
  const onNaverLogin = useCallback(() => {
    const popup = window.open(
      'http://localhost:8080/oauth-passport/naver',
      'naverLogin',
      'width=500,height=500'
    );
    if (!popup) return;

    // 팝업에서 오는 메시지 리스닝
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:8080') return;

      if (event.data.type === 'OAUTH_SUCCESS') {
        console.log('로그인 성공:', event.data.tokens);
        // 토큰 저장, 상태 업데이트 등

        popup.close();
      }
    });
  }, []);

  return (
    <>
      {/* Container: full page height, flex center, responsive padding */}
      <div className="py-200 xl:py-140 flex min-h-screen items-center justify-center px-40 xl:px-0">
        {/* Block: flex column with gap, constrained width */}
        <div className="max-w-420 mx-auto flex w-full flex-col gap-56">
          {/* Bottom block: flex column with smaller gap, center aligned */}
          <div className="flex flex-col items-center gap-20">
            {/* Button group: flex column with gap */}
            <div className="flex w-full flex-col gap-16">
              {/* Naver button */}
              <button
                onClick={onNaverLogin}
                className="rounded-13 typography-p3-16b xl:typography-p2-18b flex h-48 items-center justify-center gap-16 bg-[#03c75a] text-white xl:h-56"
              >
                <NaverLogoIcon />
                <span>네이버로 시작하기</span>
              </button>

              {/* Kakao button */}
              <button
                // onClick={onKakaoLogin}
                className="rounded-13 typography-p3-16b xl:typography-p2-18b flex h-48 items-center justify-center gap-16 bg-[#fee500] text-black xl:h-56"
              >
                <KakaoLogoIcon />
                <span>카카오로 시작하기</span>
              </button>

              {/* Google button */}
              <button
                // onClick={onGoogleLogin}
                className="rounded-13 typography-p3-16b xl:typography-p2-18b flex h-48 items-center justify-center gap-16 border border-black bg-white text-black xl:h-56"
              >
                <GoogleLogoIcon />
                <span>구글로 시작하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
