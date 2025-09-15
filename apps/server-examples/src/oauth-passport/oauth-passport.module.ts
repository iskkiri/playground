import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { OAuthPassportController } from './oauth-passport.controller';
import { NaverStrategy } from './strategies/naver.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { OAuthResponseService } from './oauth-response.service';

@Module({
  imports: [PassportModule],
  controllers: [OAuthPassportController],
  providers: [NaverStrategy, KakaoStrategy, GoogleStrategy, OAuthResponseService],
})
export class OAuthPassportModule {}