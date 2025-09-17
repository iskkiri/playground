import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SuccessResponseDto } from '@/common/dtos/success.dto';

@ApiTags('Test')
@Controller('test')
export class TestController {
  @Get('refresh-token-rotation-1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'JWT 토큰 갱신 동시성 테스트 1' })
  @ApiOkResponse({ type: SuccessResponseDto })
  async refreshTokenRotationTest1(): Promise<SuccessResponseDto> {
    return { success: true };
  }

  @Get('refresh-token-rotation-2')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'JWT 토큰 갱신 동시성 테스트 2' })
  @ApiOkResponse({ type: SuccessResponseDto })
  async refreshTokenRotationTest2(): Promise<SuccessResponseDto> {
    return { success: true };
  }

  @Get('refresh-token-rotation-3')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'JWT 토큰 갱신 동시성 테스트 3' })
  @ApiOkResponse({ type: SuccessResponseDto })
  async refreshTokenRotationTest3(): Promise<SuccessResponseDto> {
    return { success: true };
  }
}