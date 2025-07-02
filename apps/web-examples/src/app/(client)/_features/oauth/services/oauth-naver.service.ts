import { appEnv } from '@/_schemas/env.schema';
import axios from 'axios';
import type {
  GetNaverAuthTokenRequestDto,
  GetNaverAuthTokenResponseDto,
} from '../dtos/get-naver-auth-token.dto';
import type {
  GetNaverUserInfoRequestDto,
  GetNaverUserInfoResponseDto,
  NaverUserInfo,
} from '../dtos/get-naver-user-info.dto';

class OAuthNaverService {
  /**
   * 네이버 로그인 (Authorization Code Flow)
   */
  async naverLogin({ code, state }: GetNaverAuthTokenRequestDto): Promise<NaverUserInfo> {
    const { access_token } = await this.getNaverAuthToken({
      code,
      state,
    });

    const userInfo = await this.getNaverUserInfo({
      accessToken: access_token,
    });

    return userInfo;
  }

  /**
   * 네이버 인증 토큰 가져오기
   */
  private async getNaverAuthToken({ code, state }: GetNaverAuthTokenRequestDto) {
    const { data } = await axios<GetNaverAuthTokenResponseDto>({
      url: 'https://nid.naver.com/oauth2.0/token',
      method: 'GET',
      params: {
        grant_type: 'authorization_code',
        client_id: appEnv.NEXT_PUBLIC_NAVER_CLIENT_ID,
        client_secret: appEnv.NAVER_CLIENT_SECRET,
        code,
        state,
      },
    });
    return data;
  }

  /**
   * 네이버 사용자 정보 가져오기
   */
  private async getNaverUserInfo({
    accessToken,
  }: GetNaverUserInfoRequestDto): Promise<NaverUserInfo> {
    const { data } = await axios<GetNaverUserInfoResponseDto>({
      url: 'https://openapi.naver.com/v1/nid/me',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'text/json;charset=utf-8',
      },
    });
    return data.response;
  }
}

const oauthNaverService = new OAuthNaverService();
export default oauthNaverService;
