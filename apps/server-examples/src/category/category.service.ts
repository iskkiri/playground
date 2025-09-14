import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryRequestDto } from './dtos/create-category.dto';
import { UpdateCategoryRequestDto } from './dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(createCategoryDto: CreateCategoryRequestDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryRequestDto) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`카테고리를 찾을 수 없습니다. ID: ${id}`);
    }

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`카테고리를 찾을 수 없습니다. ID: ${id}`);
    }

    await this.prisma.category.delete({
      where: { id },
    });

    return { message: `카테고리가 삭제되었습니다. ID: ${id}` };
  }
}