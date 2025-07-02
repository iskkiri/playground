import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetPaycoAuthTokenRequestDto {
  @ApiProperty({
    example: 'd9f8c4478a7d4d69bc4e457698bedec9',
    description: '페이코 로그인 인증 코드',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    example: '4e9813c73329ff43f2bf1ec7bfc6e8dbaba584c469849dda',
    description: 'Nonce(Number used once)',
  })
  @IsNotEmpty()
  @IsString()
  state: string;
}

export class GetPaycoAuthTokenResponseDto {
  access_token: string;
  access_token_secret: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
  state: string;
}
