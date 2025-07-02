import { ApiProperty } from '@nestjs/swagger';

export class AppleTokenPayload {
  @ApiProperty({
    example: 'https://appleid.apple.com',
    description: '발급자 (애플 서버)',
  })
  iss: string;

  @ApiProperty({
    example: 'com.example.appname',
    description: '앱 ID (애플 개발자 포털에 등록된 앱 ID)',
  })
  aud: string;

  @ApiProperty({
    example: 1740924355,
    description: '만료 시간',
  })
  exp: number;

  @ApiProperty({
    example: 1740837955,
    description: '발급 시간',
  })
  iat: number;

  @ApiProperty({
    example: '001234.12345e5a9f834e28af4c3bad12345678.5678',
    description: '사용자 ID (애플에서 제공하는 고유 식별자)',
  })
  sub: string;

  @ApiProperty({
    example: 'zN0wmweY5DFraNo7GtsO62rmA3dMo1T8039FvSwkMx8',
    description: 'Number used Once => CSRF 공격 방지, Replay Attack 방지',
    required: false,
  })
  nonce?: string;

  @ApiProperty({
    example: '-ulRccPEnQuHtZ8OwBxKgA',
    description: 'Code Hash => 코드 해시',
  })
  c_hash: string;

  @ApiProperty({
    example: 'test@gmail.com',
    description: '이메일 (사용자가 공유 허용한 경우)',
    required: false,
  })
  email?: string;

  @ApiProperty({
    example: true,
    description: '이메일 인증 여부',
    required: false,
  })
  email_verified?: boolean;

  @ApiProperty({
    example: 1740837955,
    description: '인증 시간',
  })
  auth_time: number;

  @ApiProperty({
    example: true,
    description: 'Nonce 지원 여부',
  })
  nonce_supported: boolean;

  @ApiProperty({
    example: 1,
    description:
      '사용자가 실제 사람인지 평가하는 Apple의 판단을 나타내는 지표<br/>' +
      '0: 알 수 없음 (Unsupported) - Apple이 판단할 수 없음<br/>' +
      '1: 가능성 낮음 (Likely Unsupported) - 실제 사용자일 가능성이 낮음<br/>' +
      '2: 가능성 높음 (Likely Real) - 실제 사용자일 가능성이 높음<br/>' +
      '3: 확실함 (Real) - 높은 확률로 실제 사용자임',
    required: false,
  })
  real_user_status?: number;
}
