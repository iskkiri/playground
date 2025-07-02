export interface GetKakaoUserInfoRequestDto {
  accessToken: string;
}

export interface KakaoProperties {
  /**
   * 카카오 사용자 닉네임
   * @example 홍길동
   */
  nickname: string;

  /**
   * 카카오 사용자 프로필 이미지
   * @example http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg
   */
  profile_image: string;

  /**
   * 카카오 사용자 썸네일 이미지
   * @example http://img1.kakaocdn.net/thumb/R110x110.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg
   */
  thumbnail_image: string;
}

export interface KakaoAccountProfile {
  /**
   * 카카오 사용자 닉네임
   * @example 홍길동
   */
  nickname: string;

  /**
   * 카카오 사용자 썸네일 이미지
   * @example http://img1.kakaocdn.net/thumb/R110x110.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg
   */
  thumbnail_image_url: string;

  /**
   * 카카오 사용자 프로필 이미지
   * @example http://img1.kakaocdn.net/thumb/R110x110.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg
   */
  profile_image_url: string;

  /**
   * 카카오 사용자 썸네일 이미지 기본 여부
   * @example true
   */
  is_default_image: boolean;

  /**
   * 카카오 사용자 닉네임 기본 여부
   * @example true
   */
  is_default_nickname: boolean;
}

export interface KakaoAccount {
  /**
   * 카카오 사용자 닉네임 동의 여부
   * @example true
   */
  profile_nickname_needs_agreement: boolean;

  /**
   * 카카오 사용자 프로필 이미지 동의 여부
   * @example true
   */
  profile_image_needs_agreement: boolean;

  /**
   * 카카오 사용자 프로필
   */
  profile: KakaoAccountProfile;

  /**
   * 카카오 사용자 이름 동의 여부
   * @example true
   */
  name_needs_agreement: boolean;

  /**
   * 카카오 사용자 이름
   * @example 홍길동
   */
  name: string;

  /**
   * 카카오 사용자 이메일 존재 여부
   * @example true
   */
  has_email: boolean;

  /**
   * 카카오 사용자 이메일 동의 여부
   * @example true
   */
  email_needs_agreement: boolean;

  /**
   * 카카오 사용자 이메일 유효성 검사 여부
   * @example true
   */
  is_email_valid: boolean;

  /**
   * 카카오 사용자 이메일 인증 여부
   * @example true
   */
  is_email_verified: boolean;

  /**
   * 카카오 사용자 이메일
   * @example test@gmail.com
   */
  email: string;

  /**
   * 카카오 사용자 휴대폰 번호 존재 여부
   * @example true
   */
  has_phone_number: boolean;

  /**
   * 카카오 사용자 휴대폰 번호 동의 여부
   * @example true
   */
  phone_number_needs_agreement: boolean;

  /**
   * 카카오 사용자 휴대폰 번호
   * @example +82 10-1234-5678
   */
  phone_number: string;
}

export interface GetKakaoUserInfoResponseDto {
  /**
   * 카카오 사용자 고유 ID
   * @example 1234567890
   */
  id: number;
  /**
   * 카카오 사용자 연결 시간
   * @example 2021-08-01T00:00:00Z
   */
  connected_at: string;
  properties: KakaoProperties;
  kakao_account: KakaoAccount;
}
