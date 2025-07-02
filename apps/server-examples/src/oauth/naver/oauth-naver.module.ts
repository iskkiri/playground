import { Module } from '@nestjs/common';
import { OAuthNaverService } from './oauth-naver.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [OAuthNaverService],
  exports: [OAuthNaverService],
})
export class OAuthNaverModule {}
