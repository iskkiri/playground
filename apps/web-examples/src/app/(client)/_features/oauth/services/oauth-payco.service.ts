import axios from 'axios';
import type {
  GetPaycoAuthTokenRequestDto,
  GetPaycoAuthTokenResponseDto,
} from '../dtos/get-payco-auth-token.dto';
import { appEnv } from '@/_schemas/env.schema';
import type {
  GetPaycoUserInfoRequestDto,
  GetPaycoUserInfoResponseDto,
  PaycoUserInfo,
} from '../dtos/get-payco-user-info.dto';

class OAuthPaycoService {
  /**
   * 페이코 로그인 (Authorization Code Flow)
   */
  async paycoLogin({ code, state }: GetPaycoAuthTokenRequestDto): Promise<PaycoUserInfo> {
    const { access_token } = await this.getPaycoAuthToken({
      code,
      state,
    });

    const userInfo = await this.getPaycoUserInfo({
      accessToken: access_token,
    });

    return userInfo;
  }

  /**
   * 페이코 인증 토큰 가져오기
   */
  private async getPaycoAuthToken({ code, state }: GetPaycoAuthTokenRequestDto) {
    const { data } = await axios<GetPaycoAuthTokenResponseDto>({
      url: 'https://id.payco.com/oauth2.0/token',
      method: 'GET',
      params: {
        grant_type: 'authorization_code',
        client_id: appEnv.NEXT_PUBLIC_PAYCO_CLIENT_ID,
        client_secret: appEnv.PAYCO_CLIENT_SECRET,
        code,
        state,
      },
    });
    return data;
  }

  /**
   * 페이코 사용자 정보 가져오기
   */
  private async getPaycoUserInfo({
    accessToken,
  }: GetPaycoUserInfoRequestDto): Promise<PaycoUserInfo> {
    const { data } = await axios<GetPaycoUserInfoResponseDto>({
      url: 'https://apis-payco.krp.toastoven.net/payco/friends/find_member_v2.json',
      method: 'POST',
      headers: {
        client_id: appEnv.NEXT_PUBLIC_PAYCO_CLIENT_ID,
        access_token: accessToken,
      },
    });
    console.log(data);
    return data.data.member;
  }
}

const oauthPaycoService = new OAuthPaycoService();
export default oauthPaycoService;
