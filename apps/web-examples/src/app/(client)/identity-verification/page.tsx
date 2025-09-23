'use client';

import Button from '@repo/ui/general/Button/Button';
import useIdentityVerification from '../_features/auth/hooks/useIdentityVerification';

export default function IdentityVerificationPage() {
  const { verifyIdentityWithKGInisis } = useIdentityVerification();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-24">
      <Button onClick={verifyIdentityWithKGInisis} variant="primary" size={64}>
        KG이니시스 통합인증
      </Button>
    </div>
  );
}
