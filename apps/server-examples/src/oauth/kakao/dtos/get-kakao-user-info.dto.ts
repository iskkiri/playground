import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ExposeAll } from '../../../common/decorators/expose-all.decorator';

export class GetKakaoUserInfoRequestDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}

@ExposeAll()
export class KakaoProperties {
  constructor(data: Partial<KakaoProperties>) {
    Object.assign(this, data);
  }

  @ApiProperty({
    example: '홍길동',
    description: '카카오 사용자 닉네임',
  })
  nickname: string;

  @ApiProperty({
    example:
      'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
    description: '카카오 사용자 프로필 이미지',
  })
  profile_image: string;

  @ApiProperty({
    example: '썸네일 이미지',
    description:
      'http://img1.kakaocdn.net/thumb/R110x110.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
  })
  thumbnail_image: string;
}

@ExposeAll()
export class KakaoAccountProfile {
  constructor(data: Partial<KakaoAccountProfile>) {
    Object.assign(this, data);
  }

  @ApiProperty({
    example: '홍길동',
    description: '카카오 사용자 닉네임',
  })
  nickname: string;

  @ApiProperty({
    example:
      'http://img1.kakaocdn.net/thumb/R110x110.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
    description: '카카오 사용자 썸네일 이미지',
  })
  thumbnail_image_url: string;

  @ApiProperty({
    example:
      'http://img1.kakaocdn.net/thumb/R110x110.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
    description: '카카오 사용자 프로필 이미지',
  })
  profile_image_url: string;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 썸네일 이미지 기본 여부',
  })
  is_default_image: boolean;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 닉네임 기본 여부',
  })
  is_default_nickname: boolean;
}

@ExposeAll()
export class KakaoAccount {
  constructor(data: Partial<KakaoAccount>) {
    Object.assign(this, data);
  }

  @ApiProperty({
    example: true,
    description: '카카오 사용자 닉네임 동의 여부',
  })
  profile_nickname_needs_agreement: boolean;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 프로필 이미지 동의 여부',
  })
  profile_image_needs_agreement: boolean;

  @ApiProperty()
  profile: KakaoAccountProfile;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 이름 동의 여부',
  })
  name_needs_agreement: boolean;

  @ApiProperty({
    example: '홍길동',
    description: '카카오 사용자 이름',
  })
  name: string;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 이메일 존재 여부',
  })
  has_email: boolean;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 이메일 동의 여부',
  })
  email_needs_agreement: boolean;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 이메일 유효성 검사 여부',
  })
  is_email_valid: boolean;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 이메일 인증 여부',
  })
  is_email_verified: boolean;

  @ApiProperty({
    example: 'test@gmail.com',
    description: '카카오 사용자 이메일',
  })
  email: string;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 휴대폰 번호 존재 여부',
  })
  has_phone_number: boolean;

  @ApiProperty({
    example: true,
    description: '카카오 사용자 휴대폰 번호 동의 여부',
  })
  phone_number_needs_agreement: boolean;

  @ApiProperty({
    example: '+82 10-1234-5678',
    description: '카카오 사용자 휴대폰 번호',
  })
  phone_number: string;
}

@ExposeAll()
export class GetKakaoUserInfoResponseDto {
  constructor(data: Partial<GetKakaoUserInfoResponseDto>) {
    Object.assign(this, data);
  }

  @ApiProperty({
    example: 1234567890,
    description: '카카오 사용자 고유 ID',
  })
  id: number;

  @ApiProperty({
    example: '2021-08-01T00:00:00Z',
    description: '카카오 사용자 연결 시간',
  })
  connected_at: string;

  @ApiProperty()
  properties: KakaoProperties;

  @ApiProperty()
  kakao_account: KakaoAccount;
}
