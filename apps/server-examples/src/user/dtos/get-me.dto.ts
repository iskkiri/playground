import { ApiProperty } from '@nestjs/swagger';
import { ExposeAll } from '../../common/decorators/expose-all.decorator';

@ExposeAll()
export class GetMeResponseDto {
  constructor(data: Partial<GetMeResponseDto>) {
    Object.assign(this, data);
  }

  @ApiProperty({
    description: '사용자 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '사용자 이메일',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동',
  })
  name: string;

  @ApiProperty({
    description: '사용자 역할',
    example: 'USER',
  })
  role: string;

  @ApiProperty({
    description: '사용자 생성일시',
    example: '2025-09-14T10:00:00Z',
  })
  createdAt: Date;
}
