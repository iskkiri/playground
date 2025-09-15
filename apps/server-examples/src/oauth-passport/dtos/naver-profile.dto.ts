import { ApiProperty } from '@nestjs/swagger';
import { ExposeAll } from '@/common/decorators/expose-all.decorator';

@ExposeAll()
export class NaverProfile {
  constructor(data: Partial<NaverProfile>) {
    Object.assign(this, data);
  }

  @ApiProperty({
    example: 'naver',
    description: 'OAuth 제공자 (항상 "naver")',
  })
  provider: 'naver';

  @ApiProperty({
    example: 'GZD_XUKbXRQBCAzWFfMPtYf_KpwU0Hzx829Ijlx1Q6P',
    description: '네이버 사용자 고유 ID',
  })
  id: string;

  @ApiProperty({
    example: 'nickname',
    description: '네이버 사용자 닉네임',
  })
  nickname: string;

  @ApiProperty({
    example: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
    description: '네이버 사용자 프로필 이미지',
  })
  profileImage: string;

  @ApiProperty({
    example: '30-39',
    description: '네이버 사용자 연령대',
  })
  age: string;

  @ApiProperty({
    example: 'M',
    description: '네이버 사용자 성별 (M, F)',
  })
  gender: string;

  @ApiProperty({
    example: 'kkiri@naver.com',
    description: '네이버 사용자 이메일',
  })
  email: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: '네이버 사용자 휴대폰 번호',
  })
  mobile: string;

  @ApiProperty({
    example: '+821012345678',
    description: '네이버 사용자 휴대폰 번호(E.164 형식)',
  })
  mobileE164: string;

  @ApiProperty({
    example: '홍길동',
    description: '네이버 사용자 이름',
  })
  name: string;

  @ApiProperty({
    example: '01-01',
    description: '네이버 사용자 생일',
  })
  birthday: string;

  @ApiProperty({
    example: '1991',
    description: '네이버 사용자 생년',
  })
  birthyear: string;
}
