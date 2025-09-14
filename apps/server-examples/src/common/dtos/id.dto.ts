import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class IdRequestDto {
  @ApiProperty({ description: 'ID', example: 1 })
  @IsPositive()
  @IsNotEmpty()
  id: number;
}

export class IdResponseDto {
  @ApiProperty({ description: 'ID', example: 1 })
  id: number;
}
