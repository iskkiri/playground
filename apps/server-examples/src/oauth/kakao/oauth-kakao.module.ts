import { Module } from '@nestjs/common';
import { OAuthKakaoService } from './oauth-kakao.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [HttpModule, JwtModule],
  providers: [OAuthKakaoService],
  exports: [OAuthKakaoService],
})
export class OAuthKakaoModule {}
