'use server';

import { signIn } from '@/_lib/auth';
import { appEnv } from '@/_schemas/env.schema';
import { IdentityVerificationClient } from '@portone/server-sdk';

const identityVerificationClient = IdentityVerificationClient({
  secret: appEnv.PORTONE_SECRET_KEY,
});

/**
 * 본인인증 단건 조회
 * @description 주어진 아이디에 대응되는 본인인증 내역을 조회합니다.
 * @param identityVerificationId 본인인증 아이디
 * @returns 본인인증 결과
 * @throws 본인인증 실패 시 예외 발생
 */
export async function verifyIdentityAction(identityVerificationId: string) {
  const response = await identityVerificationClient.getIdentityVerification({
    identityVerificationId,
  });

  // 인증 실패
  if (response.status !== 'VERIFIED') {
    throw new Error('본인 인증이 완료되지 않았습니다.');
  }

  return response.verifiedCustomer;
}

/**
 * 네이버 로그인
 * @description 네이버 로그인을 수행합니다.
 * @returns 네이버 로그인 결과
 * @throws 네이버 로그인 실패 시 예외 발생
 */
export async function naverLoginAction() {
  await signIn('naver', { redirectTo: '/' });
}

/**
 * 카카오 로그인
 * @description 카카오 로그인을 수행합니다.
 * @returns 카카오 로그인 결과
 * @throws 카카오 로그인 실패 시 예외 발생
 */
export async function kakaoLoginAction() {
  await signIn('kakao', { redirectTo: '/' });
}

/**
 * 구글 로그인
 * @description 구글 로그인을 수행합니다.
 * @returns 구글 로그인 결과
 * @throws 구글 로그인 실패 시 예외 발생
 */
export async function googleLoginAction() {
  await signIn('google', { redirectTo: '/' });
}
