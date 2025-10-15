import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryRequestDto } from './dtos/create-category.dto';
import { UpdateCategoryRequestDto } from './dtos/update-category.dto';
import { SuccessResponseDto } from '@/common/dtos/success.dto';
import { CategoryResponseDto } from './dtos/get-categories.dto';
import { PaginationResponseDto, type PaginationQueryDto } from '@/common/dtos/pagination.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  /**
   * 카테고리 목록 조회
   * @returns 카테고리 목록
   */
  async getCategories({
    page = 1,
    pageSize = 10,
  }: PaginationQueryDto): Promise<PaginationResponseDto<CategoryResponseDto>> {
    const [categories, totalCount] = await Promise.all([
      this.prisma.category.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.category.count(),
    ]);

    const content = categories.map((category) => new CategoryResponseDto(category));
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = page * pageSize < totalCount;
    const hasPreviousPage = page > 1;

    return new PaginationResponseDto({
      content,
      page,
      pageSize,
      totalElements: totalCount,
      totalPages,
      searchElements: 0,
      hasNextPage,
      hasPreviousPage,
    });
  }

  /**
   * 카테고리 생성
   * @param createCategoryDto 카테고리 생성 요청 데이터
   * @returns 카테고리
   */
  async createCategory(createCategoryDto: CreateCategoryRequestDto): Promise<CategoryResponseDto> {
    const category = await this.prisma.category.create({
      data: createCategoryDto,
    });

    return new CategoryResponseDto(category);
  }

  /**
   * 카테고리 수정
   * @param id 카테고리 ID
   * @param updateCategoryDto 카테고리 수정 요청 데이터
   * @returns 카테고리
   */
  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryRequestDto
  ): Promise<CategoryResponseDto> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`카테고리를 찾을 수 없습니다. ID: ${id}`);
    }

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });

    return new CategoryResponseDto(updatedCategory);
  }

  /**
   * 카테고리 삭제
   * @param id 카테고리 ID
   * @returns 카테고리 삭제 성공 여부
   */
  async deleteCategory(id: number): Promise<SuccessResponseDto> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`카테고리를 찾을 수 없습니다. ID: ${id}`);
    }

    await this.prisma.category.delete({
      where: { id },
    });

    return new SuccessResponseDto({ success: true });
  }
}
