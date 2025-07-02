import { Module } from '@nestjs/common';
import { OAuthAppleService } from './oauth-apple.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [OAuthAppleService],
  exports: [OAuthAppleService],
})
export class OAuthAppleModule {}
