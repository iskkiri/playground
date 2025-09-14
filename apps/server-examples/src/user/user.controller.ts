import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { SignUpRequestDto } from './dtos/sign-up.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtUser } from '../user/types/jwt-user.types';
import { SuccessResponseDto } from '@/common/dtos/success.dto';
import { GetMeResponseDto } from './dtos/get-me.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    type: SuccessResponseDto,
  })
  @ApiResponse({ status: 409, description: '이미 존재하는 이메일' })
  async signUp(@Body() dto: SignUpRequestDto): Promise<SuccessResponseDto> {
    return this.userService.signUp(dto);
  }


  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '내 정보 조회' })
  @ApiResponse({
    status: 200,
    description: '내 정보 조회 성공',
    type: GetMeResponseDto,
  })
  @ApiResponse({ status: 401, description: '인증 필요' })
  async getMe(@Request() req: { user: JwtUser }): Promise<GetMeResponseDto> {
    return this.userService.getMe(req.user.id);
  }
}
