import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { UploadImageResponseDto, UploadImageQueryDto } from './dtos/upload-image.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiFile } from '../common/decorators/api-file.decorator';
import { ImageValidationPipe } from '@/common/pipes/file-validation.pipe';

@ApiTags('이미지')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '이미지 업로드' })
  @ApiFile({ description: '이미지 파일 (jpg, jpeg, png, gif, 최대 5MB)' })
  @ApiCreatedResponse({ type: UploadImageResponseDto })
  async uploadImage(
    @UploadedFile(
      new ImageValidationPipe({
        maxSize: 5 * 1024 * 1024,
        allowedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
        errorMessages: {
          invalidType: '이미지 파일만 업로드 가능합니다. (jpg, jpeg, png, gif)',
          oversized: '파일 크기는 5MB를 초과할 수 없습니다.',
        },
      })
    )
    file: Express.Multer.File,
    @Query() query: UploadImageQueryDto
  ): Promise<UploadImageResponseDto> {
    if (!file) {
      throw new BadRequestException('파일이 제공되지 않았습니다.');
    }

    return this.imageService.uploadImage(file, query.category);
  }
}
