'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import FullPageLoading from '@repo/ui-tailwind/Loading/FullPageLoading/FullPageLoading';
import { naverLoginAction } from '@/app/(client)/_features/oauth/actions/oauth.action';

export default function NaverCallbackPage() {
  const searchParams = useSearchParams();
  const code = useMemo(() => searchParams.get('code'), [searchParams]);
  const state = useMemo(() => searchParams.get('state'), [searchParams]);

  useEffect(() => {
    if (!code || !state) return;

    naverLoginAction({ code, state }).then((response) => {
      console.log(response);
    });
  }, [code, state]);

  return <FullPageLoading />;
}
