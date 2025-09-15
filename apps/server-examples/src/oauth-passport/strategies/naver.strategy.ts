import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';
import { AppConfig, appConfig } from '@/common/config/app.config';
import { NaverProfile } from '../dtos/naver-profile.dto';

/**
 * 네이버 OAuth Passport 전략
 *
 * Passport OAuth 동작 흐름:
 * 1. Guard가 적용된 엔드포인트 호출 시 자동으로 네이버 OAuth URL로 리디렉션
 *    - URL: https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=...&redirect_uri=...&state=...
 *    - 이 URL은 아래 super() 설정값들을 기반으로 passport-naver-v2가 자동 생성
 *
 * 2. 사용자가 네이버에서 인증 완료 후 callbackURL로 authorization code와 함께 리디렉션
 *
 * 3. Passport가 자동으로 다음 작업 수행:
 *    - authorization code를 access token으로 교환 (토큰 엔드포인트 호출)
 *    - access token으로 사용자 정보 조회 (프로필 API 호출)
 *    - 조회된 사용자 정보로 validate() 메서드 호출
 *
 * 4. validate() 메서드에서 반환된 값이 req.user에 설정되어 컨트롤러로 전달
 */
@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
    @Inject(appConfig.KEY)
    config: AppConfig
  ) {
    /**
     * 네이버 OAuth 설정
     * 이 설정값들은 passport-naver-v2 라이브러리가 OAuth 플로우에서 사용:
     *
     * - clientID: 네이버 개발자센터에서 발급받은 클라이언트 ID
     * - clientSecret: 네이버 개발자센터에서 발급받은 클라이언트 시크릿
     * - callbackURL: 네이버 인증 완료 후 돌아올 콜백 URL
     *   (네이버 개발자센터에 등록된 Callback URL과 일치해야 함)
     */
    super({
      clientID: config.naverClientId,
      clientSecret: config.naverClientSecret,
      callbackURL: `http://localhost:${config.port}/oauth-passport/naver/callback`,
    });
  }

  /**
   * 사용자 검증 및 프로필 반환
   *
   * 이 메서드는 Passport가 다음 단계를 완료한 후 자동으로 호출:
   * 1. authorization code → access token 교환 완료
   * 2. access token으로 네이버 사용자 정보 조회 완료
   *
   * @param accessToken - 네이버에서 발급받은 액세스 토큰
   * @param _refreshToken - 네이버에서 발급받은 리프레시 토큰 (사용하지 않음)
   * @param profile - passport-naver-v2가 네이버 API에서 조회한 사용자 정보
   * @returns 검증된 사용자 프로필 (이 값이 req.user에 설정됨)
   */
  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: NaverProfile
  ): Promise<NaverProfile> {
    // 여기서 추가 검증 로직을 구현할 수 있음:
    // - 사용자 정보 유효성 검증
    // - 데이터베이스에서 사용자 조회/생성
    // - 추가 권한 확인 등

    console.log('네이버에서 조회된 사용자 정보:', profile);
    console.log('발급받은 액세스 토큰:', accessToken);

    // 직접 구현 방식과 비교:
    // - 직접 구현: 토큰 교환 API 호출, 사용자 정보 API 호출을 수동으로 처리
    // - Passport: 위 과정을 모두 자동 처리하고 여기서는 최종 검증만 담당

    return profile;
  }
}
