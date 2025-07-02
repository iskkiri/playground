'use server';

import Tokens from 'csrf';
import type { GetKakaoAuthTokenRequestDto } from '../dtos/get-kakao-auth-token.dto';
import type { GetNaverAuthTokenRequestDto } from '../dtos/get-naver-auth-token.dto';
import type { GetPaycoAuthTokenRequestDto } from '../dtos/get-payco-auth-token.dto';
import oauthNaverService from '../services/oauth-naver.service';
import oauthKakaoService from '../services/oauth-kakao.service';
import oauthGoogleService from '../services/oauth-google.service';
import type { GetGoogleAuthTokenRequestDto } from '../dtos/get-google-auth-token.dto';
import oauthPaycoService from '../services/oauth-payco.service';

const tokens = new Tokens();

export async function createCsrfTokenAction() {
  const secret = await tokens.secret();
  const token = tokens.create(secret);

  return token;
}

export async function kakaoLoginAction(params: GetKakaoAuthTokenRequestDto) {
  const userInfo = await oauthKakaoService.kakaoLogin(params);

  return { userInfo };
}

export async function naverLoginAction(params: GetNaverAuthTokenRequestDto) {
  const userInfo = await oauthNaverService.naverLogin(params);

  return { userInfo };
}

export async function googleLoginAction(params: GetGoogleAuthTokenRequestDto) {
  const userInfo = await oauthGoogleService.googleLogin(params);

  return { userInfo };
}

export async function paycoLoginAction(params: GetPaycoAuthTokenRequestDto) {
  const userInfo = await oauthPaycoService.paycoLogin(params);

  return { userInfo };
}
