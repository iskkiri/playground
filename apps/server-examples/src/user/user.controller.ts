import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { SignUpRequestDto } from './dtos/sign-up.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtUser } from '../user/types/jwt-user.types';
import { SuccessResponseDto } from '@/common/dtos/success.dto';
import { GetMeResponseDto } from './dtos/get-me.dto';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { ApiPropertiesDescription } from '@/common/decorators/api-properties-description.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  @ApiOperation({ summary: '회원가입' })
  @ApiPropertiesDescription({ dto: SignUpRequestDto })
  @ApiCreatedResponse({ type: SuccessResponseDto })
  async signUp(@Body() dto: SignUpRequestDto): Promise<SuccessResponseDto> {
    return this.userService.signUp(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '내 정보 조회' })
  @ApiOkResponse({ type: GetMeResponseDto })
  async getMe(@CurrentUser() user: JwtUser): Promise<GetMeResponseDto> {
    return this.userService.getMe(user.id);
  }
}
