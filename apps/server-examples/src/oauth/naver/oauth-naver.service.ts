import { Inject, Injectable } from '@nestjs/common';
import { AppConfig, appConfig } from '@/config/app.config';
import type {
  GetNaverAuthTokenRequestDto,
  GetNaverAuthTokenResponseDto,
} from './dtos/get-naver-auth-token.dto';
import type {
  GetNaverUserInfoRequestDto,
  GetNaverUserInfoResponseDto,
  NaverUserInfo,
} from './dtos/get-naver-user-info.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class OAuthNaverService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly config: AppConfig,
    private readonly httpService: HttpService
  ) {}

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
    const { data } = await this.httpService.axiosRef<GetNaverAuthTokenResponseDto>({
      url: 'https://nid.naver.com/oauth2.0/token',
      method: 'GET',
      params: {
        grant_type: 'authorization_code',
        client_id: this.config.naverClientId,
        client_secret: this.config.naverClientSecret,
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
    const { data } = await this.httpService.axiosRef<GetNaverUserInfoResponseDto>({
      url: 'https://openapi.naver.com/v1/nid/me',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'text/json;charset=utf-8',
      },
    });
    console.log(data);
    return data.response;
  }
}
