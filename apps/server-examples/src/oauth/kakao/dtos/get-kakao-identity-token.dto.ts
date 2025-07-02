import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetKakaoIdentityTokenRequestDto {
  @ApiProperty({
    example: 'f34af90cfaa689dcd248d54d95d876a020b479a0dc5798ec',
    description: '카카오 로그인 ID 토큰',
  })
  @IsNotEmpty()
  @IsString()
  idToken: string;

  @ApiProperty({
    example: 'f34af90cfaa689dcd248d54d95d876a020b479a0dc5798ec',
    description: 'Number used once',
  })
  @IsNotEmpty()
  @IsString()
  nonce: string;
}
