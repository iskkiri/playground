import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OAuthKakaoModule } from './kakao/oauth-kakao.module';
import { OAuthNaverModule } from './naver/oauth-naver.module';
import { OAuthGoogleModule } from './google/oauth-google.module';
import { OAuthAppleModule } from './apple/oauth-apple.module';
import { OAuthPaycoModule } from './payco/oauth-payco.module';

@Module({
  imports: [
    OAuthKakaoModule,
    OAuthNaverModule,
    OAuthGoogleModule,
    OAuthAppleModule,
    OAuthPaycoModule,
  ],
  controllers: [OauthController],
})
export class OAuthModule {}
