import { ApiProperty } from '@nestjs/swagger';
import { ExposeAll } from '../decorators/expose-all.decorator';

@ExposeAll()
export class SuccessResponseDto {
  constructor(data: Partial<SuccessResponseDto>) {
    Object.assign(this, data);
  }

  @ApiProperty({ description: '성공 여부', example: true })
  success: true;
}
