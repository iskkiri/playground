export interface GetGoogleUserInfoRequestDto {
  accessToken: string;
}

export interface GoogleUserInfo {
  /**
   * 모든 구글 계정에서 고유하며 재사용되지 않는 식별자
   * @example 110169484474386276334
   */
  id: string;

  /**
   * 사용자의 이메일 주소
   * @example user@gmail.com
   */
  email: string;

  /**
   * 이메일 주소 인증 여부
   * @example true
   */
  verified_email: boolean;

  /**
   * 사용자 풀네임
   * @example 홍길동
   */
  name: string;

  /**
   * 사용자 이름
   * @example 길동
   */
  given_name: string;

  /**
   * 사용자 성
   * @example 홍
   */
  family_name: string;

  /**
   * 사용자 프로필 이미지
   * @example https://lh3.googleusercontent.com/a/ACg8ocI-fLiDydzRXO3VcDsMb099g81oBf18RHp3AnM1Ev0IwdnNCw=s96-c
   */
  picture: string;
}
