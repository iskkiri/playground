import { ApiProperty } from '@nestjs/swagger';
import { ExposeAll } from '@/common/decorators/expose-all.decorator';

/**
 * 카카오 OAuth 사용자 프로필 DTO (Passport.js 방식)
 *
 * 기존 직접 구현 방식의 GetKakaoUserInfoResponseDto와 동일한 정보를 담되,
 * snake_case를 camelCase로 변환하고 provider 속성을 추가합니다.
 *
 * 변환 규칙:
 * - profile_image → profileImage
 * - thumbnail_image → thumbnailImage
 * - connected_at → connectedAt
 * - profile_nickname_needs_agreement → profileNicknameNeedsAgreement
 * - 기타 모든 snake_case → camelCase
 */
@ExposeAll()
export class KakaoProfile {
  constructor(data: Partial<KakaoProfile>) {
    Object.assign(this, data);
  }

  @ApiProperty({
    example: 'kakao',
    description: 'OAuth 제공자 (항상 "kakao")',
  })
  provider: 'kakao';

  @ApiProperty({
    example: '1234567890',
    description: '카카오 사용자 고유 ID',
  })
  id: string;

  @ApiProperty({
    example: '2021-08-01T00:00:00Z',
    description: '카카오 사용자 연결 시간',
  })
  connectedAt?: string;

  // Properties 정보 (camelCase 변환)
  @ApiProperty({
    example: '홍길동',
    description: '카카오 사용자 닉네임',
  })
  nickname?: string;

  @ApiProperty({
    example:
      'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
    description: '카카오 사용자 프로필 이미지',
  })
  profileImage?: string;

  @ApiProperty({
    example:
      'http://img1.kakaocdn.net/thumb/R110x110.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
    description: '카카오 사용자 썸네일 이미지',
  })
  thumbnailImage?: string;

  // Kakao Account Profile 정보 (camelCase 변환)
  @ApiProperty({
    example: true,
    description: '카카오 사용자 닉네임 동의 여부',
  })
  profileNicknameNeedsAgreement?: boolean;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 프로필 이미지 동의 여부',
  })
  profileImageNeedsAgreement?: boolean;

  @ApiProperty({
    example: '홍길동',
    description: '카카오 사용자 프로필 닉네임',
  })
  profileNickname?: string;

  @ApiProperty({
    example:
      'http://img1.kakaocdn.net/thumb/R110x110.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
    description: '카카오 사용자 썸네일 이미지 URL',
  })
  thumbnailImageUrl?: string;

  @ApiProperty({
    example:
      'http://img1.kakaocdn.net/thumb/R110x110.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
    description: '카카오 사용자 프로필 이미지 URL',
  })
  profileImageUrl?: string;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 썸네일 이미지 기본 여부',
  })
  isDefaultImage?: boolean;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 닉네임 기본 여부',
  })
  isDefaultNickname?: boolean;

  // Kakao Account 기본 정보 (camelCase 변환)
  @ApiProperty({
    example: true,
    description: '카카오 사용자 이름 동의 여부',
  })
  nameNeedsAgreement?: boolean;

  @ApiProperty({
    example: '홍길동',
    description: '카카오 사용자 이름',
  })
  name?: string;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 이메일 존재 여부',
  })
  hasEmail?: boolean;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 이메일 동의 여부',
  })
  emailNeedsAgreement?: boolean;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 이메일 유효성 검사 여부',
  })
  isEmailValid?: boolean;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 이메일 인증 여부',
  })
  isEmailVerified?: boolean;

  @ApiProperty({
    example: 'test@gmail.com',
    description: '카카오 사용자 이메일',
  })
  email?: string;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 휴대폰 번호 존재 여부',
  })
  hasPhoneNumber?: boolean;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 휴대폰 번호 동의 여부',
  })
  phoneNumberNeedsAgreement?: boolean;

  @ApiProperty({
    example: '+82 10-1234-5678',
    description: '카카오 사용자 휴대폰 번호',
  })
  phoneNumber?: string;

  // 연령대 정보
  @ApiProperty({
    example: true,
    description: '카카오 사용자 연령대 정보 존재 여부',
  })
  hasAgeRange?: boolean;

  @ApiProperty({
    example: false,
    description: '카카오 사용자 연령대 정보 동의 여부',
  })
  ageRangeNeedsAgreement?: boolean;

  @ApiProperty({
    example: '30~39',
    description: '카카오 사용자 연령대',
  })
  ageRange?: string;

  // 출생연도 정보
  @ApiProperty({
    example: true,
    description: '카카오 사용자 출생연도 정보 존재 여부',
  })
  hasBirthyear?: boolean;

  @ApiProperty({
    example: false,
    description: '카카오 사용자 출생연도 정보 동의 여부',
  })
  birthyearNeedsAgreement?: boolean;

  @ApiProperty({
    example: '1991',
    description: '카카오 사용자 출생연도',
  })
  birthyear?: string;

  // 생일 정보
  @ApiProperty({
    example: true,
    description: '카카오 사용자 생일 정보 존재 여부',
  })
  hasBirthday?: boolean;

  @ApiProperty({
    example: false,
    description: '카카오 사용자 생일 정보 동의 여부',
  })
  birthdayNeedsAgreement?: boolean;

  @ApiProperty({
    example: '0101',
    description: '카카오 사용자 생일 (MMDD 형식)',
  })
  birthday?: string;

  @ApiProperty({
    example: 'SOLAR',
    description: '카카오 사용자 생일 타입 (SOLAR: 양력, LUNAR: 음력)',
  })
  birthdayType?: string;

  @ApiProperty({
    example: false,
    description: '카카오 사용자 윤달 여부',
  })
  isLeapMonth?: boolean;

  // 성별 정보
  @ApiProperty({
    example: true,
    description: '카카오 사용자 성별 정보 존재 여부',
  })
  hasGender?: boolean;

  @ApiProperty({
    example: false,
    description: '카카오 사용자 성별 정보 동의 여부',
  })
  genderNeedsAgreement?: boolean;

  @ApiProperty({
    example: 'male',
    description: '카카오 사용자 성별 (male: 남성, female: 여성)',
  })
  gender?: string;
}
