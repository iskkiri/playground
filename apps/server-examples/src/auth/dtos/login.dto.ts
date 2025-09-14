import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ExposeAll } from '../../common/decorators/expose-all.decorator';

export class LoginRequestDto {
  @ApiProperty({ description: '이메일', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '비밀번호', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

@ExposeAll()
export class LoginResponseDto {
  constructor(data: Partial<LoginResponseDto>) {
    Object.assign(this, data);
  }

  @ApiProperty({ description: '액세스 토큰' })
  accessToken: string;

  @ApiProperty({ description: '리프레시 토큰' })
  refreshToken: string;
}
