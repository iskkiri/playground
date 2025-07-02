'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import FullPageLoading from '@repo/ui-tailwind/Loading/FullPageLoading/FullPageLoading';
import { kakaoLoginAction } from '@/app/(client)/_features/oauth/actions/oauth.action';

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();
  const code = useMemo(() => searchParams.get('code'), [searchParams]);

  useEffect(() => {
    if (!code) return;

    kakaoLoginAction({
      code,
      redirectUri: `${window.location.origin}/oauth/callback/kakao`,
    }).then((response) => {
      console.log(response);
    });
  }, [code]);

  return <FullPageLoading />;
}
