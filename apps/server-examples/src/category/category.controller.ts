import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryRequestDto } from './dtos/create-category.dto';
import { UpdateCategoryRequestDto } from './dtos/update-category.dto';
import { CategoryResponseDto } from './dtos/get-categories.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'generated/prisma';
import { ApiPropertiesDescription } from '../common/decorators/api-properties-description.decorator';
import { SuccessResponseDto } from '@/common/dtos/success.dto';
import { ApiOkPaginationResponse } from '@/common/decorators/api-paginated-response.decorator';
import { PaginationQueryDto, PaginationResponseDto } from '@/common/dtos/pagination.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: '카테고리 목록 조회 (페이지네이션)' })
  @ApiOkPaginationResponse(CategoryResponseDto)
  @ApiPropertiesDescription({ dto: PaginationQueryDto })
  async getCategories(
    @Query() paginationDto: PaginationQueryDto
  ): Promise<PaginationResponseDto<CategoryResponseDto>> {
    return this.categoryService.getCategories(paginationDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: '카테고리 생성' })
  @ApiPropertiesDescription({ dto: CreateCategoryRequestDto })
  @ApiCreatedResponse({ type: CategoryResponseDto })
  async createCategory(
    @Body() createCategoryDto: CreateCategoryRequestDto
  ): Promise<CategoryResponseDto> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: '카테고리 수정' })
  @ApiPropertiesDescription({ dto: UpdateCategoryRequestDto })
  @ApiOkResponse({ type: CategoryResponseDto })
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryRequestDto
  ): Promise<CategoryResponseDto> {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: '카테고리 삭제' })
  @ApiOkResponse({ type: SuccessResponseDto })
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
