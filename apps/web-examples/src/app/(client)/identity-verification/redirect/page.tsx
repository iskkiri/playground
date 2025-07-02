'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { verifyIdentityAction } from '../../_features/auth/actions/auth.action';

export default function IdentityVerificationRedirectPage() {
  const searchParams = useSearchParams();
  const identityVerificationId = useMemo(
    () => searchParams.get('identityVerificationId'),
    [searchParams]
  );

  useEffect(() => {
    if (!identityVerificationId) return;

    (async () => {
      const verifiedCustomer = await verifyIdentityAction(identityVerificationId);

      console.log(verifiedCustomer);
    })();
  }, [identityVerificationId]);

  return null;
}
