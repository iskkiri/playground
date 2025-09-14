import { AppConfig, appConfig } from '@/config/app.config';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import {
  GetPaycoAuthTokenRequestDto,
  GetPaycoAuthTokenResponseDto,
} from './dtos/get-payco-auth-token.dto';
import {
  GetPaycoUserInfoRequestDto,
  GetPaycoUserInfoResponseDto,
  PaycoUserInfo,
} from './dtos/get-payco-user-info.dto';

@Injectable()
export class OAuthPaycoService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly config: AppConfig,
    private readonly httpService: HttpService
  ) {}

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
    const { data } = await this.httpService.axiosRef<GetPaycoAuthTokenResponseDto>({
      url: 'https://id.payco.com/oauth2.0/token',
      method: 'GET',
      params: {
        grant_type: 'authorization_code',
        client_id: this.config.paycoClientId,
        client_secret: this.config.paycoClientSecret,
        code,
        state,
      },
    });
    return new GetPaycoAuthTokenResponseDto(data);
  }

  /**
   * 페이코 사용자 정보 가져오기
   */
  private async getPaycoUserInfo({
    accessToken,
  }: GetPaycoUserInfoRequestDto): Promise<PaycoUserInfo> {
    const { data } = await this.httpService.axiosRef<GetPaycoUserInfoResponseDto>({
      url: 'https://apis-payco.krp.toastoven.net/payco/friends/find_member_v2.json',
      method: 'POST',
      headers: {
        client_id: this.config.paycoClientId,
        access_token: accessToken,
      },
    });
    console.log(data);
    return new PaycoUserInfo(data.data.member);
  }
}
