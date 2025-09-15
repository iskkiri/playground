import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { OAuthPassportController } from './oauth-passport.controller';
import { NaverStrategy } from './strategies/naver.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';

@Module({
  imports: [PassportModule],
  controllers: [OAuthPassportController],
  providers: [NaverStrategy, KakaoStrategy],
})
export class OAuthPassportModule {}