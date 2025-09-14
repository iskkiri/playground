import { PortoneService } from './../portone/portone.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  VerifyIdentityRequestDto,
  VerifyIdentityResponseDto,
} from './../portone/dtos/verify-identity.dto';
import { RefreshTokenRequestDto, RefreshTokenResponseDto } from './dtos/refresh-token.dto';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { ApiOkResponse, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiPropertiesDescription } from '@/common/decorators/api-properties-description.decorator';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly portoneService: PortoneService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '인증 정보 조회' })
  @ApiPropertiesDescription({
    description:
      '본인 인증 완료 이후 획득한 identityVerificationId를 이용하여 고객 인증 정보를 조회합니다.',
    dto: VerifyIdentityRequestDto,
  })
  @ApiOkResponse({ type: VerifyIdentityResponseDto })
  @HttpCode(HttpStatus.OK)
  @Post('verify-identity')
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
