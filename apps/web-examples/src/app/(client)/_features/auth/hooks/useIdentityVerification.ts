import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import * as PortOne from '@portone/browser-sdk/v2';
import { appEnv } from '@/_schemas/env.schema';

export default function useIdentityVerification() {
  const router = useRouter();

  const verifyIdentityWithKGInisis = useCallback(async () => {
    const response = await PortOne.requestIdentityVerification({
      storeId: appEnv.NEXT_PUBLIC_PORTONE_STORE_ID,
      identityVerificationId: `identity-verification-${crypto.randomUUID()}`,
      channelKey: appEnv.NEXT_PUBLIC_PORTONE_CHANNEL_KEY,
      redirectUrl: `${window.location.origin}/identity-verification/redirect`,
      popup: {
        center: true,
      },
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

  return { verifyIdentityWithKGInisis };
}
