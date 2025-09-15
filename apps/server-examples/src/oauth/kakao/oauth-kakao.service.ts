import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AppConfig, appConfig } from '@/common/config/app.config';
import {
  GetKakaoAuthTokenRequestDto,
  GetKakaoAuthTokenResponseDto,
} from './dtos/get-kakao-auth-token.dto';
import {
  GetKakaoUserInfoRequestDto,
  GetKakaoUserInfoResponseDto,
} from './dtos/get-kakao-user-info.dto';
import { GetKakaoIdentityTokenRequestDto } from './dtos/get-kakao-identity-token.dto';
import { GetKakaoPublicKeyResponseDto, KakaoPublicKey } from './dtos/get-kakao-public-keys.dto';
import { isRSAKey } from '../_types/json-web-key.types';
import jwkToPem from 'jwk-to-pem';
import { KakaoTokenPayload } from './types/kakao-token-payload.types';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OAuthKakaoService {
  private kakaoPublicKeys: KakaoPublicKey[] = [];
  private keysExpirationTime = 0;

  constructor(
    @Inject(appConfig.KEY)
    private readonly config: AppConfig,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService
  ) {}

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
   * 카카오 로그인 (OpenID Connect)
   */
  async kakaoLoginUsingOIDC({ code, redirectUri, nonce }: GetKakaoAuthTokenRequestDto) {
    const { id_token } = await this.getKakaoAuthToken({
      code,
      redirectUri,
    });

    const decodedToken = await this.verifyIdentityToken({
      idToken: id_token,
      nonce: nonce ?? '',
    });
    console.log({ decodedToken });

    return decodedToken;
  }

  /**
   * 카카오 인증 토큰 가져오기
   */
  private async getKakaoAuthToken({ code, redirectUri }: GetKakaoAuthTokenRequestDto) {
    const { data } = await this.httpService.axiosRef<GetKakaoAuthTokenResponseDto>({
      url: 'https://kauth.kakao.com/oauth/token',
      method: 'POST',
      data: {
        grant_type: 'authorization_code',
        client_id: this.config.kakaoClientId,
        client_secret: this.config.kakaoClientSecret,
        code,
        redirect_uri: redirectUri,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    return new GetKakaoAuthTokenResponseDto(data);
  }

  /**
   * 카카오 사용자 정보 가져오기
   */
  private async getKakaoUserInfo({ accessToken }: GetKakaoUserInfoRequestDto) {
    const { data } = await this.httpService.axiosRef<GetKakaoUserInfoResponseDto>({
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
    return new GetKakaoUserInfoResponseDto(data);
  }

  /**
   * 카카오 id token 검증 (OIDC)
   */
  private async verifyIdentityToken({ idToken, nonce }: GetKakaoIdentityTokenRequestDto) {
    // 1. 토큰에서 헤더 부분 추출하여 디코딩
    const tokenParts = idToken.split('.');
    if (tokenParts.length !== 3) {
      throw new UnauthorizedException('Invalid token format');
    }

    // 헤더 부분은 Base64로 인코딩되어 있기 때문에,
    // 1. Buffer 클래스를 사용하여 Base64 문자열을 이진 데이터(버퍼)로 변환
    // 2. 변환된 이진 데이터를 UTF-8 인코딩 방식으로 문자열로 변환
    const headerJSON = Buffer.from(tokenParts[0], 'base64').toString('utf8');
    const header = JSON.parse(headerJSON) as { kid: string };

    // 2. 카카오 공개키 조회
    // 3. 토큰 헤더의 kid와 일치하는 키 찾기
    let key = await this.findKakaoPublicKey(header.kid);

    // 키를 찾지 못한 경우, 캐시를 무효화하고 새로운 키 조회 시도
    if (!key) {
      this.invalidateKeyCache();
      key = await this.findKakaoPublicKey(header.kid);
    }

    if (!isRSAKey(key)) {
      throw new UnauthorizedException('Invalid token key type');
    }

    // 4. JWK(Json Web Key)를 PEM 형식으로 변환
    const publicKey = jwkToPem(key);

    // 5. 토큰 검증
    try {
      const decodedToken = this.jwtService.verify(idToken, {
        secret: publicKey,
        algorithms: ['RS256'],
        issuer: 'https://kauth.kakao.com',
        audience: this.config.kakaoClientId,
        nonce,
      }) as KakaoTokenPayload;

      return decodedToken;
    } catch (error) {
      console.error('Token verification error:', error);
      throw new UnauthorizedException('Token verification failed');
    }
  }

  /**
   * 카카오 공개키 조회 (캐싱 포함)
   * 카카오의 경우 지나치게 빈번한 공개키 목록 조회 요청 시 요청이 차단된다고 명시되어 있음
   */
  private async getKakaoPublicKeys() {
    const currentTime = Math.floor(Date.now() / 1000);

    // 캐싱된 키가 있고 만료되지 않았다면 재사용
    if (this.kakaoPublicKeys.length > 0 && currentTime < this.keysExpirationTime) {
      return this.kakaoPublicKeys;
    }

    // 카카오 공개키 엔드포인트에서 키 조회
    try {
      const response = await this.httpService.axiosRef.get<GetKakaoPublicKeyResponseDto>(
        'https://kauth.kakao.com/.well-known/jwks.json'
      );

      const cacheMaxAge = 60 * 60; // 1시간

      this.keysExpirationTime = currentTime + cacheMaxAge;
      this.kakaoPublicKeys = response.data.keys;

      return this.kakaoPublicKeys;
    } catch (error) {
      console.error('Error fetching Kakao public keys:', error);
      throw new UnauthorizedException('Failed to fetch Kakao public keys');
    }
  }

  /**
   * 카카오 공개 키 목록에서 토큰 헤더의 kid와 일치하는 키 찾기
   */
  private async findKakaoPublicKey(kid: string): Promise<KakaoPublicKey> {
    // 카카오 공개키 조회
    const keys = await this.getKakaoPublicKeys();
    // 토큰 헤더의 kid와 일치하는 키 찾기
    const key = keys.find((k) => k.kid === kid);

    if (!key) {
      throw new UnauthorizedException('Invalid token key ID');
    }

    return key;
  }

  /**
   * 캐싱된 키 무효화
   */
  private invalidateKeyCache() {
    this.kakaoPublicKeys = [];
    this.keysExpirationTime = 0;
  }
}
