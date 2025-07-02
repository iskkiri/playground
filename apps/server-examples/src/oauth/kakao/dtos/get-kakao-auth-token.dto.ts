import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetKakaoAuthTokenRequestDto {
  @ApiProperty({
    example:
      '8lRuPWQTyx9J2Zpl8rc4klFkgvgdWS8g4N2DaIdfETj8BMgUSIm-zwAAAAQKKcjZAAABlVVPTa_Nsk3jZ7dWzg',
    description: '카카오 로그인 인증 코드',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    example: 'http://localhost:3000/oauth/callback/kakao',
    description: '리다이렉트 URI',
  })
  @IsNotEmpty()
  @IsString()
  redirectUri: string;

  @ApiProperty({
    example: 'f34af90cfaa689dcd248d54d95d876a020b479a0dc5798ec',
    description: 'Number used once',
    required: false,
  })
  @IsOptional()
  @IsString()
  nonce?: string;
}

export class GetKakaoAuthTokenResponseDto {
  token_type: string;
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
}
