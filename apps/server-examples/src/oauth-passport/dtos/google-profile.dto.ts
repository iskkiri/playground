import { ApiProperty } from '@nestjs/swagger';
import { ExposeAll } from '@/common/decorators/expose-all.decorator';

@ExposeAll()
export class GoogleProfile {
  constructor(data: Partial<GoogleProfile>) {
    Object.assign(this, data);
  }

  @ApiProperty({
    example: 'google',
    description: 'OAuth 제공자 (항상 "google")',
  })
  provider: 'google';

  @ApiProperty({
    example: '108394509734875439521',
    description: '구글 사용자 고유 ID (sub 클레임)',
  })
  id: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: '구글 사용자 이메일 주소',
  })
  email: string;

  @ApiProperty({
    example: true,
    description: '이메일 주소 인증 여부',
  })
  emailVerified: boolean;

  @ApiProperty({
    example: '홍길동',
    description: '구글 사용자 전체 이름',
  })
  name: string;

  @ApiProperty({
    example: '길동',
    description: '구글 사용자 이름(이름)',
  })
  givenName: string;

  @ApiProperty({
    example: '홍',
    description: '구글 사용자 성(성씨)',
  })
  familyName: string;

  @ApiProperty({
    example: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
    description: '구글 사용자 프로필 이미지 URL',
  })
  picture: string;

  @ApiProperty({
    example: 'ko',
    description: '구글 사용자 언어/지역 설정',
  })
  locale: string;
}
