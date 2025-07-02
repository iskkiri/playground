import axios from 'axios';
import type {
  GetGoogleAuthTokenRequestDto,
  GetGoogleAuthTokenResponseDto,
} from '../dtos/get-google-auth-token.dto';
import type { GetGoogleUserInfoRequestDto, GoogleUserInfo } from '../dtos/get-google-user-info.dto';
import { appEnv } from '@/_schemas/env.schema';

class OAuthGoogleService {
  /**
   * 구글 로그인 (Authorization Code Flow)
   */
  async googleLogin({ code, redirectUri }: GetGoogleAuthTokenRequestDto) {
    const { access_token } = await this.getGoogleAuthToken({
      code,
      redirectUri,
    });

    const userInfo = await this.getGoogleUserInfo({
      accessToken: access_token,
    });

    return userInfo;
  }

  /**
   * 구글 인증 토큰 가져오기
   */
  private async getGoogleAuthToken({ code, redirectUri }: GetGoogleAuthTokenRequestDto) {
    const { data } = await axios<GetGoogleAuthTokenResponseDto>({
      url: 'https://oauth2.googleapis.com/token',
      method: 'POST',
      data: {
        grant_type: 'authorization_code',
        client_id: appEnv.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: appEnv.GOOGLE_CLIENT_SECRET,
        code,
        redirect_uri: redirectUri,
      },
    });
    return data;
  }

  /**
   * 구글 사용자 정보 가져오기
   */
  private async getGoogleUserInfo({
    accessToken,
  }: GetGoogleUserInfoRequestDto): Promise<GoogleUserInfo> {
    const { data } = await axios<GoogleUserInfo>({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'text/json;charset=utf-8',
      },
    });
    console.log(data);
    return data;
  }
}

const oauthGoogleService = new OAuthGoogleService();
export default oauthGoogleService;
