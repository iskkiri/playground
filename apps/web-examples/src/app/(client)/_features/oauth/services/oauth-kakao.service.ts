import { appEnv } from '@/_schemas/env.schema';
import axios from 'axios';
import type {
  GetKakaoAuthTokenRequestDto,
  GetKakaoAuthTokenResponseDto,
} from '../dtos/get-kakao-auth-token.dto';
import type {
  GetKakaoUserInfoRequestDto,
  GetKakaoUserInfoResponseDto,
} from '../dtos/get-kakao-user-info.dto';

class OAuthKakaoService {
  /**
   * 카카오 로그인 (Authorization Code Flow)
   */
  async kakaoLogin({ code, redirectUri }: GetKakaoAuthTokenRequestDto) {
    const { access_token } = await this.getKakaoAuthToken({
      code,
      redirectUri,
    });

    const userInfo = await this.getKakaoUserInfo({
      accessToken: access_token,
    });
    console.log(userInfo);

    return userInfo;
  }

  /**
   * 카카오 인증 토큰 가져오기
   */
  private async getKakaoAuthToken({ code, redirectUri }: GetKakaoAuthTokenRequestDto) {
    const { data } = await axios<GetKakaoAuthTokenResponseDto>({
      url: 'https://kauth.kakao.com/oauth/token',
      method: 'POST',
      data: {
        grant_type: 'authorization_code',
        client_id: appEnv.NEXT_PUBLIC_KAKAO_CLIENT_ID,
        client_secret: appEnv.KAKAO_CLIENT_SECRET,
        code,
        redirect_uri: redirectUri,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    return data;
  }

  /**
   * 카카오 사용자 정보 가져오기
   */
  private async getKakaoUserInfo({ accessToken }: GetKakaoUserInfoRequestDto) {
    const { data } = await axios<GetKakaoUserInfoResponseDto>({
      url: 'https://kapi.kakao.com/v2/user/me',
      method: 'POST',
      data: {
        property_keys: ['kakao_account.email', 'kakao_acount.profile.nickname'],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    return data;
  }
}

const oauthKakaoService = new OAuthKakaoService();
export default oauthKakaoService;
