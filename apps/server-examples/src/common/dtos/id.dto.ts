import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { ExposeAll } from '../decorators/expose-all.decorator';

export class IdRequestDto {
  @ApiProperty({ description: 'ID', example: 1 })
  @IsPositive()
  @IsNotEmpty()
  id: number;
}

@ExposeAll()
export class IdResponseDto {
  constructor(data: Partial<IdResponseDto>) {
    Object.assign(this, data);
  }

  @ApiProperty({ description: 'ID', example: 1 })
  id: number;
}
