import { ApiProperty } from '@nestjs/swagger';

export class KakaoTokenPayload {
  @ApiProperty({
    example: '7ee658a5b349278d674a7ffd67a53429',
    description: '클라이언트 ID',
  })
  aud: string;

  @ApiProperty({
    example: '3038425542',
    description: '사용자 고유 식별자',
  })
  sub: string;

  @ApiProperty({
    example: 1740895477,
    description: '인증 시간',
  })
  auth_time: number;

  @ApiProperty({
    example: 'https://kauth.kakao.com',
    description: '발급자 (카카오 서버)',
  })
  iss: string;

  @ApiProperty({
    example: 1740917077,
    description: '만료 시간',
  })
  exp: number;

  @ApiProperty({
    example: 1740895477,
    description: '발급 시간',
  })
  iat: number;

  @ApiProperty({
    example: 'e5521dc0b13609a2b8e7039f949fad740c2b48350ef249b3',
    description: 'Number used once',
  })
  nonce: string;

  // 동의항목에 따라 반환되는 정보가 다름
  @ApiProperty({
    example: '홍길동',
    description: '카카오 닉네임',
  })
  nickname?: string;

  @ApiProperty({
    example:
      'https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg',
    description: '카카오 프로필 이미지',
  })
  picture?: string;

  @ApiProperty({
    example: 'test@gmail.com',
    description: '카카오 이메일',
  })
  email?: string;
}
