import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetNaverAuthTokenRequestDto {
  @ApiProperty({
    example: '6El4qd3nS92cXH3Bvd',
    description: '네이버 로그인 인증 코드',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    example: '9aa08ddbf96133c717cbd8c4dfe56c37e2ffe21c0be174bf',
    description: 'Nonce(Number used once)',
  })
  @IsNotEmpty()
  @IsString()
  state: string;
}

export class GetNaverAuthTokenResponseDto {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  error: string;
  error_description: string;
}
