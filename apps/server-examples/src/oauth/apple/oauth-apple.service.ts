import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ApplePublicKey, GetApplePublicKeysResponseDto } from './dtos/get-apple-public-keys.dto';
import jwkToPem from 'jwk-to-pem';
import { AppleTokenPayload } from './types/apple-token-payload.types';
import { AppConfig, appConfig } from '@/config/app.config';
import { GetAppleIdentityTokenRequestDto } from './dtos/get-apple-identity-token.dto';
import { isRSAKey } from '../_types/json-web-key.types';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OAuthAppleService {
  private applePublicKeys: ApplePublicKey[] = [];
  private keysExpirationTime = 0;

  constructor(
    @Inject(appConfig.KEY)
    private readonly config: AppConfig,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * 애플 로그인 (OpenID Connect)
   */
  async appleLogin({ identityToken, nonce }: GetAppleIdentityTokenRequestDto) {
    // identityToken 검증
    const payload = await this.verifyIdentityToken({ identityToken, nonce });
    console.log('payload', payload);

    // 사용자 ID (sub) 추출
    const appleUserId = payload.sub;

    if (!appleUserId) {
      throw new UnauthorizedException('Invalid Apple user ID');
    }

    return payload;
  }

  /**
   * identityToken 검증
   */
  private async verifyIdentityToken({
    identityToken,
    nonce,
  }: GetAppleIdentityTokenRequestDto): Promise<AppleTokenPayload> {
    // 1. 토큰에서 헤더 부분 추출하여 디코딩
    // JWT는 'header.payload.signature' 으로 이루어져 있음
    const tokenParts = identityToken.split('.');
    if (tokenParts.length !== 3) {
      throw new UnauthorizedException('Invalid token format');
    }

    // 헤더 부분은 Base64로 인코딩되어 있기 때문에,
    // 1. Buffer 클래스를 사용하여 Base64 문자열을 이진 데이터(버퍼)로 변환
    // 2. 변환된 이진 데이터를 UTF-8 인코딩 방식으로 문자열로 변환
    const headerJSON = Buffer.from(tokenParts[0], 'base64').toString('utf8');
    const header = JSON.parse(headerJSON) as { kid: string };

    // 2. 애플 공개키 조회
    // 3. 토큰 헤더의 kid와 일치하는 키 찾기
    let key = await this.findApplePublicKey(header.kid);

    // 키를 찾지 못한 경우, 캐시를 무효화하고 새로운 키 조회 시도
    if (!key) {
      this.invalidateKeyCache();
      key = await this.findApplePublicKey(header.kid);
    }

    if (!isRSAKey(key)) {
      throw new UnauthorizedException('Invalid token key type');
    }

    // 4. JWK(Json Web Key)를 PEM 형식으로 변환
    const publicKey = jwkToPem(key);

    // 5. 토큰 검증
    try {
      const decodedToken = this.jwtService.verify(identityToken, {
        secret: publicKey,
        algorithms: ['RS256'],
        issuer: 'https://appleid.apple.com',
        audience: this.config.appleClientId,
        nonce,
      }) as AppleTokenPayload;

      return decodedToken;
    } catch (error) {
      console.error('Token verification error:', error);
      throw new UnauthorizedException('Token verification failed');
    }
  }

  /**
   * 애플 공개키 조회 (캐싱 포함)
   */
  private async getApplePublicKeys(): Promise<ApplePublicKey[]> {
    const currentTime = Math.floor(Date.now() / 1000);

    // 캐싱된 키가 있고 만료되지 않았다면 재사용
    if (this.applePublicKeys.length > 0 && currentTime < this.keysExpirationTime) {
      return this.applePublicKeys;
    }

    // 애플 공개키 엔드포인트에서 키 조회
    try {
      const response = await this.httpService.axiosRef.get<GetApplePublicKeysResponseDto>(
        'https://appleid.apple.com/auth/keys'
      );

      const cacheMaxAge = 60 * 60; // 1시간

      this.keysExpirationTime = currentTime + cacheMaxAge;
      this.applePublicKeys = response.data.keys;

      return this.applePublicKeys.map((key) => new ApplePublicKey(key));
    } catch (error) {
      console.error('Error fetching Apple public keys:', error);
      throw new UnauthorizedException('Failed to fetch Apple public keys');
    }
  }

  /**
   * 애플 공개 키 목록에서 토큰 헤더의 kid와 일치하는 키 찾기
   */
  private async findApplePublicKey(kid: string): Promise<ApplePublicKey> {
    // 애플 공개키 조회
    const keys = await this.getApplePublicKeys();
    // 토큰 헤더의 kid와 일치하는 키 찾기
    const key = keys.find((k) => k.kid === kid);

    if (!key) {
      throw new UnauthorizedException('Invalid token key ID');
    }

    return new ApplePublicKey(key);
  }

  /**
   * 캐싱된 키 무효화
   */
  private invalidateKeyCache() {
    this.applePublicKeys = [];
    this.keysExpirationTime = 0;
  }
}
