export interface GetPaycoUserInfoRequestDto {
  accessToken: string;
}

export interface PaycoHeader {
  /**
   * 성공 여부 (true : 성공, false : 실패)
   * @example true
   */
  isSuccessful: boolean; // 성공 여부 (true : 성공, false : 실패)

  /**
   * 결과 코드
   * @example 0
   */
  resultCode: number; // 결과 코드

  /**
   * 결과 메세지 (SUCCESS : 성공, 그 외 메세지)
   * @example SUCCESS
   */
  resultMessage: string; // 결과 메세지 (SUCCESS : 성공, 그 외 메세지)
}

export interface PaycoAddress {
  /**
   * 우편번호
   * @example 06234
   */
  zipCode: string; // 우편번호

  /**
   * 주소
   * @example 서울특별시 강남구 테헤란로 14길 6
   */
  address: string; // 주소

  /**
   * 상세주소
   * @example 남도빌딩 2층
   */
  addressDetail: string; // 상세주소
}

export interface PaycoUserInfo {
  /**
   * 회원 번호
   * @example 00000000-0000-0000-0000-00000000000
   */
  idNo: string; // 회원 번호

  /**
   * 이메일 주소
   * @example abcde@gmail.com
   */
  email: string | null; // 이메일 주소

  /**
   * 휴대폰 번호
   * @example 821000000000
   */
  mobile: string | null; // 휴대폰 번호

  /**
   * 마스킹된 이메일 주소
   * @example ab***@gmail.com
   */
  maskedEmail: string | null; // 마스킹된 이메일 주소

  /**
   * 마스킹된 휴대폰 번호
   * @example 010-00**-00**
   */
  maskedMobile: string | null; // 마스킹된 휴대폰 번호

  /**
   * 이름
   * @example 홍길동
   */
  name: string | null; // 이름

  /**
   * 성별(FEMALE: 여성, MALE: 남성)
   * @example MALE
   */
  genderCode: string | null; // 성별(FEMALE: 여성, MALE: 남성)

  /**
   * 연령대(0: 0-10세 미만, 10, 20, 30, ...)
   * @example 30
   */
  ageGroup: string | null; // 연령대(0: 0-10세 미만, 10, 20, 30, ...)

  /**
   * 생일(MMDD)
   * @example 0101
   */
  birthdayMMdd: string | null; // 생일(MMDD)

  /**
   * 생년월일(YYYYMMDD) | 바로가입 서비스만 이용가능
   * @example 19900101
   */
  birthday?: string; // 생년월일(YYYYMMDD) | 바로가입 서비스만 이용가능

  /**
   * 연계정보 (CI) | 바로가입 서비스만 이용가능
   * @example 0
   */
  ci?: string; // 연계정보 (CI) | 바로가입 서비스만 이용가능

  /**
   * 내국인/외국인 여부 (true/false) | 바로가입 서비스만 이용가능
   * @example true
   */
  isForeigner?: string; // 내국인/외국인 여부 (true/false) | 바로가입 서비스만 이용가능

  /**
   * 연락처(휴대폰 번호) | 바로가입 서비스만 이용가능
   * @example 01012345678
   */
  contactNumber?: string; // 연락처(휴대폰 번호) | 바로가입 서비스만 이용가능

  /**
   * 주소 | 바로가입 서비스만 이용가능
   * @example 주소 | 바로가입 서비스만 이용가능
   */
  address?: PaycoAddress; // 주소 | 바로가입 서비스만 이용가능
}

export interface GetPaycoUserInfoResponseDto {
  header: PaycoHeader;
  data: {
    member: PaycoUserInfo;
  };
}
