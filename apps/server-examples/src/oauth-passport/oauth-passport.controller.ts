import { Controller, Get, Req, UseGuards, Header } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { NaverAuthGuard } from './guards/naver-auth.guard';
import { NaverProfile } from './dtos/naver-profile.dto';
import { KakaoAuthGuard } from './guards/kakao-auth.guard';
import { KakaoProfile } from './dtos/kakao-profile.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GoogleProfile } from './dtos/google-profile.dto';
import { OAuthPassportService } from './oauth-passport.service';

@ApiTags('OAuth Passport')
@Controller('oauth-passport')
export class OAuthPassportController {
  constructor(private readonly oauthResponseService: OAuthPassportService) {}

  @Get('naver')
  @UseGuards(NaverAuthGuard)
  @ApiOperation({
    summary: '네이버 로그인',
    description: '사용자를 네이버 인증 페이지로 리디렉션합니다.',
  })
  naverAuth() {}

  @Get('naver/callback')
  @UseGuards(NaverAuthGuard)
  @Header('Content-Type', 'text/html')
  @ApiOperation({
    summary: '네이버 콜백 처리',
    description: '네이버에서 인증 후 돌아오는 콜백을 처리합니다.',
  })
  async naverCallback(@Req() req: Request & { user: NaverProfile }): Promise<string> {
    console.log('네이버 사용자 정보:', req.user);

    const tokens = {
      accessToken: '발급한 액세스 토큰',
      refreshToken: '발급한 리프레시 토큰',
    };

    return this.oauthResponseService.generateSuccessHtml(tokens);
  }

  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  @ApiOperation({
    summary: '카카오 로그인',
    description: '사용자를 카카오 인증 페이지로 리디렉션합니다. ',
  })
  kakaoAuth() {}

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  @Header('Content-Type', 'text/html')
  @ApiOperation({
    summary: '카카오 콜백 처리',
    description: '카카오에서 인증 후 돌아오는 콜백을 처리합니다. ',
  })
  async kakaoCallback(@Req() req: Request & { user: KakaoProfile }): Promise<string> {
    console.log('카카오 사용자 정보:', req.user);

    const tokens = {
      accessToken: '발급한 액세스 토큰',
      refreshToken: '발급한 리프레시 토큰',
    };

    return this.oauthResponseService.generateSuccessHtml(tokens);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({
    summary: '구글 로그인',
    description: '사용자를 구글 인증 페이지로 리디렉션합니다. ',
  })
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @Header('Content-Type', 'text/html')
  @ApiOperation({
    summary: '구글 콜백 처리',
    description: '구글에서 인증 후 돌아오는 콜백을 처리합니다. ',
  })
  async googleCallback(@Req() req: Request & { user: GoogleProfile }): Promise<string> {
    console.log('구글 사용자 정보:', req.user);

    const tokens = {
      accessToken: '발급한 액세스 토큰',
      refreshToken: '발급한 리프레시 토큰',
    };

    return this.oauthResponseService.generateSuccessHtml(tokens);
  }
}
