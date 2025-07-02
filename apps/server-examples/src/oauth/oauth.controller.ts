import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OAuthKakaoService } from './kakao/oauth-kakao.service';
import { OAuthNaverService } from './naver/oauth-naver.service';
import { OAuthAppleService } from './apple/oauth-apple.service';
import { GetKakaoAuthTokenRequestDto } from './kakao/dtos/get-kakao-auth-token.dto';
import { GetNaverAuthTokenRequestDto } from './naver/dtos/get-naver-auth-token.dto';
import { GetAppleIdentityTokenRequestDto } from './apple/dtos/get-apple-identity-token.dto';
import { NaverUserInfo } from './naver/dtos/get-naver-user-info.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetKakaoUserInfoResponseDto } from './kakao/dtos/get-kakao-user-info.dto';
import { AppleTokenPayload } from './apple/types/apple-token-payload.types';
import { GetGoogleAuthTokenRequestDto } from './google/dtos/get-google-auth-token.dto';
import { GoogleUserInfo } from './google/dtos/get-google-user-info.dto';
import { OAuthGoogleService } from './google/oauth-google.service';
import { GetPaycoAuthTokenRequestDto } from './payco/dtos/get-payco-auth-token.dto';
import { OAuthPaycoService } from './payco/oauth-payco.service';
import { PaycoUserInfo } from './payco/dtos/get-payco-user-info.dto';
import { ApiPropertiesDescription } from '@/common/decorators/api-properties-description.decorator';

@ApiTags('OAuth')
@Controller('oauth')
export class OauthController {
  constructor(
    private readonly oauthKakaoService: OAuthKakaoService,
    private readonly oauthNaverService: OAuthNaverService,
    private readonly oauthGoogleService: OAuthGoogleService,
    private readonly oauthAppleService: OAuthAppleService,
    private readonly oauthPaycoService: OAuthPaycoService
  ) {}

  @ApiOperation({ summary: '카카오 로그인' })
  @ApiPropertiesDescription({ dto: GetKakaoAuthTokenRequestDto })
  @ApiOkResponse({ type: GetKakaoUserInfoResponseDto })
  @HttpCode(HttpStatus.OK)
  @Post('kakao')
  kakaoLogin(@Body() body: GetKakaoAuthTokenRequestDto): Promise<GetKakaoUserInfoResponseDto> {
    return this.oauthKakaoService.kakaoLogin(body);
  }

  @ApiOperation({ summary: '네이버 로그인' })
  @ApiPropertiesDescription({ dto: GetNaverAuthTokenRequestDto })
  @ApiOkResponse({ type: NaverUserInfo })
  @HttpCode(HttpStatus.OK)
  @Post('naver')
  naverLogin(@Body() body: GetNaverAuthTokenRequestDto): Promise<NaverUserInfo> {
    return this.oauthNaverService.naverLogin(body);
  }

  @ApiOperation({ summary: '구글 로그인' })
  @ApiPropertiesDescription({ dto: GetGoogleAuthTokenRequestDto })
  @ApiOkResponse({ type: GoogleUserInfo })
  @HttpCode(HttpStatus.OK)
  @Post('google')
  googleLogin(@Body() body: GetGoogleAuthTokenRequestDto): Promise<GoogleUserInfo> {
    return this.oauthGoogleService.googleLogin(body);
  }

  @ApiOperation({ summary: '애플 로그인' })
  @ApiPropertiesDescription({ dto: GetAppleIdentityTokenRequestDto })
  @ApiOkResponse({ type: AppleTokenPayload })
  @HttpCode(HttpStatus.OK)
  @Post('apple')
  appleLogin(@Body() body: GetAppleIdentityTokenRequestDto): Promise<AppleTokenPayload> {
    return this.oauthAppleService.appleLogin(body);
  }

  @ApiOperation({ summary: '페이코 로그인' })
  @ApiPropertiesDescription({ dto: GetPaycoAuthTokenRequestDto })
  @ApiOkResponse({ type: PaycoUserInfo })
  @HttpCode(HttpStatus.OK)
  @Post('payco')
  paycoLogin(@Body() body: GetPaycoAuthTokenRequestDto): Promise<PaycoUserInfo> {
    return this.oauthPaycoService.paycoLogin(body);
  }
}
