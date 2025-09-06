'use client';

import { useCallback } from 'react';
import Button from '@repo/ui/Button/Button';
import * as PortOne from '@portone/browser-sdk/v2';
import { appEnv } from '@/_schemas/env.schema';
import { useRouter } from 'next/navigation';

export default function IdentityVerificationPage() {
  const router = useRouter();

  /**
   * KG이니시스 통합인증
   * @docs https://developers.portone.io/opi/ko/extra/identity-verification/readme-v2?v=v2
   * @docs https://developers.portone.io/opi/ko/integration/pg/v2/inicis-unified-identity-verification?v=v2
   */
  const onKGInisisIntegratedIdentityVerification = useCallback(async () => {
    const response = await PortOne.requestIdentityVerification({
      // [관리자 콘솔 > 결제 연동 > 연동 정보]에서 확인 가능
      storeId: appEnv.NEXT_PUBLIC_PORTONE_STORE_ID,
      identityVerificationId: `identity-verification-${crypto.randomUUID()}`,
      // [관리자 콘솔 > 결제 연동 > 연동 정보]에서 생성 및 확인 가능
      channelKey: appEnv.NEXT_PUBLIC_PORTONE_CHANNEL_KEY,
      // 모바일 환경에서의 본인인증은 대부분 redirect 방식으로 이루어집니다.
      redirectUrl: `${window.location.origin}/identity-verification/redirect`,
      // bypass: {
      //   inicisUnified: {
      //     flgFixedUser: 'N',
      //     directAgency: 'PASS',
      //   },
      // },
    });

    /********************** PC에서만 동작 | 모바일은 리디렉션 **********************/
    // PC
    if (response?.code !== undefined) {
      // 사용자가 본인인증을 취소하였습니다.
      return alert(response.message);
    }

    if (!response?.identityVerificationId) {
      alert('본인 인증 실패');
      return;
    }

    // 일관된 동작을 위해 모바일과 동일하게 리디렉션 페이지로 이동
    router.push(
      `/identity-verification/redirect?identityVerificationId=${response.identityVerificationId}`
    );
  }, [router]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-24">
      <Button onClick={onKGInisisIntegratedIdentityVerification} variant="primary" size={64}>
        KG이니시스 통합인증
      </Button>
    </div>
  );
}
