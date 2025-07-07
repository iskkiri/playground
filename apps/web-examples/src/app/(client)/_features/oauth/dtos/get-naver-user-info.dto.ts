export interface GetNaverUserInfoRequestDto {
  accessToken: string;
}

export interface NaverUserInfo {
  /**
   * 네이버 사용자 고유 ID
   * @example GZD_XUKbXRQBCAzWFfMPtYf_KpwU0Hzx829Ijlx1Q6P
   */
  id: string;

  /**
   * 네이버 사용자 닉네임
   * @example nickname
   */
  nickname: string;

  /**
   * 네이버 사용자 프로필 이미지
   * @example https://ssl.pstatic.net/static/pwe/address/img_profile.png
   */
  profile_image: string;

  /**
   * 네이버 사용자 연령대
   * @example 30-39
   */
  age: string;

  /**
   * 네이버 사용자 성별 (M, F)
   * @example M
   */
  gender: 'M' | 'F' | 'U';

  /**
   * 네이버 사용자 이메일
   * @example kkiri@naver.com
   */
  email: string;

  /**
   * 네이버 사용자 휴대폰 번호
   * @example 010-1234-5678
   */
  mobile: string;

  /**
   * 네이버 사용자 휴대폰 번호(E.164 형식)
   * @example +821012345678
   */
  mobile_e164: string;

  /**
   * 네이버 사용자 이름
   * @example 홍길동
   */
  name: string;

  /**
   * 네이버 사용자 생일
   * @example 01-01
   */
  birthday: string;

  /**
   * 네이버 사용자 생년
   * @example 1991
   */
  birthyear: string;
}

export interface GetNaverUserInfoResponseDto {
  resultcode: string;
  message: string;
  response: NaverUserInfo;
}
