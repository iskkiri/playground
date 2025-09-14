import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ExposeAll } from '../../../common/decorators/expose-all.decorator';

export class GetGoogleAuthTokenRequestDto {
  @ApiProperty({
    example: '4/0AQSTgQGmG4B0Q0mMGL-Dn_HNyf6_HwQpYl-qCzlks-OOUugL1eiMnA9tSJFVLF0aIkCNsg',
    description: '구글 로그인 인증 코드',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  // 서버에서 CSRF 토큰 발급 필요하므로 주석처리
  // @ApiProperty({
  //   example: '6a248ef6c245cbf3b6efd1e3294444da35d62b79783cfc3a',
  //   description: 'Nonce(Number used once)',
  // })
  // @IsNotEmpty()
  // @IsString()
  // state: string;

  @ApiProperty({
    example: 'http://localhost:3000/oauth/callback/google',
    description: '리다이렉트 URI',
  })
  @IsNotEmpty()
  @IsString()
  redirectUri: string;
}

@ExposeAll()
export class GetGoogleAuthTokenResponseDto {
  constructor(data: Partial<GetGoogleAuthTokenResponseDto>) {
    Object.assign(this, data);
  }

  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  id_token: string;
  scope: string;
}
