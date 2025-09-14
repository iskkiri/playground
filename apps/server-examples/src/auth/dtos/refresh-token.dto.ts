import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ExposeAll } from '../../common/decorators/expose-all.decorator';

export class RefreshTokenRequestDto {
  @ApiProperty({ description: '리프레시 토큰' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

@ExposeAll()
export class RefreshTokenResponseDto {
  constructor(data: Partial<RefreshTokenResponseDto>) {
    Object.assign(this, data);
  }

  @ApiProperty({ description: '새로운 액세스 토큰' })
  accessToken: string;

  @ApiProperty({ description: '새로운 리프레시 토큰' })
  refreshToken: string;
}