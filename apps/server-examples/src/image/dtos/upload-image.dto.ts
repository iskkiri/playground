import { ExposeAll } from '@/common/decorators/expose-all.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UploadImageQueryDto {
  @ApiPropertyOptional({
    description: '이미지 카테고리 (예: profile, post, comment)',
    example: 'profile',
  })
  @IsOptional()
  @IsString()
  category?: string;
}

@ExposeAll()
export class UploadImageResponseDto {
  constructor(data: Partial<UploadImageResponseDto>) {
    Object.assign(this, data);
  }

  @ApiProperty({
    description: '업로드된 이미지 URL',
    example: 'https://abcdef123.cloudfront.net/images/uuid.png',
  })
  imageUrl: string;
}
