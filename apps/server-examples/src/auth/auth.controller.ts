import { PortoneService } from './../portone/portone.service';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import {
  VerifyIdentityRequestDto,
  VerifyIdentityResponseDto,
} from './../portone/dtos/verify-identity.dto';
import { RefreshTokenRequestDto, RefreshTokenResponseDto } from './dtos/refresh-token.dto';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { ApiOkResponse, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiPropertiesDescription } from '@/common/decorators/api-properties-description.decorator';
import { AuthService } from './auth.service';
import { SuccessResponseDto } from '@/common/dtos/success.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import type { JwtUser } from '@/user/types/jwt-user.types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly portoneService: PortoneService,
    private readonly authService: AuthService
  ) {}

  @Post('verify-identity')
  @ApiOperation({ summary: '인증 정보 조회' })
  @ApiPropertiesDescription({
    description:
      '본인 인증 완료 이후 획득한 identityVerificationId를 이용하여 고객 인증 정보를 조회합니다.',
    dto: VerifyIdentityRequestDto,
  })
  @ApiOkResponse({ type: VerifyIdentityResponseDto })
  @HttpCode(HttpStatus.OK)
  async verifyIdentity(@Body() body: VerifyIdentityRequestDto) {
    return this.portoneService.verifyIdentity(body.identityVerificationId);
  }

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 401, description: '인증 실패' })
  async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(dto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '로그아웃' })
  @ApiResponse({
    status: 200,
    description: '로그아웃 성공',
    type: SuccessResponseDto,
  })
  async logout(@CurrentUser() user: JwtUser): Promise<SuccessResponseDto> {
    return this.authService.logout(user.id);
  }

  @Post('refresh')
  @ApiOperation({ summary: '토큰 재발급' })
  @ApiResponse({
    status: 200,
    description: '토큰 재발급 성공',
    type: RefreshTokenResponseDto,
  })
  @ApiResponse({ status: 401, description: '유효하지 않은 리프레시 토큰' })
  async refreshTokens(@Body() dto: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> {
    return this.authService.refreshTokens(dto);
  }
}
