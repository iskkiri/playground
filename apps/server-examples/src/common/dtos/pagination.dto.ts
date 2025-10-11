import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsUUID } from 'class-validator';
import { ExposeAll } from '../decorators/expose-all.decorator';

export class PaginationRequestDto {
  @ApiProperty({ description: '현재 페이지', example: 1, required: false, default: 1 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({ description: '페이지 크기', example: 10, required: false, default: 10 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pageSize: number = 10;
}

@ExposeAll()
export class PaginationResponseDto<TData> {
  constructor(data: Partial<PaginationResponseDto<TData>>) {
    Object.assign(this, data);
  }

  @ApiProperty({ description: '아이템 목록', example: [] })
  content: TData[];

  @ApiProperty({ description: '현재 페이지', example: 1 })
  page: number;

  @ApiProperty({ description: '페이지 크기', example: 10 })
  pageSize: number;

  @ApiProperty({ description: '총 페이지 수', example: 10 })
  totalPages: number;

  @ApiProperty({ description: '총 아이템 수', example: 100 })
  totalElements: number;

  @ApiProperty({ description: '검색된 아이템 수', example: 10 })
  searchElements: number;

  @ApiProperty({ description: '다음 페이지 여부', example: true })
  hasNextPage: boolean;

  @ApiProperty({ description: '이전 페이지 여부', example: true })
  hasPreviousPage: boolean;
}

export class CursorPaginationRequestDto {
  @ApiProperty({ description: '커서 (이전 응답의 nextCursor)', required: false })
  @IsUUID()
  @IsOptional()
  cursor?: string;

  @ApiProperty({ description: '페이지 크기', example: 10, required: false, default: 10 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pageSize: number = 10;
}

@ExposeAll()
export class CursorPaginationResponseDto<TData> {
  constructor(data: Partial<CursorPaginationResponseDto<TData>>) {
    Object.assign(this, data);
  }

  @ApiProperty({ description: '아이템 목록', example: [] })
  content: TData[];

  @ApiProperty({ description: '페이지 크기', example: 10 })
  pageSize: number;

  @ApiProperty({ description: '다음 페이지 여부', example: true })
  hasNextPage: boolean;

  @ApiProperty({
    description: '다음 커서',
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
  })
  nextCursor: string | null;
}
