'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import FullPageLoading from '@repo/ui/Loading/FullPageLoading/FullPageLoading';

export default function PaycoCallbackPage() {
  const searchParams = useSearchParams();
  const code = useMemo(() => searchParams.get('code'), [searchParams]);
  const state = useMemo(() => searchParams.get('state'), [searchParams]);

  useEffect(() => {
    if (!code || !state) return;

    console.log({ code, state });
  }, [code, state]);

  return <FullPageLoading />;
}
