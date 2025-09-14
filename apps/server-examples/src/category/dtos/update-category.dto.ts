import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCategoryRequestDto {
  @ApiProperty({
    description: '카테고리 이름',
    example: 'Technology',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @ApiProperty({
    description: '카테고리 설명',
    example: '기술 관련 게시글',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;
}