import { ApiProperty } from '@nestjs/swagger';
import { ExposeAll } from '../../common/decorators/expose-all.decorator';

@ExposeAll()
export class CategoryResponseDto {
  constructor(data: Partial<CategoryResponseDto>) {
    Object.assign(this, data);
  }

  @ApiProperty({
    description: '카테고리 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '카테고리 이름',
    example: 'Technology',
  })
  name: string;

  @ApiProperty({
    description: '카테고리 설명',
    example: '기술 관련 게시글',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: '생성일',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정일',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
