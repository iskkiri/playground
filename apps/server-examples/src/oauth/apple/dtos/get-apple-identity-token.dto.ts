import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetAppleIdentityTokenRequestDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: '애플 로그인 ID 토큰',
  })
  @IsNotEmpty()
  @IsString()
  identityToken: string;

  @ApiProperty({
    example: 'f34af90cfaa689dcd248d54d95d876a020b479a0dc5798ec',
    description: 'Number used once',
  })
  @IsNotEmpty()
  @IsString()
  nonce: string;
}
