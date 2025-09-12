import { AppConfig, appConfig } from '@/config/app.config';
import { Inject, Injectable } from '@nestjs/common';
import {
  GetGoogleAuthTokenRequestDto,
  GetGoogleAuthTokenResponseDto,
} from './dtos/get-google-auth-token.dto';
import { GetGoogleUserInfoRequestDto, GoogleUserInfo } from './dtos/get-google-user-info.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class OAuthGoogleService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly config: AppConfig,
    private readonly httpService: HttpService
  ) {}

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
    const { data } = await this.httpService.axiosRef<GetGoogleAuthTokenResponseDto>({
      url: 'https://oauth2.googleapis.com/token',
      method: 'POST',
      data: {
        grant_type: 'authorization_code',
        client_id: this.config.googleClientId,
        client_secret: this.config.googleClientSecret,
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
    const { data } = await this.httpService.axiosRef<GoogleUserInfo>({
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
