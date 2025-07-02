import { Module } from '@nestjs/common';
import { OAuthGoogleService } from './oauth-google.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [OAuthGoogleService],
  exports: [OAuthGoogleService],
})
export class OAuthGoogleModule {}
