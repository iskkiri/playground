import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, type Profile } from 'passport-kakao';
import { AppConfig, appConfig } from '@/common/config/app.config';
import { KakaoProfile } from '../dtos/kakao-profile.dto';

/**
 * 카카오 OAuth 2.0 인증 Strategy (Passport.js 방식)
 *
 * Passport 동작 방식:
 * 1. 사용자가 /oauth-passport/kakao에 접근하면 이 strategy가 활성화됨
 * 2. Passport가 자동으로 카카오 OAuth URL 생성 및 리디렉션:
 *    https://kauth.kakao.com/oauth/authorize?
 *      client_id=${KAKAO_CLIENT_ID}&
 *      redirect_uri=http://localhost:${PORT}/oauth-passport/kakao/callback&
 *      response_type=code
 * 3. 사용자가 카카오에서 인증 후 callback URL로 돌아오면 Passport가 자동으로:
 *    a) authorization code를 받아서
 *    b) 카카오 토큰 엔드포인트에 POST 요청 (https://kauth.kakao.com/oauth/token)
 *    c) access_token을 받아와서
 *    d) 카카오 사용자 정보 API 호출 (https://kapi.kakao.com/v2/user/me)
 *    e) 사용자 정보를 가져와서 validate() 메서드 호출
 * 4. validate()에서 반환된 값이 req.user에 설정됨
 */
@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(@Inject(appConfig.KEY) config: AppConfig) {
    super({
      clientID: config.kakaoClientId,
      clientSecret: config.kakaoClientSecret,
      callbackURL: `http://localhost:${config.port}/oauth-passport/kakao/callback`,
    });
  }

  /**
   * 카카오 인증 완료 후 호출되는 검증 메서드
   *
   * @param accessToken - 카카오에서 발급받은 access token
   * @param _refreshToken - 카카오에서 발급받은 refresh token (사용하지 않음)
   * @param profile - passport-kakao가 자동으로 파싱한 카카오 사용자 정보
   * @returns KakaoProfile - 변환된 사용자 정보 (컨트롤러에서 req.user로 접근 가능)
   *
   * passport-kakao에서 제공하는 profile 구조:
   * {
   *   provider: 'kakao',
   *   id: '1234567890',
   *   username: '홍길동',
   *   displayName: '홍길동',
   *   _raw: '원본 JSON 응답',
   *   _json: { 파싱된 카카오 API 응답 }
   * }
   */
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile
  ): Promise<KakaoProfile> {
    console.log('profile', profile);
    // passport-kakao가 제공하는 profile._json에는 카카오 API의 원본 응답이 들어있음
    // 이를 우리 프로젝트의 KakaoProfile 형태로 변환
    const { _json } = profile;

    return new KakaoProfile({
      provider: 'kakao',
      id: String(_json.id),
      connectedAt: _json.connected_at,
      // properties 객체에서 snake_case를 camelCase로 변환
      nickname: _json.properties?.nickname,
      profileImage: _json.properties?.profile_image,
      thumbnailImage: _json.properties?.thumbnail_image,
      // kakao_account 객체에서 중첩된 정보 추출 및 변환
      profileNicknameNeedsAgreement: _json.kakao_account?.profile_nickname_needs_agreement,
      profileImageNeedsAgreement: _json.kakao_account?.profile_image_needs_agreement,
      profileNickname: _json.kakao_account?.profile?.nickname,
      thumbnailImageUrl: _json.kakao_account?.profile?.thumbnail_image_url,
      profileImageUrl: _json.kakao_account?.profile?.profile_image_url,
      isDefaultImage: _json.kakao_account?.profile?.is_default_image,
      isDefaultNickname: _json.kakao_account?.profile?.is_default_nickname,
      nameNeedsAgreement: _json.kakao_account?.name_needs_agreement,
      name: _json.kakao_account?.name,
      // 이메일 정보 (snake_case → camelCase)
      hasEmail: _json.kakao_account?.has_email,
      emailNeedsAgreement: _json.kakao_account?.email_needs_agreement,
      isEmailValid: _json.kakao_account?.is_email_valid,
      isEmailVerified: _json.kakao_account?.is_email_verified,
      email: _json.kakao_account?.email,
      // 휴대폰 번호 정보 (snake_case → camelCase)
      hasPhoneNumber: _json.kakao_account?.has_phone_number,
      phoneNumberNeedsAgreement: _json.kakao_account?.phone_number_needs_agreement,
      phoneNumber: _json.kakao_account?.phone_number,
      // 연령대 정보 (snake_case → camelCase)
      hasAgeRange: _json.kakao_account?.has_age_range,
      ageRangeNeedsAgreement: _json.kakao_account?.age_range_needs_agreement,
      ageRange: _json.kakao_account?.age_range,
      // 출생연도 정보 (snake_case → camelCase)
      hasBirthyear: _json.kakao_account?.has_birthyear,
      birthyearNeedsAgreement: _json.kakao_account?.birthyear_needs_agreement,
      birthyear: _json.kakao_account?.birthyear,
      // 생일 정보 (snake_case → camelCase)
      hasBirthday: _json.kakao_account?.has_birthday,
      birthdayNeedsAgreement: _json.kakao_account?.birthday_needs_agreement,
      birthday: _json.kakao_account?.birthday,
      birthdayType: _json.kakao_account?.birthday_type,
      isLeapMonth: _json.kakao_account?.is_leap_month,
      // 성별 정보 (snake_case → camelCase)
      hasGender: _json.kakao_account?.has_gender,
      genderNeedsAgreement: _json.kakao_account?.gender_needs_agreement,
      gender: _json.kakao_account?.gender,
    });
  }
}
