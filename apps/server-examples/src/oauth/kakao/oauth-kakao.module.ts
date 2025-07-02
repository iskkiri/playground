import { Module } from '@nestjs/common';
import { OAuthKakaoService } from './oauth-kakao.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [OAuthKakaoService],
  exports: [OAuthKakaoService],
})
export class OAuthKakaoModule {}
