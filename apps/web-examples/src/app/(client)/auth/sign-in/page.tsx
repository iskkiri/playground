'use client';

import NaverLogoIcon from '@/assets/icons/naver-logo.svg';
import KakaoLogoIcon from '@/assets/icons/kakao-talk-logo.svg';
import GoogleLogoIcon from '@/assets/icons/google-logo.svg';
import {
  naverLoginAction,
  kakaoLoginAction,
  googleLoginAction,
} from '../../_features/auth/actions/auth.action';

export default function LoginPage() {
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
                onClick={naverLoginAction}
                className="rounded-13 typography-p3-16b xl:typography-p2-18b flex h-48 items-center justify-center gap-16 bg-[#03c75a] text-white xl:h-56"
              >
                <NaverLogoIcon />
                <span>네이버로 시작하기</span>
              </button>

              {/* Kakao button */}
              <button
                onClick={kakaoLoginAction}
                className="rounded-13 typography-p3-16b xl:typography-p2-18b flex h-48 items-center justify-center gap-16 bg-[#fee500] text-black xl:h-56"
              >
                <KakaoLogoIcon />
                <span>카카오로 시작하기</span>
              </button>

              {/* Google button */}
              <button
                onClick={googleLoginAction}
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
